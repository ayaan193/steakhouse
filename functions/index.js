const { setGlobalOptions } = require("firebase-functions/v2");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { onRequest } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler");

const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

setGlobalOptions({ maxInstances: 10 });

/* ---------------- EMAIL TRANSPORTER ---------------- */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASS
  }
});

/* ---------------- OTP EMAIL FUNCTION ---------------- */

const otpCooldown = {};

exports.sendOTPEmail = onRequest(async (req, res) => {

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  const now = Date.now();
  const { email, otp, name } = req.body;

  if (otpCooldown[email] && now - otpCooldown[email] < 30000) {
    return res.status(429).json({
      error: "Please wait before requesting another OTP."
    });
  }

  otpCooldown[email] = now;

  try {

    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: "Your OTP Verification - The Only Place",
      html: `
        <h2>Email Verification</h2>
        <p>Hello ${name || "Guest"},</p>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP expires in 5 minutes.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Failed to send OTP" });

  }

});

/* ---------------- RESERVATION CONFIRMATION EMAILS ---------------- */

async function sendReservationEmails(data) {
  const customerMail = {
    from: process.env.GMAIL_EMAIL,
    to: data.email,
    subject: "Your Reservation is Confirmed | The Only Place",
    html: `
        <div style="font-family: Georgia, serif; background:#1A1614; padding:40px; color:#E3D5CA;">
          <div style="
            max-width:600px;
            margin:auto;
            background:#201C19;
            border:1px solid #3D3530;
            border-radius:10px;
            padding:30px;
            text-align:center;
          ">
            <h1 style="margin-bottom:10px; letter-spacing:1px;">
              The Only Place
            </h1>
            <h2 style="color:#E3D5CA; margin-top:0;">
              Reservation Confirmed
            </h2>
            <p style="margin-top:25px;">
              Hi <b>${data.name}</b>,
            </p>
            <p>
              Your table reservation has been successfully confirmed.
              We look forward to welcoming you for an exceptional dining experience.
            </p>
            <div style="
              margin:30px 0;
              padding:20px;
              border:1px solid #3D3530;
              border-radius:8px;
              background:#1A1614;
            ">
              <p style="margin:8px 0;"><b>Date:</b> ${data.date}</p>
              <p style="margin:8px 0;"><b>Time:</b> ${data.time}</p>
              <p style="margin:8px 0;"><b>Guests:</b> ${data.guests}</p>
              ${data.dietary ? `<p style="margin:8px 0;"><b>Notes:</b> ${data.dietary}</p>` : ""}
            </div>
            <p>
              If you need to modify or cancel your reservation,
              please contact us in advance.
            </p>
            <hr style="border:none;border-top:1px solid #3D3530;margin:30px 0;"/>
            <p style="font-size:14px;color:#BFAFA3;">
              The Only Place Steakhouse<br/>
              We look forward to serving you.
            </p>
          </div>
        </div>
        `,
  };

  const adminMail = {
    from: process.env.GMAIL_EMAIL,
    to: process.env.GMAIL_EMAIL,
    subject: "New Reservation Received",
    html: `
          <h3>New Reservation</h3>
          Name: ${data.name}<br/>
          Email: ${data.email}<br/>
          Phone: ${data.phone}<br/>
          Date: ${data.date}<br/>
          Time: ${data.time}<br/>
          Guests: ${data.guests}<br/>
          Dietary: ${data.dietary || "None"}<br/>
        `,
  };

  await transporter.sendMail(customerMail);
  await transporter.sendMail(adminMail);
}

/* Fires once when a reservation doc is created — do not also call from the client */
exports.sendReservationEmails = onDocumentCreated(
  "reservations/{reservationId}",
  async (event) => {
    try {
      await sendReservationEmails(event.data.data());
    } catch (error) {
      console.error("Email sending failed:", error);
    }
  }
);

/* ---------------- CLEANUP OLD RESERVATIONS ---------------- */

exports.cleanupOldReservations = onSchedule("every 24 hours", async () => {

  const today = new Date().toISOString().split("T")[0];

  const snapshot = await admin.firestore()
    .collection("reservations")
    .where("date", "<", today)
    .get();

  const batch = admin.firestore().batch();

  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();

  console.log("Old reservations deleted");

});