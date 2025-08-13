import React, { useState } from "react";
import "./PerspectiveSection.css";

import img1 from "../assets/IMG1.jpeg";
import img2 from "../assets/IMG2.jpeg";
import img3 from "../assets/IMG3.jpeg";
import img4 from "../assets/IMG4.jpeg";
import img5 from "../assets/IMG5.jpeg";
import img6 from "../assets/IMG6.jpeg";
import img7 from "../assets/IMG7.jpeg";
import img8 from "../assets/IMG8.jpeg";
import img9 from "../assets/IMG9.jpeg";
import FooterSection from "./FooterSection";



export default function PerspectiveSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const images = [
    { 
    src: img1, 
    desc: (
      <>
        They walk the loop like a secret whispered between time and space, steps echoing in a rhythm only they can hear.
        The black and white ripples pull the gaze inward until you are no longer watching but falling.
        The red around them hums like a heartbeat, daring you to look closer, daring you to question what is real.<br/>
        Maybe the path is endless, maybe it is the same point disguised as forever.
        In this dance of sight and illusion, the eyes do not just see, they dream, they wander, they create worlds that only vision can hold.
        Every turn feels both familiar and strange, like remembering something you have never lived.
        The air is thick with the weight of unasked questions, each one stretching the loop wider.
        Shadows bend here, not to hide, but to guide the gaze toward what cannot be spoken.<br/>
        The more you follow the pattern, the less you are certain of where you began.<br/>
        It is not a path for reaching somewhere, but for learning how to see without needing to arrive.<br/>
        And perhaps that is the point, that the journey exists not to end, but to change the one who walks it.<br/>
        _ SNEHA GHODKE

      </>
    )
  },
  {
    src: img2, 
    desc: (
      <>
        It feels like a quiet meditation on the nature of perception and awareness. At first, the eye pulls me in with its raw intensity, inviting curiosity and a sense of vulnerability—almost as if it’s searching for answers or deeper meaning. Then, the focus shifts to the flower’s delicate center, which seems to whisper about the beauty we discover when we truly pay attention to the world’s small details. Finally, the tangled branches silhouetted against the sky evoke a sense of interconnected thoughts and possibilities, reminding me how our vision expands and weaves together experiences, emotions, and ideas. Altogether, it’s a layered journey from simply seeing to genuinely understanding and connecting<br/>
        ~Renuka Joshi

      </>
    )
  },
    {
    src: img3, 
    desc: (
      <>
        Maybe this isn’t a library at all. Maybe it’s a dam, built not to hold water, but time.
        Every book is a brick, each story a layer sealing the flood. The bindings are mortar, words are the weight. And inside its walls, the river pauses - history, memory and imagination suspended in perfect stillness - waiting for someone brave enough to touch, maybe move it. <br/>
        The green chair at the base isn’t there for comfort alone. It’s the keeper’s post. Every page is a lever, each chapter a gate. Turn the wrong one, and the dam could break- sending centuries of wisdom, ideas, truths and half-forgotten dreams rushing into the world at once. <br/>
        It’s a quiet throne in the middle of eternity, and the person who sits here doesn’t just read words, they rewrite worlds. <br/>
        So, will you hold the flood or let it loose?<br/>

          -Gargee 

      </>
    )
  },
    {
    src: img4, 
    desc: (
      <>
        The black sheep of the family. <br/>
        We’ve all heard it. We’ve all said it. But like any other person with too much time on his hands and an open access to the internet…I decided to dig. <br/>
        19th century England, the country that contributed to a large number of “independence days” globally, had just found the beauty of dyeing wool. Wool, that was usually white, could retain a stupendously large amount of color. <br/>
        However, wool, that was also black due to some recessive gene in sheep… was a pain in the neck. Low profits - because black was associated with death in England – led to low demand which led to an overall irritation directed towards beings that had no say about their color. <br/>
        And yet, through all of this, the black sheep persisted. Through mockery and hate, she persisted. And maybe she persisted, just to tell us that it’s alright to be the odd-ball every now and again. <br/>
        -Abhishek Rangole

      </>
    )
  },
    {
    src: img5, 
    desc: (
      <>
        They call themselves The Oculi.<br/>
        Ever-moving, panoptic, relentless. What would normally be classified as a creature of myth, an unearthly lifeform roaming the spaces between the Open and the Closed, now reigns the halls of my tiny, dilapidated motel.<br/>
        || Light helps you see; darkness lets you delve. ||<br/>
        Haunting is their favourite pastime. <br/>
        I realise I work better under their watch – audience to performer, ghost to believer. A certain desire enlivens in me, as if God himself has checked into my motel, in his most crude form. As if I am being cradled in faith, as if the sky is not full of vanity.<br/>
        Nobody sees me, but they are always looking.<br/>
        || To see is to discern visually, but watching demands a conscious perception. ||

      </>
    )
  },
    { 
    src: img6, 
    desc: (
      <>
        Look again, closely.<br/>
        From far away, it looks like ships sailing towards the horizon — slow, steady, uniformly. But when you look closer, the scene changes. It’s a long bridge stretching across the water, with arches that open to the sea. Above it, soft clouds float quietly, almost blending into the sky.<br/>

        Nothing in the picture has changed. The only thing that changed was how you looked at it.<br/>
        Life works the same way. What you see depends on where you stand and what experiences you had. From one view, it’s a group of ships. From another, it’s a bridge standing firm over the water.<br/>
        The picture is the same — but the story is different. That’s what perspective can do, turn one moment into something completely different.<br/>
        So, what do you see? A way across the sea, or the start of a journey?<br/>
        -raviraj bhoge

      </>
    )
  },

  { 
    src: img7, 
    desc: (
      <>
        A person isn’t just one self. What you see on the outside is only the surface. <br/>
        But peel back the skin, and there’s another. And another. And another still. <br/>
        Each layer is a mood, a season, a choice that could have been. These versions do not always align. They do not look at each other. They look out. <br/>
        At different horizons.<br/>
        At different dangers<br/>
        At different dreams.<br/>

        Perhaps that’s what it means to be plural- not pretending to be someone but recognizing that you are many selves at once. All coexisting, all influencing each other, all stacked inside the skull, turning your head into a nesting doll of lives you are living all at once.<br/>

        And maybe, real work is not in choosing one, but in learning how they fit together.<br/>
        -Gargee


      </>
    )
  },

  { 
    src: img8, 
    desc: (
      <>
        He plays as if the world is listening for the very last time, as if the weight of everything he has ever felt rests on the tips of his fingers.<br/>
        Each note is not just sound but a fragment of his soul torn away, aching to be understood. The flames are not destruction but the truest shape of love when it is so deep it swallows you whole. Every chord is a memory, every pause a wound that time refuses to close. He knows the keys will crumble, that the song will vanish into silence, yet he plays because stopping would mean losing himself. The fire is his grief, his hope, his surrender, his only prayer. Some beauty survives only by burning, and some truths can only be freed when they finally let go. And in that heat he feels both destroyed and reborn, as if the pain is teaching him how to exist again. The music rises above the crackle of flames, carrying pieces of him to places he will never see. He does not fear the end anymore because the song has already outlived him in spirit. In the burning, he finds a strange kind of peace.<br/>
        _ SNEHA GHODKE


      </>
    )
  },

  { 
    src: img9, 
    desc: (
      <>
        " THE EYE IN THE SKY"<br/>
      NO ONE SAW.<br/>
      OR<br/>
      THE ONE YOU KNOW… SAW.<br/>

      A slit in the sky.<br/>
      A hand, parting the clouds — not to touch the world, but to look at it.<br/>

      We live like that eye.<br/>
      Peeking. Searching.<br/>
      Hoping someone sees us when we are at our best.<br/>
      When kindness drips from our hands, we want it to be caught — bottled — remembered.<br/>

      And if the world turns away, we console ourselves: “The divine saw.”<br/>
      Or barter with fate: “My karma will keep the score.”<br/>

      But somewhere, quietly, we become both performer and spectator.<br/>
      Applauding ourselves in secret.<br/>
      Scolding ourselves in silence.<br/>
      Always aware of the gaze we cannot escape.<br/>

      The clouds shift, the curtain falls — but the watcher remains.<br/>
      It is not the world.<br/>
      Not the divine.<br/>
      It is the unblinking eye within.<br/>


      </>
    )
  },
  ];

  const handleClick = (index) => {
    if (window.innerWidth <= 600) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  return (
  <div className="perspective-section2">
  <section className="perspective-section">
    <h2 className="perspective-title">Perspective</h2>
    <section className="perspective-section">
      <div className="perspective-grid">
        {images.map((img, index) => (
          <div
            key={index}
            className={`perspective-item item-${index + 1} ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => handleClick(index)}
          >
            <img src={img.src} alt={`Perspective ${index + 1}`} />
            <div className="overlay">
              <p>{img.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

  </section>
  <FooterSection/>
</div>
  );
}
