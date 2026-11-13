import { motion, type SVGMotionProps } from "motion/react";

export function MainVerify(props: SVGMotionProps<SVGSVGElement>) {
  return (
    <motion.svg
      width="59"
      height="59"
      viewBox="0 0 59 59"
      fill="none"
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      {...props}
    >
      {/* back square: starts perfectly aligned, then splits */}
      <motion.rect
        x="8.5874"
        y="8.58765"
        width="41.66"
        height="41.66"
        rx="5"
        fill="#221A76"
        initial={{ rotate: 0 }}
        animate={{ rotate: 48 }}
        transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
      />
      {/* front square */}
      <motion.rect
        x="8.5874"
        y="8.58765"
        width="41.66"
        height="41.66"
        rx="5"
        fill="#221A76"
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, -6, 0] }}
        transition={{
          duration: 0.6,
          times: [0, 0.35, 1],
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
      {/* tick */}
      <motion.path
        d="M23.7542 31.2544L26.6708 34.1711L35.4208 25.0044"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="white"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.5 }}
      />
    </motion.svg>
  );
}

