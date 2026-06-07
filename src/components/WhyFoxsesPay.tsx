import React from "react";
import { FiZap, FiLayers, FiLock, FiShield, FiRefreshCw, FiSend } from "react-icons/fi";
import styles from "../pages/index.module.css";

interface Feature {
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

const FEATURES: Feature[] = [
  {
    title: "Simple API",
    description: "Three functions — createPayment, verifyPayment, refund. No provider-specific code in your business logic.",
    color: "#fbbf24", // Amber
    icon: <FiZap size={22} style={{ color: "#fbbf24" }} />
  },
  {
    title: "Modular",
    description: "Install only the providers you need. @foxses/pay includes all. Or mix-and-match individual packages.",
    color: "#38bdf8", // Blue
    icon: <FiLayers size={22} style={{ color: "#38bdf8" }} />
  },
  {
    title: "Type Safe",
    description: "Full TypeScript support with strict types. Autocomplete for config, params, and responses.",
    color: "#10b981", // Green
    icon: <FiLock size={22} style={{ color: "#10b981" }} />
  },
  {
    title: "Error Handling",
    description: "Typed errors — AuthenticationError, ValidationError, NetworkError, ProviderError.",
    color: "#ef4444", // Red
    icon: <FiShield size={22} style={{ color: "#ef4444" }} />
  },
  {
    title: "Unified Response",
    description: "Every provider returns the same PaymentResponse shape. No provider-specific parsing needed.",
    color: "#d946ef", // Pink/Magenta
    icon: <FiRefreshCw size={22} style={{ color: "#d946ef" }} />
  },
  {
    title: "Switch Providers",
    description: "Change provider in one line. Your business logic stays the same.",
    color: "#635BFF", // Indigo
    icon: <FiSend size={22} style={{ color: "#635BFF" }} />
  }
];

export default function WhyFoxsesPay() {
  return (
    <section className={styles.whySection}>
      <div className={styles.container}>
        <div className={styles.whyHeader}>
          <span className={styles.aboutPreTitle}>Benefits</span>
          <h2 className={styles.showcaseTitle}>Why foxses-pay?</h2>
          <p className={styles.showcaseSubtitle}>
            A robust, standard wrapper built for speed, safety, and developer efficiency.
          </p>
        </div>

        <div className={styles.whyGrid}>
          {FEATURES.map((feature, idx) => (
            <div 
              key={idx} 
              className={styles.whyCard}
              style={{
                "--feature-glow-color": `${feature.color}14`,
                "--feature-border-hover": feature.color
              } as React.CSSProperties}
            >
              <div className={styles.whyIconWrapper}>
                {feature.icon}
              </div>
              <h3 className={styles.whyCardTitle}>{feature.title}</h3>
              <p className={styles.whyCardDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
