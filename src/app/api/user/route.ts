import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Users from "@/models/Users";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";

export const GET = async (request: any) => {
  try {
    await connect();

    // 세션에서 사용자 이메일을 가져옴
    const session = await getServerSession({ req: request });
    console.log(session?.user.email);

    // 사용자의 이메일 주소 (예: 사용자의 실제 이메일 주소로 변경해야 함)
    const userEmail = session?.user.email;

    // 데이터베이스에서 사용자를 이메일로 찾음
    const user = await Users.findOne({ email: userEmail });

    if (!user) {
      return new NextResponse("사용자를 찾을 수 없습니다", { status: 404 });
    }

    // 나머지 로직 계속하기...

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new NextResponse("데이터베이스 오류", { status: 500 });
  }
};

export const PUT = async (request: any) => {
  const requestData = await request.json();
  await connect();

  try {
    const { currentPassword, newPassword, email } = requestData;

    // 기존 사용자 정보를 찾음
    const user = await Users.findOne({ email });

    if (!user) {
      console.error("사용자를 찾을 수 없음");
      return new NextResponse("사용자를 찾을 수 없음", { status: 404 });
    }

    // Check if the current password matches the stored hashed password
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordMatch) {
      console.error("현재 비밀번호가 일치하지 않음");
      return new NextResponse("현재 비밀번호가 일치하지 않음", { status: 401 });
    }

    // Hash the new password before updating
    const hashedNewPassword = await bcrypt.hash(newPassword, 5);

    // Update the user's password
    user.password = hashedNewPassword;

    // Save the user object
    await user.save(); // 변경사항을 데이터베이스에 저장

    return new NextResponse(
      "주소 또는 비밀번호가 성공적으로 업데이트되었습니다",
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("주소 또는 비밀번호를 업데이트하는 중 오류 발생:", error);
    return new NextResponse("주소 또는 비밀번호를 업데이트하는 중 오류 발생", {
      status: 500,
    });
  }
};

export const DELETE = async (request: any) => {
  const requestData = await request.json();
  await connect();

  try {
    const { addressId, email } = requestData;

    // 기존 사용자 정보를 찾아서 arrived_info에서 해당 주소를 삭제
    const user = await Users.findOneAndUpdate(
      { email: email },
      { $pull: { arrived_info: { _id: addressId } } },
      { new: true } // 업데이트 후의 문서를 반환하도록 설정
    );

    if (!user) {
      console.error("사용자를 찾을 수 없음");
      return new NextResponse("사용자를 찾을 수 없음", { status: 404 });
    }

    return new NextResponse("주소가 성공적으로 삭제되었습니다", {
      status: 200,
    });
  } catch (error) {
    console.error("주소를 삭제하는 중 오류 발생:", error);
    return new NextResponse("주소를 삭제하는 중 오류 발생", {
      status: 500,
    });
  }
};
