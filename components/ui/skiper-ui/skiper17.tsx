"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export interface CardData {
  id: number | string;
  image: string;
  alt?: string;
  title?: string;
  subtitle?: string;
}

export interface StickyCard002Props {
  cards: CardData[];
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
}

/**
 * Skiper 17 — Card stack with GSAP and rotate
 * Registry: @skiper-ui/skiper17
 */
export const StickyCard002 = ({
  cards,
  className,
  containerClassName,
  imageClassName,
}: StickyCard002Props) => {
  const container = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const cardElements = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const totalCards = cardElements.length;

      if (!cardElements[0] || totalCards === 0) return;

      gsap.set(cardElements[0], { y: "0%", scale: 1, rotation: 0, opacity: 1 });

      for (let i = 1; i < totalCards; i++) {
        if (!cardElements[i]) continue;
        gsap.set(cardElements[i], { y: "100%", scale: 1, rotation: 0 });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: `+=${typeof window !== "undefined" ? window.innerHeight * (totalCards - 1) : 1000}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cardElements[i];
        const nextCard = cardElements[i + 1];
        const position = i;
        const rotateDir = i % 2 === 0 ? 4 : -4;

        if (!currentCard || !nextCard) continue;

        scrollTimeline.to(
          currentCard,
          {
            scale: 0.82,
            rotation: rotateDir,
            y: "-8%",
            opacity: 0.65,
            duration: 1,
            ease: "none",
          },
          position
        );

        scrollTimeline.to(
          nextCard,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position
        );
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      if (container.current) {
        resizeObserver.observe(container.current);
      }

      return () => {
        resizeObserver.disconnect();
        scrollTimeline.kill();
      };
    },
    { scope: container }
  );

  return (
    <div className={cn("relative h-full w-full min-h-screen", className)} ref={container}>
      <div className="sticky-cards relative flex h-full min-h-screen w-full items-center justify-center overflow-hidden p-4 lg:p-12">
        <div
          className={cn(
            "relative h-[80vh] w-full max-w-sm overflow-hidden rounded-2xl sm:max-w-md md:max-w-lg lg:max-w-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-zinc-950",
            containerClassName
          )}
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={cn(
                "absolute inset-0 h-full w-full rounded-2xl overflow-hidden will-change-transform",
                imageClassName
              )}
            >
              <img
                src={card.image}
                alt={card.alt || ""}
                className="h-full w-full object-cover select-none"
              />
              {(card.title || card.subtitle) && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                  {card.subtitle && (
                    <span className="text-red-500 font-mono text-xs font-semibold uppercase tracking-widest mb-1">
                      {card.subtitle}
                    </span>
                  )}
                  {card.title && (
                    <h3 className="text-white text-2xl font-bold uppercase tracking-tight">
                      {card.title}
                    </h3>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StickyCard002;
export { StickyCard002 as Skiper17 };
