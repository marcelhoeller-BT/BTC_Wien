const nodemailer = require("nodemailer");

const FELDER = {
  Gastronomie: {
    pflicht: ["Name des Lokals", "Ansprechpartner", "email"],
    optional: ["Telefon", "Bezirk/Adresse", "Nachricht"],
    betreff: "Neue Anfrage - Gastronomie (Challenge Wien)",
  },
  Brauerei: {
    pflicht: ["Brauerei", "Ansprechpartner", "email"],
    optional: ["Telefon", "Anzahl Partner-Lokale", "Nachricht"],
    betreff: "Neue Anfrage - Brauerei (Challenge Wien)",
  },
};

const MAX = 2000;
const istMail = (v) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v);
const sauber = (v) => String(v == null ? "" : v).slice(0, MAX).replace(/[\r\n]+/g, " ").trim();

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, fehler: "Methode nicht erlaubt" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

  // Honeypot: von Menschen unsichtbar, von Bots gern ausgefuellt.
  // Bewusst mit Erfolg quittiert, damit der Bot nichts dazulernt.
  if (sauber(body.website)) return res.status(200).json({ ok: true });

  // Formular, das in unter drei Sekunden ausgefuellt wurde, war kein Mensch.
  const alter = Date.now() - Number(body.gestartet || 0);
  if (!Number.isFinite(alter) || alter < 3000) {
    return res.status(400).json({ ok: false, fehler: "Bitte noch einmal versuchen." });
  }

  const typ = sauber(body.Anfragetyp);
  const schema = FELDER[typ];
  if (!schema) return res.status(400).json({ ok: false, fehler: "Unbekannter Anfragetyp" });

  if (sauber(body["Datenschutz akzeptiert"]).toLowerCase() !== "ja") {
    return res.status(400).json({ ok: false, fehler: "Zustimmung zur Datenschutzerklaerung fehlt" });
  }

  const daten = {};
  for (const feld of schema.pflicht) {
    const wert = sauber(body[feld]);
    if (!wert) return res.status(400).json({ ok: false, fehler: `Pflichtfeld fehlt: ${feld}` });
    daten[feld] = wert;
  }
  if (!istMail(daten.email)) {
    return res.status(400).json({ ok: false, fehler: "E-Mail-Adresse ist ungueltig" });
  }
  for (const feld of schema.optional) {
    const wert = sauber(body[feld]);
    if (wert) daten[feld] = wert;
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_TO || !MAIL_FROM) {
    console.error("SMTP-Konfiguration unvollstaendig - Umgebungsvariablen in Vercel pruefen.");
    return res.status(500).json({ ok: false, fehler: "Versand momentan nicht moeglich" });
  }

  const port = Number(SMTP_PORT || 587);
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const label = (k) => (k === "email" ? "E-Mail" : k);
  const zeilen = Object.entries(daten).map(([k, v]) => `${label(k)}: ${v}`);
  zeilen.push("", `Anfragetyp: ${typ}`, `Eingegangen: ${new Date().toISOString()}`);

  try {
    await transport.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: daten.email,
      subject: schema.betreff,
      text: zeilen.join("\n"),
    });
  } catch (e) {
    console.error("Mailversand fehlgeschlagen:", e && e.message);
    return res.status(502).json({ ok: false, fehler: "Versand momentan nicht moeglich" });
  }

  return res.status(200).json({ ok: true });
};
