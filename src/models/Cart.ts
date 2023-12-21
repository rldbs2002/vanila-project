import mongoose from "mongoose";
const { Schema } = mongoose;

const CartItemSchema = new Schema({
  userRequest: {
    type: Schema.Types.ObjectId,
    ref: "UserRequest", // UserRequest 모델을 참조합니다.
  },
});

const CartSchema = new Schema(
  {
    cart_id: {
      type: String,
      unique: true, // Set this to true to enforce uniqueness
      // ... other options ...
    },

    user: {
      type: String,
    },
    items: [CartItemSchema], // 각각의 CartItem을 배열로 가집니다.
    status: Number,

    // 1: Request submit
    // 2: Request Productarrived image
    // 3: Add to Cart( before calculated)
    // 4: price calculate (calculated)
    // ---yes or no----
    // 5: check out ( yes )

    // 6. repacking
    // 7: shipping
    // 8: end

    arrived_info: {
      firstname: String,
      lastname: String,
      country: {
        label: String,
        value: String,
      },
      address: String,
      city: String,
      state: String,
      postal_code: String,
      phone: String,
    },

    options: String,
    cart_total_price: Number,
    pending: Boolean,
    checkout_submitted_at: Date,

    price_calculate: {
      submitted_at: Date, // 가격 확인이 제출된 시간
      repacking_price: Number,
      abroad_shipping_fee: Number,
      total_price: Number, //
    },

    repacking: {
      repacking_images: [],
      repacking_at: Date,
      repacking_confirm: Boolean,
    },
    shipping: {
      shipping_carrier: String,
      shipping_number: String,
      shipping_images: [],
      shipping_completed: Boolean,
      shipping_confirm: Boolean,
      shipping_at: Date,
    },
  },

  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
