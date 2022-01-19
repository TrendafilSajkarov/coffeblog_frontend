import sanityClient from "@sanity/client";

// If you're using a private dataset you probably have to configure a separate write/read client.
// https://www.sanity.io/help/js-client-usecdn-token
const configuredSanityClient = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2021-08-31",
  useCdn: true,
});

export default configuredSanityClient;
