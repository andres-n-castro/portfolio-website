import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_DESTINATION = "andresncastro12@gmail.com";

export async function POST(request: Request) {
    const {name, email, message} = await request.json();

    if (!name || !email || !message) {
        return Response.json({error: "Missing required fields."}, {status: 400});
    }

    const {error} = await resend.emails.send({
        from: "Portfolio Contact Form <onboarding@resend.dev>",
        to: CONTACT_DESTINATION,
        replyTo: email,
        subject: `New message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
        return Response.json({error: "Failed to send message."}, {status: 502});
    }

    return Response.json({success: true});
}
