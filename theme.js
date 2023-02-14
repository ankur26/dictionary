import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
        colors: {
            blackAlpha: {
                700: "#050505",
                600: "#1F1F1F",
                500: "#2D2D2D",
                400: "#3A3A3A"
            },
            gray: {
                700: "#757575",
                600: "#E9E9E9"
            },
            whiteAlpha: {
                800: "#F4F4F4",
                900: "#FFFFFF"
            },
            purple: { 900: "#A445ED" },
            orange: { 900: "#FF5252" }
        },
        fontSizes: {
            xs: "14px",
            sm: "18px",
            md: "20px",
            lg: "24px",
            xl: "64px",
        },
        lineHeights: {
            xs: "17px",
            sm: "24px",
            md: "24px",
            lg: "29px",
            xl: "77px",
        }
    }
)

export const fonts = {
        "Sans Serif": `"Inter",sans-serif`,
        "Serif": `"Lora",serif`,
        "Mono": `"Inconsolata",monospace`,
}