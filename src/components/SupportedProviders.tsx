import React, { useState } from "react";
import { FiCopy, FiCheck, FiGlobe, FiMapPin } from "react-icons/fi";
import styles from "../pages/index.module.css";

interface Provider {
  id: string;
  name: string;
  region: string;
  isGlobal: boolean;
  status: string;
  description: string;
  installCmd: string;
  color: string;
  logo: string | React.ReactNode;
}

const PROVIDERS: Provider[] = [
  {
    id: "bkash",
    name: "bKash",
    region: "Bangladesh",
    isGlobal: false,
    status: "Stable",
    description: "Tokenized Checkout API v1.2.0 — token-based auth, auto refresh.",
    installCmd: "npm i @foxses/pay-bkash",
    color: "#E2136E",
    logo: "/bkash.jpg"
  },
  {
    id: "nagad",
    name: "Nagad",
    region: "Bangladesh",
    isGlobal: false,
    status: "Stable",
    description: "Checkout API v0.2.0 — RSA encryption for all sensitive data.",
    installCmd: "npm i @foxses/pay-nagad",
    color: "#F15A22",
    logo: "/nagad.png"
  },
  {
    id: "sslcommerz",
    name: "SSLCommerz",
    region: "Bangladesh",
    isGlobal: false,
    status: "Stable",
    description: "Payment Gateway API v4 — all Bangladeshi cards & mobile banking.",
    installCmd: "npm i @foxses/pay-sslcommerz",
    color: "#006FBA",
    logo: (
      <div className={styles.sslcommerzLogoText}>
        <span className={styles.sslRed}>SSL</span>
        <span className={styles.sslBlue}>COMMERZ</span>
      </div>
    )
  },
  {
    id: "stripe",
    name: "Stripe",
    region: "Global",
    isGlobal: true,
    status: "Stable",
    description: "Checkout Session API — 135+ currencies, card payments, webhooks.",
    installCmd: "npm i @foxses/pay-stripe",
    color: "#635BFF",
    logo: "/Stripe.png"
  },
  {
    id: "paypal",
    name: "PayPal",
    region: "Global",
    isGlobal: true,
    status: "Stable",
    description: "Orders API v2 — one-time & recurring payments, buyer protection.",
    installCmd: "npm i @foxses/pay-paypal",
    color: "#003087",
    logo: "/paypal.png"
  },
  {
    id: "binance",
    name: "Binance Pay",
    region: "Global",
    isGlobal: true,
    status: "Stable",
    description: "Binance Pay API — crypto checkout, QR code, 700+ digital assets.",
    installCmd: "npm i @foxses/pay-binance",
    color: "#F0B90B",
    logo: "/binance.png"
  },
  {
    id: "payeer",
    name: "Payeer",
    region: "Global",
    isGlobal: true,
    status: "Stable",
    description: "Payeer Merchant API — multi-currency wallet, instant settlements.",
    installCmd: "npm i @foxses/pay-payeer",
    color: "#2196F3",
    logo: "/payeer.png"
  },
  {
    id: "coinbase",
    name: "Coinbase",
    region: "Global",
    isGlobal: true,
    status: "Stable",
    description: "Commerce API — Bitcoin, Ethereum, USDC & more, no account required.",
    installCmd: "npm i @foxses/pay-coinbase",
    color: "#0052FF",
    logo: "/coinbase.webp"
  },
  {
    id: "coinpayments",
    name: "CoinPayments",
    region: "Global",
    isGlobal: true,
    status: "Stable",
    description: "IPN-based API — 2000+ altcoins, multi-coin wallet support.",
    installCmd: "npm i @foxses/pay-coinpayments",
    color: "#F0A500",
    logo: "/coinpayments.jpg"
  },
  {
    id: "cryptomus",
    name: "Cryptomus",
    region: "Global",
    isGlobal: true,
    status: "Stable",
    description: "Crypto payment gateway — static addresses, recurring billing.",
    installCmd: "npm i @foxses/pay-cryptomus",
    color: "#00C853",
    logo: "/cryptomus.png"
  }
];

function ProviderCard({ provider }: { provider: Provider }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(provider.installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className={styles.providerCard}
      style={{
        "--provider-glow-color": `${provider.color}18`,
        "--provider-border-hover": provider.color
      } as React.CSSProperties}
    >
      <div className={styles.providerCardHeader}>
        <div className={styles.providerLogoWrapper}>
          {typeof provider.logo === "string" ? (
            <img src={provider.logo} alt={provider.name} className={styles.providerLogoImg} />
          ) : (
            provider.logo
          )}
        </div>
        <span className={`${styles.providerStatusBadge} ${styles.statusStable}`}>
          <span className={styles.statusDotGreen} /> {provider.status}
        </span>
      </div>

      <div className={styles.providerCardMeta}>
        <h3 className={styles.providerName}>{provider.name}</h3>
        <span className={styles.providerRegion}>
          {provider.isGlobal ? (
            <FiGlobe size={12} className={styles.metaIcon} />
          ) : (
            <FiMapPin size={12} className={styles.metaIcon} />
          )}
          {provider.region}
        </span>
      </div>

      <p className={styles.providerDesc}>{provider.description}</p>

      <div className={styles.installWidget} onClick={handleCopy} title="Click to copy install command">
        <code className={styles.installCode}>{provider.installCmd}</code>
        <button className={`${styles.installCopyBtn} ${copied ? styles.installCopied : ""}`}>
          {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
        </button>
      </div>
    </div>
  );
}

export default function SupportedProviders() {
  return (
    <section className={styles.providersSection}>
      <div className={styles.container}>
        <div className={styles.providersHeader}>
          <span className={styles.aboutPreTitle}>Modular Core</span>
          <h2 className={styles.showcaseTitle}>Supported Providers</h2>
          <p className={styles.showcaseSubtitle}>
            Each provider is a separate package — install only what you need.
          </p>
        </div>

        <div className={styles.providersGrid}>
          {PROVIDERS.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </div>
    </section>
  );
}
