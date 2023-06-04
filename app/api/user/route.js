import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/prisma/prismaInit';

export const dynamic = true;

// POST /api/token => Create a new token

export async function POST(request) {
  const req = await request.json();

  const { userName, userEmail, userPassword } = req;

  try {
    const user = await prisma.user.create({
      data: {
        userName,
        userEmail,
        userPassword: await bcrypt.hash(userPassword, 10),
      },
    });


    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {

    return NextResponse.json({
      success: false,
      error,
    });
  }
}

// GET /api/token/?dMac= => Get a token by dMac

export async function GET(request) {
  const userEmail = request.nextUrl.searchParams.get('userEmail');

  const userPassword = request.headers.get('userPassword');

  try {
    const user = await prisma.user.findUnique({
      where: {
        userEmail,
      },

      include: {
        contacts: true,
      },
    });

    

    const isMatch = await bcrypt.compare(userPassword, user.userPassword);


    if (!isMatch || !user) {
      return NextResponse.json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message || error,
    });
  }
}
