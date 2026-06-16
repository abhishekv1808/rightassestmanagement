export type PincodeDetails = {
  city: string;
  state: string;
  /** Additive (India Post). Same as `city` in metros, but explicit. */
  district?: string;
  /** Additive (India Post). All post-office localities under this pincode. */
  localities?: string[];
};

// In-memory cache — avoids repeat network calls for the same pincode in a session
const cache = new Map<string, PincodeDetails>();

export async function getPincodeDetails(pincode: string): Promise<PincodeDetails | null> {
  if (!/^\d{6}$/.test(pincode)) return null;

  if (cache.has(pincode)) return cache.get(pincode)!;

  try {
    const res = await fetch(`/api/pincode?code=${pincode}`);
    if (!res.ok) return null;

    const data = await res.json();
    if (data.error || !data.city || !data.state) return null;

    const details: PincodeDetails = {
      city: data.city,
      state: data.state,
      district: typeof data.district === "string" ? data.district : undefined,
      localities: Array.isArray(data.localities) ? (data.localities as string[]) : undefined,
    };
    cache.set(pincode, details);
    return details;
  } catch {
    return null;
  }
}
