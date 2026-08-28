"use client";

/**
 * @author: @dorianbaffier (Kokonut UI) & Adapted for S.D.F.H.
 * @description: Typewriter text animation with customizable blinking cursor and auto loop
 * @website: https://kokonutui.com
 */

import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export type TypewriterSequence = {
  text: string;
  deleteAfter?: boolean;
  pauseAfter?: number;
};

export type TypewriterTitleProps = {
  sequences?: TypewriterSequence[];
  typingSpeed?: number;
  startDelay?: number;
  autoLoop?: boolean;
  loopDelay?: number;
  deleteSpeed?: number;
  pauseBeforeDelete?: number;
  naturalVariance?: boolean;
  className?: string;
  textClassName?: string;
  cursorClassName?: string;
  prefix?: string;
  prefixClassName?: string;
  showCursor?: boolean;
  as?: React.ElementType;
};

const DEFAULT_SEQUENCES: TypewriterSequence[] = [
  { text: "Typewriter", deleteAfter: true },
  { text: "Multiple Words", deleteAfter: true },
  { text: "Auto Loop", deleteAfter: false },
];

export default function TypewriterTitle({
  sequences = DEFAULT_SEQUENCES,
  typingSpeed = 50,
  startDelay = 200,
  autoLoop = true,
  loopDelay = 1000,
  deleteSpeed = 30,
  pauseBeforeDelete = 1000,
  naturalVariance = true,
  className = "",
  textClassName = "",
  cursorClassName = "",
  prefix = "",
  prefixClassName = "",
  showCursor = true,
  as: Component = "span",
}: TypewriterTitleProps) {
  const [displayText, setDisplayText] = useState("");
  const sequenceIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize with the sequences provided
  const sequencesRef = useRef(sequences);
  useEffect(() => {
    sequencesRef.current = sequences;
    sequenceIndexRef.current = 0;
    charIndexRef.current = 0;
    isDeletingRef.current = false;
  }, [sequences]);

  useEffect(() => {
    const getTypingDelay = () => {
      if (!naturalVariance) {
        return typingSpeed;
      }

      // More natural human typing pattern
      const random = Math.random();

      // 10% chance of a longer pause (thinking/hesitation)
      if (random < 0.1) {
        return typingSpeed * 2;
      }

      // 10% chance of a burst (fast typing)
      if (random > 0.9) {
        return typingSpeed * 0.5;
      }

      // Standard variance (+/- 40%)
      const variance = 0.4;
      const min = typingSpeed * (1 - variance);
      const max = typingSpeed * (1 + variance);
      return Math.random() * (max - min) + min;
    };

    const runTypewriter = () => {
      const currentSequence = sequencesRef.current[sequenceIndexRef.current];
      if (!currentSequence) {
        return;
      }

      if (isDeletingRef.current) {
        if (charIndexRef.current > 0) {
          charIndexRef.current -= 1;
          setDisplayText(currentSequence.text.slice(0, charIndexRef.current));
          timeoutRef.current = setTimeout(runTypewriter, deleteSpeed);
        } else {
          isDeletingRef.current = false;
          const isLastSequence =
            sequenceIndexRef.current === sequencesRef.current.length - 1;

          if (isLastSequence && autoLoop) {
            timeoutRef.current = setTimeout(() => {
              sequenceIndexRef.current = 0;
              runTypewriter();
            }, loopDelay);
          } else if (!isLastSequence) {
            timeoutRef.current = setTimeout(() => {
              sequenceIndexRef.current += 1;
              runTypewriter();
            }, 100); // Quick transition to next word
          }
        }
      } else if (charIndexRef.current < currentSequence.text.length) {
        charIndexRef.current += 1;
        setDisplayText(currentSequence.text.slice(0, charIndexRef.current));
        timeoutRef.current = setTimeout(runTypewriter, getTypingDelay());
      } else {
        const pauseDuration = currentSequence.pauseAfter ?? pauseBeforeDelete;

        if (currentSequence.deleteAfter) {
          timeoutRef.current = setTimeout(() => {
            isDeletingRef.current = true;
            runTypewriter();
          }, pauseDuration);
        } else {
          const isLastSequence =
            sequenceIndexRef.current === sequencesRef.current.length - 1;

          if (isLastSequence && autoLoop) {
            timeoutRef.current = setTimeout(() => {
              sequenceIndexRef.current = 0;
              charIndexRef.current = 0;
              setDisplayText("");
              runTypewriter();
            }, loopDelay);
          } else if (!isLastSequence) {
            timeoutRef.current = setTimeout(() => {
              sequenceIndexRef.current += 1;
              charIndexRef.current = 0;
              setDisplayText("");
              runTypewriter();
            }, pauseDuration);
          }
        }
      }
    };

    // Start the loop
    timeoutRef.current = setTimeout(runTypewriter, startDelay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    typingSpeed,
    deleteSpeed,
    pauseBeforeDelete,
    autoLoop,
    loopDelay,
    startDelay,
    naturalVariance,
  ]);

  return (
    <Component className={`relative inline-flex items-center ${className}`}>
      {prefix && <span className={`mr-2 select-none ${prefixClassName}`}>{prefix}</span>}
      <motion.span
        animate={{ opacity: 1 }}
        className={`inline-flex items-center gap-1 font-mono tracking-tight ${textClassName}`}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="inline-block min-h-[1.2em] whitespace-pre-wrap">
          {displayText}
        </span>
        {showCursor && (
          <motion.span
            animate={{
              opacity: [1, 1, 0, 0],
            }}
            className={`inline-block h-[1em] w-[3px] bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] ${cursorClassName}`}
            transition={{
              duration: 0.9,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "linear",
            }}
          />
        )}
      </motion.span>
    </Component>
  );
}
