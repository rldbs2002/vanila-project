"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import Card1 from "../Card1";

export default function CalculatorForm({ data, selectedCart }: any) {
  const [repackingPrice, setRepackingPrice] = useState("");
  const [abroadShippingFee, setAbroadShippingFee] = useState("");

  const router = useRouter();

  const RepackingPriceChange = (event: any) => {
    setRepackingPrice(event.target.value);
  };

  const AbroadShippingFeeChange = (event: any) => {
    setAbroadShippingFee(event.target.value);
  };

  const calculateAndSubmit = async () => {
    const num3 = parseFloat(repackingPrice);
    const num4 = parseFloat(abroadShippingFee);

    let calculatedResult = 0;

    if (!isNaN(num3)) {
      calculatedResult += num3;
    }
    if (!isNaN(num4)) {
      calculatedResult += num4;
    }

    const keys = Object.keys(data);
    const firstKey = keys[0];

    const requestUrl = `/api/cart/${firstKey}`;

    const priceCheckData = {
      submitted_at: new Date().toISOString(),
      total_price: calculatedResult,
      repacking_price: num3,
      abroad_shipping_fee: num4,
    };

    try {
      const response = await fetch(requestUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: 4,
          price_calculate: priceCheckData,
        }),
      });

      if (response.ok) {
        console.log("success");
        router.push("/admin/cart");
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.log("failed");
    }
  };

  return (
    <Card1>
      <div className="flex flex-col items-center justify-start">
        <h1>Price Calculate</h1>
        <form>
          <div>
            <TextField
              label={`Service Price`}
              variant="outlined"
              value={repackingPrice}
              onChange={RepackingPriceChange}
              style={{ margin: "10px 0" }}
            />
          </div>
          <div>
            <TextField
              label={`Abroad Shipping Fee`}
              variant="outlined"
              value={abroadShippingFee}
              onChange={AbroadShippingFeeChange}
              style={{ margin: "10px 0" }}
            />
          </div>

          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={calculateAndSubmit}
              style={{ margin: "10px 0" }}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Card1>
  );
}
