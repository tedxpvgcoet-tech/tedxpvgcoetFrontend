import React from "react";
import "./Speaker.css";
import SpeakerCard from "./SpeakerCard";

// Example data – you can expand this later
import speakerImage from "../assets/Bhooshan.png";

const speakers = [
  {
    name: "Dr. Bhoshan Kelkar",
    image: speakerImage,
    description:
      "Dr. Bhoshan Kelkar, an eminent thought leader and educator in emerging technologies..."
  },
  {
    name: "Another Speaker",
    image: speakerImage,
    description:
      "This is another speaker description..."
  },
  // Add as many as you want...
];

const SpeakerSection = () => {
  return (
    <section className="speaker-section">
      <div className="speaker-grid">
        {speakers.map((sp, index) => (
          <SpeakerCard key={index} speaker={sp} />
        ))}
      </div>
    </section>
  );
};

export default SpeakerSection;
