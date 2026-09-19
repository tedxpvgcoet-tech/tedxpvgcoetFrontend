import React, { useState } from "react";
import "./AvantGardeTalkSection.css";
import { FaYoutube } from "react-icons/fa";
import SpeakerBioModal from "../Common/SpeakerBioModal";

const speakers = [
  {
    name: "Taufiq Qureshi",
    desc: "Percussionist, Composer, Artiste",
    quote:
      "The first drum that we're all born with is the heart and when that rhythm stops, our life stops.",
    img: require("../../../assets/speakers/Taufiq-Qureshi.webp"),
    link: "https://m.youtube.com/watch?v=PjFmBXxTHjQ",
    bio: "Taufiq Qureshi, an ace percussionist of India, referred to as a game changer, is also an acclaimed composer. Taufiq is recognized for his path-breaking and trend-setting work, as a performing artiste and as composer/arranger in the field of world music. Taufiq has been ably successful at taking the nuances of traditional rhythms of India to an alternate form of world music and offering it to a larger audience, comprising all age groups and from different parts of the world. Taufiq has pioneered and developed a distinct technique of playing the African percussion instrument, Djembe, in the context of Indian rhythmic compositions. Taufiq's album Rhydhun, amongst others, is said to be a benchmark for world music in India way back in the year 2000. Taufiq has been featured as a performing artiste in the 2009 Grammy-award winning album, 'Global Drum Project'. Taufiq's albums have been released world over and he has performed at prestigious Music festivals all over the globe. He has been a recipient of the Gold Award for Best Music at the Cannes Ad Film Festival and at the London International Festival for some of his exemplary advertisement ventures.",
  },
  {
    name: "Ayesha Billimoria",
    desc: "Athlete, Champion, Social Worker",
    quote: "We need to move back from curriculum to curiosity.",
    img: require("../../../assets/speakers/Ayesha-Billimoria.webp"),
    link: "https://m.youtube.com/watch?v=iRCqU9QkNiE",
    bio: "Ayesha Billimoria is a woman of many talents and possesses an innumerable collection of titles: she was named 'fastest girl of India' in her teenage years, represented Maharashtra for 17 years as an athlete, holds a three-time national championship in the 200m sprint and has also partaken in rigorous training to prepare for the Olympics. Furthermore, she is the former captain of the Adidas Runners Mumbai crew and has represented Adidas in numerous national and international tournaments. However, Ayesha’s skills are not solely limited to sports; her drive, dedication, and impeccable work ethic has made her one of India’s most influential fitness public figures, model, trainer, respected mentor to many of her aspiring followers and even the author of the book 'Run! The Ultimate Mind-Body Fitness Guide'. In 2016, she also founded 'Project Fitgirl', an initiative to educate young children studying in government schools in areas such as Maharashtra, Uttar Pradesh, and Madhya Pradesh, on sports, movement, and life.",
  },
  {
    name: "Kuntal Joisher",
    desc: "Mountaineer, Humanitarian, Survivor",
    quote:
      "A way of finding out that you're happy doing what you do is to ask yourself, would you do it if someone were to never pay you or would you continue to do it even if you were to never get paid.",
    img: require("../../../assets/speakers/kuntal-joisher.webp"),
    link: "https://m.youtube.com/watch?v=NcyKkzeZoLs",
    bio: "For Kuntal Joisher, his whole life played out before him when he, along with other mountaineers, was trapped at Camp 2 of Mt. Everest during the devastating avalanche that swept through the encampment triggered by a massive Earthquake in April, 2015. The near death experience triggered in him a storm of emotions which would change his entire life. He is the first Indian Vegan mountaineer, hailing from Mumbai, India. Kuntal, a passionate climber, is as adventurous, dauntless and a risk-taker as they come but there’s more to him than meets the eye. His expeditions to some of the world’s most dangerous mountains are fiercely driven by a profound personal mission as a Vegan champion, Dementia awareness advocate, and a Humanitarian inspiration.",
  },
  {
    name: "Priyanka Kasture",
    desc: "Entrepreneur, Influencer, Founder",
    quote:
      "Infinity is indeterminate. There is no deterministic path which will lead you somewhere, It's all going to be random and chaotic.",
    img: require("../../../assets/misc/priyanka-kasture.webp"),
    link: "https://m.youtube.com/watch?si=Y2_FQ2WdvarmtKXY&v=xv8aACt_OGo&feature=youtu.be",
    bio: "Embarking in 2018, Priyanka has created and leveraged powerful content marketing strategies to build a cumulative follower-base of 500,000 people on leading social media platforms, and built a thriving multi-figure business by monetising her influence. Priyanka is currently fostering Machine Learning India (MLI), India's largest social-media driven machine learning and artificial intelligence community with over 500,000 members. Priyanka’s areas of interest include AI, blockchain, cryptocurrency, marketing, and entrepreneurship.",
  },
  {
    name: "Shreenand Bapat",
    desc: "Historian, Researcher, Archaeologist",
    quote: "It is important to experience the unimaginable, and inaccessible.",
    img: require("../../../assets/speakers/Shreenand-Bapat.webp"),
    link: "https://m.youtube.com/watch?v=5syhwQTgPbY",
    bio: "Dr. Shreenand Bapat is a scholar with a PhD in Sanskrit and an MA in AIHC & Archaeology. He is a curator at the Bhandarkar Oriental Research Institute, Managing Editor at Annals of the BORI, and guest lecturer at Tilak Maharashtra Vidyapeeth and Chanakya Mandal Pariwar. Additionally, Dr. Bapat has authored 48 research papers and published eight publications. He has made 16 copper plate and two stone inscription deciphers and discoveries. Having over 45 programmes on All-India Radio on Sanskrit and Ancient Indian History and Culture, Dr. Bapat is truly an erudite in his field.",
  },
];

const AvantGardeTalksSection = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  return (
    <section className="talks-section2">
      <h2>Talks</h2>
      <div className="talks-grid2">
        {speakers.map((speaker, index) => (
          <div className="speaker-card2" key={index}>
            <img src={speaker.img} alt={speaker.name} loading="lazy" />
            <div className="speaker-info2">
              <div className="speaker-text2">
                <h3>{speaker.name}</h3>
                <p>{speaker.desc}</p>
              </div>
              <div className="speaker-action-buttons">
                <a
                  href={speaker.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="watch-btn2"
                >
                  Watch <FaYoutube className="yt-icon2" />
                </a>
                <button
                  type="button"
                  className="learn-more-btn2"
                  onClick={() => setSelectedSpeaker(speaker)}
                >
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SpeakerBioModal
        speaker={selectedSpeaker}
        onClose={() => setSelectedSpeaker(null)}
      />
    </section>
  );
};

export default AvantGardeTalksSection;
