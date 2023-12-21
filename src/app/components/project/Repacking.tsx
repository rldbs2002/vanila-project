"use client";

import React, { FC, useState, useEffect } from "react";
import { FlexBox } from "@/app/components/flex-box";
import {
  Avatar,
  Typography,
  Grid,
  Container,
  TextField,
  Button,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Modal,
  Fade,
} from "@mui/material";
import Card1 from "@/app/components/Card1";
import { Formik, useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import countryList from "@/app/data/countryList";
import { useSession } from "next-auth/react";
import { getRepackingData } from "@/app/lib/data";
import { Paragraph } from "../Typography";
import Image from "next/image";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

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

const Repacking = ({ userdata }: any) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [data, setData] = useState([]);

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  // Update state to store user's default address
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  const [defaultAddressData, setDefaultAddressData] = useState({
    firstname: userdata?.address_info?.firstname || "",
    lastname: userdata?.address_info?.lastname || "",
    country: userdata?.address_info?.country || countryList[229],
    address: userdata?.address_info?.address || "",
    city: userdata?.address_info?.city || "",
    state: userdata?.address_info?.state || "",
    postal_code: userdata?.address_info?.postal_code || "",
    phone: userdata?.address_info?.phone || "",
  });

  const initialValues = {
    firstname: isDefaultAddress ? userdata.firstname : "",
    lastname: isDefaultAddress ? userdata.lastname : "",
    country: isDefaultAddress ? userdata.country : countryList[229],
    address: isDefaultAddress ? userdata.address : "",
    city: isDefaultAddress ? userdata.city : "",
    state: isDefaultAddress ? userdata.state : "",
    postal_code: isDefaultAddress ? userdata.postal_code : "",
    phone: isDefaultAddress ? userdata.phone : "",
  };

  // Define Yup validation schema
  const checkoutSchema = yup.object().shape({
    // firstname: yup.string().required("First Name is required"),
    // lastname: yup.string().required("Last Name is required"),
    // country: yup.object().shape({
    //   label: yup.string().required("Country label is required"),
    // }),
    // address: yup.string().required("Address is required"),
    // city: yup.string().required("City is required"),
    // state: yup.string().required("State is required"),
    // postal_code: yup.string().required("Postal Code is required"),
    // phone: yup.string().required("Phone Number is required"),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRepackingData();

        setData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  // Add a state variable to track whether the form is being submitted
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (values: any) => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const cartRequestData = {
      status: 3,
      options: "repacking",
      user: session?.user.email,
      items: data.map((item: any) => ({
        userRequest: item._id,
      })),

      arrived_info: isDefaultAddress
        ? userdata.address_info
        : {
            firstname: values.firstname,
            lastname: values.lastname,
            country: values.country,
            address: values.address,
            city: values.city,
            state: values.state,
            postal_code: values.postal_code,
            phone: values.phone,
          },
    };

    const userRequestData = {
      status: 4,
      requestIds: data.map((item: any) => item._id),
      request_completed_at: new Date().toISOString(),
    };

    try {
      // Send cart request
      const cartResponse = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartRequestData),
      });

      if (cartResponse.status === 200) {
        // Send user request
        const userResponse = await fetch(`/api/repackings`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userRequestData),
        });

        if (userResponse.status === 200) {
          router.push("/cart");
        } else {
          // Handle user request failure
          console.error(
            "Error submitting user request:",
            userResponse.statusText
          );
        }
      } else {
        // Handle cart request failure
        console.error(
          "Error submitting cart request:",
          cartResponse.statusText
        );
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

  // const formik = useFormik({
  //   initialValues: initialValues,
  //   validationSchema: checkoutSchema,
  //   onSubmit: handleFormSubmit,
  // });

  useEffect(() => {
    if (isDefaultAddress) {
      // 체크박스가 체크되면 userdata 값을 defaultAddressData에 설정
      setDefaultAddressData({
        firstname: userdata?.address_info?.firstname || "",
        lastname: userdata?.address_info?.lastname || "",
        country: userdata?.address_info?.country || countryList[229],
        address: userdata?.address_info?.address || "",
        city: userdata?.address_info?.city || "",
        state: userdata?.address_info?.state || "",
        postal_code: userdata?.address_info?.postal_code || "",
        phone: userdata?.address_info?.phone || "",
      });
    } else {
      // 체크박스가 해제되면 defaultAddressData를 초기값으로 설정
      setDefaultAddressData({
        firstname: "",
        lastname: "",
        country: countryList[229],
        address: "",
        city: "",
        state: "",
        postal_code: "",
        phone: "",
      });
    }
  }, [isDefaultAddress, userdata]);

  // useEffect(() => {
  //   // defaultAddressData가 변경될 때 Formik의 값을 업데이트
  //   formik.setValues({
  //     ...formik.values,
  //     firstname: defaultAddressData.firstname,
  //     lastname: defaultAddressData.lastname,
  //     country: defaultAddressData.country,
  //     address: defaultAddressData.address,
  //     city: defaultAddressData.city,
  //     state: defaultAddressData.state,
  //     postal_code: defaultAddressData.postal_code,
  //     phone: defaultAddressData.phone,
  //   });
  // }, [defaultAddressData, formik.setValues]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Container sx={{ maxWidth: "80%", mx: "auto" }}>
            <Paragraph
              style={{
                fontSize: "1.7rem",
                marginBottom: "1rem",
                fontWeight: "bold",
              }}
            >
              Repacking
            </Paragraph>
            {data.map((item: any, index: number) => (
              <Card1 key={index} sx={{ mb: 4 }}>
                <Typography
                  fontSize="30px"
                  style={{ textAlign: "left", marginBottom: "1.5rem" }}
                >
                  {item.request_id}
                </Typography>
                <Heading number={1} title="Tracking Info" />
                <Grid container spacing={2}>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      label="Tracking number"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={item.request_info.tracking_info.tracking_number}
                    />
                    <TextField
                      label="Carrier"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={item.request_info.tracking_info.tracking_carrier}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      label="Order Number"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={item.request_info.tracking_info.order_number}
                    />
                    <TextField
                      label="Merchant / Store"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      sx={{ mb: 4 }}
                      value={item.request_info.tracking_info.store}
                    />
                  </Grid>
                </Grid>

                <Heading number={2} title="Product List" />

                {item.request_info.product_list.map(
                  (product: Product, index: number) => (
                    <div key={index}>
                      <Typography variant="h6">ITEM #{index + 1}</Typography>
                      <Grid container spacing={2}>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            label="Product Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={product.name}
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            label="Product Type"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={product.type}
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
                            margin="normal"
                            value={product.priceKRW}
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            label="Price (USD)"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={product.priceUSD}
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
                            margin="normal"
                            value={product.quantity}
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            label="Total Value (USD)"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={product.totalValueUSD}
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            label="Product URL"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={product.url}
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

                  {item.arrived.arrived_images.length > 0 ? (
                    // If there are arrived_images
                    item.arrived.arrived_images.map(
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
              </Card1>
            ))}
            <Card1>
              <Heading number={4} title="Shipping Address" />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={isDefaultAddress}
                    onChange={() => setIsDefaultAddress(!isDefaultAddress)}
                    name="isDefaultAddress"
                  />
                }
                label="default address"
              />

              <Formik
                initialValues={initialValues}
                validationSchema={checkoutSchema}
                onSubmit={handleFormSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={6}>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            name="firstname"
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            value={
                              isDefaultAddress
                                ? defaultAddressData.firstname
                                : values.firstname
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.firstname && !!errors.firstname}
                            helperText={
                              (touched.firstname && errors.firstname) as string
                            }
                            margin="normal"
                          />
                          <TextField
                            name="lastname"
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            value={
                              isDefaultAddress
                                ? defaultAddressData.lastname
                                : values.lastname
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.lastname && !!errors.lastname}
                            helperText={
                              (touched.lastname && errors.lastname) as string
                            }
                            margin="normal"
                          />
                          <Autocomplete
                            fullWidth
                            sx={{ mb: 2 }}
                            options={countryList}
                            value={
                              isDefaultAddress
                                ? defaultAddressData.country
                                : values.country
                            }
                            getOptionLabel={(option) => option.label}
                            onChange={(_, value) =>
                              setFieldValue("country", value)
                            }
                            renderInput={(params) => (
                              <TextField
                                label="Country"
                                variant="outlined"
                                placeholder="Select Country"
                                margin="normal"
                                error={!!touched.country && !!errors.country}
                                helperText={
                                  (touched.country && errors.country) as string
                                }
                                {...params}
                              />
                            )}
                          />
                          <TextField
                            name="address"
                            label="Address"
                            variant="outlined"
                            fullWidth
                            value={
                              isDefaultAddress
                                ? defaultAddressData.address
                                : values.address
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.address && !!errors.address}
                            helperText={
                              (touched.address && errors.address) as string
                            }
                          />
                        </Grid>

                        <Grid item sm={6} xs={12}>
                          <TextField
                            name="city"
                            label="City"
                            variant="outlined"
                            fullWidth
                            value={
                              isDefaultAddress
                                ? defaultAddressData.city
                                : values.city
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.city && !!errors.city}
                            helperText={(touched.city && errors.city) as string}
                            margin="normal"
                          />
                          <TextField
                            name="state"
                            label="State"
                            variant="outlined"
                            fullWidth
                            value={
                              isDefaultAddress
                                ? defaultAddressData.state
                                : values.state
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.state && !!errors.state}
                            helperText={
                              (touched.state && errors.state) as string
                            }
                            margin="normal"
                          />
                          <TextField
                            name="postal_code"
                            label="Postal Code"
                            variant="outlined"
                            fullWidth
                            value={
                              isDefaultAddress
                                ? defaultAddressData.postal_code
                                : values.postal_code
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.postal_code && !!errors.postal_code}
                            helperText={
                              (touched.postal_code &&
                                errors.postal_code) as string
                            }
                            margin="normal"
                          />
                          <TextField
                            name="phone"
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            value={
                              isDefaultAddress
                                ? defaultAddressData.phone
                                : values.phone
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.phone && !!errors.phone}
                            helperText={
                              (touched.phone && errors.phone) as string
                            }
                            margin="normal"
                          />
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        spacing={4}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <Button
                            variant="outlined"
                            color="primary"
                            type="submit"
                            sx={{ width: "100px", marginTop: "3rem" }}
                          >
                            Submit
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  );
                }}
              </Formik>
            </Card1>
            {/* <Button onClick={handleFormSubmit} variant="outlined">
              Add to Cart
            </Button> */}
          </Container>

          {/* MUI Modal 컴포넌트 */}
          <Modal
            open={!!selectedImage}
            onClose={closeModal}
            closeAfterTransition
          >
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
    </>
  );
};

export default Repacking;
