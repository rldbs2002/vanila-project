import { NextPage } from "next";
import ShopLayout2 from "@/app/components/ShopLayout2";
import { getCheckoutData } from "@/app/lib/data";
import CheckoutWrapper from "@/app/components/project/CheckoutWrapper";

const OrderDetails: NextPage = async ({ params }: any) => {
  const data = await getCheckoutData(params.id);

  return (
    <ShopLayout2>
      <CheckoutWrapper data={data} />
    </ShopLayout2>
  );
};

export default OrderDetails;
