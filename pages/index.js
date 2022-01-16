import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
// import Latest from "../components/Latest/Latest";
// import Site from "../components/Site/Site";
// import Footer from "../components/Footer/Footer";

import { getClient } from "../lib/sanity.server";
import { groq } from "next-sanity";

export default function Home({ categories, aboutUs = null, logo }) {
  //   const featuredFourPosts = props.data.featuredPosts.filter(
  //     (post, i) => i <= 3
  //   );

  //   const olderFeaturedPosts = props.data.featuredPosts.filter(
  //     (post, i) => i > 3
  //   );

  return (
    <div>
      <Head>
        <title>Simple Blog</title>
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Navbar categories={categories} aboutUs={aboutUs} logo={logo} />
      {/* <Latest
        featuredPosts={featuredFourPosts}
        categories={props.data.categories}
      />
      <Site
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
  *[_type == "category"]{
    title,
    "slug": slug.current,
    _id
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

  return {
    props: {
      categories,
      logo,
    },
  };
}
