import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiZap, FiLayers, FiShield, FiLock, FiCheck } from "react-icons/fi";
import styles from "../pages/index.module.css";

interface GatewayNode {
  id: string;
  name: string;
  color: string;
  logo: string;
  x: number;
  y: number;
  floatDelay: number;
}

const GATEWAYS_NODES: GatewayNode[] = [
  { id: "stripe", name: "Stripe", color: "#635BFF", logo: "/Stripe.png", x: -180, y: -100, floatDelay: 0 },
  { id: "bkash", name: "bKash", color: "#E2136E", logo: "/bkash.jpg", x: 180, y: -100, floatDelay: 0.7 },
  { id: "nagad", name: "Nagad", color: "#F15A22", logo: "/nagad.png", x: -200, y: 30, floatDelay: 1.4 },
  { id: "coinbase", name: "Coinbase", color: "#0052FF", logo: "/coinbase.png", x: 200, y: 30, floatDelay: 2.1 },
  { id: "coinpayments", name: "Coinpayments", color: "#F0A500", logo: "/coinpayments.jpg", x: -120, y: 170, floatDelay: 2.8 },
  { id: "cryptomus", name: "Cryptomus", color: "#00C853", logo: "/cryptomus.png", x: 120, y: 170, floatDelay: 3.5 },
  { id: "binance", name: "Binance", color: "#F0B90B", logo: "/binance.png", x: -60, y: -200, floatDelay: 4.2 },
  { id: "payeer", name: "Payeer", color: "#2196F3", logo: "/payeer.png", x: 60, y: -200, floatDelay: 4.9 },
  { id: "paypal", name: "PayPal", color: "#003087", logo: "/paypal.png", x: 0, y: 220, floatDelay: 5.6 }
];

export default function WhatIsFoxsesPay() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredCenter, setHoveredCenter] = useState(false);

  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.aboutLayout}>
          {/* Left Column: Description & Value Propositions */}
          <div className={styles.aboutLeft}>
            <span className={styles.aboutPreTitle}>Overview</span>
            <h2 className={styles.aboutTitle}>
              What is <span className={styles.highlightText}>Foxses Pay</span>?
            </h2>
            <p className={styles.aboutDescription}>
              Foxses Pay is a unified, developer-first payment engine for JavaScript and the Web. 
              Instead of integrating and maintaining separate libraries for bKash, Nagad, SSLCommerz, and Stripe, 
              Foxses Pay bridges them into a single, standardized client API.
            </p>

            <div className={styles.featureGrid}>
              <div className={styles.aboutFeatureCard}>
                <div className={styles.featureIconWrapper}>
                  <FiLayers size={20} className={styles.featureIconBlue} />
                </div>
                <div>
                  <h4 className={styles.featureCardTitle}>Unified API Wrapper</h4>
                  <p className={styles.featureCardDesc}>
                    Create checkout URLs, process agreements, and query payments across different gateways using the same configuration structure.
                  </p>
                </div>
              </div>

              <div className={styles.aboutFeatureCard}>
                <div className={styles.featureIconWrapper}>
                  <FiShield size={20} className={styles.featureIconGreen} />
                </div>
                <div>
                  <h4 className={styles.featureCardTitle}>Automated Security</h4>
                  <p className={styles.featureCardDesc}>
                    Built-in signature validation and webhook hash integrity checkers prevent billing spoofing out of the box.
                  </p>
                </div>
              </div>

              <div className={styles.aboutFeatureCard}>
                <div className={styles.featureIconWrapper}>
                  <FiZap size={20} className={styles.featureIconAmber} />
                </div>
                <div>
                  <h4 className={styles.featureCardTitle}>Zero Boilerplate</h4>
                  <p className={styles.featureCardDesc}>
                    Designed with TypeScript for strict type checking. Connect, verify, and settle payments with just a few lines of clean code.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Core & Gateway Connectivity */}
          <div className={styles.aboutRight}>
            <div className={styles.visualCanvas}>
              {/* Interactive SVG Connector Lines & Ripple Waves */}
              <svg className={styles.connectorSvg} viewBox="-250 -250 500 500">
                <defs>
                  {GATEWAYS_NODES.map((node) => (
                    <linearGradient key={`grad-${node.id}`} id={`grad-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f4a03c" stopOpacity="0.9" />
                      <stop offset="100%" stopColor={node.color} stopOpacity="0.9" />
                    </linearGradient>
                  ))}
                  {/* Glowing line filter */}
                  <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Animated Radial Ripple Waves for continuous pulse */}
                <circle cx="0" cy="0" r="50" fill="none" stroke="rgba(244, 160, 60, 0.15)" strokeWidth="1.5">
                  <animate attributeName="r" values="50;240" dur="5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0" dur="5s" repeatCount="indefinite" />
                </circle>
                <circle cx="0" cy="0" r="50" fill="none" stroke="rgba(244, 160, 60, 0.08)" strokeWidth="1">
                  <animate attributeName="r" values="50;240" dur="5s" begin="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0" dur="5s" begin="2.5s" repeatCount="indefinite" />
                </circle>

                {/* Draw connection paths */}
                {GATEWAYS_NODES.map((node) => {
                  const isActive = hoveredNode === node.id || hoveredCenter;
                  return (
                    <g key={`path-group-${node.id}`}>
                      {/* Base connection line */}
                      <line
                        x1="0"
                        y1="0"
                        x2={node.x}
                        y2={node.y}
                        stroke={isActive ? `url(#grad-${node.id})` : "rgba(244, 160, 60, 0.08)"}
                        strokeWidth={isActive ? "3" : "1.2"}
                        filter={isActive ? "url(#glow)" : undefined}
                        style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                      />
                      {/* Running dashes representing payment flow */}
                      {isActive && (
                        <line
                          x1="0"
                          y1="0"
                          x2={node.x}
                          y2={node.y}
                          stroke="#ffffff"
                          strokeWidth="2.5"
                          strokeDasharray="8, 14"
                          className={styles.runningDash}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Central SDK Core Orb */}
              <motion.div
                className={`${styles.centralOrb} ${hoveredCenter ? styles.centralOrbHovered : ""}`}
                onMouseEnter={() => setHoveredCenter(true)}
                onMouseLeave={() => setHoveredCenter(false)}
                animate={{
                  boxShadow: hoveredCenter 
                    ? "0 0 45px rgba(244, 160, 60, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.3)"
                    : [
                        "0 0 25px rgba(244, 160, 60, 0.15), inset 0 0 5px rgba(255, 255, 255, 0.05)",
                        "0 0 35px rgba(244, 160, 60, 0.3), inset 0 0 8px rgba(255, 255, 255, 0.1)",
                        "0 0 25px rgba(244, 160, 60, 0.15), inset 0 0 5px rgba(255, 255, 255, 0.05)"
                      ]
                }}
                transition={{
                  boxShadow: hoveredCenter 
                    ? { duration: 0.3 } 
                    : { repeat: Infinity, duration: 4, ease: "easeInOut" }
                }}
              >
                <div className={styles.orbContent}>
                  <img src="/foxses.png" alt="Foxses Pay logo" className={styles.orbLogoImg} />
                  <span className={styles.orbText}>SDK Core</span>
                </div>
              </motion.div>

              {/* Floating Gateway Nodes */}
              {GATEWAYS_NODES.map((node) => {
                const isActive = hoveredNode === node.id;
                return (
                  <motion.div
                    key={node.id}
                    className={`${styles.satelliteNode} ${isActive ? styles.satelliteNodeActive : ""}`}
                    style={{
                      left: `calc(50% + ${node.x}px - 32px)`, // Offset for 64px width node
                      top: `calc(50% + ${node.y}px - 32px)`, // Offset for 64px height node
                      "--node-glow-color": node.color
                    } as React.CSSProperties}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    // Floating zero-gravity motion + hover scaling
                    animate={{
                      y: [0, -6, 0],
                      x: [0, 2, 0],
                      scale: isActive ? 1.15 : 1
                    }}
                    transition={{
                      y: {
                        repeat: Infinity,
                        duration: 4,
                        delay: node.floatDelay,
                        ease: "easeInOut"
                      },
                      x: {
                        repeat: Infinity,
                        duration: 5,
                        delay: node.floatDelay * 0.5,
                        ease: "easeInOut"
                      },
                      scale: {
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                      }
                    }}
                  >
                    <div className={styles.nodeLogoWrapper}>
                      <img src={node.logo} alt={node.name} className={styles.nodeLogoImg} />
                    </div>
                    <span className={styles.nodeTooltip}>{node.name}</span>
                  </motion.div>
                );
              })}


            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
