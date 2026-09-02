"use client";

import { motion } from "motion/react";
import React, { useEffect, useRef, useState, useMemo } from "react";

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
  { text: "Skydiving From Hell", deleteAfter: true },
  { text: "Metal Moderno & 8 Cordas", deleteAfter: true },
  { text: "Vila Velha / ES", deleteAfter: true },
];

export default function TypewriterTitle({
  sequences = DEFAULT_SEQUENCES,
  typingSpeed = 40,
  startDelay = 150,
  autoLoop = true,
  loopDelay = 1000,
  deleteSpeed = 20,
  pauseBeforeDelete = 1500,
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

  // Serializa as sequências para evitar re-renderizações desnecessárias
  const sequencesKey = useMemo(() => JSON.stringify(sequences), [sequences]);
  const parsedSequences = useMemo<TypewriterSequence[]>(() => {
    try {
      return JSON.parse(sequencesKey);
    } catch {
      return DEFAULT_SEQUENCES;
    }
  }, [sequencesKey]);

  // Encontra a sequência mais longa para reservar o espaço físico e evitar Layout Shift no mobile
  const longestText = useMemo(() => {
    if (!parsedSequences || parsedSequences.length === 0) return "";
    return parsedSequences.reduce((longest, seq) => {
      const text = seq.text || "";
      return text.length > longest.length ? text : longest;
    }, "");
  }, [parsedSequences]);

  useEffect(() => {
    sequenceIndexRef.current = 0;
    charIndexRef.current = 0;
    isDeletingRef.current = false;
    setDisplayText("");

    const getTypingDelay = () => {
      if (!naturalVariance) return typingSpeed;
      const random = Math.random();
      if (random < 0.08) return typingSpeed * 1.8;
      if (random > 0.92) return typingSpeed * 0.6;
      return typingSpeed + (Math.random() * 8 - 4);
    };

    const runTypewriter = () => {
      const currentList = parsedSequences;
      if (!currentList || currentList.length === 0) return;

      const currentSeq = currentList[sequenceIndexRef.current % currentList.length];
      if (!currentSeq) return;

      const targetText = currentSeq.text || "";

      if (isDeletingRef.current) {
        if (charIndexRef.current > 0) {
          charIndexRef.current -= 1;
          setDisplayText(targetText.slice(0, charIndexRef.current));
          timeoutRef.current = setTimeout(runTypewriter, deleteSpeed);
        } else {
          isDeletingRef.current = false;
          const isLastSequence =
            sequenceIndexRef.current === currentList.length - 1;

          if (isLastSequence && autoLoop) {
            timeoutRef.current = setTimeout(() => {
              sequenceIndexRef.current = 0;
              runTypewriter();
            }, loopDelay);
          } else if (!isLastSequence) {
            sequenceIndexRef.current += 1;
            timeoutRef.current = setTimeout(runTypewriter, 100);
          }
        }
      } else {
        if (charIndexRef.current < targetText.length) {
          charIndexRef.current += 1;
          setDisplayText(targetText.slice(0, charIndexRef.current));
          timeoutRef.current = setTimeout(runTypewriter, getTypingDelay());
        } else {
          const pauseDuration =
            currentSeq.pauseAfter ?? pauseBeforeDelete;

          if (currentSeq.deleteAfter) {
            timeoutRef.current = setTimeout(() => {
              isDeletingRef.current = true;
              runTypewriter();
            }, pauseDuration);
          } else {
            const isLastSequence =
              sequenceIndexRef.current === currentList.length - 1;

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
      }
    };

    timeoutRef.current = setTimeout(runTypewriter, startDelay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    sequencesKey,
    typingSpeed,
    deleteSpeed,
    pauseBeforeDelete,
    autoLoop,
    loopDelay,
    startDelay,
    naturalVariance,
  ]);

  return (
    <Component className={`relative inline-flex items-center align-baseline ${className}`}>
      {prefix && <span className={`mr-2 select-none flex-shrink-0 ${prefixClassName}`}>{prefix}</span>}

      {/* Grid container com altura travada e Zero Layout Shift (CLS = 0) */}
      <span className="relative inline-grid grid-cols-1 grid-rows-1 items-center align-baseline">
        {/* Ghost layer invisível: reserva o espaço do texto mais longo para que o layout mobile nunca pule */}
        <span
          aria-hidden="true"
          className={`invisible pointer-events-none select-none col-start-1 row-start-1 font-mono tracking-tight ${textClassName}`}
        >
          {longestText}
          {showCursor && <span className="inline-block w-[3px] ml-1">_</span>}
        </span>

        {/* Camada visível de digitação ativa */}
        <motion.span
          animate={{ opacity: 1 }}
          className={`col-start-1 row-start-1 inline-flex items-center font-mono tracking-tight whitespace-pre-wrap ${textClassName}`}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <span>{displayText || "\u00A0"}</span>
          {showCursor && (
            <motion.span
              animate={{
                opacity: [1, 1, 0, 0],
              }}
              className={`inline-block h-[1em] w-[3px] bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] ml-0.5 flex-shrink-0 align-middle ${cursorClassName}`}
              transition={{
                duration: 0.9,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "linear",
              }}
            />
          )}
        </motion.span>
      </span>
    </Component>
  );
}
