const siteUrl = process.env.SITE_ADDRESS || "http://localhost:3000";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${
        process.env.SITE_ADDRESS || "http://localhost:3000"
      }/server-sitemap.xml`,
    ],
  },
};
