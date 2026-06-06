"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export default function ParticlesBackground() {
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={init}
      style={{
        position: "absolute",
        inset: 0,
        /* keep z-index above grid, below content */
        zIndex: 1,
        /* enable pointer events so hover/click effects fire */
        pointerEvents: "auto",
      }}
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
          detectsOn: "window",
          events: {
            onHover: {
              enable: true,
              /* repulse: particles flee from the cursor — most dramatic effect */
              mode: "repulse",
            },
            onClick: {
              enable: true,
              /* bubble: click creates a burst of enlarged bright particles */
              mode: "bubble",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 120,
              duration: 0.6,
              factor: 6,
              speed: 1,
              maxSpeed: 50,
              easing: "ease-out-quad",
            },
            bubble: {
              distance: 200,
              size: 10,
              duration: 0.8,
              opacity: 1,
              color: { value: "#00d4ff" },
            },
            grab: {
              distance: 160,
              links: { opacity: 0.4 },
            },
            push: { quantity: 4 },
          },
        },
        particles: {
          /* multi-color mix: cyan, blue, purple, soft white */
          color: {
            value: ["#00d4ff", "#0066ff", "#7c3aed", "#a5b4fc", "#e2e8f0"],
          },
          links: {
            /* use a neutral link color; individual particles are colored */
            color: "#00d4ff",
            distance: 140,
            enable: true,
            opacity: 0.15,
            width: 1,
            /* triangles fill the space between connected triplets */
            triangles: {
              enable: true,
              color: "#0066ff",
              opacity: 0.025,
            },
          },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "out" },
            random: true,
            speed: { min: 0.3, max: 1.1 },
            straight: false,
            attract: {
              enable: false,
            },
            /* adds a subtle wander to paths */
            trail: {
              enable: false,
            },
          },
          number: {
            density: { enable: true, area: 800 },
            value: 110,
          },
          opacity: {
            value: { min: 0.15, max: 0.7 },
            animation: {
              enable: true,
              speed: 1.2,
              minimumValue: 0.05,
              sync: false,
            },
          },
          /* mix circles with triangles */
          shape: {
            type: ["circle", "circle", "circle", "triangle"],
          },
          size: {
            value: { min: 1, max: 4 },
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 0.5,
              sync: false,
            },
          },
          /* give each particle a random twinkle */
          twinkle: {
            particles: {
              enable: true,
              color: "#00d4ff",
              frequency: 0.05,
              opacity: 1,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
