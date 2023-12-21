"use client";

import { FC, useState, useEffect } from "react";
import * as React from "react";
import Container from "@mui/material/Container";
import Card1 from "../Card1";
import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import { FlexBox } from "../flex-box";
import { Modal, Fade } from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { useRouter } from "next/navigation";
import RepackingUploadButton from "./RepackingUploadButton";
import { useSession } from "next-auth/react";
import ShippingUploadButton from "./ShippingUploadButton";
import ShippingForm from "./ShippingForm";
import Image from "next/image";
import { getUserData } from "@/app/lib/data";

type Product = {
  name: string;
  type: string;
  priceKRW: number;
  priceUSD: number;
  quantity: number;
  totalValueUSD: number;
  url: string;
};

type HeadingProps = { number: number; title: string };

const Heading: FC<HeadingProps> = ({ number, title }) => {
  return (
    <FlexBox gap={1.5} alignItems="center" mb={3.5}>
      <Avatar
        sx={{
          width: 32,
          height: 32,
          color: "primary.text",
          backgroundColor: "primary.main",
        }}
      >
        {number}
      </Avatar>
      <Typography fontSize="20px">{title}</Typography>
    </FlexBox>
  );
};

// 환율과 날짜를 가져오는 함수

const CartForm = ({ data }: any) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const [productPrice, setProductPrice] = useState(0); // Store the product price
  const [cartTotalValue, setCartTotalValue] = useState(0); // Store the cart total value
  const [cartTotalPrice, setCartTotalPrice] = useState(0); // Store the cart total price

  // Add a state variable to track whether the form is being submitted
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isPriceConfirm, setIsPriceConfirm] = useState(false); // Add state for confirmation checkbox

  // Calculate the product price, cart total value, and cart total price when a different cart is selected
  const calculateTotalPrice = (cartId: string) => {
    let productPrice = 0;
    let cartTotalValue = 0;
    let cartTotalPrice = 0;

    const cartData = data[cartId];

    // Calculate the totalValueUSD for each userRequest and sum them up for product price and cart total value
    const userRequestTotal = cartData.reduce(
      (total: number, userRequest: any) => {
        const product_list =
          userRequest.userRequest.request_info.product_list || [];

        return (
          total +
          product_list.reduce((subtotal: number, product: Product) => {
            return subtotal + (product.totalValueUSD || 0);
          }, 0)
        );
      },
      0
    );

    const hasCartTotalValue = cartData[0] && cartData[0].price_calculate;

    if (hasCartTotalValue) {
      cartTotalValue = hasCartTotalValue.total_price || 0;
    }

    productPrice = userRequestTotal;
    cartTotalPrice = productPrice + cartTotalValue;

    setProductPrice(productPrice);
    setCartTotalValue(cartTotalValue);
    setCartTotalPrice(cartTotalPrice);
  };

  const handleFormSubmit = async (values: any) => {
    if (isSubmitting || !isPriceConfirm) {
      return; // If the form is already being submitted, exit early
    }

    setIsSubmitting(true);

    const requestData = {
      cart_total_price: cartTotalPrice,
      status: 5,
      price_confirm: isPriceConfirm,
    };

    try {
      // Add a check for confirmation before submitting
      if (isPriceConfirm) {
        const response = await fetch(`/api/cart/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (response.status === 200) {
          // Redirect as needed based on server response
          router.push("/checkout");
        }
      } else {
        // Handle case where user hasn't confirmed
        console.log("Please confirm before checking out.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 모달을 열기 위한 함수
  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setSelectedImageUrl(imageUrl);
  };

  // 모달을 닫기 위한 함수
  const closeModal = () => {
    setSelectedImage("");
  };

  const keys = Object.keys(data);
  const firstKey = keys[0];
  console.log(data);

  return (
    <>
      <Container maxWidth="md">
        {Object.keys(data).map((cartId, index) => (
          <Card1 key={index} sx={{ mb: 4 }}>
            <Typography
              fontSize="50px"
              style={{
                textAlign: "left",
                marginBottom: "1.5rem",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {data[cartId][0].cartOptions}
            </Typography>
            {data[cartId].map((userRequest: any, userRequestIndex: number) => (
              <div key={userRequestIndex} style={{ margin: "2rem" }}>
                {/* <Typography
                  fontSize="50px"
                  style={{
                    textAlign: "left",
                    marginBottom: "1.5rem",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  {userRequest.userRequest.options}
                </Typography> */}
                <Typography
                  fontSize="30px"
                  style={{ textAlign: "left", marginBottom: "1.5rem" }}
                >
                  {userRequest.userRequest.request_id}
                </Typography>
                <Heading number={1} title={`Tracking Info`} />
                <Grid container spacing={2}>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      label="Tracking number"
                      variant="outlined"
                      fullWidth
                      value={
                        userRequest.userRequest.request_info.tracking_info
                          .tracking_number
                      }
                      margin="normal"
                    />
                    <TextField
                      label="Carrier"
                      variant="outlined"
                      fullWidth
                      value={
                        userRequest.userRequest.request_info.tracking_info
                          .tracking_carrier
                      }
                      margin="normal"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      label="Order Number"
                      variant="outlined"
                      fullWidth
                      value={
                        userRequest.userRequest.request_info.tracking_info
                          .order_number
                      }
                      margin="normal"
                    />
                    <TextField
                      label="Merchant / Store"
                      variant="outlined"
                      fullWidth
                      value={
                        userRequest.userRequest.request_info.tracking_info.store
                      }
                      margin="normal"
                      sx={{ mb: 4 }}
                    />
                  </Grid>
                </Grid>

                <Heading number={2} title="Product List" />

                {userRequest.userRequest.request_info.product_list.map(
                  (product: Product, productIndex: number) => (
                    <div key={productIndex}>
                      <Typography variant="h6">
                        ITEM #{productIndex + 1}
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            label="Product Name"
                            variant="outlined"
                            fullWidth
                            value={product.name}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            label="Product Type"
                            variant="outlined"
                            fullWidth
                            value={product.type}
                            margin="normal"
                          />
                        </Grid>
                      </Grid>
                      <Typography variant="subtitle2">PRICE / UNIT</Typography>
                      <Grid container spacing={2}>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            label="Price (KRW)"
                            variant="outlined"
                            fullWidth
                            value={product.priceKRW}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            label="Price (USD)"
                            variant="outlined"
                            fullWidth
                            value={product.priceUSD}
                            margin="normal"
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={2}>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            label="Product Quantity"
                            type="number"
                            variant="outlined"
                            fullWidth
                            value={product.quantity}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            label="Total Value (USD)"
                            variant="outlined"
                            fullWidth
                            value={(
                              Number(product.priceUSD) *
                              Number(product.quantity)
                            ).toFixed(2)}
                            margin="normal"
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            label="Product URL"
                            variant="outlined"
                            fullWidth
                            value={product.url}
                            margin="normal"
                          />
                        </Grid>
                      </Grid>
                    </div>
                  )
                )}

                <div
                  style={{
                    marginTop: "2rem",
                    border: "1px solid #ccc",
                    padding: "1rem",
                  }}
                >
                  <Heading number={3} title={`Arrived Images`} />

                  {userRequest.userRequest.arrived.arrived_images.length > 0 ? (
                    // If there are arrived_images
                    userRequest.userRequest.arrived.arrived_images.map(
                      (image: any, imageIndex: number) => (
                        <div key={imageIndex}>
                          {/* 클릭 시 모달 열도록 수정 */}
                          <Button onClick={() => openModal(image)}>
                            {image}
                          </Button>
                        </div>
                      )
                    )
                  ) : (
                    // If there are no arrived_images
                    <Typography variant="body2">Empty list</Typography>
                  )}
                </div>
              </div>
            ))}

            <div className="m-5" style={{ margin: "2rem" }}>
              <Heading number={4} title="Shipping Address" />
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    name="firstname"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    value={data[cartId][0].arrived_info.firstname}
                    margin="normal"
                  />
                  <TextField
                    name="lastname"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    value={data[cartId][0].arrived_info.lastname}
                    margin="normal"
                  />

                  <TextField
                    name="address"
                    label="Address"
                    variant="outlined"
                    fullWidth
                    value={data[cartId][0].arrived_info.address}
                    margin="normal"
                  />

                  <TextField
                    label="Country"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value={data[cartId][0].arrived_info.country.label}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    name="city"
                    label="City"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={data[cartId][0].arrived_info.city}
                  />
                  <TextField
                    name="state"
                    label="State"
                    variant="outlined"
                    fullWidth
                    value={data[cartId][0].arrived_info.state}
                    margin="normal"
                  />
                  <TextField
                    name="postal_code"
                    label="Postal Code"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={data[cartId][0].arrived_info.postal_code}
                  />
                  <TextField
                    name="phone"
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={data[cartId][0].arrived_info.phone}
                  />
                </Grid>
              </Grid>
            </div>

            {/* Repacking 정보 */}
            <div
              className="m-5"
              style={{
                margin: "2rem",
                border: "1px solid #ccc",
                padding: "1rem",
              }}
            >
              <Heading number={5} title={`Repacking Images`} />

              {/* UploadButton과 리스트를 수평으로 정렬 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {/* 항상 Heading은 보이도록 */}
                {data[cartId][0].repacking &&
                data[cartId][0].repacking.repacking_images &&
                data[cartId][0].repacking.repacking_images.length > 0 ? (
                  <>
                    {/* repacking Images가 있을 경우 */}
                    <div>
                      {data[cartId][0].repacking.repacking_images.map(
                        (image: any, imageIndex: number) => (
                          <div key={imageIndex}>
                            {/* 클릭 시 모달 열도록 수정 */}
                            <Button onClick={() => openModal(image)}>
                              {image}
                            </Button>
                          </div>
                        )
                      )}
                    </div>
                  </>
                ) : (
                  // No repacking Images
                  <Typography variant="body2">Empty list</Typography>
                )}

                {session?.user.role === "admin" && (
                  // admin인 경우에만 RepackingUploadButton 보이도록
                  <RepackingUploadButton data={firstKey} />
                )}
              </div>
            </div>

            {/* Shipping 정보 */}
            <div
              className="m-5"
              style={{
                margin: "2rem",
                border: "1px solid #ccc",
                padding: "1rem",
              }}
            >
              <Heading number={6} title={`Shipping Images`} />

              {/* UploadButton과 리스트를 수평으로 정렬 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {/* 항상 Heading은 보이도록 */}
                {data[cartId][0].shipping &&
                data[cartId][0].shipping.shipping_images &&
                data[cartId][0].shipping.shipping_images.length > 0 ? (
                  <>
                    {/* shipping Images가 있을 경우 */}
                    <div>
                      {data[cartId][0].shipping.shipping_images.map(
                        (image: any, imageIndex: number) => (
                          <div key={imageIndex}>
                            {/* 클릭 시 모달 열도록 수정 */}
                            <Button onClick={() => openModal(image)}>
                              {image}
                            </Button>
                          </div>
                        )
                      )}
                    </div>
                  </>
                ) : (
                  // No shipping Images
                  <Typography variant="body2">Empty list</Typography>
                )}

                {session?.user.role === "admin" && (
                  // admin인 경우에만 ShippingUploadButton 보이도록
                  <ShippingUploadButton data={firstKey} />
                )}
              </div>
            </div>

            {/* Shipping Information 정보 */}
            <div
              className="m-5"
              style={{
                margin: "2rem",
                border: "1px solid #ccc",
                padding: "1rem",
              }}
            >
              <Heading number={7} title={`Shipping Information`} />

              {/* UploadButton과 리스트를 수평으로 정렬 */}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start", // 왼쪽 정렬
                  width: "100%",
                }}
              >
                {/* 항상 Heading은 보이도록 */}
                {data[cartId][0].shipping &&
                data[cartId][0].shipping.shipping_carrier &&
                data[cartId][0].shipping.shipping_number ? (
                  <>
                    {/* shipping이 있을 경우 */}
                    {/* shipping Images가 있을 경우 */}
                    <Typography variant="subtitle2">
                      Carrier: {data[cartId][0].shipping.shipping_carrier}
                    </Typography>
                    <Typography variant="subtitle2">
                      Tracking Number:{" "}
                      {data[cartId][0].shipping.shipping_number}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body2">Empty list</Typography>
                )}
                {session?.user.role === "admin" && (
                  // admin인 경우에만 ShippingUploadButton 보이도록
                  <ShippingForm
                    data={firstKey}
                    style={{ marginTop: "0.5rem" }}
                  />
                )}
              </div>
            </div>
          </Card1>
        ))}
      </Container>

      {/* MUI Modal 컴포넌트 */}
      <Modal open={!!selectedImage} onClose={closeModal} closeAfterTransition>
        <Fade in={!!selectedImage}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "80vw",
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            <Image
              src={selectedImageUrl}
              alt="Selected Image"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
            <HighlightOffOutlinedIcon
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
              }}
              onClick={closeModal}
            />
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default CartForm;
