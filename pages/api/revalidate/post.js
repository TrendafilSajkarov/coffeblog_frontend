import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD", "POST"],
  origin: "*",
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  console.log("[Next.js] Revalidating ...");
  let revalidated = false;
  try {
    await res.unstable_revalidate("/");
    await res.unstable_revalidate("/about-us");
    // await res.unstable_revalidate("[category]"); Error: Invalid urlPath provided to revalidate(), must be a path e.g. /blog/post-1, received [category]
    revalidated = true;
  } catch (error) {
    console.error(error);
  }
  res.json({ revalidated });
}
