import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  budget?: string;
  message?: string;
};

const gmailUser =
  process.env.GMAIL_USER ?? process.env.SMTP_USER ?? process.env.EMAIL_USER;
const gmailAppPassword =
  process.env.GMAIL_APP_PASSWORD ??
  process.env.SMTP_APP_PASSWORD ??
  process.env.EMAIL_APP_PASSWORD;
const recipientEmails =
  process.env.CONTACT_RECIPIENTS ??
  process.env.CONTACT_TO_EMAILS ??
  process.env.CONTACT_EMAILS;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseRecipients(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}

type LogoAsset = {
  fileName: string;
  content: Buffer;
  mimeType: string;
  cid: string;
};

/**
 * Reads a local logo file and returns an embeddable CID attachment payload.
 * CID attachments are better supported by email clients than base64 data URIs.
 */
function getLogoAsset(): LogoAsset | null {
  const candidates = [
    "Logo.png",
    "Logo.jpeg",
    "Logo.jpg",
    "logo.png",
    "logo.jpeg",
    "logo.jpg",
  ].map((f) => path.join(process.cwd(), "public", "images", f));

  for (const filePath of candidates) {
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath);
        const ext = path.extname(filePath).toLowerCase();
        const mimeType = ext === ".png" ? "image/png" : "image/jpeg";
        return {
          fileName: path.basename(filePath),
          content,
          mimeType,
          cid: "slimcybertech-logo",
        };
      }
    } catch {
      // try next candidate
    }
  }
  return null;
}

/**
 * Converts raw message text into clean HTML paragraphs, preserving intentional
 * line breaks within paragraphs.
 */
function formatMessageHtml(raw: string): string {
  const paragraphs = raw
    .trim()
    .split(/\n{2,}/)
    .map((para) =>
      para
        .split(/\n/)
        .map((line) => escapeHtml(line))
        .join("<br />"),
    )
    .filter((p) => p.trim().length > 0);

  if (paragraphs.length === 0) return "";

  return paragraphs
    .map(
      (p) =>
        `<p style="margin:0 0 16px;padding:0;font-size:15px;color:#1a2e44;line-height:1.85;word-break:break-word;">${p}</p>`,
    )
    .join("");
}

// ---------------------------------------------------------------------------
// Shared design tokens (kept in one place so both templates stay consistent)
// ---------------------------------------------------------------------------

const BRAND = {
  navy: "#0d1f3c",
  navySoft: "#13294b",
  blue: "#1a56db",
  blueLight: "#4a8ef5",
  bluePale: "#eef3ff",
  blueBorder: "#c5d8fa",
  text: "#0d1f3c",
  textMuted: "#5a7299",
  textLight: "#8fa3be",
  bg: "#f6f8fc",
  white: "#ffffff",
  accentGreen: "#10b981",
  divider: "#e2ebf7",
};

// ---------------------------------------------------------------------------
// Template builders
// ---------------------------------------------------------------------------

/**
 * Builds the notification email sent to the website owners.
 */
function buildOwnerEmail(params: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  budget: string;
  message: string;
  logoHtml: string;
  replySubject: string;
}): string {
  const {
    firstName,
    lastName,
    email,
    phone,
    subject,
    budget,
    message,
    logoHtml,
    replySubject,
  } = params;

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  const messageHtml = formatMessageHtml(message);

  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>New Inquiry — SlimCyberTech</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.bg};
             font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;
             -webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color:${BRAND.bg};padding:40px 16px 56px;">
    <tr>
      <td align="center">
        <table role="presentation" width="620" cellpadding="0" cellspacing="0" border="0"
          style="max-width:620px;width:100%;border-radius:14px;overflow:hidden;
                 background:${BRAND.white};border:1px solid ${BRAND.divider};
                 box-shadow:0 6px 20px rgba(15,23,42,0.05);">
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,${BRAND.blue} 0%,${BRAND.blueLight} 100%);"></td>
          </tr>
          <tr>
            <td style="padding:22px 28px;border-bottom:1px solid ${BRAND.divider};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;">
                    ${logoHtml}
                  </td>
                  <td style="text-align:right;vertical-align:middle;">
                    <span style="display:inline-block;background:#eff6ff;color:${BRAND.blue};
                                 font-size:11px;font-weight:700;letter-spacing:0.4px;
                                 padding:6px 12px;border-radius:999px;border:1px solid #dbeafe;">
                      New Inquiry
                    </span>
                  </td>
                </tr>
              </table>
              <div style="margin-top:14px;">
                <div style="margin:0 0 4px;font-size:22px;font-weight:700;color:${BRAND.text};line-height:1.3;">
                  You have a new message
                </div>
                <p style="margin:0;font-size:14px;color:${BRAND.textMuted};line-height:1.65;">
                  A customer submitted a new enquiry through your website contact form.
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:26px 28px 30px;background:${BRAND.white};">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                style="background:#f8fbff;border-radius:12px;border:1px solid ${BRAND.blueBorder};margin-bottom:20px;">
                <tr>
                  <td style="padding:18px 18px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="vertical-align:middle;width:52px;padding-right:14px;">
                          <div style="width:48px;height:48px;border-radius:50%;
                                      background:linear-gradient(135deg,${BRAND.blue} 0%,${BRAND.blueLight} 100%);
                                      text-align:center;line-height:48px;font-size:15px;font-weight:800;color:#ffffff;">
                            ${initials}
                          </div>
                        </td>
                        <td style="vertical-align:middle;">
                          <div style="font-size:15px;font-weight:700;color:${BRAND.text};margin-bottom:4px;line-height:1.3;">
                            ${escapeHtml(`${firstName} ${lastName}`.trim())}
                          </div>
                          <a href="mailto:${escapeHtml(email)}"
                            style="font-size:13px;color:${BRAND.blue};text-decoration:none;font-weight:500;">
                            ${escapeHtml(email)}
                          </a>
                        </td>
                        ${
                          phone
                            ? `<td style="text-align:right;vertical-align:middle;padding-left:10px;">
                            <span style="display:inline-block;background:#eaf2ff;color:${BRAND.blue};
                                         font-size:11.5px;font-weight:600;padding:5px 12px;border-radius:20px;
                                         white-space:nowrap;border:1px solid #cfe0ff;">
                              &#128222;&nbsp;${escapeHtml(phone)}
                            </span>
                          </td>`
                            : ""
                        }
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:20px;">
                <tr>
                  <td style="width:50%;padding-right:8px;vertical-align:top;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                      style="background:${BRAND.bluePale};border-radius:10px;border:1px solid ${BRAND.blueBorder};">
                      <tr>
                        <td style="padding:14px 16px;">
                          <div style="font-size:10px;font-weight:700;letter-spacing:1.1px;text-transform:uppercase;
                                      color:${BRAND.textMuted};margin-bottom:6px;">
                            Service Requested
                          </div>
                          <div style="font-size:14px;font-weight:700;color:${BRAND.text};line-height:1.4;">
                            ${escapeHtml(subject)}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="width:50%;padding-left:8px;vertical-align:top;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                      style="background:${BRAND.bluePale};border-radius:10px;border:1px solid ${BRAND.blueBorder};">
                      <tr>
                        <td style="padding:14px 16px;">
                          <div style="font-size:10px;font-weight:700;letter-spacing:1.1px;text-transform:uppercase;
                                      color:${BRAND.textMuted};margin-bottom:6px;">
                            Budget Range
                          </div>
                          <div style="font-size:14px;font-weight:700;color:${BRAND.text};line-height:1.4;">
                            ${escapeHtml(budget || "Not specified")}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:28px;">
                <tr>
                  <td>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:10px;">
                      <tr>
                        <td>
                          <span style="font-size:10px;font-weight:700;letter-spacing:1.1px;text-transform:uppercase;color:${BRAND.textMuted};">
                            Customer Message
                          </span>
                        </td>
                        <td style="text-align:right;">
                          <span style="font-size:11px;color:${BRAND.textLight};">${message.length} characters</span>
                        </td>
                      </tr>
                    </table>
                    <div style="background:#f8fafc;border-radius:10px;border:1px solid ${BRAND.divider};padding:20px 20px 6px;">
                      ${messageHtml}
                    </div>
                  </td>
                </tr>
              </table>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent("Re: " + replySubject)}"
                      style="display:inline-block;background:${BRAND.blue};color:#ffffff;font-size:14px;font-weight:700;
                             text-decoration:none;padding:14px 36px;border-radius:8px;letter-spacing:0.2px;">
                      Reply to ${escapeHtml(firstName)}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#f8fafc;padding:16px 28px 20px;border-top:1px solid ${BRAND.divider};">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="vertical-align:middle;">
                    <div style="font-size:13px;font-weight:700;color:${BRAND.text};">SlimCyberTech</div>
                    <div style="font-size:11px;color:${BRAND.textMuted};margin-top:2px;">Arua, West Nile &middot; Uganda</div>
                  </td>
                  <td style="text-align:right;vertical-align:middle;">
                    <a href="https://slimcybertech.com" style="font-size:11px;color:${BRAND.blue};text-decoration:none;font-weight:600;">
                      slimcybertech.com
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Builds the confirmation email sent back to the person who filled in the form.
 * Tone is warm, reassuring, and human — not robotic.
 */
function buildConfirmationEmail(params: {
  firstName: string;
  subject: string;
  budget: string;
  message: string;
  logoHtml: string;
  ownerEmail: string;
}): string {
  const { firstName, subject, budget, message, logoHtml, ownerEmail } = params;
  const messageHtml = formatMessageHtml(message);

  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>We got your message — SlimCyberTech</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.bg};
             font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;
             -webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color:${BRAND.bg};padding:40px 16px 56px;">
    <tr>
      <td align="center">
        <table role="presentation" width="620" cellpadding="0" cellspacing="0" border="0"
          style="max-width:620px;width:100%;border-radius:14px;overflow:hidden;
                 background:${BRAND.white};border:1px solid ${BRAND.divider};
                 box-shadow:0 6px 20px rgba(15,23,42,0.05);">
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,${BRAND.accentGreen} 0%,${BRAND.blueLight} 100%);"></td>
          </tr>
          <tr>
            <td style="padding:22px 28px;border-bottom:1px solid ${BRAND.divider};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;">
                    ${logoHtml}
                  </td>
                  <td style="text-align:right;vertical-align:middle;">
                    <span style="display:inline-block;background:#ecfdf5;color:#047857;
                                 font-size:11px;font-weight:700;letter-spacing:0.4px;
                                 padding:6px 12px;border-radius:999px;border:1px solid #bbf7d0;">
                      Received
                    </span>
                  </td>
                </tr>
              </table>
              <div style="margin-top:14px;">
                <div style="margin:0 0 4px;font-size:22px;font-weight:700;color:${BRAND.text};line-height:1.3;">
                  Thanks for reaching out, ${escapeHtml(firstName)}.
                </div>
                <p style="margin:0;font-size:14px;color:${BRAND.textMuted};line-height:1.65;">
                  We received your message and will send you a response within 1&ndash;2 business days.
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:26px 28px 30px;background:${BRAND.white};">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                style="background:#f8fbff;border-radius:12px;border:1px solid ${BRAND.blueBorder};margin-bottom:20px;">
                <tr>
                  <td style="padding:18px 18px;">
                    <div style="font-size:14px;font-weight:700;color:${BRAND.text};margin-bottom:10px;">What happens next</div>
                    <p style="margin:0 0 8px;font-size:13px;color:${BRAND.textMuted};line-height:1.7;">
                      1. We review your request details.
                    </p>
                    <p style="margin:0 0 8px;font-size:13px;color:${BRAND.textMuted};line-height:1.7;">
                      2. We contact you with recommendations and next steps.
                    </p>
                    <p style="margin:0;font-size:13px;color:${BRAND.textMuted};line-height:1.7;">
                      3. We align on timelines and begin implementation.
                    </p>
                  </td>
                </tr>
              </table>
              <div style="font-size:10px;font-weight:700;letter-spacing:1.1px;text-transform:uppercase;
                          color:${BRAND.textMuted};margin-bottom:10px;">
                Your Submission
              </div>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:18px;">
                <tr>
                  <td style="width:50%;padding-right:8px;vertical-align:top;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                      style="background:${BRAND.bluePale};border-radius:10px;border:1px solid ${BRAND.blueBorder};">
                      <tr>
                        <td style="padding:13px 15px;">
                          <div style="font-size:10px;font-weight:700;letter-spacing:1.1px;text-transform:uppercase;
                                      color:${BRAND.textMuted};margin-bottom:5px;">
                            Service
                          </div>
                          <div style="font-size:14px;font-weight:700;color:${BRAND.text};line-height:1.4;">
                            ${escapeHtml(subject)}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="width:50%;padding-left:8px;vertical-align:top;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                      style="background:${BRAND.bluePale};border-radius:10px;border:1px solid ${BRAND.blueBorder};">
                      <tr>
                        <td style="padding:13px 15px;">
                          <div style="font-size:10px;font-weight:700;letter-spacing:1.1px;text-transform:uppercase;
                                      color:${BRAND.textMuted};margin-bottom:5px;">
                            Budget
                          </div>
                          <div style="font-size:14px;font-weight:700;color:${BRAND.text};line-height:1.4;">
                            ${escapeHtml(budget || "Not specified")}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <div style="font-size:10px;font-weight:700;letter-spacing:1.1px;text-transform:uppercase;
                          color:${BRAND.textMuted};margin-bottom:10px;">
                Your Message
              </div>
              <div style="background:#f8fafc;border-radius:10px;border:1px solid ${BRAND.divider};
                          padding:20px 20px 6px;margin-bottom:24px;">
                ${messageHtml}
              </div>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="mailto:${escapeHtml(ownerEmail)}"
                      style="display:inline-block;background:${BRAND.blue};color:#ffffff;font-size:14px;font-weight:700;
                             text-decoration:none;padding:14px 36px;border-radius:8px;letter-spacing:0.2px;">
                      Reply to Our Team
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#f8fafc;padding:16px 28px 20px;border-top:1px solid ${BRAND.divider};">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="vertical-align:middle;">
                    <div style="font-size:13px;font-weight:700;color:${BRAND.text};">SlimCyberTech</div>
                    <div style="font-size:11px;color:${BRAND.textMuted};margin-top:2px;">Arua, West Nile &middot; Uganda</div>
                  </td>
                  <td style="text-align:right;vertical-align:middle;">
                    <a href="https://slimcybertech.com" style="font-size:11px;color:${BRAND.blue};text-decoration:none;font-weight:600;">
                      slimcybertech.com
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-size:11px;color:#8aa0b8;text-align:center;line-height:1.7;">
          You received this email because you submitted our contact form.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(request: Request) {
  if (!gmailUser || !gmailAppPassword) {
    return NextResponse.json(
      {
        error:
          "Email credentials are not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD.",
      },
      { status: 500 },
    );
  }

  const body = (await request.json().catch(() => null)) as ContactPayload | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const firstName = body.firstName?.trim() || "";
  const lastName = body.lastName?.trim() || "";
  const email = body.email?.trim() || "";
  const phone = body.phone?.trim() || "";
  const subject = body.subject?.trim() || "";
  const budget = body.budget?.trim() || "";
  const message = body.message?.trim() || "";

  if (!firstName || !lastName || !email || !subject || !message) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  const recipients = parseRecipients(recipientEmails);
  if (recipients.length === 0) {
    return NextResponse.json(
      {
        error:
          "Recipient emails are not configured. Please set CONTACT_RECIPIENTS in your environment.",
      },
      { status: 500 },
    );
  }

  // Build logo attachment once and share across both emails
  const logoAsset = getLogoAsset();
  const logoImageHtml = logoAsset
    ? `<img
         src="cid:${logoAsset.cid}"
         alt="SlimCyberTech logo"
         width="38"
         height="38"
         style="display:block;border:0;width:38px;height:38px;"
       />`
    : `<div style="width:38px;height:38px;border-radius:8px;background:${BRAND.blue};
                  color:#ffffff;text-align:center;line-height:38px;font-size:12px;
                  font-weight:800;letter-spacing:0.5px;">
         SCT
       </div>`;
  const logoHtml = `<table role="presentation" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="vertical-align:middle;padding-right:10px;">
        ${logoImageHtml}
      </td>
      <td style="vertical-align:middle;">
        <div style="font-size:18px;font-weight:800;color:${BRAND.text};line-height:1.1;">
          SlimCyberTech
        </div>
        <div style="font-size:11px;color:${BRAND.textMuted};line-height:1.2;margin-top:2px;">
          Secure. Build. Scale.
        </div>
      </td>
    </tr>
  </table>`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  const replySubject = `${subject || "Website Inquiry"} — ${firstName} ${lastName}`.trim();

  // Plain-text fallback (always include for spam-score reasons)
  const ownerTextBody = [
    `New enquiry from: ${firstName} ${lastName}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Service: ${subject}`,
    `Budget: ${budget || "Not specified"}`,
    "",
    "--- Message ---",
    message,
  ].join("\n");

  const confirmationTextBody = [
    `Hi ${firstName},`,
    "",
    "Thanks for getting in touch with SlimCyberTech!",
    "",
    "We received your message and will review it shortly. Our team typically responds within 1-2 business days.",
    "",
    `Service: ${subject}`,
    `Budget: ${budget || "Not specified"}`,
    "",
    "--- Your Message ---",
    message,
    "",
    "If you have any urgent questions, feel free to reply to this email.",
    "",
    "— The SlimCyberTech Team",
  ].join("\n");

  const ownerHtml = buildOwnerEmail({
    firstName,
    lastName,
    email,
    phone,
    subject,
    budget,
    message,
    logoHtml,
    replySubject,
  });

  const confirmationHtml = buildConfirmationEmail({
    firstName,
    subject,
    budget,
    message,
    logoHtml,
    ownerEmail: recipients[0] || gmailUser,
  });

  try {
    await Promise.all([
      // Notification to site owners
      transporter.sendMail({
        from: `SlimCyberTech Website <${gmailUser}>`,
        to: recipients.join(", "),
        replyTo: email,
        subject: replySubject,
        text: ownerTextBody,
        html: ownerHtml,
        attachments: logoAsset
          ? [
              {
                filename: logoAsset.fileName,
                content: logoAsset.content,
                contentType: logoAsset.mimeType,
                cid: logoAsset.cid,
              },
            ]
          : [],
      }),
      // Confirmation to the enquirer
      transporter.sendMail({
        from: `SlimCyberTech <${gmailUser}>`,
        to: email,
        replyTo: recipients[0] || gmailUser,
        subject: "We got your message — SlimCyberTech",
        text: confirmationTextBody,
        html: confirmationHtml,
        attachments: logoAsset
          ? [
              {
                filename: logoAsset.fileName,
                content: logoAsset.content,
                contentType: logoAsset.mimeType,
                cid: logoAsset.cid,
              },
            ]
          : [],
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact-route] sendMail error:", err);
    return NextResponse.json(
      { error: "We could not deliver your message. Please try again in a moment." },
      { status: 500 },
    );
  }
}