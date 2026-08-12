# Brand Identity Specification: WPP Web Design System

This document defines the creative north star and branding guidelines for the **WPP Web Design System**. These specifications are implemented programmatically in `wpp-theme.css` and applied across all web-based deliverables.

---

## 1. Creative North Star: "Grid & Precision"

The WPP brand personality represents **Corporate Modernism** and **Precision Minimalism**. It balances the authoritative, established presence of a global heritage brand with a forward-thinking, tech-enabled clarity.

The visual style is defined by a rigorous adherence to a visible structural grid, high-contrast typography, and a deliberate use of white space. It evokes a sense of confidence, transparency, and strategic intelligence. The UI feels intentional and engineered, avoiding unnecessary decoration in favor of functional elegance and bold communication.

Target Audience: C-suite executives, strategic partners, and tech-forward internal teams.
Emotional Response: Decisive, visionary, clear, and structured.

---

## 2. Core Color Palette (Light/Neutral)

The palette is anchored by **Ford Twilight**, a deep, authoritative navy that provides primary structural weight, and **Wimbledon**, a sophisticated off-white foundation for layouts that reduces eye strain while maintaining high readability.

| Token Name | Hex Code | Visual Role |
| :--- | :--- | :--- |
| **Primary (Twilight Navy)** | `#00142e` | Headlines, primary buttons, structural grid borders |
| **Secondary (Sand)** | `#ebddad` | Section highlights, active elements, secondary outlines |
| **Tertiary (Wimbledon)** | `#fdfcf8` | Container backdrops and inner surfaces |
| **Background (Off-White)** | `#fbf9fb` | Main page canvas; clean, soft background |
| **Surface (Wimbledon Card)** | `#efedf0` | Segmented grid panels |
| **Surface Hover** | `#e9e7ea` | Active interactive surfaces |
| **Text (Twilight Black)** | `#1b1b1e` | Main body copy, high legibility headers |
| **Text Muted (Slate Gray)** | `#44474d` | Captions, metadata, placeholders |
| **Border (Navy Outline)** | `#00142e` | Precise 1px borders and gridlines |

---

## 3. Typography Rules

The typography utilizes **Hanken Grotesk**, a sharp, contemporary grotesque typeface that provides excellent legibility at small sizes and high impact at display sizes.

- **Headlines & Display (Hanken Grotesk)**: Use extreme scale contrast. Headlines are always uppercase and set in bold weights (800+) with a **tight line-height (0.8x - 0.9x)** to create a dense, block-like visual weight.
- **Body & Labels (Hanken Grotesk)**: Regular weight (400) for copy. Labels feature increased letter-spacing (`0.1em`) for an architectural, technical feel.

### Type scale mapping:
- **Display**: Upper-case, tracking `-0.03em`, `font-weight: 800`, `line-height: 0.8`
- **Headlines**: Upper-case, tracking `-0.02em`, `font-weight: 800`, `line-height: 0.8`
- **Body Text**: `font-weight: 400`, `line-height: 1.2`
- **Labels**: `font-weight: 500`, uppercase, tracking `0.1em`

---

## 4. Shapes & Spacing

To align with corporate precision, the shape language is strictly **sharp and rectangular**.

- **Border Radius**: Set to `0px` for all elements (cards, buttons, inputs, labels). Rounded corners are forbidden.
- **Borders**: Define containers with thin, high-contrast solid borders (`1px solid var(--mcs-color-border)`).
- **Elevation**: Flat depth. Hierarchy is established through solid color blocks and outlines rather than drop shadows. Soft drop shadows or blur shadows are forbidden.
- **Rhythm**: Spacing conforms to a strict grid module (64px grid-units) and margins (`4rem` desktop, `1.5rem` mobile).
- **Visible Grid Layout**: Optional background gridlines in Sand (`#ebddad`) align with content blocks to give a blueprint structure.
