import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, phone, email, services, frequency, message } = await req.json();

  if (!name || (!phone && !email) || !services?.length) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY ?? "",
    },
    body: JSON.stringify({
      sender: { name: "ClarityCristal Web", email: process.env.BREVO_SENDER_EMAIL },
      to: [{ email: "info@claritycristal.com", name: "ClarityCristal" }],
      ...(email ? { replyTo: { email, name } } : {}),
      subject: `Nueva solicitud de presupuesto — ${name}`,
      htmlContent: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #0d1117;">
          <div style="background: linear-gradient(135deg, #002d4a, #0a5272); padding: 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Nueva solicitud de presupuesto</h1>
          </div>
          <div style="background: #f8f6f1; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #f0ede8;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: 600; width: 140px; color: #666;">Nombre</td>
                <td style="padding: 10px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #666;">Teléfono</td>
                <td style="padding: 10px 0;">${phone || "—"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #666;">Email</td>
                <td style="padding: 10px 0;">${email || "—"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #666;">Servicios</td>
                <td style="padding: 10px 0;">${services.join(", ")}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #666;">Frecuencia</td>
                <td style="padding: 10px 0;">${frequency || "Por determinar"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #666; vertical-align: top;">Mensaje</td>
                <td style="padding: 10px 0;">${message || "—"}</td>
              </tr>
            </table>
            ${email ? `<div style="margin-top: 24px;"><a href="mailto:${email}" style="background: #e8a000; color: white; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-weight: 600;">Responder al cliente</a></div>` : ""}
          </div>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error("[contact] Brevo error:", err);
    return NextResponse.json({ error: "Error al enviar el mensaje" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
