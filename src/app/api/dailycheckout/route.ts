import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Cart from "@/models/Cart";

export const GET = async (request: any) => {
  try {
    await connect();

    // Get today's date
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Set to the beginning of the day

    const checkoutData = await Cart.find({
      status: { $gte: 5 },
      checkout_submitted_at: {
        $gte: today, // Greater than or equal to today
      },
    });

    return new NextResponse(JSON.stringify(checkoutData), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
