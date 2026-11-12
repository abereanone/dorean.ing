const appVersion = "0.1.0";
const siteName = "dorean.ing";
const defaultDescription =
  "Questions and answers on the dorean principle: freely you received, freely give (Matthew 10:8). Ministry should be supported, not sold.";
const branding = {
  siteName,
  tagline: "Freely you received; freely give.",
  description: defaultDescription,
  logoPath: "/images/site-logo.svg",
  logoAlt: `${siteName} logo`,
} as const;
const defaultSiteUrl = "https://dorean.ing";

export const siteSettings = {
  version: appVersion,
  branding,
  issueReportURL: "https://github.com/abereanone/dorean.ing/issues/new",
  integrations: {
    googleAnalyticsId: "",
  },
  openGraph: {
    title: branding.siteName,
    description: branding.description,
    url: defaultSiteUrl,
    image: "/images/og-card.png",
    imageAlt: `${branding.siteName} logo`,
    type: "website",
    twitterCard: "summary_large_image",
  },
  showQuestionId: true,
  // Answers name no author on the page; the Resources page says how they were written.
  showAuthor: false,
  enablePagination: true,
  questionsPerPage: 30,
} as const;

export type SiteSettings = typeof siteSettings;
