import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Cart from "@/models/Cart";
import UserRequest from "@/models/UserRequest";
import { getServerSession } from "next-auth";

// Type for an individual entry
type UserRequestDataEntry = {
  cartId: string;
  userRequest: any;
  cartOptions: any;
  status: any;
  repacking: any;
  shipping: any;
  cart_id: any;
  arrived_info: any;
};

// Type for the groupedData object
type GroupedData = Record<string, UserRequestDataEntry[]>;

export const GET = async (request: any) => {
  try {
    await connect();

    const session = await getServerSession({ req: request });

    // 사용자의 이메일 주소 (예: 사용자의 실제 이메일 주소로 변경해야 함)
    const userEmail = session?.user.email;

    // 1. 먼저 모든 Cart 데이터를 가져옵니다.
    const cartData = await Cart.find({ user: userEmail });

    // 2. 각 Cart의 _id로 해당 Cart의 items.userRequest 값을 가져오기 위한 배열 생성
    const userRequestData = [];

    for (const cart of cartData) {
      const cartId = cart._id; // Cart의 _id를 한 번만 가져옴

      const cartOptions = cart.options;
      const price_calculate = cart.price_calculate;
      const status = cart.status;
      const repacking = cart.repacking;
      const shipping = cart.shipping;
      const cart_id = cart.cart_id;
      const arrived_info = cart.arrived_info;

      for (const item of cart.items) {
        if (item.userRequest) {
          const userRequestId = item.userRequest;
          const userRequest = await UserRequest.findOne({
            _id: userRequestId,
          });

          if (userRequest) {
            // userRequest 및 해당 Cart ID를 묶어서 추가
            userRequestData.push({
              cartId,
              userRequest,
              cartOptions,
              status,
              repacking,
              shipping,
              cart_id,
              arrived_info,
            });
          }
        }
      }
    }

    // userRequestData를 CartId 별로 그룹화
    const groupedData: GroupedData = userRequestData.reduce((result, entry) => {
      const cartId = entry.cartId as string; // assert cartId as string

      if (!result[cartId]) {
        result[cartId] = [];
      }

      result[cartId].push(entry);

      return result;
    }, {} as GroupedData);

    return new NextResponse(JSON.stringify(groupedData), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request: any) => {
  const requestData = await request.json();

  try {
    // 현재 년도와 날짜를 가져오는 함수 (예: 20230918)
    const getCurrentYearAndDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      return `${year}${month}${day}`;
    };

    const currentDatePart = getCurrentYearAndDate(); // Get current date part (e.g., 20230918)

    const lastCart = await Cart.findOne(
      { cart_id: { $regex: `^C${currentDatePart}-` } },
      {},
      { sort: { cart_id: -1 } }
    );

    let newCartId = "0001";

    if (lastCart) {
      const lastCartId = lastCart.cart_id;
      const lastNumber = parseInt(lastCartId.substr(10), 11); // Extract the number part after the date

      if (lastNumber < 9999) {
        newCartId = String(lastNumber + 1).padStart(4, "0");
      } else {
        // If it reaches 9999, don't reset, keep it as "9999"
        newCartId = "9999";
      }
    }

    const finalCartId = `C${currentDatePart}-${newCartId}`;

    const { items, options, user, arrived_info } = requestData;
    console.log(arrived_info);

    const cartItems = items.map((item: any) => {
      return {
        userRequest: item.userRequest,
      };
    });

    // 나머지 코드는 동일하게 유지
    const cart = new Cart({
      cart_id: finalCartId,
      status: 3,
      items: cartItems,
      options,
      user,
      arrived_info,
    });

    console.log(cart);

    await cart.save();

    return new NextResponse("항목이 장바구니에 추가되었습니다", {
      status: 200,
    });
  } catch (error) {
    console.error("새로운 Cart를 생성하는 중 오류 발생:", error);
    return new NextResponse("새로운 Cart를 생성하는 중 오류 발생", {
      status: 500,
    });
  }
};

export const DELETE = async (request: any) => {
  const requestData = await request.json();
  await connect();

  try {
    // 사용자 요청을 찾습니다.
    const cartRequest = await Cart.findOne({
      cart_id: requestData.cart_id,
    });

    if (!cartRequest) {
      return new NextResponse("User Request not found", {
        status: 404,
      });
    }

    // 사용자 요청을 저장하고 업데이트된 요청을 반환합니다.
    await cartRequest.save();
    return new NextResponse("User Request has been updated", {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
