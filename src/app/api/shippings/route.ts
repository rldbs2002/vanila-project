import UserRequest from "@/models/UserRequest";
import { NextResponse } from "next/server";
import connect from "@/utils/db";
import { getServerSession } from "next-auth";

export const PUT = async (request: any) => {
  const requestData = await request.json();

  try {
    await connect();

    const { requestIds, status, request_completed_at } = requestData;

    // Process each requestId in the requestData
    const updatedRequests = await Promise.all(
      requestIds.map(async (requestId: string) => {
        // Find the existing request by requestId
        const existingRequest = await UserRequest.findOne({
          _id: requestId,
        });

        if (existingRequest) {
          // Update the status
          existingRequest.status = status;
          existingRequest.request_completed_at = request_completed_at;

          return await existingRequest.save();
        } else {
          console.error("Request not found for requestId:", requestId);
          return null;
        }
      })
    );

    return new NextResponse(JSON.stringify(updatedRequests), {
      status: 200,
    });
  } catch (err: any) {
    console.error("Error processing request:", err.message);
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
