import { NextResponse } from "next/server";
import connect from "@/utils/db";
import UserRequest from "@/models/UserRequest";
import Cart from "@/models/Cart";

export const GET = async (request: any, { params }: any) => {
  const { id } = params;
  try {
    await connect();
    const post = await UserRequest.findById(id);
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request: any, { params }: any) => {
  const { id } = params;

  const requestData = await request.json();

  try {
    // 사용자 요청을 찾습니다.
    const userRequest = await UserRequest.findOne({
      _id: id, // params.id 대신 id를 사용합니다.
    });

    if (!userRequest) {
      return new NextResponse("User Request not found", {
        status: 404,
      });
    }

    if (requestData.add_to_cart) {
      const cartItem = {
        userRequest: userRequest._id,
      };

      // 각 항목을 별도의 Cart 항목으로 생성
      const cart = new Cart({
        user: userRequest.user,
        status: 2,
        items: [cartItem],
        add_to_cart: {
          options: requestData.add_to_cart.options,
        },
      });

      await cart.save();
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

export const PUT = async (request: any, { params }: any) => {
  const { id } = params;

  const requestData = await request.json();

  try {
    // 사용자 요청을 찾습니다.
    const userRequest = await UserRequest.findOne({
      _id: id, // params.id 대신 id를 사용합니다.
    });

    if (!userRequest) {
      return new NextResponse("User Request not found", {
        status: 404,
      });
    }

    if (requestData.add_to_cart) {
      userRequest.add_to_cart.options = requestData.add_to_cart.options;
      userRequest.add_to_cart.total_price = requestData.add_to_cart.total_price;

      // 상태를 2로 업데이트합니다 ("add_to_cart")
      userRequest.status = 2;
    }

    // 요청된 데이터에서 price_calculate 상태를 업데이트합니다.
    if (requestData.price_calculate) {
      // Ensure that the userRequest.status object is initialized
      userRequest.price_calculate = {
        submitted_at: requestData.price_calculate.submitted_at,
        total_price: requestData.price_calculate.total_price,
        repacking_price: requestData.price_calculate.repacking_price,
        abroad_shipping_fee: requestData.price_calculate.abroad_shipping_fee,
        purchase_agent_price: requestData.price_calculate.purchase_agent_price,
      };

      // Update the status to 3 ("price_calculate")
      userRequest.status = 4;
    }

    // Extract and update arrived images
    const { arrived } = requestData;

    if (
      arrived &&
      arrived.arrived_images &&
      arrived.arrived_images.length > 0
    ) {
      // Initialize the arrived images array if it's not already initialized
      if (!userRequest.arrived.arrived_images) {
        userRequest.arrived.arrived_images = [];
      }

      // Add the imageFileUrls to the arrived images array
      userRequest.arrived.arrived_images.push(...arrived.arrived_images);

      // Update 'arrived_at' if it's available in the arrived object
      if (arrived.arrived_at) {
        userRequest.arrived.arrived_at = new Date(arrived.arrived_at);
      }

      // Update 'arrived_confirm' if it's available in the arrived object
      if (arrived.arrived_confirm !== undefined) {
        userRequest.arrived.arrived_confirm = arrived.arrived_confirm;
      }

      userRequest.status = 2;
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

export const DELETE = async (request: any, { params }: any) => {
  const { id } = params;
  try {
    await connect();
    await UserRequest.findByIdAndDelete(id);
    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
