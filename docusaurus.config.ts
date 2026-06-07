import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "foxses-pay",
  tagline: "One API for Stripe, bKash, Nagad, SSLCommerz and more.",
  favicon: "img/foxses.png",

  future: {
    v4: true,
  },

  url: "https://paydoc.foxses.com",
  baseUrl: "/",

  organizationName: "Foxses-Studio",
  projectName: "foxses-pay",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/Foxses-Studio/foxses-pay/tree/main/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: "foxses-pay",
      logo: {
        alt: "foxses-pay logo",
        src: "img/foxses.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Docs",
        },
        {
          href: "https://www.npmjs.com/package/@foxses/pay",
          label: "npm",
          position: "right",
        },
        {
          href: "https://github.com/Foxses-Studio/foxses-pay",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            { label: "Getting Started", to: "/docs/getting-started" },
            { label: "API Reference", to: "/docs/api-reference" },
            { label: "Error Handling", to: "/docs/error-handling" },
          ],
        },
        {
          title: "Providers",
          items: [
            { label: "bKash", to: "/docs/providers/bkash" },
            { label: "Nagad", to: "/docs/providers/nagad" },
            { label: "SSLCommerz", to: "/docs/providers/sslcommerz" },
            { label: "Stripe", to: "/docs/providers/stripe" },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "npm",
              href: "https://www.npmjs.com/package/@foxses/pay",
            },
            {
              label: "GitHub",
              href: "https://github.com/Foxses-Studio/foxses-pay",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Foxses Studio. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "typescript", "javascript"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
