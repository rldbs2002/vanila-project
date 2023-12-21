"use client";

import { FC, useEffect, useState } from "react";
import * as React from "react";
import Container from "@mui/material/Container";
import Card1 from "../Card1";
import {
  Avatar,
  Button,
  Grid,
  TextField,
  Typography,
  Modal,
  Fade,
} from "@mui/material";
import { FlexBox, FlexBetween } from "../flex-box";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Paragraph } from "../Typography";
import { useSession } from "next-auth/react";
import RequestArrivedUploadButton from "./RequestArrivedUploadButton";
import Image from "next/image";

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
const getExchangeRateAndDate = async () => {
  try {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/KRW"
    ); // 또는 원하는 환율 API 엔드포인트를 사용하세요.
    const data = await response.json();
    const exchangeRate = data.rates.USD.toFixed(5); // 1 KRW당 USD 환율
    const currentDate = data.date;
    return { exchangeRate, currentDate };
  } catch (error) {
    console.error("환율 정보 가져오기 실패:", error);
    return { exchangeRate: "N/A", currentDate: "N/A" };
  }
};

export default function RequestsOne({ data }: any) {
  const [currentExchangeRate, setCurrentExchangeRate] = useState(""); // 환율 정보를 저장할 상태 변수
  const [currentDate, setCurrentDate] = useState(""); // 오늘 날짜를 저장할 상태 변수
  const { data: session } = useSession();

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  // 모달을 열기 위한 함수
  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setSelectedImageUrl(imageUrl);
  };

  // 모달을 닫기 위한 함수
  const closeModal = () => {
    setSelectedImage("");
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 환율 정보와 오늘 날짜를 가져옴
    const fetchData = async () => {
      const { exchangeRate, currentDate } = await getExchangeRateAndDate();
      setCurrentExchangeRate(exchangeRate);
      setCurrentDate(currentDate);
    };

    fetchData();
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

  console.log(data);

  return (
    <Grid
      container
      spacing={3}
      style={{ position: "relative", overflowY: "auto" }}
    >
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Card1 sx={{ mb: 4 }}>
            <Paragraph
              style={{
                fontSize: "2rem",
                marginBottom: "3rem",
                fontWeight: "bold",
              }}
            >
              New Request
            </Paragraph>
            <Heading number={1} title="Tracking Info" />
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <TextField
                  label="Tracking number"
                  variant="outlined"
                  fullWidth
                  value={data.request_info.tracking_info.tracking_number}
                  margin="normal"
                />
                <TextField
                  label="Carrier"
                  variant="outlined"
                  fullWidth
                  value={data.request_info.tracking_info.tracking_carrier}
                  margin="normal"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  label="Order Number"
                  variant="outlined"
                  fullWidth
                  value={data.request_info.tracking_info.order_number}
                  margin="normal"
                />
                <TextField
                  label="Merchant / Store"
                  variant="outlined"
                  fullWidth
                  value={data.request_info.tracking_info.store}
                  margin="normal"
                  sx={{ mb: 4 }}
                />
              </Grid>
            </Grid>

            <Heading number={2} title="Product List" />

            {data.request_info.product_list.map(
              (product: any, index: number) => (
                <div key={index}>
                  <Typography variant="h6">ITEM #{index + 1}</Typography>
                  {index > 0 && (
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <HighlightOffOutlinedIcon
                        color="primary"
                        sx={{ cursor: "pointer", marginBottom: "2px" }}
                      />
                    </div>
                  )}
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

                  <FlexBox
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Typography variant="subtitle1">
                      1 KRW = {currentExchangeRate} USD
                    </Typography>
                  </FlexBox>
                  <FlexBox
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Typography variant="caption">{currentDate}</Typography>
                  </FlexBox>
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
                          Number(product.priceUSD) * Number(product.quantity)
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

            {/* Arrived 정보 */}
            <div
              style={{
                marginTop: "3rem",
                border: "1px solid #ccc",
                padding: "1rem",
              }}
            >
              <Heading number={3} title={`Arrived Images`} />

              {/* UploadButton과 리스트를 수평으로 정렬 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {/* 항상 Heading은 보이도록 */}
                {data.arrived &&
                data.arrived.arrived_images &&
                data.arrived.arrived_images.length > 0 ? (
                  <>
                    {/* arrived Images가 있을 경우 */}
                    <div>
                      {data.arrived.arrived_images.map(
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
                  // No arrived Images
                  <Typography variant="body2">Empty list</Typography>
                )}

                {session?.user.role === "admin" && (
                  // admin인 경우에만 ArrivedUploadButton 보이도록
                  <RequestArrivedUploadButton data={data} />
                )}
              </div>
            </div>
          </Card1>
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
      </Grid>
    </Grid>
  );
}
