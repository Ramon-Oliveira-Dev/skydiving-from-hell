"use client";

import React, { useRef } from "react";

/**
 * BotaoMagnetico — Efeito magnético sutil com física elástica
 * Segue suavemente a posição do cursor no hover e retorna à origem no leave.
 * Desativa automaticamente em prefers-reduced-motion: reduce e telas touch.
 */
export default function BotaoMagnetico({
  children,
  className = "",
  style = {},
  as = "button",
  ...props
}) {
  const ref = useRef(null);

  const mover = (e) => {
    const el = ref.current;
    if (
      !el ||
      (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      return;
    }
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.22}px, ${y * 0.28}px)`;
  };

  const soltar = () => {
    if (ref.current) {
      ref.current.style.transform = "translate(0, 0)";
    }
  };

  const Component = as;

  return (
    <div
      className="inline-flex w-full sm:w-auto justify-center"
      onPointerMove={mover}
      onPointerLeave={soltar}
    >
      <Component
        ref={ref}
        className={className}
        style={{
          transition: "transform 380ms cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform",
          ...style,
        }}
        {...props}
      >
        {children}
      </Component>
    </div>
  );
}
