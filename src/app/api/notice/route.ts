import connect from "@/utils/db";
import { NextResponse } from "next/server";
import Notice from "@/models/Notice";

export const GET = async (request: any) => {
  try {
    await connect();

    // User가 소유한 UserRequest를 찾음
    const notice = await Notice.find({});

    return new NextResponse(JSON.stringify(notice), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request: any) => {
  const requestData = await request.json();
  await connect();

  console.log(requestData);
  try {
    const notice = new Notice({
      title: requestData.title,
      content: requestData.content,
      writer: requestData.writer,
    });

    await notice.save();

    return new NextResponse("Notice has been created", {
      status: 200,
    });
  } catch (error) {
    console.error("Error in server code:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
