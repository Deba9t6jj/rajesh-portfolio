import { useEffect } from "react";
import { gsap } from "gsap";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

// Smoother initialization as a placeholder
export let smoother: any = null;

const Navbar = () => {
  useEffect(() => {
    // Initialize smoother as a simple scroll wrapper
    smoother = {
      scrollTop: (pos: number) => {
        if (typeof window !== "undefined") {
          window.scrollTo(0, pos);
        }
      },
      paused: (state: boolean) => {
        // No-op for compatibility
      },
      scrollTo: (target: string, smooth: boolean, align: string) => {
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
        }
      },
    };

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (section) {
            const targetElement = document.querySelector(section);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      });
    });
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          RC
        </a>
        <a
          href="mailto:rajeshchittyal21@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          rajeshchittyal21@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
