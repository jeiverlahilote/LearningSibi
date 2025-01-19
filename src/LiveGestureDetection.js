import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "./LiveGesture.css"; // Import file CSS

const LiveGestureDetection = () => {
  const webcamRef = useRef(null);
  const [response, setResponse] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);

  // Fungsi untuk mengirim gambar ke API
  const detectGesture = async (imageSrc) => {
    try {
      const result = await axios({
        method: "POST",
        url: "https://detect.roboflow.com/american-sign-language-letters/6",
        params: { api_key: "hTZuf1D35gj1nUUY9SMe" },
        data: imageSrc,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      setResponse(result.data);
    } catch (error) {
      console.error("Error uploading image:", error);
      setResponse("Failed to upload image.");
    }
  };

  const captureFrame = () => {
    if (webcamRef.current && isDetecting) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) detectGesture(imageSrc);
    }
  };

  const startLiveDetection = () => setIsDetecting(true);
  const stopLiveDetection = () => setIsDetecting(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isDetecting) captureFrame();
    }, 1000);
    return () => clearInterval(interval);
  }, [isDetecting]);

  return (
    <div className="gesture-container">
      <header className="header">
        <h1>SIBI LEARNING</h1>
        <p>Belajar bahasa isyarat secara real-time dengan kamera Anda!</p>
      </header>

      <div className="camera-section">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="webcam"
        />
      </div>

      <div className="controls">
        <button onClick={startLiveDetection} className="button start">
          Start Detection
        </button>
        <button onClick={stopLiveDetection} className="button stop">
          Stop Detection
        </button>
      </div>

      <div className="result-section">
        <h2>Hasil Deteksi:</h2>
        <div className="result-box">
          {response ? (
            <p>{JSON.stringify(response, null, 2)}</p>
          ) : (
            <p>Tidak ada gesture terdeteksi.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveGestureDetection;
