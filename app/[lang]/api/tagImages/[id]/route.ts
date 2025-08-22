import { tagImageSchema } from "@/app/validation/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";



export async function PATCH(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const body = await request.json()
    const validation = tagImageSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400})

    const tagImage = await prisma.tagImage.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!tagImage)
        return NextResponse.json({ error: 'Invalid tagImage'}, { status: 404 })

    const updatedImage = await prisma.tagImage.update({
        where: {
            id: tagImage.id
        },
        data: {
            url: body.url,
            tagId: body.productId
        }
    })

    return NextResponse.json(updatedImage)
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const tagImage = await prisma.tagImage.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!tagImage)
        return NextResponse.json({ error: 'Invalid tagImage'}, { status: 404 })

    await prisma.tagImage.delete({
        where:{
            id: tagImage.id
        }
    })
    return NextResponse.json({})
}