import React, { useRef, useState } from "react";
import illusion1 from "../assets/shipOfThesus/illusions/illusion1.jpeg";
import illusion2 from "../assets/shipOfThesus/illusions/illusion2.jpeg";
import illusion3 from "../assets/shipOfThesus/illusions/illusion3.jpeg";
import illusion4 from "../assets/shipOfThesus/illusions/illusion4.jpeg";
import illusion5 from "../assets/shipOfThesus/illusions/illusion5.jpeg";
import illusion6 from "../assets/shipOfThesus/illusions/illusion6.jpeg";
import illusion7 from "../assets/shipOfThesus/illusions/illusion7.jpeg";
import "./ShipTheseusIllusions.css";

const illusions = [
  {
    image: illusion1,
    title: "MINE",
    author: "Siddhi",
    paragraphs: [
      "A vision you see, perfect to the eyes,\nClear, focused, full of pride.\nBut inside is a storm of mighty lies,\nA blur, I keep buried inside.",
      "A blur, I took from the universe,\nA piece I polished till it shone,\nShaped it slowly, line by line,\nTill I could call it mine.",
      "Yet somewhere in the polished verse,\nLived the blur I was once before.\nAfraid that when the waters took me down,\nI would be clear no more.",
      "Beneath the waters, the picture would blur,\nMy fragments, one by one, scattered.\nThe pieces I had once made into mine,\nDrift away with the tide into the deep night.",
      "A picture once perfect,\nA self once defined,\nBreaking back into fragments\nI thought were mine.",
      "SHATTERED.\nSUNK.\nMINE.",
    ],
  },
  {
    image: illusion2,
    author: "Lavanya",
    paragraphs: [
      "Imagination is our most powerful space. It gives us permission to look beyond who we are right now and see the best version of ourselves waiting to take shape.",
      "The caterpillar does not limit its identity to crawl on the ground; the glass helps it dare to see wings, color, and flight. That act of visualization is where real transformation takes root. Yet, so often in life, we are silently conditioned to stay small, keep quiet, and blend into safe corners. We hold our thoughts back out of fear of judgment, quietly barricading our own growth.",
      "To truly evolve, we have to break out of that narrow space and crave something deeper. The mirror here is more than glass—it represents an honest encounter with our own passions, our discipline, and our craft. Dedication acts as that true reflection: a quiet ground of truth that strips away doubt, reveals our hidden strength, and reminds us of what we are capable of creating.",
      "We are all great artists with different forms yet we must all learn the “art of becoming”.",
    ],
  },
  {
    image: illusion3,
    author: "Yashashri",
    paragraphs: [
      "She moves through her life following quite the same routine  - a familiar morning, the same bus she takes, a conversation just so similar yet again with the same people. All this while, life passes by like a flicker of fingers. Then comes a moment when she finally stops, noticing the little things that had always seemed ordinary.  A butterfly resting against the glass on that familiar morning, the road she had travelled countless times but never really noticed, a conversation she had barely paid attention to, a person who had quietly been beside her through it all.",
      "Maybe all those things have always been here; it was she who never took a moment to notice.  The same routine made it all insignificant.",
      "Yet these moments, one after another, quietly construct what we call life. Nothing becomes meaningful on its own; it is the little pieces, slowly coming together, that make something whole.",
    ],
  },
  {
    image: illusion4,
    title: "OUROBOROS",
    author: "Swara",
    paragraphs: [
      "Everything that begins has an ending written somewhere. At least that’s what the general convention suggests.",
      "But what if it’s all an illusion, what if time itself is an illusion?",
      "We are only ever exposed to one cycle of creation and destruction that seems to be coiling around itself. Life and its demise are intertwined, much like an infinite loop.",
      "We assume obliteration to be the last stage, one last proof of existence, but fail to notice that it might just mark the lengths of an entirely different horizon.",
      "Everything that fades into stardust, finds a way to transpire somewhere within this massive universe.",
      "It is rather dazing how the Egyptian Ouroboros luminates that form may not always remain, yet, what pulverizes, gains a distinct purpose.",
    ],
  },
  {
    image: illusion5,
    title: "A chess piece",
    author: "Maitreyee",
    paragraphs: [
      "64 Squares, 16 pieces, dualities dwindling every way in between. A pawn, the piece deemed of the lowest possible points, sets foot on the board first. By the time it reaches the end of the board, the tables turn. Even weakest link in the game holds power to flip the game, one square at a time. What a pawn believes to be, it can be. Though what one sees at the end of the board isn’t a sudden upheaval but rather a continuum of betterment. That leaves us with a question- At what point on the board does the identity of a pawn become something more than itself? When did the piece become what it sought to become and is it still the same piece, just evolved? We are all a chess game of who the ghosts of our past and the shadows of the future; where every step you take changes where you end up at the end of the board.",
    ],
  },
  {
    image: illusion6,
    author: "Renuka",
    paragraphs: [
      "You are never just one version of yourself. You are shaped by the people you meet, the choices you make, the places you leave behind, and the moments that change you. Slowly, pieces of you are replaced some forgotten, some transformed, and some newly discovered. Yet, somewhere within all these changes, you continue to recognize yourself. But what truly makes you you the pieces you carry, the memories they hold, or the story that connects them all? Perhaps identity is not about remaining unchanged. Perhaps it is about changing endlessly, while still carrying a thread that whispers, “this is still me.”",
    ],
  },
  {
    image: illusion7,
    author: "Hiya",
    paragraphs: [
      "Date: 12th Cycle, Perihelion\nTo:\nKronos\nHead Manager\nIndustry of Time",
      "Dear Sir,",
      "I am writing this letter to notify you of my withdrawal from the Course of Time. I have completed my due millennia, and marked the Age of Becoming as assigned.",
      "I learned a lot at this position, and am truly grateful for your mentorship. However, I am utterly sick of the passage of Time. It never ends, and therefore, must never begin. Then again, it always seems to be beginning, and yet, things forever end. (And always when they’re getting good, too.)",
      "I am aware this decision will require stagnation and rendering myself immune to change, for without change, Time becomes meaningless. I am willing to do so to serve my hatred of Time.",
      "May your water thief maintain steady flow.",
      "Yours Untimely,\nAergia\nChronology Intern",
    ],
  },
];

const ShipTheseusIllusions = () => {
  const [openCards, setOpenCards] = useState({});
  const touchStart = useRef(null);

  const toggleCard = (index) => {
    setOpenCards((current) => ({ ...current, [index]: !current[index] }));
  };

  return (
    <section
      className="theseus-illusions"
      aria-labelledby="theseus-illusions-title"
    >
      <header className="theseus-illusions__header">
        <h2 id="theseus-illusions-title">FRAGMENTS OF BECOMING</h2>
        <p className="theseus-illusions__subtitle">
          Every fragment holds a story. Every change leaves a trace.
        </p>
      </header>
      <div className="theseus-illusions__grid">
        {illusions.map((piece, index) => (
          <article
            className={`theseus-illusions__card theseus-illusions__card--${index + 1}${
              openCards[index] ? " is-open" : ""
            }`}
            key={piece.author}
            role="button"
            tabIndex={0}
            aria-expanded={Boolean(openCards[index])}
            aria-controls={`theseus-illusion-copy-${index + 1}`}
            aria-label={`${piece.title || `Illusion ${index + 1}`}${
              piece.author ? ` by ${piece.author}` : ""
            }. ${openCards[index] ? "Hide" : "Reveal"} the writing.`}
            onPointerDown={(event) => {
              if (event.pointerType === "touch") {
                touchStart.current = { x: event.clientX, y: event.clientY };
              }
            }}
            onPointerUp={(event) => {
              if (event.pointerType !== "touch" || !touchStart.current) return;
              const moved = Math.hypot(
                event.clientX - touchStart.current.x,
                event.clientY - touchStart.current.y,
              );
              touchStart.current = null;
              if (moved < 10) toggleCard(index);
            }}
            onPointerCancel={() => {
              touchStart.current = null;
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleCard(index);
              }
            }}
          >
            <img
              className="theseus-illusions__image"
              src={piece.image}
              alt={`Artwork for ${piece.title || `illusion ${index + 1}`}`}
              loading="lazy"
              decoding="async"
            />
            <div
              className="theseus-illusions__overlay"
              id={`theseus-illusion-copy-${index + 1}`}
            >
              <div className="theseus-illusions__copy">
                {piece.title && <h3>{piece.title}</h3>}
                {piece.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={`${index}-${paragraphIndex}`}>{paragraph}</p>
                ))}
                {piece.author && (
                  <p className="theseus-illusions__author">{piece.author}</p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ShipTheseusIllusions;
