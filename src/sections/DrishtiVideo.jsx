import React from 'react'
import desktopVideo from "../assets/DesktopTheme.mp4";  // Desktop video
import "./DrishtiVideo.css";


const DrishtiVideo = () => {

    const handleWatchClick = () => {
    window.open("https://www.instagram.com/p/DNEFw7_ImjI/", "_blank");
  };

  return (
    <>
    <div className="vid-container">
    <video className="drishti-video" autoPlay loop muted playsInline>
        <source src={desktopVideo} type="video/mp4" />
      </video>
      <button className="btn watch-btn" onClick={handleWatchClick}>
          Watch
     </button>
    </div>
    </>
  )
}

export default DrishtiVideo