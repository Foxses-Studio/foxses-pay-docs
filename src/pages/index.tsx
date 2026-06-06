import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.badge}>Open Source · MIT License</div>
        <Heading as="h1" className={styles.heroTitle}>
          <span className={styles.brand}>foxses</span>
          <span className={styles.brandPay}>-pay</span>
        </Heading>
        <p className={styles.heroSubtitle}>
          One API for <strong>Stripe</strong>, <strong>bKash</strong>,{" "}
          <strong>Nagad</strong>, <strong>SSLCommerz</strong> and more.
          <br />
          Install once. Configure once. Accept payments everywhere.
        </p>
        <div className={styles.installBox}>
          <code>npm install @foxses/pay</code>
        </div>
        <div className={styles.heroButtons}>
          <Link className={styles.btnPrimary} to="/docs/getting-started">
            Get Started →
          </Link>
          <Link className={styles.btnSecondary} to="https://github.com/Foxses-Studio/foxses-pay">
            View on GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}

function CodeDemo() {
  return (
    <div className={styles.codeSection}>
      <div className={styles.container}>
        <Heading as="h2" className={styles.sectionTitle}>As simple as it gets</Heading>
        <p className={styles.sectionSubtitle}>Same three functions — any provider.</p>
        <div className={styles.codeBlock}>
          <pre>{`import { configure, createPayment, verifyPayment, refund } from "@foxses/pay";

// Configure once
configure({
  bkash: { appKey: "...", secretKey: "...", username: "...", password: "...",
           callbackUrl: "https://yoursite.com/callback",
           successUrl: "https://yoursite.com/success",
           failureUrl: "https://yoursite.com/failure" },
  stripe: { apiKey: "sk_test_...",
            successUrl: "https://yoursite.com/success",
            failureUrl: "https://yoursite.com/cancel" },
});

// Create payment — same API for every provider
const payment = await createPayment("bkash", {
  amount: 500, currency: "BDT", orderId: "ORDER-001",
});
// redirect user to → payment.checkoutUrl

// Verify after callback
const result = await verifyPayment("bkash", { transactionId: paymentID });
// result.status === "completed"

// Refund
const refunded = await refund("bkash", { transactionId: result.transactionId, amount: 500 });`}</pre>
        </div>
      </div>
    </div>
  );
}

const providers = [
  { name: "bKash", region: "🇧🇩 Bangladesh", description: "Tokenized Checkout API v1.2.0 — token-based auth, auto refresh.", install: "@foxses/pay-bkash" },
  { name: "Nagad", region: "🇧🇩 Bangladesh", description: "Checkout API v0.2.0 — RSA encryption for all sensitive data.", install: "@foxses/pay-nagad" },
  { name: "SSLCommerz", region: "🇧🇩 Bangladesh", description: "Payment Gateway API v4 — all Bangladeshi cards & mobile banking.", install: "@foxses/pay-sslcommerz" },
  { name: "Stripe", region: "🌍 Global", description: "Checkout Session API — 135+ currencies, card payments, webhooks.", install: "@foxses/pay-stripe" },
];

function Providers() {
  return (
    <div className={styles.providersSection}>
      <div className={styles.container}>
        <Heading as="h2" className={styles.sectionTitle}>Supported Providers</Heading>
        <p className={styles.sectionSubtitle}>Each provider is a separate package — install only what you need.</p>
        <div className={styles.providersGrid}>
          {providers.map((p) => (
            <div key={p.name} className={styles.providerCard}>
              <div className={styles.providerHeader}>
                <span className={styles.providerName}>{p.name}</span>
                <span className={styles.providerRegion}>{p.region}</span>
                <span className={styles.stableBadge}>Stable</span>
              </div>
              <p className={styles.providerDesc}>{p.description}</p>
              <code className={styles.providerInstall}>npm i {p.install}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const features = [
  { icon: "⚡", title: "Simple API", description: "Three functions — createPayment, verifyPayment, refund. No provider-specific code in your business logic." },
  { icon: "🔌", title: "Modular", description: "Install only the providers you need. @foxses/pay includes all. Or mix-and-match individual packages." },
  { icon: "🔒", title: "Type Safe", description: "Full TypeScript support with strict types. Autocomplete for config, params, and responses." },
  { icon: "🛡️", title: "Error Handling", description: "Typed errors — AuthenticationError, ValidationError, NetworkError, ProviderError." },
  { icon: "🔄", title: "Unified Response", description: "Every provider returns the same PaymentResponse shape. No provider-specific parsing needed." },
  { icon: "🚀", title: "Switch Providers", description: "Change provider in one line. Your business logic stays the same." },
];

function Features() {
  return (
    <div className={styles.featuresSection}>
      <div className={styles.container}>
        <Heading as="h2" className={styles.sectionTitle}>Why foxses-pay?</Heading>
        <div className={styles.featuresGrid}>
          {features.map((f) => (
            <div key={f.title} className={styles.featureCard}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <Heading as="h3" className={styles.featureTitle}>{f.title}</Heading>
              <p className={styles.featureDesc}>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main>
        <Hero />
        <CodeDemo />
        <Providers />
        <Features />
      </main>
    </Layout>
  );
}
