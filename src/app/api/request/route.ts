import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Users from "@/models/Users";
import UserRequest from "@/models/UserRequest";
import { getServerSession } from "next-auth";

export const GET = async (request: any) => {
  try {
    await connect();

    const session = await getServerSession({ req: request });
    console.log(session?.user.email);

    // 사용자의 이메일 주소 (예: 사용자의 실제 이메일 주소로 변경해야 함)
    const userEmail = session?.user.email;

    // User를 이메일 주소로 찾음
    const user = await Users.findOne({ email: userEmail });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // User가 소유한 UserRequest를 찾음
    const userRequests = await UserRequest.find({ user: userEmail });

    return new NextResponse(JSON.stringify(userRequests), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request: any) => {
  const requestData = await request.json();
  await connect();

  try {
    const userEmail = requestData.user; // Replace with the user's email

    // Find the user based on their email
    const user = await Users.findOne({ email: userEmail });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // 현재 년도와 날짜를 가져오는 함수 (예: 20230918)
    const getCurrentYearAndDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      return `${year}${month}${day}`;
    };

    const currentDatePart = getCurrentYearAndDate();

    const lastUserRequest = await UserRequest.findOne(
      { request_id: { $regex: `^R${currentDatePart}-` } },
      {},
      { sort: { request_id: -1 } }
    );

    let newRequestId = "0001";

    if (lastUserRequest) {
      const lastRequestId = lastUserRequest.request_id;
      const lastNumber = parseInt(lastRequestId.substr(10), 11); // 9 이후의 숫자 부분 추출

      if (lastNumber < 9999) {
        newRequestId = String(lastNumber + 1).padStart(4, "0");
      } else {
        // 만약 9999에 도달하면 초기화하지 않고 유지합니다.
        newRequestId = "9999";
      }
    }

    const finalRequestId = `R${currentDatePart}-${newRequestId}`;
    // 코드에서 finalRequestId를 사용합니다.

    // 서버 스키마에 맞게 데이터를 구성합니다.
    const newUserRequest = new UserRequest({
      user: userEmail, // Link the UserRequest to the user
      request_info: {
        product_list: requestData.request_info.product_list,

        tracking_info: {
          tracking_number:
            requestData.request_info.tracking_info.tracking_number,
          tracking_carrier:
            requestData.request_info.tracking_info.tracking_carrier,
          order_number:
            requestData.request_info.tracking_info.order_number || "",
          store: requestData.request_info.tracking_info.store || "",
        },
      },
      request_id: finalRequestId, // 새로운 request_id 설정
      status: 1, // 1은 "request_submit" 상태를 나타내는 숫자입니다.
      request_submitted_at: new Date().toISOString(), // "request_submit" 상태의 제출 시간 업데이트
      // 다른 상태 필드도 필요에 따라 추가합니다.
    });

    console.log(newUserRequest);

    await newUserRequest.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};

export const PUT = async (request: any) => {
  const requestData = await request.json();
  await connect();

  try {
    // 사용자 요청을 찾습니다.
    const userRequest = await UserRequest.findOne({
      request_id: requestData.request_id,
    });

    if (!userRequest) {
      return new NextResponse("User Request not found", {
        status: 404,
      });
    }

    // 사용자 요청을 저장하고 업데이트된 요청을 반환합니다.
    await userRequest.save();
    return new NextResponse("User Request has been updated", {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};

export const DELETE = async (request: any) => {
  const requestData = await request.json();
  await connect();

  try {
    // 사용자 요청을 찾습니다.
    const userRequest = await UserRequest.findOne({
      request_id: requestData.request_id,
    });

    if (!userRequest) {
      return new NextResponse("User Request not found", {
        status: 404,
      });
    }

    // 사용자 요청을 저장하고 업데이트된 요청을 반환합니다.
    await userRequest.save();
    return new NextResponse("User Request has been updated", {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
