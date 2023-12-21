"use client";

import React, { useState, useEffect } from "react";
import { getUserData } from "@/app/lib/data";
import Consolidate from "./Consolidate";

const ConsolidateWrapper = () => {
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

  console.log(userData);

  return (
    <>
      <Consolidate userdata={userData} />
    </>
  );
};

export default ConsolidateWrapper;
