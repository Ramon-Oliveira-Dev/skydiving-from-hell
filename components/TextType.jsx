"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";

/**
 * TextType — Componente de Digitação Dinâmica (React Bits Compatible)
 * com Proteção Anti-Layout Shift (CLS = 0) para Mobile.
 *
 * Resolve o problema de "tela subindo e descendo" no mobile criando uma camada
 * invisível (Ghost Box) com a maior frase do array. Isso fixa a altura do elemento
 * e impede qualquer oscilação de scroll ou quebra de linha dinâmica.
 */
export default function TextType({
  text,
  texts,
  typingSpeed = 75,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "_",
  deletingSpeed = 50,
  variableSpeedEnabled = false,
  variableSpeedMin = 60,
  variableSpeedMax = 120,
  cursorBlinkDuration = 0.5,
  className = "",
  textClassName = "",
  cursorClassName = "",
  as: Component = "span",
  loop = true,
}) {
  // Unifica `text` (string | string[]) e `texts` (string[])
  const stringList = useMemo(() => {
    const list = texts || text || ["Skydiving From Hell", "Metal Moderno & 8 Cordas"];
    if (Array.isArray(list)) return list.filter(Boolean);
    if (typeof list === "string") return [list];
    return ["Skydiving From Hell"];
  }, [text, texts]);

  const [displayText, setDisplayText] = useState("");
  const textIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timeoutRef = useRef(null);

  // Encontra o texto mais longo para travar a altura no mobile
  const longestString = useMemo(() => {
    return stringList.reduce((max, str) => (str.length > max.length ? str : max), "");
  }, [stringList]);

  useEffect(() => {
    textIndexRef.current = 0;
    charIndexRef.current = 0;
    isDeletingRef.current = false;
    setDisplayText("");

    const getTypingDelay = () => {
      if (variableSpeedEnabled) {
        return (
          Math.floor(Math.random() * (variableSpeedMax - variableSpeedMin + 1)) +
          variableSpeedMin
        );
      }
      return typingSpeed;
    };

    const typeLoop = () => {
      if (!stringList || stringList.length === 0) return;

      const currentString = stringList[textIndexRef.current % stringList.length];
      if (!currentString) return;

      if (isDeletingRef.current) {
        if (charIndexRef.current > 0) {
          charIndexRef.current -= 1;
          setDisplayText(currentString.slice(0, charIndexRef.current));
          timeoutRef.current = setTimeout(typeLoop, deletingSpeed);
        } else {
          isDeletingRef.current = false;
          if (textIndexRef.current === stringList.length - 1 && !loop) {
            return;
          }
          textIndexRef.current = (textIndexRef.current + 1) % stringList.length;
          timeoutRef.current = setTimeout(typeLoop, 150);
        }
      } else {
        if (charIndexRef.current < currentString.length) {
          charIndexRef.current += 1;
          setDisplayText(currentString.slice(0, charIndexRef.current));
          timeoutRef.current = setTimeout(typeLoop, getTypingDelay());
        } else {
          if (stringList.length > 1 || loop) {
            timeoutRef.current = setTimeout(() => {
              isDeletingRef.current = true;
              typeLoop();
            }, pauseDuration);
          }
        }
      }
    };

    timeoutRef.current = setTimeout(typeLoop, 100);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    stringList,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    variableSpeedEnabled,
    variableSpeedMin,
    variableSpeedMax,
    loop,
  ]);

  return (
    <Component className={`relative inline-flex items-center align-baseline ${className}`}>
      <span className="relative inline-grid grid-cols-1 grid-rows-1 items-center align-baseline">
        {/* Ghost Box invisível que reserva a altura exata da maior frase no mobile */}
        <span
          aria-hidden="true"
          className={`invisible pointer-events-none select-none col-start-1 row-start-1 font-mono tracking-tight ${textClassName}`}
        >
          {longestString}
          {showCursor && <span className="inline-block ml-0.5">{cursorCharacter}</span>}
        </span>

        {/* Camada visível de digitação */}
        <span
          className={`col-start-1 row-start-1 inline-flex items-center font-mono tracking-tight whitespace-pre-wrap ${textClassName}`}
        >
          <span>{displayText || "\u00A0"}</span>
          {showCursor && (
            <span
              className={`inline-block ml-0.5 font-bold animate-pulse text-red-500 ${cursorClassName}`}
              style={{
                animationDuration: `${cursorBlinkDuration * 2}s`,
              }}
            >
              {cursorCharacter}
            </span>
          )}
        </span>
      </span>
    </Component>
  );
}
