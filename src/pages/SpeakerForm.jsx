import backgroundVideo from "../assets/background.mp4";
import "./SpeakerForm.css";
import FooterSection from "../sections/FooterSection";


const SpeakerForm = () => {
  return (
    <>
    <div className="hero-container1">
          <video autoPlay loop muted className="hero-video1">
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <main className="form-page">
        <div className="form-inner">
          <h1>Speaker Nomination</h1>
          <form className="speaker-form">
            <div className="full-width">
              <input type="text" placeholder="Your Full Name" required />
            </div>

            <div className="two-col">
              <input type="number" placeholder="Age" required />
              <input type="text" placeholder="Domain" required />
            </div>

            <div className="full-width">
              <input type="text" placeholder="Organization" />
            </div>

            <div className="full-width">
              <h3>How do you think your talk will impact or inspire the audience?</h3>
              <br></br>
              <input type="text" placeholder="Answer" />
            </div>

            <div className="two-col">
              <input type="tel" placeholder="Phone Number" />
              <input type="email" placeholder="Email Address" />
            </div>

            <div className="two-col">
              <input type="url" placeholder="Instagram Profile URL" />
              <input type="url" placeholder="LinkedIn Profile URL" />
            </div>

            <div className="two-col">
              <input type="url" placeholder="Portfolio Link" />
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </main>
      <FooterSection/>
      </div>
    
    </>
  );
};

export default SpeakerForm;