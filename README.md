<div align="center">
  <img src="static/img/foxses.png" alt="foxses-pay Logo" width="120" />
  <h1>foxses-pay-docs</h1>
  <p><strong>Official documentation portal for Foxses Pay — The unified payment gateway SDK.</strong></p>

  <a href="https://paydoc.foxses.com"><strong>Explore the Live Docs »</strong></a>
  
  <br />
  <br />
  
  [![NPM Version](https://img.shields.io/npm/v/@foxses/pay?color=blue&style=flat-square)](https://www.npmjs.com/package/@foxses/pay)
  [![GitHub License](https://img.shields.io/github/license/Foxses-Studio/foxses-pay?color=green&style=flat-square)](https://github.com/Foxses-Studio/foxses-pay/blob/main/LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/Foxses-Studio/foxses-pay-docs/pulls)
  [![Docusaurus](https://img.shields.io/badge/Built%20with-Docusaurus%203-blue?style=flat-square&logo=docusaurus)](https://docusaurus.io)
</div>

---

## 📖 About Foxses Pay

**Foxses Pay** (`@foxses/pay`) is a unified Node.js / TypeScript payment gateway integration SDK. It provides a simple, consistent API to handle multiple payment methods across different regions — from Bangladeshi local gateways to global crypto and card processors.

This repository (`foxses-pay-docs`) contains the source code for the official documentation website built using **Docusaurus 3**, enhanced with custom React components, smooth Framer Motion animations, and a sleek dark-themed responsive design.

### ✅ Supported Payment Gateways

#### 🇧🇩 Bangladeshi Gateways
| Gateway | Description |
| :--- | :--- |
| **bKash** | Tokenized checkout integration |
| **Nagad** | Merchant payment API |
| **SSLCommerz** | Multi-method local gateway |

#### 🌐 Global Card & Digital Wallets
| Gateway | Description |
| :--- | :--- |
| **Stripe** | Global card & payment intents |
| **PayPal** | PayPal order & capture flow |
| **Payeer** | Digital wallet payments |

#### ₿ Crypto Gateways
| Gateway | Description |
| :--- | :--- |
| **Binance Pay** | BNB/crypto checkout |
| **Coinbase Commerce** | Multi-crypto invoices |
| **CoinPayments** | 2000+ coins support |
| **Cryptomus** | Crypto payment gateway |
| **NOWPayments** | Non-custodial crypto payments |

---

## 🚀 Getting Started with the Docs

To run this documentation website locally, follow these steps:

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/Foxses-Studio/foxses-pay-docs.git
cd foxses-pay-docs

# Install dependencies
npm install
```

### 2. Local Development
Start the Docusaurus development server:

```bash
npm run start
```
This will start a local server at `http://localhost:3000` and watch for changes.

### 3. Build & Production Preview
To generate a static build and serve it:

```bash
# Build the static site
npm run build

# Serve the build output locally
npm run serve
```

---

## 📂 Project Structure

Here is a quick overview of the key directories in this repository:

```
foxses-pay-docs/
├── docs/
│   ├── getting-started.md      # Installation & setup guide
│   ├── api-reference.md        # Full API signatures
│   ├── error-handling.md       # Gateway error handling guide
│   ├── design-guidelines.md    # UI/UX design notes
│   └── providers/              # Provider-specific guides
│       ├── bkash.md
│       ├── nagad.md
│       ├── sslcommerz.md
│       ├── stripe.md
│       ├── paypal.md
│       ├── payeer.md
│       ├── binance.md
│       ├── coinbase.md
│       ├── coinpayments.md
│       ├── cryptomus.md
│       └── nowpayments.md
├── src/
│   ├── components/             # Custom visual components (Particles, DecryptedText, etc.)
│   ├── pages/                  # Landing page & standalone views
│   └── css/custom.css          # Global styles & theme overrides
├── static/                     # Static assets (images, icons)
├── docusaurus.config.ts        # Main site configuration
└── sidebars.ts                 # Sidebar navigation structure
```

---

## 🛠️ Scripts & Commands

Below is a list of commands defined in `package.json`:

| Command | Description |
| :--- | :--- |
| `npm run start` | Run the local dev server at `localhost:3000`. |
| `npm run build` | Build the site for production. |
| `npm run serve` | Locally preview the production build. |
| `npm run typecheck` | Run TypeScript type checking. |
| `npm run clear` | Clear Docusaurus cache/build directories. |
| `npm run deploy` | Deploy to GitHub Pages. |

---

## 🤝 Contributing

Contributions to improve the documentation are very welcome! If you notice any typos, missing options, or outdated API examples, feel free to open a Pull Request.

1. Fork the repo.
2. Create your feature branch (`git checkout -b doc/amazing-feature`).
3. Commit your changes (`git commit -m 'Docs: Add detailed callback payload info'`).
4. Push to the branch (`git push origin doc/amazing-feature`).
5. Open a Pull Request.

---

<div align="center">
  <p>Developed with ❤️ by <strong><a href="https://github.com/Foxses-Studio">Foxses Studio</a></strong></p>
</div>
