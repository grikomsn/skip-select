import type { PageConfig } from "next";
import type { NextRequest } from "next/server";

import { raise } from "@/utils/assert";

/**
 * API endpoint to resolve given chain name's logo.
 * (e.g. `/api/chain-logo/cosmos`)
 */
const handler = async (req: NextRequest) => {
  try {
    let name = req.nextUrl.searchParams.get("name") ?? raise("name is required");
    if (/atom|hub/i.test(name.toLowerCase())) {
      name = "cosmoshub";
    }

    const res1 = await fetch(`https://chains.cosmos.directory/${name.toLowerCase()}`);
    const data = (await res1.json()) as { chain: { logo_URIs: { svg?: string; png?: string } } };
    const src = data.chain.logo_URIs.svg ?? data.chain.logo_URIs.png ?? raise("no logo found");
    const res2 = await fetch(src);
    return new Response(res2.body, {
      headers: {
        "content-type": res2.headers.get("content-type") ?? raise("no content type"),
        "cache-control": "public, max-age=86400, immutable",
      },
    });
  } catch {
    return new Response(null, { status: 404 });
  }
};

/**
 * @see https://nextjs.org/docs/pages/building-your-application/routing/api-routes#edge-api-routes
 */
export const config: PageConfig = {
  runtime: "edge",
};

export default handler;
