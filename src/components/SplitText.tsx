import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export default function SplitText({
  text,
  className = "",
  delay = 0,
  duration = 0.5,
  stagger = 0.03,
}: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: duration,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      },
    },
  };

  return (
    <span
      ref={containerRef}
      className={`${className} split-text-container`}
      style={{ display: "inline-block", overflow: "hidden" }}
    >
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ display: "inline-flex", flexWrap: "wrap" }}
      >
        {words.map((word, wIdx) => (
          <span
            key={wIdx}
            style={{
              display: "inline-flex",
              marginRight: "0.25em",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {word.split("").map((char, cIdx) => (
              <motion.span
                key={cIdx}
                variants={letterVariants}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </span>
  );
}
