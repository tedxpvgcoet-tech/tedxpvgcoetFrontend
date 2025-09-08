import React, { useState, useRef, useEffect } from 'react';

const RetroCamera = () => {
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const cameraPlaceholderRef = useRef(null);
  const photoCanvasRef = useRef(null);
  const hiddenCanvasRef = useRef(null);
  const flashOverlayRef = useRef(null);
  const streamRef = useRef(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [latestPhotoUrl, setLatestPhotoUrl] = useState(null);
  const [canShare, setCanShare] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  // Check for Web Share API on mount
  useEffect(() => {
    if (navigator.share && navigator.canShare) {
      setCanShare(true);
    }
  }, []);

  // Start camera
  const startCamera = async () => {
    try {
      console.log('Starting camera...');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 }, 
          facingMode: 'environment' 
        }
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Wait for video to load
        videoRef.current.addEventListener('loadedmetadata', () => {
          console.log('Video loaded, dimensions:', videoRef.current.videoWidth, 'x', videoRef.current.videoHeight);
          setIsCameraActive(true);
        });
      }

    } catch (err) {
      console.error('Camera error:', err);
      alert('Camera access failed: ' + err.message);
    }
  };

  // Stop camera
  const stopCamera = () => {
    console.log('Stopping camera...');
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        console.log('Stopping track:', track.kind);
        track.stop();
      });
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setLatestPhotoUrl(null);
  };

  // Apply retro filter
  const applyRetroFilter = (imageData) => {
    const d = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    
    for (let i = 0; i < d.length; i += 4) {
      const pixelIndex = i / 4;
      const x = pixelIndex % width;
      const y = Math.floor(pixelIndex / width);
      
      const r = d[i], g = d[i+1], b = d[i+2];
      
      // Light sepia effect
      const sepiaR = Math.min(255, (r*0.9)+(g*0.08)+(b*0.02));
      const sepiaG = Math.min(255, (r*0.05)+(g*0.9)+(b*0.05));
      const sepiaB = Math.min(255, (r*0.02)+(g*0.02)+(b*0.96));
      
      // Subtle warm adjustments
      let finalR = Math.min(255, sepiaR + 2);
      let finalG = Math.min(255, sepiaG + 1);
      let finalB = Math.min(255, sepiaB - 1);
      
      // Vintage border effects
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
      
      // Corner darkening
      const centerX = width / 2;
      const centerY = height / 2;
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const currentDistance = Math.sqrt((x - centerX) * (x - centerX) + (y - centerY) * (y - centerY));
      const cornerDarkening = (currentDistance / maxDistance) * 0.15;
      
      finalR = Math.max(0, finalR - (cornerDarkening * finalR));
      finalG = Math.max(0, finalG - (cornerDarkening * finalG));
      finalB = Math.max(0, finalB - (cornerDarkening * finalB));
      
      // Film grain
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
  };

  // Add timestamp
  const addTimestamp = (ctx, w, h) => {
    const now = new Date();
    const ts = now.toLocaleDateString('en-US',{year:'2-digit',month:'2-digit',day:'2-digit'}) +
               ' ' + now.toLocaleTimeString('en-US',{hour12:false,hour:'2-digit',minute:'2-digit'});
    ctx.font = `bold ${Math.max(16, w*0.025)}px Courier New`;
    ctx.fillStyle = '#FF6B35';
    ctx.strokeStyle = 'rgba(0,0,0,0.8)';
    ctx.lineWidth = 2;
    ctx.strokeText(ts, w*0.03, h-(h*0.05));
    ctx.fillText(ts, w*0.03, h-(h*0.05));
  };

  // Display photo
  const displayPhoto = (sourceCanvas) => {
    if (photoCanvasRef.current) {
      photoCanvasRef.current.width = sourceCanvas.width;
      photoCanvasRef.current.height = sourceCanvas.height;
      photoCanvasRef.current.getContext('2d').drawImage(sourceCanvas, 0, 0);
    }
  };

  // Capture photo
  const capturePhoto = () => {
    console.log('Capture button clicked');
    
    if (isCapturing) {
      console.log('Already capturing, ignoring click');
      return;
    }
    
    if (!streamRef.current) {
      console.error('No stream available');
      alert('Camera not available. Please restart the camera.');
      return;
    }
    
    if (videoRef.current && (videoRef.current.videoWidth === 0 || videoRef.current.videoHeight === 0)) {
      console.error('Video not ready, dimensions:', videoRef.current.videoWidth, 'x', videoRef.current.videoHeight);
      alert('Camera not ready. Please wait a moment and try again.');
      return;
    }
    
    setIsCapturing(true);
    
    try {
      // Flash effect
      if (flashOverlayRef.current) {
        flashOverlayRef.current.style.opacity = '0.8';
        setTimeout(() => {
          if (flashOverlayRef.current) {
            flashOverlayRef.current.style.opacity = '0';
          }
        }, 150);
      }
      
      console.log('Capturing photo...');
      const video = videoRef.current;
      const canvas = hiddenCanvasRef.current;
      const ctx = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);
      
      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Apply retro filter
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      applyRetroFilter(imageData);
      ctx.putImageData(imageData, 0, 0);

      // Add timestamp
      addTimestamp(ctx, canvas.width, canvas.height);

      // Display photo
      displayPhoto(canvas);
      setLatestPhotoUrl(canvas.toDataURL('image/jpeg', 0.9));
      
      console.log('Photo captured successfully');
      
    } catch (error) {
      console.error('Error capturing photo:', error);
      alert('Failed to capture photo: ' + error.message);
    } finally {
      setIsCapturing(false);
    }
  };

  // Download photo
  const downloadPhoto = () => {
    if (photoCanvasRef.current) {
      const link = document.createElement('a');
      const ts = new Date().toISOString().slice(0,19).replace(/:/g,'-');
      link.download = `retro-photo-${ts}.jpg`;
      link.href = photoCanvasRef.current.toDataURL('image/jpeg', 0.9);
      link.click();
    }
  };

  // Share photo
  const sharePhoto = async () => {
    if (photoCanvasRef.current) {
      photoCanvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        const ts = new Date().toISOString().slice(0,19).replace(/:/g,'-');
        const file = new File([blob],`retro-photo-${ts}.jpg`,{type:"image/jpeg"});
        try {
          if (navigator.canShare && navigator.canShare({files:[file]})) {
            await navigator.share({title:"Retro Cam",text:"Captured with Retro Cam 📸",files:[file]});
          } else {
            alert("Sharing not supported on this device.");
          }
        } catch(err){ 
          console.error("Share failed:",err); 
          alert("Share failed: " + err.message);
        }
      },"image/jpeg",0.9);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#92400e',
            marginBottom: '10px',
            margin: 0
          }}>
            📸 Retro Cam
          </h1>
          <p style={{ color: '#b45309', fontSize: '1.1rem', margin: 0 }}>
            Disposable camera vibes, digital convenience
          </p>
        </div>

        {/* Camera Section */}
        <div style={{
          background: '#fffbeb',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)',
          marginBottom: '30px'
        }}>
          <div style={{ position: 'relative' }}>
            {/* Flash overlay */}
            <div 
              ref={flashOverlayRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'white',
                opacity: 0,
                pointerEvents: 'none',
                borderRadius: '12px',
                transition: 'opacity 0.1s ease',
                zIndex: 10
              }}
            />
            
            {/* Video Preview */}
            <div 
              ref={videoContainerRef}
              style={{ display: isCameraActive ? 'block' : 'none' }}
            >
              <video 
                ref={videoRef}
                autoPlay
                playsInline 
                muted
                style={{
                  width: '100%',
                  height: '320px',
                  objectFit: 'cover',
                  border: '8px solid #8B4513',
                  borderRadius: '12px',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3), 0 4px 20px rgba(0,0,0,0.4)',
                  filter: 'sepia(30%) saturate(120%) contrast(110%) brightness(105%) hue-rotate(10deg)',
                  backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,.1) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(0,0,0,.1) 1px, transparent 1px)',
                  backgroundSize: '4px 4px'
                }}
              />
            </div>

            {/* Placeholder */}
            <div 
              ref={cameraPlaceholderRef}
              style={{
                width: '100%',
                height: '320px',
                background: '#fde68a',
                display: isCameraActive ? 'none' : 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '8px solid #8B4513',
                borderRadius: '12px',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3), 0 4px 20px rgba(0,0,0,0.4)'
              }}
            >
              <div style={{ textAlign: 'center', color: '#b45309' }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📷</div>
                <p style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '5px', margin: 0 }}>
                  Ready to capture memories?
                </p>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  Click "Start Camera" to begin
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{
            display: 'flex',
            gap: '20px',
            marginTop: '30px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {!isCameraActive ? (
              <button 
                onClick={startCamera}
                style={{
                  padding: '15px 25px',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s ease',
                  color: 'white',
                  background: '#16a34a'
                }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              >
                🎬 Start Camera
              </button>
            ) : (
              <>
                <button 
                  onClick={capturePhoto}
                  disabled={isCapturing}
                  style={{
                    padding: '15px 25px',
                    border: 'none',
                    borderRadius: '50px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    cursor: isCapturing ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    transition: 'all 0.2s ease',
                    color: 'white',
                    background: '#dc2626',
                    opacity: isCapturing ? 0.6 : 1
                  }}
                  onMouseEnter={e => !isCapturing && (e.target.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                >
                  {isCapturing ? '⏳ Processing...' : '📸 Capture Photo'}
                </button>
                
                <button 
                  onClick={stopCamera}
                  style={{
                    padding: '15px 25px',
                    border: 'none',
                    borderRadius: '50px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    transition: 'all 0.2s ease',
                    color: 'white',
                    background: '#6b7280'
                  }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                >
                  ⏹️ Stop Camera
                </button>
              </>
            )}
          </div>
        </div>

        {/* Captured Photo Section */}
        {latestPhotoUrl && (
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              color: '#92400e',
              marginBottom: '20px',
              textAlign: 'center',
              margin: '0 0 20px 0'
            }}>
              📋 Latest Shot
            </h2>
            
            <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
              <canvas 
                ref={photoCanvasRef}
                style={{
                  width: '100%',
                  height: 'auto',
                  border: '8px solid #8B4513',
                  borderRadius: '12px',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3), 0 4px 20px rgba(0,0,0,0.4)',
                  filter: 'sepia(30%) saturate(120%) contrast(110%) brightness(105%) hue-rotate(10deg)',
                  backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,.1) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(0,0,0,.1) 1px, transparent 1px)',
                  backgroundSize: '4px 4px'
                }}
              />
            </div>
            
            <div style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={downloadPhoto}
                style={{
                  padding: '15px 25px',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s ease',
                  color: 'white',
                  background: '#2563eb'
                }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              >
                💾 Download Photo
              </button>
              
              {canShare && (
                <button 
                  onClick={sharePhoto}
                  style={{
                    padding: '15px 25px',
                    border: 'none',
                    borderRadius: '50px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    transition: 'all 0.2s ease',
                    color: 'white',
                    background: '#9333ea'
                  }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                >
                  📤 Share Photo
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Hidden canvas */}
      <canvas ref={hiddenCanvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default RetroCamera;