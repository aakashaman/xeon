import { NextResponse } from 'next/server';

import prisma from '@/prisma/prismaInit';

import bcrypt from 'bcryptjs';

export async function GET(request, { params }) {
  const { contactId } = params;

  const userId = request.headers.get('userId');
  const userPassword = request.headers.get('userPassword');

  try {
    const contact = await prisma.contact.findUnique({
      where: {
        id: contactId,
      },

      include: {
        user: true,
      },
    });

    const match = await bcrypt.compare(userPassword, contact.user.userPassword);

    if (!contact || !match) {
      return NextResponse.json({
        success: false,
        error: 'Contact not found or wrong credentials',
      });
    }

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

export async function PUT(request, { params }) {
  const { contactId } = params;

  const req = await request.json();
  const { name, email, phone, address } = req;

  const userId = request.headers.get('userId');
  const userPassword = request.headers.get('userPassword');

  try {
    const contact = await prisma.contact.findUnique({
      where: {
        id: contactId,
      },

      include: {
        user: true,
      },
    });

    const match = await bcrypt.compare(userPassword, contact.user.userPassword);

    if (!contact || !match) {
      return NextResponse.json({
        success: false,
        error: 'Contact not found or wrong credentials',
      });
    }

    const updatedContact = await prisma.contact.update({
      where: {
        id: contactId,
      },
      data: {
        name,
        email,
        phone,
        address,
      },

      include: {
        user: true,
      },
    });

    return NextResponse.json({
      success: true,
      updatedContact,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error,
    });
  }
}

export async function DELETE(request, { params }) {
  const { contactId } = params;

  const userId = request.headers.get('userId');
  const userPassword = request.headers.get('userPassword');

  try {
    const contact = await prisma.contact.findUnique({
      where: {
        id: contactId,
      },

      include: {
        user: true,
      },
    });

    const match = await bcrypt.compare(userPassword, contact.user.userPassword);

    if (!contact || !match) {
      return NextResponse.json({
        success: false,
        error: 'Contact not found or wrong credentials',
      });
    }

    const deletedContact = await prisma.contact.delete({
      where: {
        id: contactId,
      },
    });

    return NextResponse.json({
      success: true,
      deletedContact,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error,
    });
  }
}
