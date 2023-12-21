"use client";

import { getRepackingData } from "@/app/lib/data";
import React, { useState, useEffect } from "react";
import Repacking from "./Repacking";
import { getUserData } from "@/app/lib/data";

const RepackingWrapper = () => {
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
      <Repacking userdata={userData} />
    </>
  );
};

export default RepackingWrapper;
