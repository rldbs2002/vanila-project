import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Cart from "@/models/Cart";

export const GET = async (request: any) => {
  try {
    await connect();

    // Get today's date
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Set to the beginning of the day

    // 1. 먼저 모든 Cart 데이터를 가져옵니다.
    const cartData = await Cart.find({
      "price_calculate.submitted_at": {
        $gte: today, // Greater than or equal to today
      },
    });

    return new NextResponse(JSON.stringify(cartData), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
