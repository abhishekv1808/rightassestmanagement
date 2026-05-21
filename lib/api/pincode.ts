// India Post Pincode API — https://api.postalpincode.in

export type PostOffice = {
  Name: string;
  BranchType: string;
  DeliveryStatus: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  Block: string;
  State: string;
  Country: string;
  Pincode: string;
};

type PincodeAPIResponse = {
  Message: string;
  Status: string;
  PostOffice: PostOffice[] | null;
}[];

export type PincodeDetails = {
  city: string;       // district name — best proxy for city in Indian addresses
  district: string;
  state: string;
  post_office: string;
};

export async function getPincodeDetails(pincode: string): Promise<PincodeDetails | null> {
  if (!/^\d{6}$/.test(pincode)) return null;

  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`, {
      // Results are stable — cache aggressively on the client
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;

    const data: PincodeAPIResponse = await res.json();
    const record = data?.[0];

    if (record?.Status !== "Success" || !record.PostOffice?.length) return null;

    const po = record.PostOffice[0];
    return {
      city: po.District,
      district: po.District,
      state: po.State,
      post_office: po.Name,
    };
  } catch {
    return null;
  }
}
