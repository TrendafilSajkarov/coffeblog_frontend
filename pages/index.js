import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import Latest from "../components/Latest/Latest";
// import Site from "../components/Site/Site";
// import Footer from "../components/Footer/Footer";

import { getClient } from "../lib/sanity.server";
import { groq } from "next-sanity";

export default function Home({
  categories,
  aboutUs = null,
  logo,
  featuredPosts,
}) {
  return (
    <div>
      <Head>
        <title>Simple Blog</title>
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Navbar categories={categories} aboutUs={aboutUs} logo={logo} />
      <Latest
        featuredPosts={featuredPosts}
        // categories={props.data.categories}
      />
      {/*<Site
        latestPosts={props.data.latestPosts}
        categories={props.data.categories}
        aboutUs={props.data.aboutUs}
        olderFeaturedPosts={olderFeaturedPosts}
      />
      <Footer /> */}
    </div>
  );
}

export async function getStaticProps({ preview = false }) {
  const postQuery = groq`
  *[_type == "category"] | order(_createdAt) {
    title,
    "slug": slug.current,
    _id,
    "posts": *[_type == "post" && references(^._id)].title
  }
`;
  const data = await getClient(preview).fetch(postQuery);
  const categories = Array.from(data);

  const layoutQuery = groq`
  *[_type == "layout"]{
    logo
  }
`;
  const data1 = await getClient(preview).fetch(layoutQuery);
  const logo = data1[0].logo;

  const featPostQuery = groq`
  *[_type == "post" && isFeaturedPost == true] | order(_updatedAt desc)[0...4] {
    ...,
    "body": [],
    "author": author->{
      name,
      "slug": slug.current,
    },
    "categories": categories[0]->{title, "slug": slug.current}
  }
  `;
  const data2 = await getClient(preview).fetch(featPostQuery);
  const featuredPosts = Array.from(data2);

  return {
    props: {
      categories,
      logo,
      featuredPosts,
    },
  };
}
