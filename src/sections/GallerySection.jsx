// GallerySection.jsx
import React from "react";
import "./GallerySection.css";
import img1 from "../assets/gallery1.jpg";
import img2 from "../assets/gallery2.jpg";
import img3 from "../assets/gallery3.jpg";
import img4 from "../assets/gallery4.jpg";
import img5 from "../assets/gallery5.jpg";
import img6 from "../assets/gallery6.jpg";
import FooterSection from "../sections/FooterSection";

export default function GallerySection() {
  const images = [img1, img2, img3, img4, img5, img6];

  return (
    <>
      <section className="gallery-section">
        <div className="gallery-section2">
        <div className="gallery-grid">
          <h1 className="gallery-title">Gallery </h1>

          {/* First two images beside the title */}
          <div className="gallery-item item-1">
            <img src={images[0]} alt="" />
          </div>
          <div className="gallery-item item-2">
            <img src={images[1]} alt="" />
          </div>

          {/* Remaining four images fill the lower rows */}
          <div className="gallery-item item-3">
            <img src={images[2]} alt="" />
          </div>
          <div className="gallery-item item-4">
            <img src={images[3]} alt="" />
          </div>
          <div className="gallery-item item-5">
            <img src={images[4]} alt="" />
          </div>
          <div className="gallery-item item-6">
            <img src={images[5]} alt="" />
          </div>
        </div>
        </div>
        <FooterSection />
      </section>
    </>
     
  );
}
