import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  
  // Safely check if smoother is defined before using it
  if (smoother && typeof smoother.paused === 'function') {
    smoother.paused(false);
  }
  
  const mainElement = document.getElementsByTagName("main")[0];
  if (mainElement) {
    mainElement.classList.add("main-active");
  }
  
  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  // Fade in header elements
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  // Fade in landing text elements
  gsap.fromTo(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1", ".landing-info-h2"],
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      stagger: 0.1,
      delay: 0.3,
    }
  );
}
