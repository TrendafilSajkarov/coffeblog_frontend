import Head from "next/head";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Site from "../../components/Site/Site";

import { getClient } from "../../lib/sanity.server";
import { groq } from "next-sanity";

export default function Page({
  posts,
  categories,
  logo,
  aboutUs = null,
  footer,
  pages,
  currentPage,
}) {
  return (
    <div>
      <Head>
        <title>Simple Blog</title>
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Navbar categories={categories} aboutUs={aboutUs} logo={logo} />
      <Site
        currentPage={currentPage}
        pages={pages}
        latestPosts={posts.latestPosts}
        categories={categories}
        aboutUs={aboutUs}
        olderFeaturedPosts={posts.featuredPosts}
      />
      <Footer footer={footer} />
    </div>
  );
}

export async function getStaticProps(context) {
  // ================= POSTS Query ===========================
  const postsQuery = groq`
  {
    "latestPosts": *[_type == "post"] | order(_createdAt desc)[${context.params.pageNumber.toString()}0...${
    context.params.pageNumber.toString() + 1
  }0]{
        ...,
          "body": [],
          "slug": slug.current,
          "categories": categories[0]->{
            _id,
            title,
            "slug": slug.current
          },
          "mainImageUrl": mainImage.asset->url,
          "author": author->{name}
      }, 
      "featuredPosts": *[_type == "post" && isFeaturedPost == true] | order(_createdAt desc)[0...10]{
        ...,
          "body": [],
          "slug": slug.current,
          "categories": categories[0]->{
            _id,
            title,
            "slug": slug.current
          },
          "mainImageUrl": mainImage.asset->url,
          "author": author->{name}  
      },
  }`;
  const posts = await getClient().fetch(postsQuery);

  // ================= CATEGORIES Query ======================
  const categoryQuery = groq`
  *[_type == "category"] | order(_createdAt) {
    title,
    "slug": slug.current,
    _id,
    "posts": *[_type == "post" && references(^._id)].title
  }
`;
  const data = await getClient().fetch(categoryQuery);
  const categories = Array.from(data);

  // =============== LOGO Query ==============================
  const layoutQuery = groq`
  *[_type == "layout"]{
    logo
  }
`;
  const data1 = await getClient().fetch(layoutQuery);
  const logo = data1[0].logo;

  //================ FOOTER Query ==========================
  const footerQuery = groq`
    *[_type == "footer"]
  `;
  const data2 = await getClient().fetch(footerQuery);
  const footer = Array.from(data2);

  //=================== PAGES Query =========================
  const postsQuerry = groq`
  {
    "posts": count(*[_type == "post"])
  }
`;
  const result = await getClient().fetch(postsQuerry);

  let count = result.posts / 10;
  const pages = Math.floor(count);
  const currentPage = parseInt(context.params.pageNumber);

  return {
    props: {
      posts,
      categories,
      logo,
      footer,
      currentPage,
      pages,
    },
  };
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts

  const postsQuerry = groq`
  {
    "posts": count(*[_type == "post"])
  }
`;
  const result = await getClient().fetch(postsQuerry);

  let count = result.posts / 10;
  const pages = Math.floor(count);

  let pagesParams = [];

  for (let index = 1; index <= pages; index++) {
    pagesParams.push({ params: { pageNumber: index.toString() } });
  }

  return {
    paths: pagesParams,
    fallback: false,
  };
}
