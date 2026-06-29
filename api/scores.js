// Vercel serverless function: GET /api/scores
// Proxies to football-data.org so the API key stays server-side (never sent
// to the browser) and to work around football-data.org not sending CORS
// headers for direct browser requests.
//
// Requires an environment variable FOOTBALL_DATA_API_KEY set in the Vercel
// project settings (Settings -> Environment Variables). Get a free key at
// https://www.football-data.org/client/register

export default async function handler(req, res) {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;

  if (!apiKey) {
    res.status(500).json({ error: "FOOTBALL_DATA_API_KEY is not configured on the server." });
    return;
  }

  try {
    const upstream = await fetch("https://api.football-data.org/v4/competitions/WC/matches", {
      headers: { "X-Auth-Token": apiKey },
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      res.status(upstream.status).json({ error: `football-data.org returned ${upstream.status}`, detail: text });
      return;
    }

    const data = await upstream.json();
    res.setHeader("Cache-Control", "s-maxage=120, stale-while-revalidate=60");
    res.status(200).json(data);
  } catch (err) {
    res.status(502).json({ error: "Failed to reach football-data.org", detail: String(err) });
  }
}
