import { sendMail } from '@/helpers/sendMail';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const { name, email, query, issue } = reqBody;

    if (!name || !email || !query || !issue) {
      return NextResponse.json({
        message: 'Please Provide all Field',
        status: 400,
      });
    }

    await sendMail({ name, email, query, issue });

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully!',
      status: 200,
    });
  } catch (error) {
    console.log('Error in sending contact Form', error);
    return NextResponse.json({
      message: 'Contact For Api Failed',
      status: 500,
    });
  }
}
