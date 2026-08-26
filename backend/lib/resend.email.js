import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API);

export const sendEmail = async (to, subject, html) => {
    try {

        const response = await resend.emails.send({
            from: "Hx1c33 <onboarding@resend.dev>",
            to,
            subject,
            html
        });

        console.log("Email sent:", response);

        return {
            success: true
        };

    } catch (error) {

        console.log("Resend Error:", error);

        return {
            success: false,
            error
        };
    }
};