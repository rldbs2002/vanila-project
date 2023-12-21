import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Cart from "@/models/Cart";
import { getServerSession } from "next-auth";

export const GET = async (request: any) => {
  try {
    await connect();

    const session = await getServerSession({ req: request });
    console.log(session?.user.email);

    // 사용자의 이메일 주소 (예: 사용자의 실제 이메일 주소로 변경해야 함)
    const userEmail = session?.user.email;

    // 1. 먼저 모든 Cart 데이터를 가져옵니다.
    const checkoutData = await Cart.find({
      user: userEmail,
      status: { $gte: 5 },
    });

    return new NextResponse(JSON.stringify(checkoutData), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
