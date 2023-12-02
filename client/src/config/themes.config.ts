import { ThemeConfig } from "eztp";

export const themes: ThemeConfig[] = [
    {
        theme: "light",
        vars: {
            "--color-primary": "#5b63f7",
            "--color-secondary": "#f763c4",
            "--color-accent": "#50b3a2",
            "--color-background": "#f4f4f5",
            "--color-navbar": "#363636",
            "--color-surface": "#ffffff",
            "--color-error": "#ff5252",
            "--color-warning": "#ffb020",
            "--color-success": "#4caf50",
            "--color-info": "#2196f3",

            "--text-primary": "#333",
            "--text-secondary": "#666",
            "--text-muted": "#999",
            "--text-on-primary": "#fff",

            "--font-family": "'Open Sans', sans-serif",
            "--font-weight-normal": "400",
            "--font-weight-bold": "700",

            "--space-xs": "4px",
            "--space-sm": "8px",
            "--space-md": "16px",
            "--space-lg": "24px",
            "--space-xl": "32px",

            "--border-color": "#ddd",
            "--border-width": "1px",
            "--border-radius": "4px",

            "--shadow-default": "0 2px 4px rgba(0, 0, 0, 0.1)",

            "--transition-default": "all 0.3s ease",
        },
    },
    {
        theme: "dark",
        vars: {
            "--color-primary": "#4e8cff",
            "--color-secondary": "#ff8ce6",
            "--color-accent": "#3db9a6",
            "--color-background": "#1e1e1e",
            "--color-navbar": "#ececec",
            "--color-surface": "#333",
            "--color-error": "#ff4343",
            "--color-warning": "#ffa320",
            "--color-success": "#39b54a",
            "--color-info": "#31ccec",

            "--text-primary": "#f4f4f5",
            "--text-secondary": "#aaa",
            "--text-muted": "#777",
            "--text-on-primary": "#000",

            "--font-family": "'Open Sans', sans-serif",
            "--font-weight-normal": "400",
            "--font-weight-bold": "700",

            "--space-xs": "4px",
            "--space-sm": "8px",
            "--space-md": "16px",
            "--space-lg": "24px",
            "--space-xl": "32px",

            "--border-color": "#444",
            "--border-width": "1px",
            "--border-radius": "4px",

            "--shadow-default": "0 2px 4px rgba(0, 0, 0, 0.3)",

            "--transition-default": "all 0.3s ease",
        },
    },
];
