import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { FaGlobe, FaInstagram, FaLinkedin, FaTimes } from "react-icons/fa";
import "./ShipTheseusSpeakers.css";
import speaker01 from "../assets/shipOfThesus/speakers/speaker-01.webp";
import speaker02 from "../assets/shipOfThesus/speakers/speaker-02.webp";
import speaker03 from "../assets/shipOfThesus/speakers/speaker-03.webp";
import speaker04 from "../assets/shipOfThesus/speakers/speaker-04.webp";
import speaker05 from "../assets/shipOfThesus/speakers/speaker-05.webp";
import speaker06 from "../assets/shipOfThesus/speakers/speaker-06.webp";
import speaker07 from "../assets/shipOfThesus/speakers/speaker-07.webp";
import speaker08 from "../assets/shipOfThesus/speakers/speaker-08.webp";

const speakers = [
  {
    name: "Sukrut Deo",
    title: "Theatre & Comedy",
    image: speaker01,
    trimSideBars: true,
    biography:
      "Sukrut Deo is a Marathi theatre artist and performer known for his engaging stage presence and versatility. With experience in theatre and television, he brings together performance, humour, and storytelling, connecting with audiences through his expressive and relatable style.",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/sukkhi_ala_re?dlrf=azc2cjh6ZHNjajI5",
        icon: FaInstagram,
      },
    ],
  },
  {
    name: "Shama Bhate",
    title: "Kathak Exponent",
    image: speaker02,
    trimSideBars: true,
    biography:
      "Guru Shama Bhate is a renowned Kathak exponent, choreographer, educator, and artistic director of Nadroop, a dance institute based in Pune. With decades of experience, she has developed a distinctive approach to Kathak that combines technical precision with expressive storytelling, while mentoring generations of dancers and contributing to the evolution of Indian classical dance.",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/bhateshama?xtok=MXZjMXY1Y2ZjMWd3",
        icon: FaInstagram,
      },
      {
        label: "Website",
        href: "https://nadroop.org/guru-shama-bhate/",
        icon: FaGlobe,
      },
    ],
  },
  {
    name: "Sanskruti Balgude",
    title: "Arts & Culture",
    image: speaker03,
    biography:
      "Sanskruti Balgude is an Indian actress known for her work in Marathi cinema and television. Recognised for her expressive performances and versatility, she has built a presence in regional entertainment through a range of roles that showcase her passion for acting and the performing arts.",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/sanskruti_balgude_official?mdxt=eW9qcm0wdThqbWZt",
        icon: FaInstagram,
      },
    ],
  },
  {
    name: "Shruti Kotwal",
    title: "Sports",
    image: speaker04,
    trimSideBars: true,
    biography:
      "Shruti Kotwal is an Indian ice speed skater who has represented India in international competitions. A trailblazer in Indian women's ice speed skating, she has earned recognition for her competitive achievements, including medals at national and international events, inspiring others through her dedication, resilience, and commitment to sport.",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/indianspeedskater?mdxt=MXJ1MTk0bjM5MWQ4cg==",
        icon: FaInstagram,
      },
    ],
  },
  {
    name: "Lieutenant Commander Nikhil Kumar Chandrakala",
    title: "Armed Forces",
    image: speaker05,
    trimSideBars: true,
    biography:
      "Lieutenant Commander Nikhil Kumar Chandrakala (Retd.) is a former Indian Navy officer and a trained Group Testing Officer with experience in assessing candidates for the Services Selection Board. He helps aspiring defence officers develop leadership, confidence, and officer-like qualities.",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/ltcdr_nikhil_the_gto?rpxt=OW5mM3M5aWx6ajJi",
        icon: FaInstagram,
      },
    ],
  },
  {
    name: "Parimal Phadke",
    title: "Bharatanatyam Virtuoso",
    image: speaker06,
    trimSideBars: true,
    biography:
      "Parimal Phadke is an accomplished Bharatanatyam dancer, choreographer, and educator based in Pune. Recognised by the Indian Council for Cultural Relations (ICCR), he has contributed to Indian classical dance through performances, choreography, teaching, and cultural initiatives, combining a deep understanding of tradition with artistic expression.",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/parimal_phadke?dlrf=MXV5bWZjcjIyaXowaQ==",
        icon: FaInstagram,
      },
      {
        label: "Website",
        href: "https://www.parimalphadke.com",
        icon: FaGlobe,
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/parimalphadke",
        icon: FaLinkedin,
      },
    ],
  },
  {
    name: "Ravinder Singal",
    title: "Civil Services",
    image: speaker07,
    trimSideBars: true,
    biography:
      "Ravinder Singal is a senior Indian Police Service (IPS) officer known for his work in law enforcement, public safety, and policing administration. Through his career in the police service, he has contributed to maintaining law and order and addressing public-safety challenges, reflecting the importance of leadership, integrity, and responsibility in civil services.",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/ravindersingal?xtok=MTQ5bTI4Y3BzNXRhNg==",
        icon: FaInstagram,
      },
    ],
  },
  {
    name: "Dr. Satilal Patil",
    title: "Science & Entrepreneurship",
    image: speaker08,
    biography:
      "Dr. Satilal Patil is a scientist, entrepreneur, author, and researcher specialising in biocontrol and sustainable agricultural solutions. His work includes developing biopesticides, biofertilisers, and plant-growth products, alongside contributions to research, training, and entrepreneurship. He advocates innovation and practical scientific solutions that support agriculture and wider social development.",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/drsatilalpatil?obrf=Zzd0aHNnaXg3bTV6",
        icon: FaInstagram,
      },
      {
        label: "Website",
        href: "https://drsatilalpatil.com/",
        icon: FaGlobe,
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/drsatilalpatil",
        icon: FaLinkedin,
      },
    ],
  },
];

const ShipTheseusSpeakers = () => {
  const [activeSpeaker, setActiveSpeaker] = useState(null);
  const triggerRefs = useRef([]);
  const closeButtonRef = useRef(null);

  const closeProfile = useCallback(() => {
    setActiveSpeaker(null);
  }, []);

  const openProfile = (index) => {
    setActiveSpeaker(index);
  };

  useEffect(() => {
    if (activeSpeaker === null) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimeout = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeProfile();
        triggerRefs.current[activeSpeaker]?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(focusTimeout);
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeSpeaker, closeProfile]);

  const active = activeSpeaker === null ? null : speakers[activeSpeaker];

  return (
    <section
      className="theseus-speakers"
      aria-labelledby="theseus-speakers-title"
    >
      <header className="theseus-speakers__header">
        <h2 className="theseus-speakers__title" id="theseus-speakers-title">
          <span>MEET THE</span>
          <span>SPEAKERS</span>
        </h2>
      </header>
      <div className="theseus-speakers__grid">
        {speakers.map((speaker, index) => (
          <article className="theseus-speakers__card" key={speaker.name}>
            <div
              className="theseus-speakers__card-poster"
              onClick={() => openProfile(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openProfile(index);
                }
              }}
              aria-label={`View profile for ${speaker.name}`}
            >
              <span className="theseus-speakers__category">
                {speaker.title}
              </span>
              {speaker.trimSideBars ? (
                <span className="theseus-speakers__image-frame theseus-speakers__image-frame--trimmed">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              ) : (
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
            <button
              ref={(node) => {
                triggerRefs.current[index] = node;
              }}
              className="theseus-speakers__view-profile"
              type="button"
              aria-haspopup="dialog"
              aria-expanded={activeSpeaker === index}
              aria-label={`View profile for ${speaker.name}`}
              onClick={() => openProfile(index)}
            >
              VIEW PROFILE ↗
            </button>
          </article>
        ))}
      </div>

      {active &&
        createPortal(
          <div
            className="theseus-speakers__modal-overlay"
            onClick={() => {
              closeProfile();
              triggerRefs.current[activeSpeaker]?.focus();
            }}
            role="presentation"
          >
            <section
              className="theseus-speakers__modal-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="theseus-speaker-name"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                type="button"
                className="theseus-speakers__modal-close"
                aria-label={`Close ${active.name} profile`}
                onClick={() => {
                  closeProfile();
                  triggerRefs.current[activeSpeaker]?.focus();
                }}
              >
                <FaTimes aria-hidden="true" focusable="false" />
              </button>

              <div className="theseus-speakers__modal-image-pane">
                <div
                  className={`theseus-speakers__modal-image-frame${
                    active.trimSideBars
                      ? " theseus-speakers__modal-image-frame--trimmed"
                      : ""
                  }`}
                >
                  <img
                    src={active.image}
                    alt={active.name}
                    className="theseus-speakers__modal-image"
                    decoding="async"
                  />
                </div>
              </div>

              <div className="theseus-speakers__modal-content">
                <div className="theseus-speakers__modal-tag">
                  {active.title}
                </div>
                <h3
                  className="theseus-speakers__modal-name"
                  id="theseus-speaker-name"
                >
                  {active.name}
                </h3>
                <div className="theseus-speakers__modal-divider" />
                <div className="theseus-speakers__modal-bio">
                  <p>{active.biography}</p>
                </div>
                {active.links && active.links.length > 0 && (
                  <div className="theseus-speakers__modal-links">
                    <span className="theseus-speakers__modal-links-label">
                      Connect
                    </span>
                    <div className="theseus-speakers__modal-links-group">
                      {active.links.map(({ label, href, icon: Icon }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="theseus-speakers__modal-link"
                          aria-label={`${active.name} — ${label}`}
                        >
                          <Icon aria-hidden="true" focusable="false" />
                          <span>{label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>,
          document.body,
        )}
    </section>
  );
};

export default ShipTheseusSpeakers;
