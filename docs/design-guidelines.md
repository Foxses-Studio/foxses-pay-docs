---
sidebar_position: 4
title: Design Guidelines
description: Design system guidelines for Foxses Pay, including typography, colors, and layout rules.
---

# Design Guidelines

This page outlines the styling and design tokens used across the Foxses Pay documentation site and its user interfaces. Our style guidelines ensure a modern, clean, and highly readable developer experience.

---

## Typography

We use **Nunito** as our primary typeface for headers, body copy, and navigation elements. Nunito is a well-balanced, rounded sans-serif font designed for modern web interfaces.

- **Primary Font**: `Nunito, sans-serif`
- **Monospace Font (Code)**: `Fira Code, SFMono-Regular, Consolas, Monaco, monospace`

```css
:root {
  --ifm-font-family-base: 'Nunito', sans-serif;
  --ifm-heading-font-family: 'Nunito', sans-serif;
}
```

---

## Color Palette

Our brand color palette is centered around a warm orange accent (`#f4a03c`) paired with premium dark and clean light mode variables.

| Token / Shade | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Primary Color** | `#f4a03c` | Main CTA, active link text, highlights |
| **Light Variant** | `#f5ad57` | Hover states, active borders (light theme) |
| **Lighter Variant** | `#f6b76e` | Decorative badges, code text highlights |
| **Lightest Variant** | `#f8c991` | Subtle backgrounds (light theme) |
| **Dark Variant** | `#db8d2f` | Hover states (dark theme), bold details |
| **Darker Variant** | `#cc832c` | Borders, subtle focus rings |
| **Darkest Variant** | `#a86c24` | Shadow outlines, high-contrast dark accents |

---

## Borders and Radii

To maintain a clean and structured look, all interactive elements, containers, cards, and input fields must use a border radius of **8px or less**. 

- **Maximum Radius**: `8px`
- **Utility CSS Variable**: `--ifm-global-radius: 8px;`

```css
:root {
  --ifm-global-radius: 8px; /* Strict upper limit */
}
```

All standard UI elements (including buttons, code blocks, card grids, and input boxes) are aligned to this standard.
