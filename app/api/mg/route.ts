// Mailgun endpoint. Used for now for feedback received. Generalize it to use for email. How can we limit the # of emails a user can send??

import { sendEmail } from '@/lib/email';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    //   TODO: if the user is not logged, we don't allow to send feedback
    //   const id = session?.user?.id;
    const body = await request.json();

    console.log('received');
    console.log(body);

    await sendEmail(
        'ricardo@grouz.io',
        'New Feedback received',
        `Rating: ${body.value}<br>Message: ${body.message}<br>`,
        `<strong>Rating</strong>: ${body.value}<br><strong>Message</strong>: ${body.message}<br>`,
        'ricardo@ricardo.com'
    );

    return NextResponse.json({ message: 'Opinión recibida' }, { status: 200 });
}
