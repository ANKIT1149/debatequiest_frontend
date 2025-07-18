/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const sendMail = async({ name, email, query, issue }: any) => {
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'c219e2d0ed59a0',
      pass: '5c0c250ca47f63',
    },
  });

  const mailOptions = {
    from: `Email From ${email}`,
    to: 'Aryanshraj1139@gmail.com',
    subject: 'New Contact Form Submission',
    html: `
        <h3>New Query Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Query:</strong> ${query}</p>
        <p><strong>Issue:</strong> ${issue}</p>
      `,
    };
    
    const sendmail = await transporter.sendMail(mailOptions)

    if (!sendmail) {
        return NextResponse.json({message: "Mail sending Failed", status: 400})
    }

    return NextResponse.json({
        message: "Mail Sent Successfully",
        status: 200,
        sendmail
    })
};
