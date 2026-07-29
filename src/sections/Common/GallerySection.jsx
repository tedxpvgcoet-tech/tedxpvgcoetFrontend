// GallerySection.jsx
import React from "react";
import "./GallerySection.css";
import img1 from "../../assets/gallery/gallery1.webp";
import img2 from "../../assets/gallery/gallery2.webp";
import img3 from "../../assets/gallery/gallery3.webp";
import img4 from "../../assets/gallery/gallery4.webp";
import img5 from "../../assets/gallery/gallery5.webp";
import img6 from "../../assets/gallery/gallery6.webp";
import FooterSection from "./FooterSection";

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
              <img src={images[0]} alt="" loading="lazy" />
            </div>
            <div className="gallery-item item-2">
              <img src={images[1]} alt="" loading="lazy" />
            </div>

            {/* Remaining four images fill the lower rows */}
            <div className="gallery-item item-3">
              <img src={images[2]} alt="" loading="lazy" />
            </div>
            <div className="gallery-item item-4">
              <img src={images[3]} alt="" loading="lazy" />
            </div>
            <div className="gallery-item item-5">
              <img src={images[4]} alt="" loading="lazy" />
            </div>
            <div className="gallery-item item-6">
              <img src={images[5]} alt="" loading="lazy" />
            </div>
          </div>
        </div>
        <FooterSection />
      </section>
    </>
  );
}
