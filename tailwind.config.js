/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-surface-variant": "#524435", "error": "#ba1a1a", "surface-bright": "#f9f9f9",
        "primary-fixed-dim": "#ffb95f", "surface-container-highest": "#e2e2e2", "text-secondary": "#666666",
        "outline": "#857463", "inverse-primary": "#ffb95f", "secondary": "#5f5e5e", "on-background": "#1a1c1c",
        "on-primary": "#ffffff", "on-surface": "#1a1c1c", "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f3f4", "outline-variant": "#d7c3af", "primary-container": "#E8A838",
        "surface-dim": "#dadada", "background": "#f9f9f9", "surface-container-high": "#e8e8e8", "surface": "#f9f9f9",
        "primary": "#855300", "border-muted": "#E0E0E0", "on-primary-container": "#5b3800",
        "inverse-on-surface": "#f0f1f1", "surface-container": "#eeeeee", "surface-variant": "#e2e2e2"
      },
      borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
      spacing: {
        "gutter": "24px", "element-gap": "16px", "container-max": "1288px", "stack-lg": "48px",
        "margin-page": "32px", "section-gap": "120px", "stack-sm": "8px", "stack-md": "24px"
      },
      fontFamily: {
        "label-caps": ["Brandon Text"], "body-lg": ["Brandon Text"], "headline-lg": ["Brandon Text"],
        "button": ["Brandon Text"], "headline-md": ["Brandon Text"], "body-sm": ["Brandon Text"],
        "headline-sm": ["Brandon Text"], "headline-lg-mobile": ["Brandon Text"], "body-md": ["Brandon Text"]
      },
      fontSize: {
        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "700" }],
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
        "headline-lg": ["56px", { "lineHeight": "64px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "button": ["16px", { "lineHeight": "1", "fontWeight": "700" }],
        "headline-md": ["40px", { "lineHeight": "48px", "fontWeight": "700" }],
        "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
        "headline-sm": ["24px", { "lineHeight": "32px", "fontWeight": "500" }],
        "headline-lg-mobile": ["36px", { "lineHeight": "42px", "letterSpacing": "-0.01em", "fontWeight": "700" }],
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }]
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries")
  ]
}
