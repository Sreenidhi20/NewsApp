export default async function handler(req, res) {
  const { category, country, page } = req.query;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  if (!apiKey) {
    return res.status(400).json({ error: "API key not configured" });
  }

  const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&page=${page}&pageSize=15&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
