<div align="center">
  <img src="static/img/foxses.png" alt="foxses-pay Logo" width="120" />
  <h1>foxses-pay-docs</h1>
  <p><strong>Official documentation portal for Foxses Pay - The unified payment gateway SDK.</strong></p>

  <a href="https://paydoc.foxses.com"><strong>Explore the Live Docs »</strong></a>
  
  <br />
  <br />
  
  [![NPM Version](https://img.shields.io/npm/v/@foxses/pay?color=blue&style=flat-square)](https://www.npmjs.com/package/@foxses/pay)
  [![GitHub License](https://img.shields.io/github/license/Foxses-Studio/foxses-pay?color=green&style=flat-square)](https://github.com/Foxses-Studio/foxses-pay/blob/main/LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/Foxses-Studio/foxses-pay/pulls)
</div>

---

## 📖 About Foxses Pay

**Foxses Pay** (`foxses-pay`) is a unified Node.js / TypeScript payment gateway integration SDK. It provides a simple, consistent API to handle multiple payment methods across different regions, specifically focusing on Bangladeshi payment methods alongside global ones.

This repository (`foxses-pay-docs`) contains the source code for the official documentation website built using **Docusaurus 3**, enhanced with custom React components, smooth Framer Motion animations, and a sleek dark-themed responsive design.

### Supported Payment Gateways in Foxses Pay:
*   🇧🇩 **bKash** (Tokenized Checkout)
*   🇧🇩 **Nagad**
*   🇧🇩 **SSLCommerz**
*   🌐 **Stripe**
*   *More coming soon...*

---

## 🚀 Getting Started with the Docs

To run this documentation website locally, follow these steps:

### 1. Clone & Install Dependencies
Since this project uses `npm` for dependency management:

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

*   📂 **`docs/`** — All markdown/MDX files containing the actual documentation text.
    *   `getting-started.md` — Installation and setup guide for the SDK.
    *   `api-reference.md` — Detailed API signatures.
    *   `error-handling.md` — Guide on dealing with gateway errors.
    *   📂 `providers/` — Provider-specific instructions (`bkash.md`, `nagad.md`, `sslcommerz.md`, `stripe.md`).
*   📂 **`src/`** — React components, pages, custom styling.
    *   `components/` — Custom visual enhancements like `Particles`, `DecryptedText`, `SupportedProviders`.
    *   `pages/` — Landing page and other standalone views.
*   📄 **`docusaurus.config.ts`** — Main site configuration (navigation links, site meta, themes).
*   📄 **`sidebars.ts`** — Controls the ordering and structure of the sidebar navigation.

---

## 🛠️ Scripts & Commands

Below is a list of commands defined in `package.json`:

| Command | Description |
| :--- | :--- |
| `npm run start` | Run the local dev server. |
| `npm run build` | Build the site for production. |
| `npm run serve` | Locally preview the production build. |
| `npm run typecheck` | Run TypeScript type checking compiler. |
| `npm run clear` | Clear Docusaurus cache/build directories. |

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
