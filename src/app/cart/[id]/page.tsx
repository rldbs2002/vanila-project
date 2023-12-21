import React from "react";
import ShopLayout2 from "@/app/components/ShopLayout2";
import { NextPage } from "next";
import CartLayer from "@/app/components/project/CartWrapper";
import { getCartData } from "@/app/lib/data";

const CartIdPage: NextPage = async ({ params }: any) => {
  const data = await getCartData(params.id);

  return (
    <ShopLayout2>
      <CartLayer data={data} />
    </ShopLayout2>
  );
};

export default CartIdPage;
