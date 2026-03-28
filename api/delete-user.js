const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    }),
  });
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { uid, adminUid } = req.body;

    if (!uid || !adminUid) {
      return res.status(400).json({ error: "uid and adminUid are required" });
    }

    // Verify the requester is an admin
    const db = admin.firestore();
    const adminDoc = await db.collection("users").doc(adminUid).get();

    if (!adminDoc.exists || adminDoc.data().role !== "admin") {
      return res.status(403).json({ error: "Unauthorized — admin access required" });
    }

    // Delete from Firebase Auth
    await admin.auth().deleteUser(uid);

    // Delete from Firestore
    await db.collection("users").doc(uid).delete();

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Delete user error:", err);
    if (err.code === "auth/user-not-found") {
      // Auth user already gone, still delete Firestore doc
      try {
        const db = admin.firestore();
        await db.collection("users").doc(req.body.uid).delete();
        return res.status(200).json({ success: true, note: "Auth user not found, Firestore doc deleted" });
      } catch {}
    }
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
};
