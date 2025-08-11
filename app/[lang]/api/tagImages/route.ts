import { NextRequest, NextResponse } from "next/server";
import { tagImageSchema } from '@/validation/validationSchemas'
import { prisma } from "@/prisma/client";

export async function GET(req: NextRequest){
    const { searchParams } = new URL(req.url)
    const tagId = searchParams.get("tagId")

    let tagImages
    
    if(tagId){
        tagImages = await prisma.tagImage.findMany({
            where: {
                tagId: parseInt(tagId)
              }
        })
    }else {
        tagImages = await prisma.tagImage.findMany()
    }

    return NextResponse.json(tagImages)
}

export async function POST(request: NextRequest) {
    const body = await request.json()

    const validation = tagImageSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})

    const tagImage = await prisma.tagImage.findUnique({
        where: {
            id: body.id
        }
    })
    if(tagImage)
        return NextResponse.json({error: "Tag's Image already exists"}, {status: 400})
    const newTagImage = await prisma.tagImage.create({
        data: {
            url: body.url, 
            tagId: body.tagId
        }
    })
    return NextResponse.json(newTagImage, {status: 201})
}