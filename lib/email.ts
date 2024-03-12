import { appConfig } from '@/config/shipper.config';
import Mailgun from 'mailgun.js';

const formData = require('form-data');
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
    username: 'api',
    // TODO: This should not be public
    key: process.env.NEXT_PUBLIC_MAILGUN_API_KEY!,
});

/**
 * Sends an email using the provided parameters.
 */
export const sendEmail = async (
    to: string,
    subject: string,
    text: string,
    html: string,
    replyTo: string
) => {
    const data = {
        from: appConfig.email.fromAdmin,
        to: [to],
        subject,
        text,
        html,
        ...(replyTo && { 'h:Reply-To': replyTo }),
    };

    try {
        await mg.messages.create(
            appConfig.email.testSubdomain,
            // (config.mailgun.subdomain ? `${config.mailgun.subdomain}.` : "") +
            // config.domainName,
            data
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetUrl = `${process.env.HOST_NAME_DEV}${appConfig.routes.auth.newPassword}?token=${token}`;

    const subject = 'Reset your password';
    const text = `You are receiving this email because you (or someone else) have requested the reset of the password for your account.
    Please click on the following link, or paste this into your browser to complete the process:
    ${resetUrl}
    If you did not request this, please ignore this email and your password will remain unchanged.`;
    const html = `<p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
    <p>Please click on the following link, or paste this into your browser to complete the process:</p>
    <p><a href="${resetUrl}">${resetUrl}</a></p>
    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

    await sendEmail(email, subject, text, html, appConfig.email.fromAdmin);
};
