import { NextResponse } from 'next/server';
import prisma from '@/prisma/prismaInit';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  const req = await request.json();

  const { name, email, phone, address } = req;
  const userId = request.headers.get('userId');
  const userPassword = request.headers.get('userPassword');

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const match = await bcrypt.compare(userPassword, user.userPassword);

    if (!user || !match) {
      return NextResponse.json({
        success: false,
        error: 'User not found or wrong credentials',
      });
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        address,
        userId
      },
    });

    return NextResponse.json({
      success: true,
      contact,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Something went wrong',
    });
  }
}
