"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

/* ── animation variants ─────────────────────────────────────────────────── */
const variantMap: Record<string, Variants> = {
  blur: {
    hidden: {
      opacity: 0,
      filter: "blur(14px)",
      y: 28,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      scale: 1,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  },
  up: {
    hidden: { opacity: 0, y: 56 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  },
  down: {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  },
  left: {
    hidden: { opacity: 0, x: -60, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  },
  right: {
    hidden: { opacity: 0, x: 60, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] },
    },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  },
};

/* stagger parent — controls children timing */
const staggerParentVariant = (stagger: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: 0,
    },
  },
});

/* ── props ──────────────────────────────────────────────────────────────── */
interface ScrollRevealProps {
  children: ReactNode;
  /** animation style — default "blur" */
  variant?: keyof typeof variantMap;
  /** base delay in seconds */
  delay?: number;
  /** if true, wraps children in a stagger parent */
  stagger?: boolean;
  /** time between staggered children (default 0.1s) */
  staggerDelay?: number;
  /** threshold (0-1) for triggering */
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
  /** HTML tag to render as */
  as?: keyof React.JSX.IntrinsicElements;
}

export default function ScrollReveal({
  children,
  variant = "blur",
  delay = 0,
  stagger = false,
  staggerDelay = 0.1,
  threshold = 0.12,
  className,
  style,
  as = "div",
}: ScrollRevealProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold });

  const baseVariant = variantMap[variant];

  /* inject delay into the transition */
  const patchedVariant: Variants = {
    hidden: baseVariant.hidden,
    visible: {
      ...(baseVariant.visible as object),
      transition: {
        ...((baseVariant.visible as { transition?: object }).transition ?? {}),
        delay,
      },
    },
  };

  const MotionTag = motion[as as "div"] as typeof motion.div;

  if (stagger) {
    return (
      <MotionTag
        ref={ref}
        className={className}
        style={style}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerParentVariant(staggerDelay)}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={patchedVariant}
    >
      {children}
    </MotionTag>
  );
}

/* ── child item for use inside stagger parents ───────────────────────────── */
export function RevealItem({
  children,
  variant = "blur",
  className,
  style,
  as = "div",
}: {
  children: ReactNode;
  variant?: keyof typeof variantMap;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const MotionTag = motion[as as "div"] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      variants={variantMap[variant]}
    >
      {children}
    </MotionTag>
  );
}
