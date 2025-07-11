import backgroundVideo from "../assets/background.mp4";
import FooterSection from "../sections/FooterSection";
import "./SponsorForm.css";

const SponsorForm = () => {
  return (
    <div className="hero-container-sponsor">
      <video autoPlay loop muted className="hero-video-sponsor">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <main className="form-page-sponsor">
        <div className="form-scroll-wrapper">
        <div className="form-inner-sponsor">
          <h1>Partner With Us</h1>
          <form className="sponsor-form">
            {/* Basic Information */}
            <div className="full-width-sponsor">
              <input type="text" placeholder="Full Name" required />
            </div>

            <div className="full-width-sponsor">
              <input type="text" placeholder="Organization / Company Name" required />
            </div>

            <div className="full-width-sponsor">
              <input type="text" placeholder="Designation" required />
            </div>

            <div className="two-col-sponsor">
              <input type="email" placeholder="Email Address" required />
              <input type="tel" placeholder="Phone Number" required />
            </div>

            <div className="full-width-sponsor">
              <input type="url" placeholder="Website / Social Media Links" />
            </div>

            {/* Partnership Types */}
            <div className="full-width-sponsor checkbox-group">
              <label>Type of Partnership Interested In:</label>
              <div>
                <label><input type="checkbox" value="Title Sponsor" /> Title Sponsor</label>
                <label><input type="checkbox" value="Co-Sponsor" /> Co-Sponsor</label>
                <label><input type="checkbox" value="Gifting Partner" /> Gifting Partner</label>
                <label><input type="checkbox" value="Media Partner" /> Media Partner</label>
              </div>
            </div>

            {/* Budget/Sponsorship Range */}
            <div className="full-width-sponsor">
              <select required>
                <option value="">Select Sponsorship Range</option>
                <option value="10k-50k">₹10,000 - ₹50,000</option>
                <option value="50k-1lakh">₹50,000 - ₹1,00,000</option>
                <option value="1lakh+">₹1,00,000+</option>
              </select>
            </div>

            {/* Return Expectations */}
            <div className="full-width-sponsor">
              <input type="text" placeholder="What would you expect in return?" />
            </div>

            {/* Sponsored before */}
            <div className="full-width-sponsor">
              <div className="statements">
              <label>
                <input type="checkbox"/> Have you sponsored similar events before?
              </label>
            </div>
          </div>

            {/* Consent */}
            <div className="full-width-sponsor">
              <div className="statements">
              <label>
                <input type="checkbox" required /> I consent to be contacted regarding sponsorship.
              </label>
              </div>
            </div>

            <div className="full-width-sponsor">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
      </main>
      <FooterSection/>
    </div>
  );
};

export default SponsorForm;
