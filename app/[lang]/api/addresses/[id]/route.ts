import { addressSchema } from "@/app/validation/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";



export async function PATCH(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const body = await request.json()
    const validation = addressSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400})

    const address = await prisma.address.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!address)
        return NextResponse.json({ error: 'Invalid address'}, { status: 404 })

    const updatedAddress = await prisma.address.update({
        where: {
            id: address.id
        },
        data: body.unit 
        ? {
            province: body.province,
            address: body.address,
            city: body.city, 
            plaque: body.plaque,
            unit: body.unit,
            postalCode: body.postalCode,
            isActive: body.isActive,
            userId: body.userId
        } 
        : {
            province: body.province,
            address: body.address,
            city: body.city, 
            plaque: body.plaque,
            postalCode: body.postalCode,
            isActive: body.isActive,
            userId: body.userId
        }
    })

    return NextResponse.json(updatedAddress)
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const address = await prisma.address.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!address)
        return NextResponse.json({ error: 'Invalid address'}, { status: 404 })

    await prisma.address.delete({
        where:{
            id: address.id
        }
    })
    return NextResponse.json({})
}