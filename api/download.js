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
    const apiUrl =
      "https://api.saveapi.org/v1/download?url=" +
      encodeURIComponent(url);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.SAVEAPI_KEY}`
      }
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return res.status(response.status || 500).json({
        error:
          data?.error?.message ||
          "The media could not be retrieved."
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Could not connect to the media service."
    });
  }
}
