"use client"; // Next.js: this component uses hooks + animation, so it runs in the browser

import { motion, useReducedMotion, type MotionProps } from "motion/react";

/* ------------------------------------------------------------------
   TIMING (seconds). Change these numbers to retime the whole animation.
   They match the table we agreed on:
     0.00 icon scales in
     0.25 front flap squashes to its hinge
     0.40 back flap grows from its hinge + letter starts rising
     1.00 badge pops in (spring)
     1.15 tick draws
     ~1.35 done, rests
   The letter uses a single underdamped spring, so its rise and settle
   are one motion (no separate "settle" delay needed).
------------------------------------------------------------------- */
const T = {
  enter: 0.0,
  frontFlap: 0.25,
  backFlap: 0.4,
  letterRise: 0.4,
  badge: 1.0,
  tick: 1.15,
};

// Colours from the design
const C = {
  primary: "#221A76",
  back: "#17104F",
  flap: "#2F2796",
  paper: "#FFFFFF",
};

// Path data copied from email-icon.svg
const BACK_FLAP =
  "M22.1911 0.678307C22.8341 0.263342 23.6575 0.25165 24.312 0.648191L41.8757 11.2895C43.6067 12.3382 42.8632 15 40.8393 15H6.78724C4.79299 15 4.02713 12.401 5.70272 11.3196L22.1911 0.678307Z";
const FRONT_FLAP =
  "M22.1911 28.3217C22.8341 28.7367 23.6575 28.7483 24.312 28.3518L41.8757 17.7105C43.6067 16.6618 42.8632 14 40.8393 14H6.78724C4.79299 14 4.02713 16.599 5.70272 17.6804L22.1911 28.3217Z";
const POCKET =
  "M43 42C43 43.1046 42.1046 44 41 44H5C3.89543 44 3 43.1046 3 42V18C3 16.3519 4.88153 15.4111 6.2 16.4L21.8 28.1C22.5111 28.6333 23.4889 28.6333 24.2 28.1L39.8 16.4C41.1185 15.4111 43 16.3519 43 18V42Z";
const SEAL =
  "M30.8891 18.1851L30.549 17.7902C30.484 17.7152 30.4315 17.5752 30.4315 17.4753V17.0504C30.4315 16.7854 30.214 16.568 29.949 16.568H29.524C29.4265 16.568 29.284 16.5155 29.2089 16.4505L28.8139 16.1106C28.6414 15.9631 28.3589 15.9631 28.1839 16.1106L27.7914 16.453C27.7164 16.5155 27.5738 16.568 27.4763 16.568H27.0438C26.7788 16.568 26.5613 16.7854 26.5613 17.0504V17.4778C26.5613 17.5752 26.5088 17.7152 26.4463 17.7902L26.1088 18.1876C25.9637 18.36 25.9637 18.64 26.1088 18.8124L26.4463 19.2098C26.5088 19.2848 26.5613 19.4248 26.5613 19.5222V19.9496C26.5613 20.2146 26.7788 20.432 27.0438 20.432H27.4763C27.5738 20.432 27.7164 20.4845 27.7914 20.5495L28.1864 20.8894C28.3589 21.0369 28.6414 21.0369 28.8164 20.8894L29.2114 20.5495C29.2865 20.4845 29.4265 20.432 29.5265 20.432H29.9515C30.2165 20.432 30.434 20.2146 30.434 19.9496V19.5247C30.434 19.4273 30.4865 19.2848 30.5515 19.2098L30.8916 18.8149C31.0366 18.6425 31.0366 18.3575 30.8891 18.1851Z";

// Makes every SVG part scale/rotate around its OWN box instead of the
// whole drawing's corner. "originX/originY" below then pick the pivot.
const OWN_BOX = { transformBox: "fill-box" as const };

interface EmailSentIconProps {
  size?: number;
}

type InitialPose = NonNullable<MotionProps["initial"]>;

export default function EmailSentIcon({ size = 50 }: EmailSentIconProps) {
  // If the user has "reduce motion" turned on in their OS, skip the show
  // and render the finished pose immediately.
  const reduceMotion = useReducedMotion();

  // `initial={false}` means "start already at the animate values".
  // So: if reduceMotion, no starting pose; otherwise use the pose we pass in.
  const from = (pose: InitialPose): MotionProps["initial"] =>
    reduceMotion ? false : pose;

  return (
    // 1) ENTRANCE: the whole icon scales in and fades in.
    <motion.div
      initial={from({ scale: 0.9, opacity: 0 })}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: T.enter, ease: "easeOut" }}
      style={{ display: "inline-block", lineHeight: 0 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="-1 -3 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Email sent"
      >
        {/* 2) BACK FLAP: hidden (flat) at first, then grows UP from its
            hinge. The hinge is its bottom edge, so originY = 1 (100%). */}
        <motion.path
          id="back-flap"
          d={BACK_FLAP}
          fill={C.back}
          style={{ ...OWN_BOX, originY: 1 }}
          initial={from({ scaleY: 0 })}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.2, delay: T.backFlap, ease: "easeOut" }}
        />

        {/* Back body: never moves */}
        <rect id="back-body" x="3" y="14" width="40" height="30" rx="2" fill={C.back} />

        {/* 3) LETTER. A single underdamped spring does the whole thing:
            it rises from +9 (hidden) toward 0, overshoots a few px above
            its final spot, then settles. The slight -2° -> 0° tilt reads
            as paper being pulled out rather than a rectangle on rails. */}
        <motion.g
          id="letter"
          initial={from({ y: 9, rotate: -2 })}
          animate={{ y: 0, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 7,
            delay: T.letterRise,
          }}
        >
          <rect id="letter-paper" x="10" y="6" width="26" height="28" rx="1" fill={C.paper} />
          <rect id="line-1" x="13" y="8.25" width="19" height="1.5" rx="0.75" fill={C.primary} />
          <rect id="line-2" x="13" y="11.25" width="16" height="1.5" rx="0.75" fill={C.primary} />
          <rect id="line-3" x="13" y="14.25" width="11" height="1.5" rx="0.75" fill={C.primary} />

          {/* 4) BADGE (rides along with the letter) */}
          <g id="badge">
            {/* Seal pops in from nothing with a little spring.
                Default origin is the centre of its own box, which is what we want. */}
            <motion.path
              id="badge-seal"
              d={SEAL}
              fill={C.primary}
              style={OWN_BOX}
              initial={from({ scale: 0 })}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                duration: 0.3,
                bounce: 0.3,
                delay: T.badge,
              }}
            />

            {/* 5) TICK: pathLength 0 -> 1 "draws" the stroke.
                Opacity starts at 0 because a round line cap would show
                a tiny dot even when the length is 0. */}
            <motion.path
              id="badge-tick"
              d="M27.55 18.45L28.2 19.1L29.5 17.8"
              stroke={C.paper}
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={from({ pathLength: 0, opacity: 0 })}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 0.2, delay: T.tick, ease: "easeOut" },
                opacity: { duration: 0.01, delay: T.tick },
              }}
            />
          </g>
        </motion.g>

        {/* 6) FRONT FLAP: full size at first (covers the V notch = closed),
            then squashes UP to its hinge. Hinge is its top edge, so originY = 0. */}
        <motion.path
          id="front-flap"
          d={FRONT_FLAP}
          fill={C.flap}
          style={{ ...OWN_BOX, originY: 0 }}
          initial={from({ scaleY: 1 })}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.2, delay: T.frontFlap, ease: "easeIn" }}
        />

        {/* Pocket: never moves, always in front of the letter */}
        <path id="front-pocket" d={POCKET} fill={C.primary} />
      </svg>
    </motion.div>
  );
}