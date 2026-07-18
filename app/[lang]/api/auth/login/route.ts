import { userLoginSchema } from '@/lib/validation/validationSchemas';
import axios from "axios";
import { SignJWT } from 'jose';
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: {params: Promise<{lang: string}> }) {
    const body = await request.json()
    const lang = (await params).lang

    const validation = userLoginSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})

    
    
    const { status } = await axios.post(`https://api.sms.ir/v1/send/verify`,
        {
            "mobile": "919xxxx904",
            "templateId": 164666,
            "parameters": [
                {
                    "name": "Code",
                    "value": "12345"
                }
            ]
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain',
                'x-api-key': `${process.env.SMS_API_KEY}`
            },
        }
     )
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/api/users`, body)
        const userId = data.user.id
        const cartId = data.user.cartId
        const role = data.user.role
        const user = data.user

        const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
        const token = await new SignJWT({ userId, cartId, role })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('168h')
        .sign(secret)

        const response = NextResponse.json({ user });
        (await cookies()).set("auth-token", token)
        return response
        
    } catch (error) {
        console.error('Login API Error:', error)
        return NextResponse.json(
            { error: 'Login failed' }, 
            { status: 500 }
        )
    }
}