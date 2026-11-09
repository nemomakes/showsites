import { normalizeEmail } from "./email";

export type Subscriber = { id: string; tags: string[] };

export type BeehiivClient = {
  findByEmail(email: string): Promise<Subscriber | null>;
  create(email: string): Promise<Subscriber>;
  addTag(subscriptionId: string, tag: string): Promise<void>;
};

type BeehiivError = Error & { status?: number };

function beehiivError(status: number, body: string): BeehiivError {
  const error = new Error(`beehiiv ${status} ${body}`) as BeehiivError;
  error.status = status;
  return error;
}

export function createBeehiivClient(publicationId: string, apiKey: string, fetchImpl: typeof fetch = fetch): BeehiivClient {
  const root = `https://api.beehiiv.com/v2/publications/${publicationId}`;
  const headers = { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" };

  return {
    async findByEmail(email) {
      const url = new URL(`${root}/subscriptions/by_email/${encodeURIComponent(email)}`);
      url.searchParams.append("expand[]", "tags");
      const res = await fetchImpl(url, { headers, cache: "no-store" });
      if (res.status === 404) return null;
      if (!res.ok) throw beehiivError(res.status, await res.text().catch(() => ""));
      const json = (await res.json()) as { data?: { id?: string; tags?: string[] } };
      if (!json.data?.id) throw new Error("beehiiv subscription missing id");
      return { id: json.data.id, tags: json.data.tags ?? [] };
    },
    async create(email) {
      const res = await fetchImpl(`${root}/subscriptions`, {
        method: "POST",
        headers,
        cache: "no-store",
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: false,
          utm_source: "who-am-i-now-paid",
        }),
      });
      if (!res.ok) throw beehiivError(res.status, await res.text().catch(() => ""));
      const json = (await res.json()) as { data?: { id?: string; tags?: string[] } };
      if (!json.data?.id) throw new Error("beehiiv create missing id");
      return { id: json.data.id, tags: json.data.tags ?? [] };
    },
    async addTag(subscriptionId, tag) {
      const res = await fetchImpl(`${root}/subscriptions/${subscriptionId}/tags`, {
        method: "POST",
        headers,
        cache: "no-store",
        body: JSON.stringify({ tags: [tag] }),
      });
      if (!res.ok) throw beehiivError(res.status, await res.text().catch(() => ""));
    },
  };
}

export function beehiivFromEnv(): BeehiivClient | null {
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  const apiKey = process.env.BEEHIIV_API_KEY;
  if (!publicationId || !apiKey) return null;
  return createBeehiivClient(publicationId, apiKey);
}

export async function tagBuyer(client: BeehiivClient, email: string, tag: string): Promise<{ skipped: boolean; subscriptionId: string }> {
  const normalized = normalizeEmail(email);
  if (!normalized) throw new Error("beehiiv email missing");

  let subscriber = await client.findByEmail(normalized);
  if (!subscriber) {
    try {
      subscriber = await client.create(normalized);
    } catch (error) {
      subscriber = await client.findByEmail(normalized);
      if (!subscriber) throw error;
    }
  }
  if (subscriber.tags.includes(tag)) {
    return { skipped: true, subscriptionId: subscriber.id };
  }
  await client.addTag(subscriber.id, tag);
  return { skipped: false, subscriptionId: subscriber.id };
}
