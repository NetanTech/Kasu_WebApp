"use client";

import { Tick } from "@/app/components/svgs/svg";
import { motion } from "motion/react";
import { cn } from "../utils";

interface SelectionTickProps {
  className?: string;
}

const SelectionTick = ({ className }: SelectionTickProps) => (
  <motion.span
    initial={{ scale: 0.7, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: "spring", stiffness: 500, damping: 30 }}
    aria-hidden="true"
    className={cn("flex justify-center", className)}
  >
    <Tick />
  </motion.span>
);

export default SelectionTick;
