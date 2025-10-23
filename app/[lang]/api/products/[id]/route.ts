import { prisma } from "@/app/prisma/client";
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from "next/server";



export async function PATCH(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const body = await request.json()

    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!product)
        return NextResponse.json({ error: 'Invalid product'}, { status: 404 })

    const updatedProduct = await prisma.product.update({
        where: {
            id: product.id
        },
        data: {
            id: body.id,
            label: body.label,
            priceFa: body.priceFa,
            originalPriceFa: body.originalPriceFa,
            description: body.description,
            stock: body.stock,
        }
    })

    return NextResponse.json(updatedProduct)
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ lang: string, id: string }>}) {
    const params = await props.params;
    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!product)
        return NextResponse.json({ error: 'Invalid product'}, { status: 404 })

    await prisma.product.delete({
        where:{
            id: product.id
        }
    })

    revalidatePath(`/${params.lang}/admin/dashboard/products`); // Adjust path as needed
    // revalidatePath(`/${params.lang}`); // Revalidate home page if needed
    return NextResponse.json({})
}