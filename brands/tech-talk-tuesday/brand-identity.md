# Brand Identity Specification: Tech Talk Tuesday

This document defines the creative north star and branding guidelines for **Tech Talk Tuesday (T3 / TTT)**. These specifications are implemented programmatically in `t3-theme.css` and applied across all web-based deliverables.

---

## 1. Creative North Star: "Toy-Core Tech"

The brand personality is **playful, innovative, and conversational**. It bridges the gap between complex technology and community-driven storytelling through a "Toy-core" aesthetic. 

The visual style is a blend of **Tactile/Skeuomorphism** (vinyl toys, retro-tech hardware, cassette tapes) and **Modern Minimalism**. Rather than flat, sterile blocks, UI elements feel like physical modules or "kits" that can be clicked together. 

Target Audience: Developers, engineers, tech enthusiasts, and students.
Emotional Response: Welcoming, curious, energized, and community-centric.

---

## 2. Core Color Palette (Dark Mode Optimized)

Following user feedback, the T3 design system operates natively in **Dark Mode** to evoke a high-tech "command center" feel while preserving its signature playful colors.

| Token Name | Hex Code | Visual Role |
| :--- | :--- | :--- |
| **Primary (Teal)** | `#008b8b` | Lead brand identifier; active borders, key details |
| **Primary Active** | `#00ffff` | Glowing hover states, active indicators |
| **Secondary (Gold)** | `#ffb81c` | High-energy highlighting; alert badges, CTAs |
| **Tertiary (Terracotta)** | `#d2691e` | Secondary accents; topic tags, category styling |
| **Background (Deep Slate)** | `#071212` | Main page canvas; a deep slate-black with a teal tint |
| **Surface (Navy Teal)** | `#0d1f1f` | Component panels, containers, and card bodies |
| **Surface Hover** | `#142d2d` | Active interactive surfaces |
| **Text (Soft Teal-White)** | `#e2fffe` | Main body copy, high legibility headers |
| **Text Muted (Gray-Teal)** | `#709595` | Captions, metadata, placeholders |
| **Border (Teal Outline)** | `#006a6a` | Machinery 3D borders and visual dividers |

---

## 3. Typography Rules

T3 uses a high-contrast dual-typeface system to mirror dashboard panels and toys:

- **Display & Headings (Sora)**: A wide geometric typeface with rounded apertures. It is used in bold weights and uppercase transformations to mimic a "locked-up" logo or technical sticker.
- **Body & Labels (Hanken Grotesk)**: A sharp, professional sans-serif that balances the playfulness of Sora and ensures long-form readability of technical slide notes or documentation.

### Type scale mapping:
- **Display**: Upper-case, tracking `0.02em`, `font-weight: 800`
- **Headlines**: `font-weight: 700`
- **Body Text**: `font-weight: 400`, `line-height: 1.6`
- **Labels**: Semi-bold, uppercase, tracking `0.05em`

---

## 4. Shapes & Spacing

To align with the squircle head of the T3 robot mascot, sharp 90-degree corners are avoided.

- **Border Radius**:
  - Tiny elements (checkboxes, badges): `4px` (`0.25rem`)
  - Buttons and Small Cards: `8px` (`0.5rem`)
  - Large Panels and Slide viewport: `16px` (`1rem`)
- **Borders**: Always use a visible outline (`2px solid var(--mcs-color-border)`) to reinforce the structural, "bolted-together" toy modularity.
- **Shadows (The "Toy Lift")**: Avoid soft, blurry shadows. Instead, use flat, solid offset shadows matching the border color to imply physical depth. 
  - Primary button shadow: `3px 3px 0 #000000`
  - Container panel shadow: `4px 4px 0 var(--mcs-color-border)`

---

## 5. Signature Components

### Speech Bubbles (`.mcs-bubble`)
Quotes, AI insights, or robot Mascot remarks should be wrapped in a speech bubble container.
- Background: `--mcs-color-secondary` (`#ffb81c` Gold)
- Text: Black (`#000000`)
- Border: `2px solid #000000`
- Shadow: Flat black offset
- Tail: Directional arrow indicator at the bottom or side

### Segmented Loading Bars (`.mcs-progress-bar`)
Progress indicators resemble analog mechanical grids instead of smooth fluid fills.
- Made of repeating, distinct square blocks indicating loading steps.
