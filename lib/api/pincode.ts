export type PincodeDetails = {
  city: string;
  state: string;
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

    const details: PincodeDetails = { city: data.city, state: data.state };
    cache.set(pincode, details);
    return details;
  } catch {
    return null;
  }
}
