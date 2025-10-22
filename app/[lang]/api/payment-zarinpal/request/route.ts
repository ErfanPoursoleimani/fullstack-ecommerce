// import connectToDB from "@/utils/db";
import TempPayment from "@/app/models/TempPayment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, cartProducts, finalPrice } = await req.json();

    const description = "پرداخت سفارش کلاس";
    const merchant_id = process.env.ZARINPAL_MERCHANT_ID;
    const callback_url = `${process.env.BASE_URL}/api/payment-zarinpal/verify`;

    const res = await fetch("https://api.zarinpal.com/pg/v4/payment/request.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merchant_id,
        amount: finalPrice,
        description,
        callback_url,
      }),
    });

    const result = await res.json();

    if (result.data && result.data.code === 100) {
      const authority = result.data.authority;

      // ذخیره پرداخت موقت
      await TempPayment.create({
        authority,
        user: userId,
        cartProducts,
        finalPrice:finalPrice 
      });

      return NextResponse.json({
        success: true,
        url: `https://www.zarinpal.com/pg/StartPay/${authority}`,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.errors.message || "خطا در ایجاد پرداخت",
      }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
