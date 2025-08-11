import React from "react";
import "./DrishtiSection.css";
import gridImage from "../assets/B-W Individual/Perspective_grid.jpg";

export default function DrishtiSection() {
  return (
    <section className="drishti-section">
      <div className="drishti-content">
        <h1 className="drishti-title">Drishti</h1>
        <p className="drishti-text">
          In every culture, the ability to “see” carries more than a physical
          meaning. It refers not just to what the eyes perceive but to what the
          heart and mind come to understand. The word Drishti, rooted in Sanskrit,
          translates to “vision” or “perspective.” It symbolizes a way of looking
          at the world that is deep, conscious, and transformative. At TEDxPVGCOET
          2025, we aim to celebrate this form of vision—not just as observation,
          but as understanding. This year’s theme is a journey into perception,
          into awareness, into the quiet clarity that arises when we begin to see
          beyond distractions and surface-level truths. Drishti is not about what
          is obvious. It is about what becomes visible when we slow down, when we
          reflect, and when we invite ourselves to notice the things that often go
          unseen—within others and within ourselves. It is the moment of pause
          before we react, the breath we take before forming judgment, the space
          where a new way of thinking emerges. When people talk about changing
          their life, they often speak of a moment when something suddenly
          “clicked,” when they began to look at something familiar in an entirely
          new way. That is Drishti—a quiet turning point, an internal shift that
          can lead to profound external change.
        </p>
      </div>

      {/* Image at bottom */}
      <div className="drishti-image-container">
        <img src={gridImage} alt="Perspective Grid" className="drishti-grid" />
        <div className="fade-overlay"></div>
      </div>
    </section>
  );
}
