"use client";

import React, { ChangeEvent, useState } from "react";
import { Button, Checkbox, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

const ShippingForm = ({ data }: any) => {
  const [shippingCarrier, setShippingCarrier] = useState("");
  const [shippingNumber, setShippingNumber] = useState("");
  const [shippingCompleted, setShippingCompleted] = useState(false);
  const router = useRouter();

  const handleShippingCarrierChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShippingCarrier(e.target.value);
  };

  const handleShippingNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShippingNumber(e.target.value);
  };

  const handleShippingCompletedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShippingCompleted(e.target.checked);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/checkout/${data}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shipping: {
            shippingCarrier,
            shippingNumber,
            shippingCompleted,
            shipping_at: new Date(),
          },
        }),
      });

      if (response.ok) {
        // 성공적으로 처리된 경우의 로직을 추가하세요.
        console.log("Shipping information submitted successfully");
        router.push("/checkout");
      } else {
        // 요청이 실패한 경우의 로직을 추가하세요.
        console.error("Failed to submit shipping information");
      }
    } catch (error) {
      // 오류 처리 로직을 추가하세요.
      console.error("An error occurred:", error);
    }
  };

  return (
    <main className="flex flex-col">
      <TextField
        label="Shipping Carrier"
        variant="outlined"
        value={shippingCarrier}
        onChange={handleShippingCarrierChange}
        margin="normal"
      />
      <TextField
        label="Shipping Number"
        variant="outlined"
        value={shippingNumber}
        onChange={handleShippingNumberChange}
        margin="normal"
      />
      <div className="flex items-center">
        {" "}
        {/* 이 부분을 추가하여 checkbox와 button을 수평으로 정렬 */}
        <Checkbox
          checked={shippingCompleted}
          onChange={handleShippingCompletedChange}
          color="primary"
        />
        <span>Shipping Completed</span> {/* Checkbox 라벨 추가 */}
      </div>
      <Button variant="outlined" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </main>
  );
};

export default ShippingForm;
