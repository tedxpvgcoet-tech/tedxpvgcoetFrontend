import backgroundVideo1 from "../assets/background.mp4";
import "./BackgroundSection.css";


const BackgroundSection = () => {
  return (
    <div className="hero-container1">
      <video autoPlay loop muted className="hero-video1">
        <source src={backgroundVideo1} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundSection;