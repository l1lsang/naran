import * as functions from "firebase-functions";
import admin from "firebase-admin";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

admin.initializeApp();
const db = admin.firestore();

/* ------------------------- 상담 저장 -------------------------- */
export const submitConsult = functions.https.onRequest(async (req, res) => {
  try {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(204).send("");

    const { name, phone, debt, payment, message } = req.body || {};
    if (!name || !phone || !message) {
      return res.status(400).send("입력값이 부족합니다.");
    }

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress ||
      "unknown";

    const ipDoc = await db.collection("ipRecords").doc(ip).get();
    if (ipDoc.exists) {
      return res.status(403).send("이미 상담 신청이 완료된 IP입니다.");
    }

    await db.collection("ipRecords").doc(ip).set({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    await db.collection("consultRequests").add({
      name,
      phone,
      debt,
      payment,
      message,
      ip,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).send("상담 신청이 정상적으로 접수되었습니다!");
  } catch (err) {
    console.error(err);
    return res.status(500).send("서버 오류");
  }
});

/* ------------------------- 관리자 텔레그램 알림 -------------------------- */

// ⭐ Firebase: functions config 또는 .env 를 동시에 지원
const TELEGRAM_BOT_TOKEN =
  process.env.TG_TOKEN || functions.config().telegram?.tg_token;

const ADMIN_IDS = (
  process.env.ADMIN_IDS || functions.config().telegram?.admin_ids || ""
)
  .split(",")
  .filter((v) => v.trim() !== "")
  .map((v) => Number(v.trim()));

export const sendTelegramToAll = functions.https.onCall(async (data) => {
  try {
    const { name, phone, debt, payment, message } = data;

    const text =
      "📢 상담 접수 알림\n\n" +
      `👤 이름: ${name}\n` +
      `📱 연락처: ${phone}\n` +
      `💰 채무: ${debt}\n` +
      `📆 월 상환액: ${payment}\n` +
      `📝 내용: ${message}`;

    for (const adminId of ADMIN_IDS) {
      await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        { chat_id: adminId, text }
      );
    }

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: err.message };
  }
});
