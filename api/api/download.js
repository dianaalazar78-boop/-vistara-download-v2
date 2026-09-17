module.exports = (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  const { url } = req.body || {};

  if (!url) {
    return res.status(400).json({ error: "Please provide a URL" });
  }

  return res.status(200).json({
    success: true,
    message: "URL received successfully",
    url: url
  });
};
