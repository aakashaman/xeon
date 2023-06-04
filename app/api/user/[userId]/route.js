import { NextResponse } from 'next/server';
import prisma from '@/prisma/prismaInit';
import bcrypt from 'bcryptjs';

// GET /api/user => Get user data
export async function GET(request, { params }) {
  const userPassword = request.headers.get('userPassword');
  const { userId } = params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        contacts: true,
      },
    });
    const match = await bcrypt.compare(userPassword, user.userPassword);
    if (!user || !match) {
      return NextResponse.json({
        success: false,
        error: 'User not found or wrong credentials',
      });
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message || error || 'Something went wrong',
    });
  }
}
