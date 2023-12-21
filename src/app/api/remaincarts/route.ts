import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Cart from "@/models/Cart";

export const GET = async (request: any) => {
  try {
    await connect();

    // 1. 먼저 모든 Cart 데이터를 가져옵니다.
    const cartData = await Cart.find({ status: 3 });

    return new NextResponse(JSON.stringify(cartData), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
