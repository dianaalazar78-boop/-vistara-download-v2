export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Only POST requests are allowed"
    });
  }

  const { url } = req.body || {};

  if (!url) {
    return res.status(400).json({
      error: "Please provide a URL"
    });
  }

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();

    let platform = "Unknown";

    if (hostname.includes("tiktok.com")) {
      platform = "TikTok";
    } else if (hostname.includes("instagram.com")) {
      platform = "Instagram";
    } else if (hostname.includes("facebook.com") || hostname.includes("fb.watch")) {
      platform = "Facebook";
    } else if (
      hostname === "x.com" ||
      hostname.endsWith(".x.com") ||
      hostname.includes("twitter.com")
    ) {
      platform = "X";
    } else if (hostname.includes("xiaohongshu.com")) {
      platform = "RedNote";
    } else {
      return res.status(400).json({
        error: "This platform is not supported yet."
      });
    }

    return res.status(200).json({
      success: true,
      platform: platform,
      message: `${platform} link detected successfully.`,
      url: url
    });

  } catch {
    return res.status(400).json({
      error: "Please enter a valid URL."
    });
  }
}
