// Vercel serverless function: GET /api/odds
// Proxies to the-odds-api.com so the API key stays server-side.
//
// Requires an environment variable ODDS_API_KEY set in Vercel project
// settings (Settings -> Environments -> Production). Get a free key at
// https://the-odds-api.com (500 credits/month free Starter plan).
//
// Cost note: usage cost = [number of markets] x [number of regions].
// This endpoint requests h2h + totals from the au region = 2 credits
// per call. Used sparingly (on-demand "check odds" button), 500 free
// credits/month is enough for roughly 250 checks.

export default async function handler(req, res) {
  const apiKey = process.env.ODDS_API_KEY;

  if (!apiKey) {
    res.status(500).json({ error: "ODDS_API_KEY is not configured on the server." });
    return;
  }

  try {
    const url = `https://api.the-odds-api.com/v4/sports/soccer_fifa_world_cup/odds?regions=au&markets=h2h,totals&oddsFormat=decimal&apiKey=${apiKey}`;
    const upstream = await fetch(url);

    if (!upstream.ok) {
      const text = await upstream.text();
      res.status(upstream.status).json({ error: `the-odds-api.com returned ${upstream.status}`, detail: text });
      return;
    }

    const data = await upstream.json();
    // Surface remaining credit count from response headers so the app can
    // show a low-credits warning if it's getting close to the monthly cap.
    const remaining = upstream.headers.get("x-requests-remaining");
    const used = upstream.headers.get("x-requests-used");

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=60");
    res.status(200).json({ matches: data, creditsRemaining: remaining, creditsUsed: used });
  } catch (err) {
    res.status(502).json({ error: "Failed to reach the-odds-api.com", detail: String(err) });
  }
}
