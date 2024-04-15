export default async function handler(req, res) {
  const { query } = req.query;
  const apiUrl = `${process.env.WAVEVIATE_API_DOMAIN}/all/${query}?field=publisher&value=Ligonier%20Ministries`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log({ data });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
