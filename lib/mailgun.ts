import { config } from '@/config/shipper.config';
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
    console.log('sending email');
    console.log(mg);
    console.log(process.env.NEXT_PUBLIC_MAILGUN_API_KEY);
    const data = {
        from: config.email.fromAdmin,
        to: [to],
        subject,
        text,
        html,
        ...(replyTo && { 'h:Reply-To': replyTo }),
    };

    try {
        await mg.messages.create(
            config.email.testSubdomain,
            // (config.mailgun.subdomain ? `${config.mailgun.subdomain}.` : "") +
            // config.domainName,
            data
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};
