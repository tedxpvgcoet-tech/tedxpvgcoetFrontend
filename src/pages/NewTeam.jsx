import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  FaLinkedin,
  FaInstagram,
  FaBriefcase,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import FooterSection from "../sections/Common/FooterSection";
import "./NewTeam.css";

// Backgrounds
import bgDesktop from "../assets/team-2026/bg-desktop.png";
import bgMobile from "../assets/team-2026/bg-mobile.png";

// Team Images
import orgImg from "../assets/team-2026/organisers.png";
import dnpImg from "../assets/team-2026/dnp.png";
import lnoImg from "../assets/team-2026/lno.png";
import ediImg from "../assets/team-2026/editorial.png";
import fnsImg from "../assets/team-2026/fns.png";
import mnmImg from "../assets/team-2026/mnm.png";
import curImg from "../assets/team-2026/curation.png";
import techImg from "../assets/team-2026/technical.png";

// Default User Profile Avatar
import defaultUserAvatar from "../assets/default-user.svg";

// Members - Organizers
import omkarImg from "../assets/team-2026/Omkar_Hokarane.webp";
import lakshmikantImg from "../assets/team-2026/Lakshmikant_Chaudhari.webp";
import afaanImg from "../assets/team-2026/Afaan_Shaikh.webp";

// Members - Design & Production
import avantiImg from "../assets/team-2026/Avanti_Satpute.webp";
import deveshImg from "../assets/team-2026/Devesh_Bhavsar.webp";
import sutirthImg from "../assets/team-2026/Sutirth_Doshi.webp";
import priyaImg from "../assets/team-2026/Priya_Rangapure.webp";
import hridayaImg from "../assets/team-2026/Hridaya_Khare.webp";
import prachiImg from "../assets/team-2026/Prachi_Sonawane.webp";
import abhijeetImg from "../assets/team-2026/Abhijeet_Chopade.webp";
import parthImg from "../assets/team-2026/Parth_Devi.webp";

// Members - Logistics & Operations
import sukrutImg from "../assets/team-2026/Sukrut_Angal.webp";
import atharvaImg from "../assets/team-2026/Atharva_Gore.webp";
import shreeyaImg from "../assets/team-2026/Shreeya_Nene.webp";
import ayushImg from "../assets/team-2026/Ayush_Janunkar.webp";
import varadImg from "../assets/team-2026/Varad_Mogle.webp";
import prajwalImg from "../assets/team-2026/Prajwal_Adasul.webp";
import samihaImg from "../assets/team-2026/Samiha_Aserkar.webp";
import rushikeshImg from "../assets/team-2026/Rushikesh_Kandalkar.webp";
import maitreyeeImg from "../assets/team-2026/Maitreyee_Prayag.webp";

// Members - Editorial
import hiyaImg from "../assets/team-2026/Hiya_Pantvaidya.webp";
import maitreyeeBhaveImg from "../assets/team-2026/Maitreyee_Bhave.webp";
import renukaImg from "../assets/team-2026/Renuka_Joshi.webp";
import yashashriImg from "../assets/team-2026/Yashashri_Rajput.webp";
import lavanyaImg from "../assets/team-2026/Lavanya_Kurapati.webp";
import swaraImg from "../assets/team-2026/Swara_Kulkarni.webp";
import siddhiMunotImg from "../assets/team-2026/Siddhi_Munot.webp";

// Members - Finance & Sponsorship
import ritikaImg from "../assets/team-2026/Ritika_Paradkar.webp";
import durgaImg from "../assets/team-2026/Durga_Gunjal.webp";
import siddhiPatilImg from "../assets/team-2026/Siddhi_Patil.webp";
import mayureshImg from "../assets/team-2026/Mayuresh_Shevlikar.webp";
import varadAthalyeImg from "../assets/team-2026/Varad_Athalye.webp";
import avadhootImg from "../assets/team-2026/Avadhoot_Amrale.webp";
import prathamImg from "../assets/team-2026/Pratham_Verma.webp";
import swarajImg from "../assets/team-2026/Swaraj_Awad.webp";

// Members - Media & Marketing
import atharvaJoshiImg from "../assets/team-2026/Atharva_Joshi.webp";
import aariyaImg from "../assets/team-2026/Aariya_Vora.webp";
import neerajImg from "../assets/team-2026/Neeraj_Chaini.webp";
import gauravImg from "../assets/team-2026/Gaurav_Gore.webp";
import siddhantImg from "../assets/team-2026/Siddhant_Pawar.webp";
import sumedhImg from "../assets/team-2026/Sumedh_Kuchanwar.webp";
import krutikaImg from "../assets/team-2026/Krutika_Devare.webp";

// Members - Curation
import narayaniImg from "../assets/team-2026/Narayani_Jalgaonkar.webp";
import rugvedaImg from "../assets/team-2026/Rugveda_Dhole.webp";
import fanaaImg from "../assets/team-2026/Fanaa_Jain.webp";
import nachiketImg from "../assets/team-2026/Nachiket_Bedekar.webp";
import shrinandImg from "../assets/team-2026/Shrinand_Joshi.webp";
import hardikImg from "../assets/team-2026/Hardik_Mhetre.webp";
import vedImg from "../assets/team-2026/Ved_Purohit.webp";
import samikshaImg from "../assets/team-2026/Samiksha_Jadhav.webp";

// Members - Technical
import jagdishImg from "../assets/team-2026/Jagdish_Prajapati.webp";
import adityaImg from "../assets/team-2026/Aditya_Kulkarni.webp";
import saanidhiImg from "../assets/team-2026/Saanidhi_Gade.webp";
import vedantImg from "../assets/team-2026/Vedant_Yeole.webp";
import sohamImg from "../assets/team-2026/Soham_Katkar.webp";

// 2026 Committee Teams Data (Organizers + Placeholder rosters for all departments)
const committeeTeamsData = {
  organisers: {
    title: "Team Organizers",
    kicker: "EXECUTIVE LEADERSHIP",
    members: [
      {
        name: "Omkar Hokarne",
        role: "Licensee, Organizer",
        quote:
          "Leadership is not about being in the spotlight; it is about building the stage where transformative ideas can shine.",
        image: omkarImg,
        social: {
          linkedin: "https://www.linkedin.com/in/omkar-hokarne-0a15aa224/",
          instagram: "https://www.instagram.com/_omkar_hokarne",
        },
      },
      {
        name: "Lakshmikant Chaudhari",
        role: "Co Organizer",
        quote:
          "True harmony in a team is achieved when distinct perspectives converge toward a shared, audacious purpose.",
        image: lakshmikantImg,
        social: {
          linkedin:
            "https://www.linkedin.com/in/lakshmikant-chaudhari-506453285/",
          instagram: "https://www.instagram.com/laksh.me.kant_c",
        },
      },
      {
        name: "Afaan Shaikh",
        role: "Treasurer",
        quote:
          "Behind every grand vision lies the discipline to sustain it, balancing bold ambition with mindful precision.",
        image: afaanImg,
        social: {
          linkedin: "https://www.linkedin.com/in/afaanshaikh/",
          instagram: "https://www.instagram.com/instashebang",
        },
      },
    ],
  },
  dnp: {
    title: "Design & Production",
    kicker: "CREATIVE & PRODUCTION",
    members: [
      {
        name: "Avanti Satpute",
        role: "Lead",
        quote:
          "Design is the silent ambassador of our ideas, translating abstract imagination into tangible wonder.",
        image: avantiImg,
        social: {
          linkedin: "https://www.linkedin.com/in/avanti-satpute-b35494317/",
          instagram: "https://www.instagram.com/ss_avantii",
        },
      },
      {
        name: "Devesh Bhavsar",
        role: "Lead",
        quote:
          "Crafting an atmosphere is about invoking emotion before a single speaker even utters a word.",
        image: deveshImg,
        social: {
          linkedin: "https://www.linkedin.com/in/devesh-bhavsar-77a370329",
          instagram: "https://www.instagram.com/kaundevesh",
        },
      },
      {
        name: "Sutirth Doshi",
        role: "Prod. Incharge",
        quote:
          "Precision in the shadows is what allows brilliance to unfold effortlessly under the stage lights.",
        image: sutirthImg,
        social: {
          linkedin: "https://www.linkedin.com/in/sutirthdoshi",
          instagram: "https://www.instagram.com/sutirthdoshi",
        },
      },
      {
        name: "Priya Rangapure",
        role: "Member",
        quote:
          "Every color palette and curve holds a narrative waiting to resonate with the observant mind.",
        image: priyaImg,
        social: {
          linkedin: "https://www.linkedin.com/in/priya-rangapure/",
          instagram: "https://instagram.com/priafilms",
        },
      },
      {
        name: "Hridaya Khare",
        role: "Member",
        quote:
          "Creativity is intelligence having fun while giving form to the unspoken thoughts of our generation.",
        image: hridayaImg,
        social: {
          linkedin: "https://www.linkedin.com/in/hridaya-khare-93aa38377",
          instagram: "https://instagram.com/hridaya_khare",
        },
      },
      {
        name: "Prachi Sonawane",
        role: "Member",
        quote:
          "When design meets passion, simple spaces transform into unforgettable emotional experiences.",
        image: prachiImg,
        social: {
          linkedin: "https://www.linkedin.com/in/prachi-sonawane-025703296",
          instagram: "https://www.instagram.com/prachi_.09._",
        },
      },
      {
        name: "Abhishek Chopade",
        role: "Member",
        quote:
          "It is the quiet, meticulous craftsmanship behind the scenes that turns bold blueprints into reality.",
        image: abhijeetImg,
        social: {
          instagram:
            "https://www.instagram.com/aabhiibee?dlrf=aW96d29ycnk3OG1n",
        },
      },
      {
        name: "Parth Devi",
        role: "Member",
        quote:
          "Art is not what you see, but what you invite others to discover within themselves.",
        image: parthImg,
        social: {
          linkedin: "https://www.linkedin.com/in/parth-devi-9038322a1",
          instagram: "https://instagram.com/parth_devi",
        },
      },
    ],
  },
  lno: {
    title: "Logistics & Operations",
    kicker: "OPERATIONS & EXECUTION",
    members: [
      {
        name: "Sukrut Angal",
        role: "Lead",
        quote:
          "Flawless execution is when complex coordination feels completely invisible to the audience.",
        image: sukrutImg,
        social: {
          linkedin: "https://www.linkedin.com/in/sukrut-angal-a40b10290",
          instagram: "https://www.instagram.com/sukrut__07",
        },
      },
      {
        name: "Atharva Gore",
        role: "Lead",
        quote:
          "Mastery of logistics lies in anticipating the unpredictable and remaining calm at the center of momentum.",
        image: atharvaImg,
        social: {
          linkedin: "https://www.linkedin.com/in/atharvagore22",
          instagram: "https://www.instagram.com/gore.atharv_",
        },
      },
      {
        name: "Shreeya Nene",
        role: "Member",
        quote:
          "The strength of an engine lies in every single gear turning with purpose and synchrony.",
        image: shreeyaImg,
        social: {
          instagram: "https://instagram.com/Shreeya_nene",
        },
      },
      {
        name: "Ayush Janunkar",
        role: "Member",
        quote:
          "Action speaks louder when supported by quick instincts and unwavering composure.",
        image: ayushImg,
        social: {
          linkedin: "https://in.linkedin.com/in/ayush-janunkar-a8bab4385",
          instagram: "https://instagram.com/ayushj_4058",
        },
      },
      {
        name: "Varad Mogle",
        role: "Member",
        quote:
          "Patience, persistence, and proactive problem-solving turn potential hurdles into stepping stones.",
        image: varadImg,
        social: {
          instagram: "https://instagram.com/varadm.21",
        },
      },
      {
        name: "Prajwal Adasul",
        role: "Member",
        quote:
          "Excellence is not an act of chance; it is a habit born of rigorous dedication behind the curtain.",
        image: prajwalImg,
        social: {
          instagram: "https://www.instagram.com/praj_wal___04",
        },
      },
      {
        name: "Samiha Aserkar",
        role: "Member",
        quote:
          "Hospitality and seamless logistics create the sanctuary where inspiration can truly take root.",
        image: samihaImg,
        social: {
          instagram: "https://instagram.com/samihaaserkar",
        },
      },
      {
        name: "Rushikesh Kandalkar",
        role: "Member",
        quote:
          "Timing is everything; when every moving part aligns, the magic of the moment becomes inevitable.",
        image: rushikeshImg,
        social: {
          linkedin: "https://www.linkedin.com/in/rushikesh-kandalkar-030589256",
          instagram: "https://www.instagram.com/ft.rushikeshh",
        },
      },
      {
        name: "Maitreyee Prayag",
        role: "Member",
        quote:
          "Great achievements are built on small, relentless commitments honored every single day.",
        image: maitreyeeImg,
        social: {
          linkedin: "https://www.linkedin.com/in/maitreyee-prayag-97239538b",
          instagram: "https://www.instagram.com/maitreyee_prayag",
        },
      },
    ],
  },
  editorial: {
    title: "Editorial",
    kicker: "CONTENT & STORYTELLING",
    members: [
      {
        name: "Hiya Pantvaidya",
        role: "Lead",
        quote:
          "Words possess the quiet power to unearth truths, bridge chasms, and ignite timeless curiosity.",
        image: hiyaImg,
        social: {
          linkedin: "https://www.linkedin.com/in/hiya-pantvaidya-8a7058332",
          instagram: "https://www.instagram.com/hiyaaa_007",
          portfolio: "relentlesslycravingsummer.tumblr.com",
        },
      },
      {
        name: "Maitreyee Bhave",
        role: "Lead",
        quote:
          "To tell a story is to hold up a mirror to the human spirit and remind us of who we can become.",
        image: maitreyeeBhaveImg,
        social: {
          linkedin: "https://www.linkedin.com/in/maitreyee-bhave-369a86249/",
          instagram: "https://www.instagram.com/mxitreyee._",
          portfolio: "https://aquapigmentus.substack.com/",
        },
      },
      {
        name: "Renuka Joshi",
        role: "Member",
        quote:
          "A well-chosen phrase can linger in the mind long after the applause has faded into silence.",
        image: renukaImg,
        social: {
          linkedin: "https://www.linkedin.com/in/renuka-joshi-430541290/",
          instagram: "https://www.instagram.com/renuka___.__",
        },
      },
      {
        name: "Yashashri Rajput",
        role: "Member",
        quote:
          "Curiosity is the compass that guides our pens to stories waiting in the quiet margins.",
        image: yashashriImg,
        social: {
          linkedin: "https://www.linkedin.com/in/yashashri-rajput-240519382",
          instagram: "https://instagram.com/whalien.52yr",
        },
      },
      {
        name: "Lavanya Kurapati",
        role: "Member",
        quote:
          "Clarity of thought breeds clarity of expression, making the complex beautifully accessible.",
        image: lavanyaImg,
        social: {
          linkedin: "https://www.linkedin.com/in/lavanya-kurapati-a2550b295",
          instagram: "https://www.instagram.com/lavanya.0502",
        },
      },
      {
        name: "Swara Kulkarni",
        role: "Member",
        quote:
          "Every voice has a frequency; our craft is tuning them into an unforgettable symphony of ideas.",
        image: swaraImg,
        social: {
          linkedin: "https://in.linkedin.com/in/swara-kulkarni-052539383",
          instagram: "https://www.instagram.com/coolkarniswara",
        },
      },
      {
        name: "Siddhi Munot",
        role: "Member",
        quote:
          "The most profound thoughts often speak in whispers; we simply give them the resonance they deserve.",
        image: siddhiMunotImg,
        social: {
          instagram: "https://instagram.com/_.winterlilyy",
        },
      },
    ],
  },
  fns: {
    title: "Finance & Sponsorship",
    kicker: "FINANCE & PARTNERSHIPS",
    members: [
      {
        name: "Ritika Paradkar",
        role: "Lead",
        quote:
          "Strategic alliances are forged on mutual trust, shared values, and long-term vision.",
        image: ritikaImg,
        social: {
          linkedin: "https://www.linkedin.com/in/ritika-paradkar-6aa9b1322",
          instagram: "https://www.instagram.com/ritikaaa.1111",
        },
      },
      {
        name: "Durga Gunjal",
        role: "Member",
        quote:
          "Building genuine relationships is the cornerstone of sustainable growth and enduring value.",
        image: durgaImg,
        social: {
          instagram: "https://instagram.com/durga.gunjal",
        },
      },
      {
        name: "Siddhi Patil",
        role: "Member",
        quote:
          "Integrity in resource management is what empowers bold creative dreams to stand tall.",
        image: siddhiPatilImg,
        social: {
          linkedin: "https://www.linkedin.com/in/siddhi-patil-1a049b369",
          //   instagram: "https://instagram.com"
        },
      },
      {
        name: "Mayuresh Shevlikar",
        role: "Member",
        quote:
          "True value is created when shared purpose replaces transactional conversations.",
        image: mayureshImg,
        social: {
          linkedin: "https://www.linkedin.com/in/mayuresh-shevlikar-a8aa67297",
          instagram: "https://instagram.com/mayureshshevlikar",
        },
      },
      {
        name: "Varad Athalye",
        role: "Member",
        quote:
          "Every pitch is a bridge built between two worlds driven by a common desire to make an impact.",
        image: varadAthalyeImg,
        social: {
          linkedin: "https://www.linkedin.com/in/varad-athalye-30a692313/",
          instagram: "https://www.instagram.com/itsyourboishiro/",
        },
      },
      {
        name: "Avadhoot Amrale",
        role: "Member",
        quote:
          "Precision in figures provides the sturdy foundation upon which extraordinary experiences are built.",
        image: avadhootImg,
        social: {
          linkedin: "https://www.linkedin.com/in/avadhoot-amrale-029454316",
          instagram: "https://www.instagram.com/aloneonthe_run",
        },
      },
      {
        name: "Pratham Verma",
        role: "Member",
        quote:
          "Perseverance in outreach turns tentative doors into wide-open gateways of opportunity.",
        image: prathamImg,
        // social: {
        //   linkedin: "https://linkedin.com",
        //   instagram: "https://instagram.com"
        // }
      },
      {
        name: "Swaraj Awad",
        role: "Member",
        quote:
          "Accountability and foresight convert creative aspirations into achievable milestones.",
        image: swarajImg,
        // social: {
        //   linkedin: "https://linkedin.com",
        //   instagram: "https://instagram.com"
        // }
      },
    ],
  },
  mnm: {
    title: "Media & Marketing",
    kicker: "PR & DIGITAL OUTREACH",
    members: [
      {
        name: "Atharva Joshi",
        role: "Lead",
        quote:
          "A single lens can capture an emotion, but thoughtful storytelling makes it echo across generations.",
        image: atharvaJoshiImg,
        social: {
          linkedin: "https://www.linkedin.com/in/atharva-joshi-786200290/",
          instagram: "https://www.instagram.com/ajcliks",
          portfolio: "https://atharvaportfolio.carrd.co/",
        },
      },
      {
        name: "Aariya Vora",
        role: "Lead",
        quote:
          "Marketing isn’t about making noise; it’s about making a connection that stirs the soul.",
        image: aariyaImg,
        social: {
          linkedin:
            "https://www.linkedin.com/in/aariya-harshad-vora-6b8755312/",
          instagram: "https://instagram.com/aariya_vora",
        },
      },
      {
        name: "Neeraj Chaini",
        role: "Member",
        quote:
          "In a world of fleeting attention, authenticity is the only currency that never depreciates.",
        image: neerajImg,
        social: {
          linkedin: "https://www.linkedin.com/in/neeraj-chaini-012615390",
          instagram: "https://www.instagram.com/seeneerajc",
        },
      },
      {
        name: "Gaurav Gore",
        role: "Member",
        quote:
          "Freezing a raw, unscripted moment of revelation is where the art of photography truly lives.",
        image: gauravImg,
        social: {
          linkedin: "https://www.linkedin.com/in/gaurav-gore-037513383/",
          instagram: "https://instagram.com/gaurav.jpg_",
        },
      },
      {
        name: "Siddhant Pawar",
        role: "Member",
        quote:
          "Digital sparks become raging movements when fueled by shared ideals and genuine empathy.",
        image: siddhantImg,
        social: {
          linkedin: "https://www.linkedin.com/in/siddhant-pawar-a232a2398",
          instagram: "https://instagram.com/_siddhantttttt",
        },
      },
      {
        name: "Sumedh Kuchanwar",
        role: "Member",
        quote:
          "Engaging an audience starts with listening closely to what they yearn to believe in.",
        image: sumedhImg,
        social: {
          linkedin: "https://www.linkedin.com/in/sumedh-kuchanwar",
          instagram:
            "https://www.instagram.com/sumedh.ftw?srtk=ZDF4NDdoMmlkMHZp",
        },
      },
      {
        name: "Krutika Devare",
        role: "Member",
        quote:
          "Crafting a brand presence is about planting seeds of curiosity that blossom into loyal communities.",
        image: krutikaImg,
        social: {
          linkedin: "https://www.linkedin.com/in/krutika-devare-b58331371",
        },
      },
    ],
  },
  curation: {
    title: "Curation",
    kicker: "IDEAS & SPEAKER DESK",
    members: [
      {
        name: "Narayani Jalgaonkar",
        role: "Lead",
        quote:
          "The search for revolutionary ideas is a journey into the uncharted depths of human potential.",
        image: narayaniImg,
        social: {
          linkedin: "https://www.linkedin.com/in/narayani-j-b5081936a/",
          instagram: "https://www.instagram.com/narayani_02",
        },
      },
      {
        name: "Rugveda Dhole",
        role: "Lead",
        quote:
          "A great talk doesn’t just convey information; it shifts the paradigm of everyone in the room.",
        image: rugvedaImg,
        social: {
          linkedin: "https://www.linkedin.com/in/rugveda-dhole-7a7052324/",
          instagram: "https://www.instagram.com/rug_veda2020",
        },
      },
      {
        name: "Fanaa Jain",
        role: "Member",
        quote:
          "Unearthing raw, unconventional wisdom requires peeling back layers of the conventional.",
        image: fanaaImg,
        social: {
          linkedin: "https://www.linkedin.com/in/fanaa-jain-71a380374",
          instagram: "https://instagram.com/fanaajain",
        },
      },
      {
        name: "Samiksha Jadhav",
        role: "Member",
        quote:
          "When passion meets preparation, the speaker’s voice becomes a catalyst for collective awakening.",
        image: samikshaImg,
        social: {
          linkedin: "https://www.linkedin.com/in/samiksha-jadhav-1b2998339",
          instagram: "https://www.instagram.com/samikshaj._",
        },
      },
      {
        name: "Nachiket Bedekar",
        role: "Member",
        quote:
          "Every genuine idea worth spreading carries within it the seed of a future yet unimagined.",
        image: nachiketImg,
        social: {
          linkedin: "https://www.linkedin.com/in/nachiket-bedekar-63bb39349",
          instagram: "https://instagram.com/spade_162",
        },
      },
      {
        name: "Shrinand Joshi",
        role: "Member",
        quote:
          "Refining a speaker’s message is like polishing a gem until its inner radiance becomes unmistakable.",
        image: shrinandImg,
        social: {
          linkedin: "https://www.linkedin.com/in/shrinand-joshi-616229330",
          instagram: "https://www.instagram.com/shrinandj_12",
        },
      },
      {
        name: "Hardik Mhetre",
        role: "Member",
        quote:
          "Curiosity is the courage to ask questions that challenge comfortable consensus.",
        image: hardikImg,
        social: {
          instagram: "https://www.instagram.com/hrdkm",
        },
      },
      {
        name: "Ved Purohit",
        role: "Member",
        quote:
          "The most electrifying moments happen when intellect and human vulnerability intersect.",
        image: vedImg,
        social: {
          linkedin: "https://www.linkedin.com/in/ved-vivek-purohit-592802338/",
          instagram: "https://www.instagram.com/ved_vadak04",
        },
      },
    ],
  },
  technical: {
    title: "Technical",
    kicker: "TECHNOLOGY & SYSTEMS",
    members: [
      {
        name: "Jagdish Prajapati",
        role: "Lead",
        quote:
          "Behind every seamless digital experience is an obsession with craft, architecture, and code elegance.",
        image: jagdishImg,
        social: {
          linkedin: "https://www.linkedin.com/in/jagdish-15-prajapati/",
          instagram: "https://instagram.com/jagdish15p",
          portfolio: "https://exercism.org/profiles/jagdishdrp",
        },
      },
      {
        name: "Aditya Kulkarni",
        role: "Member",
        quote:
          "Technology reaches its zenith when complex engineering manifests as sheer simplicity to the user.",
        image: adityaImg,
        social: {
          linkedin: "https://www.linkedin.com/in/aditya-kulkarni-44b8162a7",
          instagram: "https://www.instagram.com/aditya_k5106",
        },
      },
      {
        name: "Saanidhi Gade",
        role: "Member",
        quote:
          "Code is our modern canvas; with logic and creativity, we breathe life into static pixels.",
        image: saanidhiImg,
        social: {
          linkedin: "https://www.linkedin.com/in/saanidhi-gade",
          instagram: "https://instagram.com/_.saanidhi._",
        },
      },
      {
        name: "Vedant Yeole",
        role: "Member",
        quote:
          "Building the digital frontier of TEDx is about turning every click into an inspiring discovery.",
        image: vedantImg,
        social: {
          linkedin: "https://www.linkedin.com/in/vedant-yeole-1442322a7",
          instagram: "https://www.instagram.com/v3dant.yeole",
        },
      },
      {
        name: "Soham Katkar",
        role: "Member",
        quote:
          "Robust systems are forged in the quiet details, ensuring ideas travel without disruption.",
        image: sohamImg,
        social: {
          linkedin: "https://www.linkedin.com/in/soham-katkar-587965353",
          instagram: "https://www.instagram.com/s0ham_katkar",
        },
      },
    ],
  },
};

const teamImages = [
  { id: "organisers", src: orgImg, alt: "Organisers" },
  { id: "dnp", src: dnpImg, alt: "Design and Production" },
  { id: "lno", src: lnoImg, alt: "Logistics and Operations" },
  { id: "editorial", src: ediImg, alt: "Editorial" },
  { id: "fns", src: fnsImg, alt: "Finance and Sponsorship" },
  { id: "mnm", src: mnmImg, alt: "Media and Marketing" },
  { id: "curation", src: curImg, alt: "Curation" },
  { id: "technical", src: techImg, alt: "Technical" },
];

const TedxPvgcoetm = () => (
  <span className="tedx-brand">
    TED<span className="tedx-brand-x">x</span>PVGCOETM
  </span>
);

const DustParticles = () => {
  const particles = Array.from({ length: 40 });
  return (
    <div className="dust-container">
      {particles.map((_, i) => (
        <div
          key={i}
          className="dust-particle"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            animationDuration: `${12 + Math.random() * 20}s`,
            animationDelay: `-${Math.random() * 20}s`,
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            opacity: Math.random() * 0.4 + 0.1,
          }}
        ></div>
      ))}
    </div>
  );
};

const NewTeam = () => {
  const imageRefs = useRef([]);
  const [expandedTeamId, setExpandedTeamId] = useState(null);
  const [expandedMemberKey, setExpandedMemberKey] = useState(null);
  const [animatedTeams, setAnimatedTeams] = useState({});
  const [gridColumns, setGridColumns] = useState(4);
  const membersGridRef = useRef(null);

  useEffect(() => {
    // Capture ref value into local variable for cleanup
    const currentRefs = imageRefs.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const teamId = entry.target.getAttribute("data-team-id");
            if (teamId) {
              setAnimatedTeams((prev) => ({ ...prev, [teamId]: true }));
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    currentRefs.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      currentRefs.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Dynamically detect column count of the active members grid
  useEffect(() => {
    const updateCols = () => {
      if (membersGridRef.current) {
        const computed = window.getComputedStyle(membersGridRef.current);
        const colsStr = computed.getPropertyValue("grid-template-columns");
        if (colsStr) {
          const count = colsStr.trim().split(/\s+/).filter(Boolean).length;
          if (count > 0) {
            setGridColumns(count);
            return;
          }
        }
      }
      const w = window.innerWidth;
      const currentTeam = committeeTeamsData[expandedTeamId];
      const maxForTeam =
        currentTeam && currentTeam.members.length > 0
          ? currentTeam.members.length
          : 4;
      if (w >= 1200) setGridColumns(Math.min(4, maxForTeam));
      else if (w >= 900) setGridColumns(Math.min(3, maxForTeam));
      else if (w >= 600) setGridColumns(Math.min(2, maxForTeam));
      else setGridColumns(1);
    };

    updateCols();
    window.addEventListener("resize", updateCols);

    let ro;
    if (typeof ResizeObserver !== "undefined" && membersGridRef.current) {
      ro = new ResizeObserver(updateCols);
      ro.observe(membersGridRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateCols);
      if (ro) ro.disconnect();
    };
  }, [expandedTeamId]);

  const handleToggleTeam = (teamId, index) => {
    if (expandedTeamId === teamId) {
      setExpandedTeamId(null);
      setExpandedMemberKey(null);
    } else {
      setExpandedTeamId(teamId);
      setExpandedMemberKey(null); // Keep info cards small at first
      setTimeout(() => {
        const el = imageRefs.current[index];
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  const handleSelectMember = (memberKey) => {
    if (membersGridRef.current) {
      const computed = window.getComputedStyle(membersGridRef.current);
      const colsStr = computed.getPropertyValue("grid-template-columns");
      if (colsStr) {
        const count = colsStr.trim().split(/\s+/).filter(Boolean).length;
        if (count > 0) setGridColumns(count);
      }
    }
    setExpandedMemberKey((prev) => {
      const next = prev === memberKey ? null : memberKey;
      if (next) {
        setTimeout(() => {
          const tabEl = document.getElementById(
            `member-big-info-tab-${expandedTeamId}`,
          );
          if (tabEl) {
            const rect = tabEl.getBoundingClientRect();
            if (rect.bottom > window.innerHeight) {
              tabEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
          }
        }, 150);
      }
      return next;
    });
  };

  return (
    <div className="new-committee-page" id="page-top">
      <Helmet defer={false}>
        <title>Team | TEDxPVGCOET</title>
      </Helmet>

      {/* Desktop Background */}
      <div
        className="new-committee-bg-fixed bg-desktop-view"
        style={{ backgroundImage: `url("${bgDesktop}")` }}
      >
        <div className="bg-overlay"></div>
      </div>

      {/* Mobile Background */}
      <div
        className="new-committee-bg-fixed bg-mobile-view"
        style={{ backgroundImage: `url("${bgMobile}")` }}
      >
        <div className="bg-overlay"></div>
      </div>

      {/* Scroll gradient overlay (dark at top, fades out as you scroll) */}
      <div className="new-committee-scroll-fade"></div>

      {/* Atmospheric floating dust */}
      <DustParticles />

      {/* Hero section */}
      <section className="new-committee-hero">
        <div className="hero-content-wrap">
          <h1 className="hero-text animate-text">
            <span className="hero-line1">The pieces that</span>
            <br />
            <span className="hero-line2">make the whole</span>
          </h1>
          <div className="hero-archive-tag">
            <span>2026 EDITION</span>
            <span className="archive-separator">•</span>
            <Link to="/team-2025" className="hero-archive-link">
              View 2025 Team →
            </Link>
          </div>
        </div>
      </section>

      {/* Team Images Section */}
      <section className="new-committee-list">
        {teamImages.map((team, index) => {
          const isExpanded = expandedTeamId === team.id;
          const isAnimated = !!animatedTeams[team.id];
          const currentTeamData = committeeTeamsData[team.id] || {
            title: team.alt,
            kicker: "DEPARTMENT TEAM",
            members: [],
          };

          return (
            <div
              key={team.id}
              data-team-id={team.id}
              className={`new-committee-img-container ${
                isAnimated ? "animate-fade-in" : ""
              } ${isExpanded ? "is-showcase-expanded" : ""}`}
              ref={(el) => (imageRefs.current[index] = el)}
            >
              {/* Image Frame Wrapper - Clickable for all teams */}
              <div
                id={`team-${team.id}-frame`}
                className="team-frame-wrapper clickable-frame"
                onClick={() => handleToggleTeam(team.id, index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleToggleTeam(team.id, index);
                  }
                }}
                aria-expanded={isExpanded}
                aria-label={isExpanded ? "Collapse team" : "View team members"}
              >
                <img
                  src={team.src}
                  alt={team.alt}
                  className={`new-committee-img ${
                    isExpanded ? "full-color-expanded" : ""
                  }`}
                  loading="lazy"
                />
              </div>

              {/* Transformed Member Information Section */}
              {isExpanded && (
                <div
                  className="showcase-members-panel"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="members-panel-header">
                    <h2 className="panel-title">{currentTeamData.title}</h2>
                    <button
                      type="button"
                      className="panel-collapse-trigger"
                      onClick={() => handleToggleTeam(team.id, index)}
                      aria-label="Collapse team"
                    >
                      Collapse Team ▴
                    </button>
                  </div>

                  {/* Compact Info Cards (Small at first) with inline expandable row */}
                  <div
                    className={`compact-members-grid ${
                      currentTeamData.members.length <= 3
                        ? `members-grid-${currentTeamData.members.length}`
                        : ""
                    }`}
                    ref={membersGridRef}
                  >
                    {(() => {
                      const activeMemberIndex =
                        currentTeamData.members.findIndex(
                          (m) => `${team.id}-${m.name}` === expandedMemberKey,
                        );
                      const defaultCols =
                        currentTeamData.members.length <= 3
                          ? currentTeamData.members.length
                          : 4;
                      const cols = gridColumns || defaultCols;
                      const activeRow =
                        activeMemberIndex >= 0
                          ? Math.floor(activeMemberIndex / cols)
                          : -1;
                      const insertionIndex =
                        activeMemberIndex >= 0
                          ? Math.min(
                              (activeRow + 1) * cols - 1,
                              currentTeamData.members.length - 1,
                            )
                          : -1;
                      const activeMember =
                        activeMemberIndex >= 0
                          ? currentTeamData.members[activeMemberIndex]
                          : null;

                      return currentTeamData.members.map((member, idx) => {
                        const memberKey = `${team.id}-${member.name}`;
                        const isMemberExpanded =
                          expandedMemberKey === memberKey;
                        const avatarSrc = member.image || defaultUserAvatar;
                        const memberCardId = `member-card-${team.id}-${member.name
                          .toLowerCase()
                          .replace(/[^a-z0-9]/g, "-")}`;

                        return (
                          <React.Fragment key={member.name}>
                            <div
                              id={memberCardId}
                              className={`member-card-compact ${
                                isMemberExpanded ? "is-selected-card" : ""
                              }`}
                              onClick={() => handleSelectMember(memberKey)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  handleSelectMember(memberKey);
                                }
                              }}
                              aria-expanded={isMemberExpanded}
                            >
                              <div className="compact-avatar-wrap">
                                <img
                                  src={avatarSrc}
                                  alt={member.name}
                                  className="compact-avatar"
                                  loading="lazy"
                                />
                                {isMemberExpanded && (
                                  <span className="avatar-active-ring"></span>
                                )}
                              </div>

                              <div className="compact-info">
                                <div className="compact-info-header">
                                  <h4 className="compact-name">
                                    {member.name}
                                  </h4>
                                  <span className="compact-role">
                                    {member.role}
                                  </span>
                                </div>

                                <div className="compact-social-links">
                                  {member.social?.linkedin && (
                                    <a
                                      href={member.social.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="compact-social-btn compact-linkedin-btn"
                                      onClick={(e) => e.stopPropagation()}
                                      onKeyDown={(e) => e.stopPropagation()}
                                      aria-label={`${member.name}'s LinkedIn`}
                                    >
                                      <FaLinkedin />
                                    </a>
                                  )}
                                  {member.social?.instagram && (
                                    <a
                                      href={member.social.instagram}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="compact-social-btn compact-instagram-btn"
                                      onClick={(e) => e.stopPropagation()}
                                      onKeyDown={(e) => e.stopPropagation()}
                                      aria-label={`${member.name}'s Instagram`}
                                    >
                                      <FaInstagram />
                                    </a>
                                  )}
                                  {member.social?.portfolio && (
                                    <a
                                      href={
                                        member.social.portfolio.startsWith(
                                          "http://",
                                        ) ||
                                        member.social.portfolio.startsWith(
                                          "https://",
                                        )
                                          ? member.social.portfolio
                                          : `https://${member.social.portfolio}`
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="compact-social-btn compact-portfolio-btn"
                                      onClick={(e) => e.stopPropagation()}
                                      onKeyDown={(e) => e.stopPropagation()}
                                      aria-label={`${member.name}'s Portfolio`}
                                    >
                                      <FaBriefcase />
                                    </a>
                                  )}
                                </div>

                                <span className="compact-action-hint">
                                  {isMemberExpanded ? (
                                    <>
                                      Active Profile{" "}
                                      <FaChevronUp className="hint-arrow" />
                                    </>
                                  ) : (
                                    <>
                                      View Details{" "}
                                      <FaChevronDown className="hint-arrow" />
                                    </>
                                  )}
                                </span>
                              </div>
                            </div>

                            {/* Big Information Tab rendered directly right below the row containing the active member */}
                            {idx === insertionIndex && activeMember && (
                              <div
                                key={`big-tab-${activeMember.name}`}
                                className="member-big-tab-container"
                                id={`member-big-info-tab-${team.id}`}
                              >
                                <button
                                  id={`big-tab-close-btn-${team.id}`}
                                  className="big-tab-close-btn"
                                  onClick={() => setExpandedMemberKey(null)}
                                  aria-label="Collapse Details"
                                  title="Collapse Details"
                                >
                                  <FaTimes />
                                </button>

                                <div className="big-tab-inner">
                                  {/* Member Main Profile Section */}
                                  <div className="big-tab-profile-wrap">
                                    <div className="big-tab-avatar-col">
                                      <div className="big-tab-avatar-frame">
                                        <img
                                          src={
                                            activeMember.image ||
                                            defaultUserAvatar
                                          }
                                          alt={activeMember.name}
                                          className="big-tab-avatar"
                                        />
                                      </div>
                                      <div className="big-tab-tag">
                                        <TedxPvgcoetm /> 2026
                                      </div>
                                    </div>

                                    <div className="big-tab-content-col">
                                      <div className="big-tab-department-tag">
                                        {currentTeamData.title.toUpperCase()}
                                      </div>
                                      <h3 className="big-tab-name">
                                        {activeMember.name}
                                      </h3>
                                      <div className="big-tab-role-badge">
                                        {activeMember.role}
                                      </div>

                                      <div className="big-tab-actions">
                                        {activeMember.social?.linkedin && (
                                          <a
                                            href={activeMember.social.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-btn linkedin-btn"
                                            aria-label={`${activeMember.name}'s LinkedIn`}
                                          >
                                            <FaLinkedin className="btn-icon" />
                                            <span>LinkedIn</span>
                                          </a>
                                        )}
                                        {activeMember.social?.instagram && (
                                          <a
                                            href={activeMember.social.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-btn instagram-btn"
                                            aria-label={`${activeMember.name}'s Instagram`}
                                          >
                                            <FaInstagram className="btn-icon" />
                                            <span>Instagram</span>
                                          </a>
                                        )}
                                        {activeMember.social?.portfolio && (
                                          <a
                                            href={
                                              activeMember.social.portfolio.startsWith(
                                                "http://",
                                              ) ||
                                              activeMember.social.portfolio.startsWith(
                                                "https://",
                                              )
                                                ? activeMember.social.portfolio
                                                : `https://${activeMember.social.portfolio}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-btn portfolio-btn"
                                            aria-label={`${activeMember.name}'s Portfolio`}
                                          >
                                            <FaBriefcase className="btn-icon" />
                                            <span>Portfolio</span>
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Subtle Vertical Divider */}
                                  <div
                                    className="big-tab-divider"
                                    aria-hidden="true"
                                  ></div>

                                  {/* Cinematic Editorial & Theme Showcase Column */}
                                  <div className="big-tab-editorial-col">
                                    {/* Ambient Glowing TEDx "X" Monogram */}
                                    <div
                                      className="editorial-watermark-x"
                                      aria-hidden="true"
                                    >
                                      <span>X</span>
                                    </div>

                                    <div className="editorial-content">
                                      <div className="editorial-badge">
                                        <span className="editorial-pulse-dot"></span>
                                        <span className="editorial-kicker">
                                          CHAPTER ESSENCE
                                        </span>
                                      </div>

                                      <blockquote className="editorial-quote">
                                        “
                                        {activeMember.quote ||
                                          "Ideas that provoke thought, inspire change, and shape tomorrow."}
                                        ”
                                      </blockquote>

                                      <div className="editorial-footer">
                                        <div className="editorial-theme-title">
                                          The Pieces That Make The Whole
                                        </div>
                                        <div className="editorial-subtext">
                                          <TedxPvgcoetm /> • 2026 EDITION
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </React.Fragment>
                        );
                      });
                    })()}
                  </div>

                  <div className="members-panel-footer">
                    <button
                      type="button"
                      className="panel-collapse-trigger panel-bottom-collapse"
                      onClick={() => handleToggleTeam(team.id, index)}
                      aria-label="Collapse team"
                    >
                      Collapse Team ▴
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>

      <FooterSection />
    </div>
  );
};

export default NewTeam;
