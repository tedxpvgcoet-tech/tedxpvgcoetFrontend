import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const setupLogoAnimations = (logoRef) => {
  const logo = logoRef.current;
  if (!logo) return;

  gsap.killTweensOf(logo);

  // Set initial state
  gsap.set(logo, {
    opacity: 1,
    rotation: 0,
    transformOrigin: "center center"
  });

  // Simple rotation animation on scroll
  gsap.to(logo, {
    rotation: 360,
    scrollTrigger: {
      trigger: logo,
      start: "top 75%", // Starts when logo is 75% from top of viewport
      end: "center center",
      scrub: 2, // Smoother scrubbing
      markers: false, // Set to true to debug trigger positions
      toggleActions: "play none none reverse"
    }
  });

  // Subtle hover effect when in view
  gsap.to(logo, {
    y: -10,
    duration: 3,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    scrollTrigger: {
      trigger: logo,
      start: "top 70%",
      end: "bottom 30%",
      toggleActions: "play pause resume pause"
    }
  });
};