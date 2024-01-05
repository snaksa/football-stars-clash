"use client";
import React from "react";
import { Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@mui/material";
import "./globals.css";
import theme from "../theme/theme";

const font = Playfair_Display({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en">
      <head>
        <title>Football Stars Clash</title>
      </head>
      <body className={font.className}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
