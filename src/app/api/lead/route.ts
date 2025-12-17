import { NextRequest, NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/validations";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);

    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "יותר מדי בקשות. נסה שוב בעוד דקה." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check - if website field is filled, it's likely a bot
    if (body.website && body.website.length > 0) {
      // Return fake success to not reveal honeypot
      return NextResponse.json({ success: true });
    }

    // Validate with Zod
    const validationResult = leadFormSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((e) => e.message).join(", ");
      return NextResponse.json(
        { error: errors },
        { status: 400 }
      );
    }

    const { name, phone, email } = validationResult.data;

    // Send to Google Sheets webhook
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("GOOGLE_SHEET_WEBHOOK_URL is not configured");
      return NextResponse.json(
        { error: "שגיאת שרת. נסה שוב מאוחר יותר." },
        { status: 500 }
      );
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!webhookResponse.ok) {
      console.error("Google Sheets webhook failed:", webhookResponse.status);
      return NextResponse.json(
        { error: "שגיאה בשמירת הפרטים. נסה שוב מאוחר יותר." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "שגיאת שרת. נסה שוב מאוחר יותר." },
      { status: 500 }
    );
  }
}
