import { NextRequest, NextResponse } from "next/server";
import { imageSchema } from '@/app/validation/validationSchemas'
import { prisma } from "@/app/prisma/client";

export async function GET(req: NextRequest){
    const { searchParams } = new URL(req.url)
    const productId = searchParams.get("productId")

    let images
    
    if(productId){
        images = await prisma.image.findMany({
            where: {
                productId: parseInt(productId)
              }
        })
    }else {
        images = await prisma.image.findMany()
    }

    return NextResponse.json(images)
}

export async function POST(request: NextRequest) {
    const body = await request.json()

    const validation = imageSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})

    const image = await prisma.image.findUnique({
        where: {
            productId: body.productId
        }
    })
    if(image)
        return NextResponse.json({error: "Image already exists"}, {status: 400})
    const newImage = await prisma.image.create({
        data: {
            url: body.url, 
            productId: body.productId
        }
    })
    return NextResponse.json(newImage, {status: 201})
}