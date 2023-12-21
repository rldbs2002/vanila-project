"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Card, Grid, Button } from "@mui/material";
import { FlexBetween } from "../flex-box";
import { currency } from "@/lib";
import { Span } from "../Typography";
import { useSession } from "next-auth/react";

const Price = ({ data }: any) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [productPrice, setProductPrice] = useState(0);
  const [cartTotalValue, setCartTotalValue] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState<number | string>(0);
  const [isPending, setIsPending] = useState(false); // State for the Pending checkbox

  const keys = Object.keys(data);
  const firstKey = keys[0];
  const status = data[firstKey][0].status;
  console.log(status);

  const handleFormSubmit = async () => {
    // Prepare the data to be sent in the PUT request
    const requestData = {
      cart_total_price: cartTotalPrice,
      pending: isPending,
      checkout_submitted_at: new Date().toISOString(),
    };

    try {
      // Send a PUT request to update the cart information
      const response = await fetch(`/api/cart/${firstKey}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        // Handle successful response
        console.log("Cart information updated successfully");
        router.push("/checkout");
      } else {
        // Handle error response
        console.error("Failed to update cart information");
      }
    } catch (error) {
      console.error("Error while updating cart information", error);
    }
  };

  useEffect(() => {
    // Calculate productPrice, cartTotalValue, and cartTotalPrice
    let calculatedProductPrice = 0;
    let calculatedCartTotalValue = 0;

    // Iterate over each cart in data
    for (const cartId in data) {
      const cartItems = data[cartId];

      // Calculate productPrice from the sum of totalValueUSD for all product_list items
      const productPriceFromCart = cartItems.reduce(
        (sum: number, cartItem: any) =>
          sum +
          cartItem.userRequest.request_info.product_list.reduce(
            (productSum: number, product: any) =>
              productSum + product.totalValueUSD,
            0
          ),
        0
      );

      calculatedProductPrice += productPriceFromCart;

      // Calculate cartTotalValue from price_calculate.total_price
      const cartTotalValueFromCart =
        cartItems[0].price_calculate?.total_price || 0;

      calculatedCartTotalValue += cartTotalValueFromCart;
    }

    // Set the calculated values to state variables
    setProductPrice(calculatedProductPrice);
    setCartTotalValue(calculatedCartTotalValue);

    // Set cartTotalPrice based on whether cartTotalValue is zero
    setCartTotalPrice(
      calculatedCartTotalValue === 0
        ? "N/A"
        : calculatedProductPrice + calculatedCartTotalValue
    );
  }, [data]);

  return (
    <>
      {/* CHECKOUT FORM */}
      <Grid item xs={12}>
        <Card sx={{ padding: 3 }}>
          <FlexBetween mb={2}>
            <Span color="grey.600">Product Price:</Span>
            <Span fontSize={18} fontWeight={600} lineHeight="1">
              {currency(productPrice)}
            </Span>
          </FlexBetween>

          <FlexBetween mb={2}>
            <Span color="grey.600">Service Price:</Span>
            <Span fontSize={18} fontWeight={600} lineHeight="1">
              {cartTotalValue === 0 ? "N/A" : currency(cartTotalValue)}
            </Span>
          </FlexBetween>

          <FlexBetween mb={2}>
            <Span color="grey.600">Storage Fee:</Span>
            <Span fontSize={18} fontWeight={600} lineHeight="1">
              {}
            </Span>
          </FlexBetween>

          <FlexBetween mb={4}>
            <Span color="grey.600">Cart Total Price:</Span>
            <Span fontSize={18} fontWeight={600} lineHeight="1">
              {cartTotalPrice === "N/A"
                ? "N/A"
                : currency(Number(cartTotalPrice))}
            </Span>
          </FlexBetween>

          {/* Pending checkbox */}
          <FlexBetween mb={4}>
            <label>
              <input
                type="checkbox"
                checked={isPending}
                onChange={() => setIsPending(!isPending)}
              />
              Pending
            </label>
          </FlexBetween>

          <Button
            fullWidth
            color="primary"
            variant="outlined"
            onClick={handleFormSubmit}
            disabled={status !== 4 || session?.user.role === "admin"} // Disable the button if the price is not confirmed
          >
            Checkout Now
          </Button>
        </Card>
      </Grid>
    </>
  );
};

export default Price;
