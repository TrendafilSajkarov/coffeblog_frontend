import { getServerSideSitemap } from "next-sitemap";

import { getClient } from "../../lib/sanity.server";
import { groq } from "next-sanity";

export const getStaticProps = async (ctx) => {
  const allPostsQuery = groq`
        {
            "allPosts": *[_type == "post"]{
                "slug": slug.current,
                "categories": categories[0]->{
                  "slug": slug.current
                },
                _updatedAt
           }
        }
    `;
  const res = await getClient().fetch(allPostsQuery);
  const data = Array.from(res.allPosts);

  // Get the paths we want to pre-render based on posts
  const allPosts = data.map((post) => ({
    params: {
      post: post.slug,
      category: post.categories.slug,
      _updatedAt: post._updatedAt,
    },
  }));

  const fields = allPosts.map((post) => {
    return {
      loc: `${process.env.SITE_ADDRESS || "http://localhost:3000"}/${
        post.params.category
      }/${post.params.post}`,
      lastmod: post.params._updatedAt,
    };
  });
  return getServerSideSitemap(ctx, fields);
};

export default function SiteMap() {}
