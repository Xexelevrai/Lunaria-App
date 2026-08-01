import { ServerConfig } from './config';

export interface NewsItem {
  title: string;
  date: string;
  content: string;
}

const FETCH_TIMEOUT_MS = 5000;

export async function fetchNews(config: ServerConfig): Promise<NewsItem[]> {
  if (!config.newsUrl) return [];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(config.newsUrl, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('[news] Impossible de récupérer les actualités.', err);
    return [];
  } finally {
    clearTimeout(timeout);
  }
}
