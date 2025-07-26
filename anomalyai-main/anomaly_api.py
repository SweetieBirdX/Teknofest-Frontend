from flask import Flask, request, jsonify
import pandas as pd
import json
from datetime import datetime
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.linear_model import LinearRegression
from sklearn.mixture import GaussianMixture
from scipy.stats import zscore
import tensorflow as tf

app = Flask(__name__)

# Zaman serisi için pencereleme fonksiyonu
def create_sequences(data, window_size):
    sequences = []
    for i in range(len(data) - window_size + 1):
        sequences.append(data[i:i+window_size])
    return np.array(sequences)

# LSTM Autoencoder Modeli
def build_model(input_shape):
    model = tf.keras.Sequential([
        tf.keras.layers.LSTM(32, activation='relu', input_shape=input_shape, return_sequences=True),
        tf.keras.layers.LSTM(16, activation='relu', return_sequences=False),
        tf.keras.layers.RepeatVector(input_shape[0]),
        tf.keras.layers.LSTM(16, activation='relu', return_sequences=True),
        tf.keras.layers.LSTM(32, activation='relu', return_sequences=True),
        tf.keras.layers.TimeDistributed(tf.keras.layers.Dense(input_shape[1]))
    ])
    model.compile(optimizer='adam', loss='mse')
    return model

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    telemetry = data['telemetry']
    records = []
    for d in telemetry:
        records.append({
            "timestamp": pd.to_datetime(d["timestamp"]),
            "speed": d["telemetry"]["speed"],
            "altitude": d["telemetry"]["altitude"],
            "heading": d["telemetry"]["heading"]
        })
    df = pd.DataFrame(records)
    df.sort_values("timestamp", inplace=True)
    df.reset_index(drop=True, inplace=True)
    df["speed_diff"] = df["speed"].diff().fillna(0).abs()
    df["altitude_diff"] = df["altitude"].diff().fillna(0).abs()
    df["heading_diff"] = df["heading"].diff().fillna(0).abs()
    SPEED_THRESHOLD = 10
    ALTITUDE_THRESHOLD = 5
    HEADING_THRESHOLD = 10
    df["speed_anomaly"] = df["speed_diff"] > SPEED_THRESHOLD
    df["altitude_anomaly"] = df["altitude_diff"] > ALTITUDE_THRESHOLD
    df["heading_anomaly"] = df["heading_diff"] > HEADING_THRESHOLD
    # Deep learning anomaly
    data_arr = df[["speed", "altitude", "heading"]].values
    scaler = MinMaxScaler()
    data_scaled = scaler.fit_transform(data_arr)
    WINDOW_SIZE = 10
    sequences = create_sequences(data_scaled, WINDOW_SIZE)
    input_shape = (sequences.shape[1], sequences.shape[2])
    model = build_model(input_shape)
    model.fit(sequences, sequences, epochs=3, batch_size=32, verbose=0)
    reconstructions = model.predict(sequences)
    mse = np.mean(np.power(sequences - reconstructions, 2), axis=(1,2))
    min_mse = np.min(mse)
    max_mse = np.max(mse)
    if max_mse > min_mse:
        mse_percent = 100 * (mse - min_mse) / (max_mse - min_mse)
    else:
        mse_percent = np.zeros_like(mse)
    threshold = np.mean(mse) + 2*np.std(mse)
    anomaly_flags = mse > threshold
    df["deep_anomaly"] = False
    df["deep_anomaly_score"] = 0.0
    for i, (flag, percent) in enumerate(zip(anomaly_flags, mse_percent)):
        idx = i+WINDOW_SIZE-1
        if idx < len(df):
            df.loc[idx, "deep_anomaly_score"] = percent
            if flag:
                df.loc[idx, "deep_anomaly"] = True
    # Diğer skorlar (örnek: zscore)
    for col in ["speed", "altitude", "heading"]:
        z = np.abs(zscore(df[col].values))
        z_norm = (z - z.min()) / (z.max() - z.min() + 1e-8)
        df[f"{col}_zscore"] = 100 * z_norm
    # Ensemble skor
    ensemble_scores = []
    for i in range(len(df)):
        scores = [df.loc[i, f"{col}_zscore"] for col in ["speed", "altitude", "heading"]]
        scores.append(df.loc[i, "deep_anomaly_score"])
        ensemble_scores.append(np.mean(scores))
    df["ensemble_anomaly_score"] = ensemble_scores
    # JSON response
    result = {
        "anomalies": df[df["ensemble_anomaly_score"] > 50][["timestamp", "ensemble_anomaly_score"]].to_dict(orient="records"),
        "deep_anomalies": df[df["deep_anomaly"]][["timestamp", "deep_anomaly_score"]].to_dict(orient="records"),
        "ensemble_scores": df[["timestamp", "ensemble_anomaly_score"]].to_dict(orient="records")
    }
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
