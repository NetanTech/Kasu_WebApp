import type { MotionProps, Variants } from "motion/react";

/**
 * Shared entrance choreography for the auth screens.
 *
 * Nesting these containers (root -> header/form -> fields) produces one
 * continuous top-to-bottom cascade instead of every element firing at once.
 */
export const authContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
} satisfies Variants;

/** Fade + rise for blocks (fields, buttons, icons). */
export const authItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
} satisfies Variants;

/** Opacity-only for supporting copy, links and the "Or" label. */
export const authFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
} satisfies Variants;

/** Divider lines grow outwards from the centre. */
export const authLine = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
} satisfies Variants;

/** Fade-out used by AnimatePresence when a step is replaced. */
export const authExit: MotionProps["exit"] = {
  opacity: 0,
  transition: { duration: 0.18, ease: "easeIn" },
};
