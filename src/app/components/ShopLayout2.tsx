"use client";

import { FC, Fragment, ReactNode, useCallback, useState } from "react";
import { Box } from "@mui/material";
import Footer3 from "./project/Footer3";
import Header from "@/app/landing/Header";

/**
 *  Used in:
 *  1. grocery1, grocery2, healthbeauty-shop
 *  2. checkout-alternative
 */

// =======================================================
type ShopLayout2Props = {
  children: ReactNode;
  showNavbar?: boolean;
  showTopbar?: boolean;
};
// =======================================================

const ShopLayout2: FC<ShopLayout2Props> = ({
  children,
  showTopbar = true,
  showNavbar = true,
}) => {
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed: boolean) => setIsFixed(fixed), []);

  const layoutStyle = {
    position: "relative",
    zIndex: 4,
    ...(children ? {} : { paddingBottom: "100px" }), // FOOTER와의 간격을 조절합니다.
  };

  return (
    <Fragment>
      {/* TOPBAR */}
      {/* {showTopbar && <Topbar />} */}

      {/* HEADER */}
      <Header />

      <Box zIndex={4} position="relative" className="section-after-sticky">
        {/* BODY CONTENT */}
        {children}

        {/* FOOTER CONTENT */}
        <Footer3 sx={{ marginTop: "3rem" }} />
      </Box>
    </Fragment>
  );
};

export default ShopLayout2;
