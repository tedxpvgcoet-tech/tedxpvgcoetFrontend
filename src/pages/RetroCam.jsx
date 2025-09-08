import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../Stylesheets/cam.css'; // Import the CSS file

const RetroCamera = () => {
  const videoRef = useRef(null);
  const photoCanvasRef = useRef(null);
  const hiddenCanvasRef = useRef(null);
  const streamRef = useRef(null);
  const [showFlash, setShowFlash] = useState(false);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [latestPhotoUrl, setLatestPhotoUrl] = useState(null);
  const [canShare, setCanShare] = useState(false);

  // Checks for the Web Share API on component mount
  useEffect(() => {
    if (navigator.share && navigator.canShare) {
      setCanShare(true);
    }
  }, []);

  // Custom retro filter logic
  const applyRetroFilter = useCallback((imageData) => {
    const d = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
  
    for (let i = 0; i < d.length; i += 4) {
      const pixelIndex = i / 4;
      const x = pixelIndex % width;
      const y = Math.floor(pixelIndex / width);
  
      const r = d[i], g = d[i+1], b = d[i+2];
  
      const sepiaR = Math.min(255, (r * 0.9) + (g * 0.08) + (b * 0.02));
      const sepiaG = Math.min(255, (r * 0.05) + (g * 0.9) + (b * 0.05));
      const sepiaB = Math.min(255, (r * 0.02) + (g * 0.02) + (b * 0.96));
  
      let finalR = Math.min(255, sepiaR + 2);
      let finalG = Math.min(255, sepiaG + 1);
      let finalB = Math.min(255, sepiaB - 1);
  
      const borderWidth = Math.min(width, height) * 0.1;
      const distanceFromEdge = Math.min(x, y, width - x, height - y);
  
      if (distanceFromEdge < borderWidth) {
        const vignetteStrength = (borderWidth - distanceFromEdge) / borderWidth;
        const vignetteFactor = 1 - (vignetteStrength * 0.4);
  
        finalR *= vignetteFactor;
        finalG *= vignetteFactor;
        finalB *= vignetteFactor;
  
        const borderSepia = vignetteStrength * 0.3;
        finalR = Math.min(255, finalR + (borderSepia * 30));
        finalG = Math.min(255, finalG + (borderSepia * 20));
        finalB = Math.min(255, finalB - (borderSepia * 10));
      }
  
      const centerX = width / 2;
      const centerY = height / 2;
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const currentDistance = Math.sqrt(
        (x - centerX) ** 2 + (y - centerY) ** 2
      );
      const cornerDarkening = (currentDistance / maxDistance) * 0.15;
  
      finalR = Math.max(0, finalR - cornerDarkening * finalR);
      finalG = Math.max(0, finalG - cornerDarkening * finalG);
      finalB = Math.max(0, finalB - cornerDarkening * finalB);
  
      if (Math.random() < 0.03) {
        const grain = (Math.random() - 0.5) * 15;
        finalR = Math.max(0, Math.min(255, finalR + grain));
        finalG = Math.max(0, Math.min(255, finalG + grain));
        finalB = Math.max(0, Math.min(255, finalB + grain));
      }
  
      d[i] = finalR;
      d[i+1] = finalG;
      d[i+2] = finalB;
    }
  }, []);

  const addTimestamp = useCallback((ctx, w, h) => {
    const now = new Date();
    const ts = now.toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' }) +
               ' ' + now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    ctx.font = `bold ${Math.max(16, w * 0.025)}px Courier New`;
    ctx.fillStyle = '#FF6B35';
    ctx.strokeStyle = 'rgba(0,0,0,0.8)';
    ctx.lineWidth = 2;
    ctx.strokeText(ts, w * 0.03, h - (h * 0.05));
    ctx.fillText(ts, w * 0.03, h - (h * 0.05));
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'environment' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error('Camera access failed:', err);
      alert('Camera access failed. Check permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsCameraActive(false);
    setLatestPhotoUrl(null);
  };
  
  const capturePhoto = () => {
    if (!videoRef.current || !hiddenCanvasRef.current || !photoCanvasRef.current) return;

    // Show flash effect
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 300);

    const video = videoRef.current;
    const hiddenCanvas = hiddenCanvasRef.current;
    const photoCanvas = photoCanvasRef.current;
    const ctx = hiddenCanvas.getContext('2d');

    hiddenCanvas.width = video.videoWidth;
    hiddenCanvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, hiddenCanvas.width, hiddenCanvas.height);

    const imageData = ctx.getImageData(0, 0, hiddenCanvas.width, hiddenCanvas.height);
    applyRetroFilter(imageData);
    ctx.putImageData(imageData, 0, 0);

    addTimestamp(ctx, hiddenCanvas.width, hiddenCanvas.height);

    photoCanvas.width = hiddenCanvas.width;
    photoCanvas.height = hiddenCanvas.height;
    photoCanvas.getContext('2d').drawImage(hiddenCanvas, 0, 0);

    setLatestPhotoUrl(photoCanvas.toDataURL('image/jpeg', 0.9));
  };
  
  const sharePhoto = async () => {
    if (!photoCanvasRef.current) return;
    photoCanvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
      const ts = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const file = new File([blob], `retro-photo-${ts}.jpg`, { type: "image/jpeg" });
      try {
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ title: "Retro Cam", text: "Captured with Retro Cam 📸", files: [file] });
        } else {
          alert("Sharing not supported on this device.");
        }
      } catch (err) {
        console.error("Share failed:", err);
      }
    }, "image/jpeg", 0.9);
  };
  
  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);
  
  return (
    <div className="retro-camera-container">
      <div className="retro-camera-wrapper">
        {/* Header */}
        <div className="retro-camera-header">
          <h1 className="retro-camera-title">📸 Retro Cam</h1>
          <p className="retro-camera-subtitle">Disposable camera vibes, digital convenience</p>
        </div>

        {/* Camera Section */}
        <div className="camera-section camera-body">
          <div className="video-container">
            {/* Flash overlay */}
            {showFlash && <div className="flash-overlay"></div>}
            
            {/* Video Preview */}
            <div className={isCameraActive ? '' : 'hidden'}>
              <video 
                ref={videoRef} 
                autoPlay
                playsInline 
                muted
                className="camera-video viewfinder retro-filter film-grain"
              />
            </div>
            
            {/* Placeholder */}
            <div className={`camera-placeholder viewfinder ${isCameraActive ? 'hidden' : ''}`}>
              <div className="placeholder-content">
                <div className="placeholder-icon">📷</div>
                <p className="placeholder-title">Ready to capture memories?</p>
                <p className="placeholder-subtitle">Click "Start Camera" to begin</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="controls-container">
            {!isCameraActive ? (
              <button 
                onClick={startCamera}
                className="btn btn-start"
              >
                🎬 Start Camera
              </button>
            ) : (
              <button 
                onClick={capturePhoto}
                className="btn btn-capture"
              >
                📸 Capture Photo
              </button>
            )}
          </div>
        </div>

        {/* Captured Photo Section */}
        {latestPhotoUrl && (
          <div className="photo-section">
            <h2 className="photo-title">📋 Latest Shot</h2>
            <div className="photo-container">
              <canvas ref={photoCanvasRef} className="photo-canvas retro-filter film-grain" />
            </div>
            <div className="photo-controls">
              {canShare && (
                <button
                  onClick={sharePhoto}
                  className="btn btn-share"
                >
                  📤 Share Photo
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Hidden canvas for image processing */}
      <canvas ref={hiddenCanvasRef} className="hidden-canvas" />
    </div>
  );
};

export default RetroCamera;