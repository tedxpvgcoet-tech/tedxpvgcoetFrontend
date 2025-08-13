import React, { useState, useEffect } from "react";
import "./PerspectiveSection.css";
import FooterSection from "./FooterSection";


const images = [
  { id: 1, src: "https://picsum.photos/id/1015/400/500", text: "Illusion Artwork 1" },
  { id: 2, src: "https://picsum.photos/id/1025/400/500", text: "Illusion Artwork 2" },
  { id: 3, src: "https://picsum.photos/id/1035/400/500", text: "Illusion Artwork 3" },
  { id: 4, src: "https://picsum.photos/id/1045/400/500", text: "Illusion Artwork 4" },
  { id: 5, src: "https://picsum.photos/id/1055/400/500", text: "Illusion Artwork 5" },
  { id: 6, src: "https://picsum.photos/id/1065/400/500", text: "Illusion Artwork 6" },
];

export default function PerspectiveSection() {
  const [activeId, setActiveId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = (id) => {
    if (isMobile) {
      setActiveId(activeId === id ? null : id);
    }
  };

  return (
    <section className="grey">
    <section className="perspective">
      <h2>Perspective</h2>
      <div className="grid">
        {images.map((img) => (
          <div
            key={img.id}
            className={`card ${isMobile && activeId === img.id ? "active" : ""}`}
            onClick={() => handleClick(img.id)}
            onMouseLeave={() => isMobile || setActiveId(null)}
          >
            <img src={img.src} alt={img.text} />
            <div className="overlay">
              <p>{img.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    <FooterSection />
    </section>
  );
}
