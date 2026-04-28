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
  bg: "#f0f4fa",
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

        <!-- CARD -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;
                 box-shadow:0 8px 32px rgba(13,31,60,0.12);">

          <!-- HEADER -->
          <tr>
            <td style="background-color:${BRAND.navySoft};padding:26px 32px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="vertical-align:middle;">
                    ${logoHtml}
                  </td>
                  <td style="text-align:right;vertical-align:middle;">
                    <span style="display:inline-block;
                                 background:rgba(255,255,255,0.12);
                                 color:#dbe8ff;
                                 font-size:9px;font-weight:700;letter-spacing:2px;
                                 text-transform:uppercase;
                                 padding:5px 14px;border-radius:20px;
                                 border:1px solid rgba(255,255,255,0.20);">
                      New Inquiry
                    </span>
                  </td>
                </tr>
              </table>

              <div style="margin-top:22px;padding-top:20px;
                          border-top:1px solid rgba(255,255,255,0.16);">
                <h1 style="margin:0 0 6px;font-size:20px;font-weight:700;color:#ffffff;
                           line-height:1.3;letter-spacing:-0.2px;">
                  You have a new message
                </h1>
                <p style="margin:0;font-size:13px;color:#d0def7;line-height:1.5;">
                  A new customer enquiry was submitted through your website.
                </p>
              </div>
            </td>
          </tr>

          <!-- ACCENT LINE -->
          <tr>
            <td style="height:3px;
                       background:linear-gradient(90deg,${BRAND.blue} 0%,${BRAND.blueLight} 50%,${BRAND.blue} 100%);">
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:${BRAND.white};padding:30px 36px 32px;">

              <!-- Sender card -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                style="background:#f4f8ff;border-radius:12px;
                       border:1px solid ${BRAND.blueBorder};margin-bottom:20px;">
                <tr>
                  <td style="padding:18px 20px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <!-- Avatar -->
                        <td style="vertical-align:middle;width:52px;padding-right:14px;">
                          <div style="width:48px;height:48px;border-radius:50%;
                                      background:linear-gradient(135deg,${BRAND.blue} 0%,${BRAND.blueLight} 100%);
                                      text-align:center;line-height:48px;
                                      font-size:15px;font-weight:800;color:#ffffff;">
                            ${initials}
                          </div>
                        </td>
                        <!-- Name + email -->
                        <td style="vertical-align:middle;">
                          <div style="font-size:15px;font-weight:700;color:${BRAND.text};
                                      margin-bottom:4px;line-height:1.3;">
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
                            <span style="display:inline-block;background:#deeafc;color:${BRAND.blue};
                                         font-size:11.5px;font-weight:600;padding:5px 12px;
                                         border-radius:20px;white-space:nowrap;
                                         border:1px solid #bcd4f8;">
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

              <!-- Service / Budget row -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                style="margin-bottom:20px;">
                <tr>
                  <td style="width:50%;padding-right:8px;vertical-align:top;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                      style="background:${BRAND.bluePale};border-radius:10px;
                             border:1px solid ${BRAND.blueBorder};border-left:4px solid ${BRAND.blue};">
                      <tr>
                        <td style="padding:14px 16px;">
                          <div style="font-size:9px;font-weight:800;letter-spacing:1.5px;
                                      text-transform:uppercase;color:${BRAND.textMuted};margin-bottom:6px;">
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
                      style="background:${BRAND.bluePale};border-radius:10px;
                             border:1px solid ${BRAND.blueBorder};border-left:4px solid ${BRAND.blueLight};">
                      <tr>
                        <td style="padding:14px 16px;">
                          <div style="font-size:9px;font-weight:800;letter-spacing:1.5px;
                                      text-transform:uppercase;color:${BRAND.textMuted};margin-bottom:6px;">
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

              <!-- Message block -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                style="margin-bottom:28px;">
                <tr>
                  <td>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                      style="margin-bottom:10px;">
                      <tr>
                        <td>
                          <span style="font-size:9px;font-weight:800;letter-spacing:1.5px;
                                       text-transform:uppercase;color:${BRAND.textMuted};">
                            Their Message
                          </span>
                        </td>
                        <td style="text-align:right;">
                          <span style="font-size:11px;color:${BRAND.textLight};">
                            ${message.length} characters
                          </span>
                        </td>
                      </tr>
                    </table>
                    <div style="background:#f7f9fd;border-radius:10px;
                                border:1px solid #dde8f5;border-left:4px solid #c5d8fa;
                                padding:20px 22px 6px;">
                      ${messageHtml}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Reply CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent("Re: " + replySubject)}"
                      style="display:inline-block;
                             background:linear-gradient(135deg,${BRAND.blue} 0%,${BRAND.blueLight} 100%);
                             color:#ffffff;font-size:14px;font-weight:700;
                             text-decoration:none;padding:14px 40px;border-radius:8px;
                             letter-spacing:0.3px;
                             box-shadow:0 4px 16px rgba(26,86,219,0.28);">
                      Reply to ${escapeHtml(firstName)} &nbsp;&#8594;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f5f8fd;padding:18px 36px 22px;
                       border-top:1px solid #dde8f5;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="vertical-align:middle;">
                    <div style="font-size:13px;font-weight:700;color:${BRAND.text};">SlimCyberTech</div>
                    <div style="font-size:11px;color:${BRAND.textMuted};margin-top:2px;">
                      Arua, West Nile &middot; Uganda
                    </div>
                  </td>
                  <td style="text-align:right;vertical-align:middle;">
                    <div style="font-size:11px;color:${BRAND.textLight};line-height:1.65;">
                      via&nbsp;
                      <a href="https://slimcybertech.com"
                        style="color:${BRAND.blue};text-decoration:none;font-weight:600;">
                        slimcybertech.com
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <!-- Disclaimer -->
        <p style="margin:18px 0 0;font-size:11px;color:#8aa0b8;text-align:center;line-height:1.75;">
          Automated notification from your website contact form.<br />
          Use the reply button above or write directly to <strong>${escapeHtml(email)}</strong>.
        </p>

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

        <!-- CARD -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;
                 box-shadow:0 8px 32px rgba(13,31,60,0.12);">

          <!-- HEADER -->
          <tr>
            <td style="background-color:${BRAND.navySoft};padding:26px 32px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="vertical-align:middle;">
                    ${logoHtml}
                  </td>
                  <td style="text-align:right;vertical-align:middle;">
                    <span style="display:inline-block;
                                 background:rgba(255,255,255,0.12);
                                 color:#baf2df;
                                 font-size:9px;font-weight:700;letter-spacing:2px;
                                 text-transform:uppercase;
                                 padding:5px 14px;border-radius:20px;
                                 border:1px solid rgba(255,255,255,0.20);">
                      &#10003;&nbsp; Received
                    </span>
                  </td>
                </tr>
              </table>

              <div style="margin-top:22px;padding-top:20px;
                          border-top:1px solid rgba(255,255,255,0.16);">
                <h1 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#ffffff;
                           line-height:1.3;letter-spacing:-0.2px;">
                  Thanks for reaching out, ${escapeHtml(firstName)}!
                </h1>
                <p style="margin:0;font-size:13px;color:#d0def7;line-height:1.6;">
                  We have received your message and our team will respond shortly.
                </p>
              </div>
            </td>
          </tr>

          <!-- ACCENT LINE (green tint for confirmation) -->
          <tr>
            <td style="height:3px;
                       background:linear-gradient(90deg,${BRAND.accentGreen} 0%,${BRAND.blueLight} 50%,${BRAND.accentGreen} 100%);">
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:${BRAND.white};padding:30px 36px 32px;">

              <!-- What happens next -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                style="background:${BRAND.bluePale};border-radius:12px;
                       border:1px solid ${BRAND.blueBorder};
                       border-left:4px solid ${BRAND.accentGreen};
                       margin-bottom:22px;">
                <tr>
                  <td style="padding:18px 20px;">
                    <div style="font-size:13px;font-weight:700;color:${BRAND.text};margin-bottom:6px;">
                      What happens next?
                    </div>
                    <p style="margin:0;font-size:13.5px;color:${BRAND.textMuted};line-height:1.7;">
                      Our team will review your request and reach out within
                      <strong style="color:${BRAND.text};">1&ndash;2 business days</strong>.
                      If your request is urgent, feel free to reply directly to this email.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Summary of what they submitted -->
              <div style="font-size:9px;font-weight:800;letter-spacing:1.5px;
                          text-transform:uppercase;color:${BRAND.textMuted};margin-bottom:10px;">
                Your Submission Summary
              </div>

              <!-- Service / Budget row -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                style="margin-bottom:18px;">
                <tr>
                  <td style="width:50%;padding-right:8px;vertical-align:top;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                      style="background:${BRAND.bluePale};border-radius:10px;
                             border:1px solid ${BRAND.blueBorder};border-left:4px solid ${BRAND.blue};">
                      <tr>
                        <td style="padding:13px 15px;">
                          <div style="font-size:9px;font-weight:800;letter-spacing:1.4px;
                                      text-transform:uppercase;color:${BRAND.textMuted};margin-bottom:5px;">
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
                      style="background:${BRAND.bluePale};border-radius:10px;
                             border:1px solid ${BRAND.blueBorder};border-left:4px solid ${BRAND.blueLight};">
                      <tr>
                        <td style="padding:13px 15px;">
                          <div style="font-size:9px;font-weight:800;letter-spacing:1.4px;
                                      text-transform:uppercase;color:${BRAND.textMuted};margin-bottom:5px;">
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

              <!-- Their message (so they have a record) -->
              <div style="font-size:9px;font-weight:800;letter-spacing:1.5px;
                          text-transform:uppercase;color:${BRAND.textMuted};margin-bottom:10px;">
                Your Message
              </div>
              <div style="background:#f7f9fd;border-radius:10px;
                          border:1px solid #dde8f5;border-left:4px solid #c5d8fa;
                          padding:20px 22px 6px;margin-bottom:28px;">
                ${messageHtml}
              </div>

              <!-- Contact team CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="mailto:${escapeHtml(ownerEmail)}"
                      style="display:inline-block;
                             background:linear-gradient(135deg,${BRAND.blue} 0%,${BRAND.blueLight} 100%);
                             color:#ffffff;font-size:14px;font-weight:700;
                             text-decoration:none;padding:14px 40px;border-radius:8px;
                             letter-spacing:0.3px;
                             box-shadow:0 4px 16px rgba(26,86,219,0.28);">
                      Contact the Team &nbsp;&#8594;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f5f8fd;padding:18px 36px 22px;
                       border-top:1px solid #dde8f5;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="vertical-align:middle;">
                    <div style="font-size:13px;font-weight:700;color:${BRAND.text};">SlimCyberTech</div>
                    <div style="font-size:11px;color:${BRAND.textMuted};margin-top:2px;">
                      Arua, West Nile &middot; Uganda
                    </div>
                  </td>
                  <td style="text-align:right;vertical-align:middle;">
                    <div style="font-size:11px;color:${BRAND.textLight};line-height:1.65;">
                      <a href="https://slimcybertech.com"
                        style="color:${BRAND.blue};text-decoration:none;font-weight:600;">
                        slimcybertech.com
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <!-- Disclaimer -->
        <p style="margin:18px 0 0;font-size:11px;color:#8aa0b8;text-align:center;line-height:1.75;">
          You received this confirmation because you submitted our contact form.<br />
          If anything should be updated, simply reply and we will help.
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
  const logoHtml = logoAsset
    ? `<img
         src="cid:${logoAsset.cid}"
         alt="SlimCyberTech"
         width="140"
         style="display:block;border:0;width:140px;height:auto;max-height:44px;"
       />`
    : `<span style="font-size:19px;font-weight:800;color:#ffffff;letter-spacing:-0.3px;
                    font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
         Slim<span style="color:#4a8ef5;">Cyber</span>Tech
       </span>`;

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