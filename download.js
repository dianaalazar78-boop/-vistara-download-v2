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

    const supportedHosts = [
      "facebook.com",
      "www.facebook.com",
      "tiktok.com",
      "www.tiktok.com",
      "instagram.com",
      "www.instagram.com",
      "x.com",
      "twitter.com",
      "xiaohongshu.com",
      "www.xiaohongshu.com"
    ];

    const hostname = parsedUrl.hostname.toLowerCase();

    const supported = supportedHosts.some(
      host => hostname === host || hostname.endsWith("." + host)
    );

    if (!supported) {
      return res.status(400).json({
        error: "This platform is not supported."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Link accepted. Media processing is ready to be connected.",
      url
    });

  } catch {
    return res.status(400).json({
      error: "Please enter a valid media URL."
    });
  }
}
