import mongoose from "mongoose";
const { Schema } = mongoose;

const productListSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  priceKRW: {
    type: Number,
    required: true,
  },
  priceUSD: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalValueUSD: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const requestSchema = new Schema({
  user: {
    type: String,
  },

  request_id: {
    type: String,
    unique: true, // Set this to true to enforce uniqueness
    // ... other options ...
  },

  status: Number,

  // 1: Request submit
  // 2: Request Product arrived image
  // 3: Add to Cart( before calculated)
  // 4: price calculate (calculated)
  // ---yes or no----
  // 5: check out ( yes )
  // 6. repacking
  // 7: shipping
  // 8: end

  request_info: {
    tracking_info: {
      tracking_number: {
        type: String,
        required: true,
      },
      tracking_carrier: {
        type: String,
        required: true,
      },
      order_number: {
        type: String,
      },
      store: {
        type: String,
      },
    },

    product_list: [productListSchema],
  },

  request_submitted_at: Date,
  request_completed_at: Date,

  options: String,

  price_calculate: {
    submitted_at: Date, // 가격 확인이 제출된 시간
    repacking_price: Number,
    abroad_shipping_fee: Number,
    total_price: Number, //
  },

  user_confirm: {
    submitted_at: Date, // 사용자의 가격 동의가 제출된 시간
  },

  arrived: {
    arrived_images: [],
    arrived_at: Date,
  },
});

export default mongoose.models.UserRequest ||
  mongoose.model("UserRequest", requestSchema);
