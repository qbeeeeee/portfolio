import { Resend } from "resend";
import { RateLimiterMemory } from "rate-limiter-flexible";
import validator from "validator";

const resend = new Resend(process.env.RESEND_API_KEY);

const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "global";

  try {
    await rateLimiter.consume(ip);
  } catch {
    return res.status(429).json({
      error: "Too many requests. Please try again later.",
    });
  }

  const { firstName, lastName, email, message, company } = req.body;

  if (company) {
    return res.status(400).json({ error: "Bot detected" });
  }

  if (
    !firstName ||
    !lastName ||
    !email ||
    !message ||
    typeof email !== "string" ||
    message.length > 2000
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const safeFirstName = validator.escape(firstName);
  const safeLastName = validator.escape(lastName);
  const safeEmail = validator.escape(email);
  const safeMessage = validator.escape(message);

  try {
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

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Email failed to send" });
  }
}
