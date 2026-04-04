import { Resend } from "resend";
import validator from "validator";

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event) => {
  // Define CORS headers so your S3 frontend is allowed to talk to this backend
  const headers = {
    "Access-Control-Allow-Origin": "*", // You can change "*" to your CloudFront URL later for better security
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
  };

  // Handle the CORS preflight request
  const method = event.requestContext?.http?.method || event.httpMethod;
  if (method === "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  // Restrict to POST
  if (method !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Parse the incoming event body
    const body = JSON.parse(event.body);
    const { firstName, lastName, email, message, company } = body;

    // Honeypot (Bot Detection)
    if (company) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Bot detected" }),
      };
    }

    // Validate Input
    if (
      !firstName ||
      !lastName ||
      !email ||
      !message ||
      typeof email !== "string" ||
      message.length > 2000
    ) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid input" }),
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid email format" }),
      };
    }

    // Sanitize Data
    const safeFirstName = validator.escape(firstName);
    const safeLastName = validator.escape(lastName);
    const safeEmail = validator.escape(email);
    const safeMessage = validator.escape(message);

    // Send the Email
    const data = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // Keep this for testing
      to: ["papadokonst1998@gmail.com"],
      subject: `New Portfolio Message from ${safeFirstName}`,
      html: `
        <p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong> ${safeMessage}</p>
      `,
    });

    // Return Success
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data }),
    };
  } catch (error) {
    console.error("Lambda Error:", error);

    // Handle JSON parsing errors specifically
    if (error instanceof SyntaxError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid JSON format" }),
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Email failed to send" }),
    };
  }
};
