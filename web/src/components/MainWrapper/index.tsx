"use client";
import React, { PropsWithChildren } from "react";
import { Box, styled } from "@mui/material";

const Wrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  border: "2px solid white",
  borderRadius: "20px",

  [theme.breakpoints.down("lg")]: {
    borderRadius: 0,
  },
}));

export default function MainWrapper({
  children,
}: PropsWithChildren): React.JSX.Element {
  return <Wrapper>{children}</Wrapper>;
}
