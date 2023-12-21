import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/Users";
import UserRequest from "@/models/UserRequest";
import { getServerSession } from "next-auth";

export const GET = async (request: any) => {
  try {
    await connect();

    const session = await getServerSession({ req: request });

    // 사용자의 이메일 주소 (예: 사용자의 실제 이메일 주소로 변경해야 함)
    const userEmail = session?.user.email;

    // User가 소유한 UserRequest를 찾음
    const userRequests = await UserRequest.find({
      user: userEmail,
      status: { $lte: 2 },
    });

    return new NextResponse(JSON.stringify(userRequests), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
