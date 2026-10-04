import app, { ready } from "../server/app.js";

export default async function handler(req, res) {
  try {
    await ready;
    return app(req, res);
  } catch (error) {
    console.error("Vercel API Error:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        error: "Internal server error",
        message:
          process.env.NODE_ENV === "production"
            ? "تعذّر الاتصال بالسيرفر."
            : error?.message || "Unknown error",
      });
    }
  }
}
