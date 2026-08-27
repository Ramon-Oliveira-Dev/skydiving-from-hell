"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

/**
 * TiltLayer - Permite projetar elementos filhos no eixo Z (profundidade 3D).
 */
export function TiltLayer({ children, depth = 20, className = "", style = {} }) {
  return (
    <div
      className={className}
      style={{
        transform: `translateZ(${depth}px)`,
        transformStyle: "preserve-3d",
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * TiltCard - Componente de alta performance para efeito 3D Parallax Tilt em cards.
 * Utiliza GSAP quickTo (rotationX / rotationY) para interpolação suave a 60+ FPS sem re-renders no React.
 */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 10,
  scale = 1.02,
  glare = true,
  onClick,
  ...props
}) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detecta touch screens ou preferência por menos movimento
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsTouchDevice(touch || reducedMotion);
  }, []);

  useEffect(() => {
    if (isTouchDevice || !cardRef.current) return;

    const card = cardRef.current;

    // Setters ultrarrápidos do GSAP quickTo usando as propriedades nativas de 3D do GSAP (rotationX, rotationY)
    const rotateXTo = gsap.quickTo(card, "rotationX", { duration: 0.45, ease: "power2.out" });
    const rotateYTo = gsap.quickTo(card, "rotationY", { duration: 0.45, ease: "power2.out" });
    const scaleTo = gsap.quickTo(card, "scale", { duration: 0.45, ease: "power2.out" });

    let glareXTo = null;
    let glareYTo = null;
    let glareOpacityTo = null;

    if (glare && glareRef.current) {
      glareXTo = gsap.quickTo(glareRef.current, "xPercent", { duration: 0.45, ease: "power2.out" });
      glareYTo = gsap.quickTo(glareRef.current, "yPercent", { duration: 0.45, ease: "power2.out" });
      glareOpacityTo = gsap.quickTo(glareRef.current, "opacity", { duration: 0.45, ease: "power2.out" });
    }

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Posição relativa do cursor em relação ao centro (-0.5 até 0.5)
      const mouseX = (e.clientX - rect.left) / width - 0.5;
      const mouseY = (e.clientY - rect.top) / height - 0.5;

      const rotX = -mouseY * maxTilt * 2;
      const rotY = mouseX * maxTilt * 2;

      rotateXTo(rotX);
      rotateYTo(rotY);
      scaleTo(scale);

      if (glareXTo && glareYTo && glareOpacityTo) {
        glareXTo(mouseX * 120);
        glareYTo(mouseY * 120);
        glareOpacityTo(0.4);
      }
    };

    const handleMouseLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
      scaleTo(1);

      if (glareOpacityTo) {
        glareOpacityTo(0);
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isTouchDevice, maxTilt, scale, glare]);

  return (
    <div
      className="relative"
      style={{ perspective: "1000px" }}
      onClick={onClick}
      {...props}
    >
      <div
        ref={cardRef}
        className={`relative ${className}`}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {children}

        {/* Brilho reflexivo holográfico (Glare Overlay) */}
        {glare && !isTouchDevice && (
          <div
            ref={glareRef}
            className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden opacity-0 mix-blend-overlay z-30"
            style={{ transform: "translateZ(40px)" }}
          >
            <div className="absolute -inset-full w-[300%] h-[300%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,rgba(239,68,68,0.25)_35%,transparent_65%)]" />
          </div>
        )}
      </div>
    </div>
  );
}
