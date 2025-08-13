import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const setupLogoAnimations = (logoRef) => {
  const logo = logoRef.current;
  if (!logo) return;

  gsap.killTweensOf(logo);

  // Set initial state (more dramatic flat appearance)
  gsap.set(logo, {
    opacity: 0,
    scaleX: 1.8,
    scaleY: 0.2,
    rotationY: 90,
    rotationZ: -15,
    transformOrigin: "center center",
    filter: 'drop-shadow(0 0 0 rgba(255,255,255,0))'
  });

  // Main animation timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: logo,
      start: "top 75%", // Starts when logo is 75% from top of viewport
      end: "center center",
      scrub: 2, // Smoother scrubbing
      markers: false, // Set to true to debug trigger positions
      toggleActions: "play none none reverse"
    }
  });

  // Animation sequence
  tl.to(logo, {
    opacity: 1,
    duration: 0.5
  })
  .to(logo, {
    motionPath: {
      path: [
        {x: 0, y: 0},
        {x: 40, y: -40},
        {x: 60, y: 0},
        {x: 40, y: 40},
        {x: 0, y: 0}
      ],
      curviness: 1.2
    },
    rotationZ: 0,
    duration: 1.5
  }, 0)
  .to(logo, {
    scaleX: 1,
    scaleY: 1,
    rotationY: 0,
    filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.9))',
    duration: 1.5,
    ease: "back.out(1.5)"
  }, 0);

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