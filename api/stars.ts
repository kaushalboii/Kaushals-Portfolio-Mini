// Star counts for the Open Source card, fetched on the server and cached at
// Vercel's edge. Visitors' browsers used to call the GitHub API directly, but
// that API allows only 60 unauthenticated requests an hour per IP address, so
// on busy or shared networks the call failed and the card fell back to old
// hardcoded numbers. One cached server call per hour avoids that limit.
// Set GITHUB_TOKEN in the Vercel project for a 5,000/hour limit (optional).

const REPOS = [
  "kaushalboii/CleanYourMacKeyboard",
  "kaushalboii/Zenlife-Stress-relief-app-using-sound-and-music",
  "kaushalboii/codeshift",
  "kaushalboii/Live-news-updated-India",
  "kaushalboii/COMPUTER-VISION",
];

export async function GET(): Promise<Response> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "kaushal-portfolio",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const entries = await Promise.all(REPOS.map(async repo => {
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}`, { headers });
      if (!res.ok) return null;
      const json = await res.json();
      return typeof json.stargazers_count === "number"
        ? [repo, json.stargazers_count] as const
        : null;
    } catch { return null; }
  }));

  const stars = Object.fromEntries(entries.filter(e => e !== null));
  const complete = Object.keys(stars).length === REPOS.length;

  return new Response(JSON.stringify(stars), {
    headers: {
      "Content-Type": "application/json",
      // Cache a good answer for an hour; retry a failed one after a minute.
      "Cache-Control": complete
        ? "public, s-maxage=3600, stale-while-revalidate=86400"
        : "public, s-maxage=60",
    },
  });
}
