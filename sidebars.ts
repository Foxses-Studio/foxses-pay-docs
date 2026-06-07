import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docsSidebar: [
    { type: "doc", id: "getting-started", label: "Getting Started" },
    { type: "doc", id: "api-reference", label: "API Reference" },
    { type: "doc", id: "error-handling", label: "Error Handling" },
    { type: "doc", id: "design-guidelines", label: "Design Guidelines" },
    {
      type: "category",
      label: "Providers",
      collapsed: false,
      items: [
        "providers/bkash",
        "providers/nagad",
        "providers/sslcommerz",
        "providers/stripe",
      ],
    },
  ],
};

export default sidebars;
