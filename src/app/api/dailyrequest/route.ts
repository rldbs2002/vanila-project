import { NextResponse } from "next/server";
import connect from "@/utils/db";
import UserRequest from "@/models/UserRequest";
import { getServerSession } from "next-auth";

export const GET = async (request: any) => {
  try {
    await connect();

    // Get today's date
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Set to the beginning of the day

    // User가 소유한 UserRequest를 찾음
    const userRequests = await UserRequest.find({
      status: { $lte: 4 },
      request_submitted_at: {
        $gte: today, // Greater than or equal to today
      },
    });

    return new NextResponse(JSON.stringify(userRequests), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
