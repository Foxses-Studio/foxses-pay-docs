import { useState, type ReactNode } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./index.module.css";
import { motion } from "framer-motion";
import SplitText from "../components/SplitText";
import { FiCopy, FiCheck } from "react-icons/fi";
import WhatIsFoxsesPay from "../components/WhatIsFoxsesPay";
import SupportedProviders from "../components/SupportedProviders";
import WhyFoxsesPay from "../components/WhyFoxsesPay";

function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install @foxses/pay");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={styles.heroSection}>
      {/* Dashed Grid Background */}
      <div className={styles.heroGridBg}></div>
      {/* Decorative dashed circle markers */}
      <div className={styles.heroCircleMarker1}></div>
      <div className={styles.heroCircleMarker2}></div>

      <div className={styles.heroContent}>
        <h1 className={styles.heroMainTitle}>
          The Unified Payment Engine for the Web
        </h1>
        <p className={styles.heroSubTitle}>
          Connect bKash, Nagad, SSLCommerz, and Stripe in minutes. <br className={styles.desktopOnly} />
          Write once, accept payments anywhere.
        </p>

        <div className={styles.heroActionButtons}>
          <Link className={styles.heroBtnPrimary} to="/docs/getting-started">
            Get Started
          </Link>
          <Link className={styles.heroBtnSecondary} to="https://github.com/Foxses-Studio/foxses-pay">
            View on GitHub
          </Link>
        </div>

        <div className={styles.copyWidgetContainer}>
          <div 
            className={`${styles.copyCommandWidget} ${copied ? styles.copiedActive : ""}`} 
            onClick={handleCopy}
            title="Click to copy command"
          >
            <span className={styles.widgetPrompt}>▲ ~</span>
            <code className={styles.widgetCode}>npm install @foxses/pay</code>
            <span className={styles.copyFeedback}>
              {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main>
        <Hero />
        <WhatIsFoxsesPay />
        <SupportedProviders />
        <WhyFoxsesPay />
      </main>
    </Layout>
  );
}
