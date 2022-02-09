import { getClient } from "../../lib/sanity.server";
import { groq } from "next-sanity";

export default async function handler(req, res) {
  const postsQuery = groq`
  *[_type == "post" && title match "${req.query.q + "*"}"] {
    ...,
    "body": [],
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
    "categories": categories[0]->{
      _id,
      title,
      "slug": slug.current
    },
    "slug": slug.current,
    "author": author->{name}
  }
`;
  const data = await getClient().fetch(postsQuery);
  const posts = Array.from(data);

  res.status(200).json({ posts });
}
