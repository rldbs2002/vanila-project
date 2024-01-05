import React from "react";
import ShopLayout2 from "../components/ShopLayout2";
import { Container } from "@mui/material";
import {
  getCompleteCartData,
  getCompleteCheckoutData,
  getCompleteRequestData,
  getDailyCartData,
  getDailyCheckoutData,
  getDailyRequestData,
} from "@/app/lib/data";
import AdminDashboard from "../components/project/AdminDashboard";
export const dynamic = "force-dynamic";

const AdminPage = async () => {
  const dailyRequestData = await getDailyRequestData();
  const dailyCartData = await getDailyCartData();
  const dailyCheckoutData = await getDailyCheckoutData();
  const completeRequestData = await getCompleteRequestData();
  const completeCartData = await getCompleteCartData();
  const completeCheckoutData = await getCompleteCheckoutData();
  return (
    <ShopLayout2>
      <Container sx={{ my: "1.5rem", maxWidth: "80%", mx: "auto" }}>
        <AdminDashboard
          dailyRequestData={dailyRequestData}
          dailyCartData={dailyCartData}
          dailyCheckoutData={dailyCheckoutData}
          completeRequestData={completeRequestData}
          completeCartData={completeCartData}
          completeCheckoutData={completeCheckoutData}
        />
        {/* <Paragraph
        style={{
          fontSize: "1rem",
          marginTop: "4rem",
          marginBottom: "4rem",
        }}
      >
        Lastest Loggin Date: {lastLoginDate?.toLocaleString()}
      </Paragraph> */}
      </Container>
    </ShopLayout2>
  );
};

export default AdminPage;
