"use client";

import React, { useState, useEffect } from "react";
import { getUserData } from "@/app/lib/data";
import Shipping from "./Shipping";

const ShippingWrapper = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResult = await getUserData();
        console.log("사용자 데이터:", userResult);
        setUserData(userResult);
      } catch (error: any) {
        console.error("데이터를 불러오는 중 에러 발생:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Shipping userdata={userData} />
    </>
  );
};

export default ShippingWrapper;
