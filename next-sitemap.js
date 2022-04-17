const siteUrl = process.env.SITE_ADDRESS || "http://localhost:3000";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      `${
        process.env.SITE_ADDRESS || "http://localhost:3000"
      }/server-sitemap.xml`,
      `${process.env.SITE_ADDRESS || "http://localhost:3000"}/sitemap.xml`,
    ],
  },
};
