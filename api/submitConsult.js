import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Firestore Admin 초기화 (중복 방지)
if (!getApps().length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY);
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "POST only" });

  try {
    const { name, phone, debt, payment, message, ip } = req.body;

    if (!name || !phone || !message)
      return res.status(400).json({ error: "입력값 부족" });

    // 1️⃣ 상담 Firestore 저장
    await db.collection("consultRequests").add({
      name,
      phone,
      debt,
      payment,
      message,
      ip,
      createdAt: new Date(),
    });

    // 2️⃣ 텔레그램 관리자 알림
    const text =
      "📢 상담 접수 알림\n\n" +
      `👤 이름: ${name}\n` +
      `📱 연락처: ${phone}\n` +
      `💰 채무: ${debt}\n` +
      `📆 월 상환액: ${payment}\n` +
      `📝 내용: ${message}`;

    const token = process.env.TG_TOKEN;
    const adminIds = process.env.ADMIN_IDS.split(",");

    for (const id of adminIds) {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: id,
          text,
        }),
      });
    }

    // 3️⃣ Google Sheets 저장(옵션)
    if (process.env.SHEET_ID) {
      await saveToSheet({ name, phone, debt, payment, message });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: err.message });
  }
}

// 🔥 Google Sheets 저장 함수 (옵션)
async function saveToSheet({ name, phone, debt, payment, message }) {
  const { google } = await import("googleapis");

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.FIREBASE_ADMIN_KEY),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const row = [
    new Date().toLocaleString("ko-KR"),
    name,
    phone,
    debt,
    payment,
    message,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: "시트1!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}
