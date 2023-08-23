import { useRouter } from "next/router";
import type { NextSeoProps } from "next-seo";
import { DefaultSeo } from "next-seo";

import { metadata } from "@/site.config";

/**
 * Helper component to define app's default SEO configuration.
 */
export const AppSeo = (props: NextSeoProps) => {
  const { asPath } = useRouter();
  return (
    <DefaultSeo
      canonical={metadata.url + (asPath || "")}
      defaultTitle={metadata.name}
      description={metadata.description}
      openGraph={{
        title: metadata.name,
        description: metadata.description,
        type: "website",
        site_name: metadata.name,
        images: [{ url: `${metadata.url}/social.jpg` }],
      }}
      twitter={{
        cardType: "summary_large_image",
      }}
      {...props}
    />
  );
};
