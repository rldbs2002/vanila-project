"use client";

import React, { useState, useEffect } from "react";
import { getUserData } from "@/app/lib/data";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import { Paragraph } from "../Typography";

type AddressInfoType = {
  address_info: {
    firstname: string;
    lastname: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    phone: string;
    _id: string;
  };
};

const UserInfo = () => {
  const [userData, setUserData] = useState<AddressInfoType | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserData();

        setUserData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);
  console.log(userData);

  if (!userData) {
    // 데이터가 로딩 중일 때의 상태를 표시할 수 있습니다.
    return (
      <>
        <Paragraph
          style={{
            fontSize: "1.7rem",
          }}
        >
          User info.
        </Paragraph>
        <Divider
          sx={{
            mb: 3,
            borderColor: "primary.400",
            borderBottomWidth: "2px",
          }}
        />
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <Paragraph
        style={{
          fontSize: "1.7rem",
        }}
      >
        User info.
      </Paragraph>
      <Divider
        sx={{
          mb: 3,
          borderColor: "primary.400",
          borderBottomWidth: "2px",
        }}
      />
      <Card key={userData.address_info._id} sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h6">
            name:{" "}
            {`${userData.address_info.firstname} ${userData.address_info.lastname}`}
          </Typography>
          <Typography>Address: {userData.address_info.address}</Typography>
          <Typography>{`${userData.address_info.city}, ${userData.address_info.state}`}</Typography>
          <Typography>
            Post Code: {userData.address_info.postal_code}
          </Typography>
          <Typography>{`Phone: ${userData.address_info.phone}`}</Typography>
          {/* 삭제 버튼 추가 */}
        </CardContent>
      </Card>
    </>
  );
};

export default UserInfo;
