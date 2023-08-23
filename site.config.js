// @ts-check

const domain =
  process.env.APP_URL?.replace(/https?:\/\//, "").split("/")[0] ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  `${process.env.HOST || "localhost"}:${process.env.PORT || 3000}`;

const protocol = domain.includes("localhost") || domain.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/) ? "http" : "https";

const metadata = {
  name: "Skip/Select",
  shortName: "Skip/Select",
  description: "This is a take home assignment for skip.money's open Frontend Developer position",
  domain,
  email: "griko@nibras.co",
  url: `${protocol}://${domain}`,
  github: {
    username: "grikomsn",
    url: "https://github.com/grikomsn/skip-select",
  },
};

module.exports = {
  metadata,
};
