import { NextResponse } from "next/server";
import connect from "@/utils/db";
import UserRequest from "@/models/UserRequest";
import Cart from "@/models/Cart";

// Type for an individual entry
type UserRequestDataEntry = {
  cartId: string;
  userRequest: any;
  cartOptions: any;
  price_calculate: any;
  status: any;
  repacking: any;
  shipping: any;
  cart_id: any;
  arrived_info: any;
  arrived: any;
};

// Type for the groupedData object
type GroupedData = Record<string, UserRequestDataEntry[]>;

export const GET = async (request: any) => {
  try {
    await connect();

    const cartId = new URL(request.url).pathname.replace("/api/checkout/", "");
    // console.log(cartId);
    // 1. 먼저 모든 Cart 데이터를 가져옵니다.
    const cartData = await Cart.find({ _id: cartId });

    // 2. 각 Cart의 _id로 해당 Cart의 items.userRequest 값을 가져오기 위한 배열 생성
    const userRequestData = [];

    for (const cart of cartData) {
      const cartId = cart._id; // Cart의 _id를 한 번만 가져옴

      const cartOptions = cart.options;
      const price_calculate = cart.price_calculate;
      const status = cart.status;
      const repacking = cart.repacking;
      const cart_id = cart.cart_id;
      const shipping = cart.shipping;
      const arrived_info = cart.arrived_info;
      const arrived = cart.arrived;

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
              price_calculate,
              status,
              repacking,
              shipping,
              arrived_info,
              arrived,
              cart_id,
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

export const PUT = async (request: any, { params }: any) => {
  const { id } = params;

  const requestData = await request.json();

  try {
    // 사용자 요청을 찾습니다.
    const cartRequest = await Cart.findOne({
      _id: id, // params.id 대신 id를 사용합니다.
    });

    if (!cartRequest) {
      return new NextResponse("User Request not found", {
        status: 404,
      });
    }

    // Extract and update arrived images
    const { arrived } = requestData;

    if (
      arrived &&
      arrived.arrived_images &&
      arrived.arrived_images.length > 0
    ) {
      // Initialize the arrived images array if it's not already initialized
      if (!cartRequest.arrived.arrived_images) {
        cartRequest.arrived.arrived_images = [];
      }

      // Add the imageFileUrls to the arrived images array
      cartRequest.arrived.arrived_images.push(...arrived.arrived_images);

      // Update 'arrived_at' if it's available in the arrived object
      if (arrived.arrived_at) {
        cartRequest.arrived.arrived_at = new Date(arrived.arrived_at);
      }
      // Update status to 3
      cartRequest.status = 3;
    }

    // Extract and update repacking images
    const { repacking } = requestData;

    if (
      repacking &&
      repacking.repacking_images &&
      repacking.repacking_images.length > 0
    ) {
      // Initialize the repacking images array if it's not already initialized
      if (!cartRequest.repacking.repacking_images) {
        cartRequest.repacking.repacking_images = [];
      }

      // Add the imageFileUrls to the repacking images array
      cartRequest.repacking.repacking_images.push(
        ...repacking.repacking_images
      );

      // Update 'repacking_at' if it's available in the repacking object
      if (repacking.repacking_at) {
        cartRequest.repacking.repacking_at = new Date(repacking.repacking_at);
      }

      if (repacking.repacking_confirm !== undefined) {
        cartRequest.repacking.repacking_confirm = repacking.repacking_confirm;
      }

      cartRequest.status = 6;
    }

    // 데이터에서 shipping 정보 추출
    const { shipping } = requestData;

    if (
      shipping &&
      shipping.shipping_images &&
      shipping.shipping_images.length > 0
    ) {
      // Initialize the repacking images array if it's not already initialized
      if (!cartRequest.shipping.shipping_images) {
        cartRequest.shipping.shipping_images = [];
      }

      // Add the imageFileUrls to the shipping images array
      cartRequest.shipping.shipping_images.push(...shipping.shipping_images);

      // Update 'shipping_at' if it's available in the shipping object
      if (shipping.shipping_at) {
        cartRequest.shipping.shipping_at = new Date(shipping.shipping_at);
      }

      if (shipping.shipping_confirm !== undefined) {
        cartRequest.shipping.shipping_confirm = shipping.shipping_confirm;
      }
      cartRequest.status = 7;
    }

    // shipping 정보 업데이트
    if (shipping) {
      const {
        shippingCarrier,
        shippingNumber,
        shippingCompleted,
        shipping_at,
      } = shipping;

      if (shippingCarrier) {
        cartRequest.shipping.shipping_carrier = shippingCarrier;
      }

      if (shippingNumber) {
        cartRequest.shipping.shipping_number = shippingNumber;
      }

      if (shippingCompleted !== undefined) {
        cartRequest.shipping.shipping_completed = shippingCompleted;
      }

      if (shipping_at) {
        cartRequest.shipping.shipping_at = new Date(shipping_at);
      }
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
