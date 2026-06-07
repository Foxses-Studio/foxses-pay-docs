import React, { useEffect, useState, useRef } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  className?: string;
  animateOn?: "view" | "hover";
}

const chars = "-_~#*+!@$%^&()[]{}|;:,.<>/?";

export default function DecryptedText({
  text,
  speed = 30,
  maxIterations = 10,
  sequential = true,
  revealDirection = "start",
  className = "",
  animateOn = "view",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let iteration = 0;
    const length = text.length;

    if (animateOn === "hover" && !isHovered) {
      setDisplayText(text);
      return;
    }

    const startAnimation = () => {
      interval = setInterval(() => {
        setDisplayText(() => {
          return text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";

              // Calculate whether this character should be revealed
              let revealThreshold = 0;
              if (sequential) {
                if (revealDirection === "start") {
                  revealThreshold = (iteration / maxIterations) * length;
                  if (index < revealThreshold) return char;
                } else if (revealDirection === "end") {
                  revealThreshold = length - (iteration / maxIterations) * length;
                  if (index > revealThreshold) return char;
                } else {
                  // center
                  const center = length / 2;
                  const span = (iteration / maxIterations) * center;
                  if (Math.abs(index - center) < span) return char;
                }
              } else {
                if (iteration >= maxIterations) return char;
              }

              // Return random character
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
        });

        iteration += 1;
        if (iteration > maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, speed);
    };

    if (animateOn === "view") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !triggerRef.current) {
            triggerRef.current = true;
            startAnimation();
          }
        },
        { threshold: 0.1 }
      );
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
      return () => {
        clearInterval(interval);
        observer.disconnect();
      };
    } else {
      startAnimation();
      return () => clearInterval(interval);
    }
  }, [text, speed, maxIterations, sequential, revealDirection, isHovered, animateOn]);

  return (
    <span
      ref={containerRef}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </span>
  );
}
