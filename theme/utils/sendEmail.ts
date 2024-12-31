import { SITE } from '~/config/siteConfig';

export interface SendEmailParams {
  email: string;
  fullname: string;
  phone: string;
  message: string;
}

export async function sendEmail({ email, fullname, phone, message }: SendEmailParams): Promise<any> {
  try {
    const response = await fetch('https://wy3lyuf7d3.execute-api.us-west-2.amazonaws.com/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({
        email,
        fullname,
        phone,
        message,
        toEmail: SITE.email,
        subject: `${SITE.name} Contact Form`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
