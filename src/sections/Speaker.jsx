import React, { useState } from "react";
import "./Speaker.css";
import speakerImage from "../assets/Bhooshan.png";

const Speaker = () => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <section className="speaker-section">
            {/* For mobile */}
            <div className="speaker-mobile">
                {!showInfo ? (
                    <div className="speaker-mobile-photo">
                        <img src={speakerImage} alt="Speaker" className="speaker-image" />
                        <button
                            className="speaker-learn-btn"
                            onClick={() => setShowInfo(true)}
                        >
                            Learn More →
                        </button>
                    </div>
                ) : (
                    <div className="speaker-mobile-info">
                        <p className="speaker-description">
                            Dr. Bhoshan Kelkar, an eminent thought leader and educator in emerging technologies, will be gracing the TEDxPVGCOET stage to share his insights on Artificial Intelligence. With decades of experience at the intersection of technology, innovation, and leadership, Dr. Kelkar has played a pivotal role in shaping the AI ecosystem in India. His session will explore how AI is transforming industries, reshaping human capabilities, and redefining the future of work and society.

                            
                        </p>
                        <button
                            className="speaker-back-btn"
                            onClick={() => setShowInfo(false)}
                        >
                            ← Back
                        </button>
                    </div>
                )}
            </div>

            {/* For laptop/desktop */}
            <div className="speaker-desktop">
                <div className="speaker-image-container">
                    <img src={speakerImage} alt="Speaker" className="speaker-image" />
                </div>
                <div className="speaker-text">
                    <p className="speaker-description">
                         Dr. Bhoshan Kelkar, an eminent thought leader and educator in emerging technologies, will be gracing the TEDxPVGCOET stage to share his insights on Artificial Intelligence. With decades of experience at the intersection of technology, innovation, and leadership, Dr. Kelkar has played a pivotal role in shaping the AI ecosystem in India. His session will explore how AI is transforming industries, reshaping human capabilities, and redefining the future of work and society.

                    </p>
                </div>
            </div>
        </section>
    );
};

export default Speaker;