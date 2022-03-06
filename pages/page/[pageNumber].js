import Head from "next/head";
import DefaultErrorPage from "next/error";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Site from "../../components/Site/Site";

import { getClient } from "../../lib/sanity.server";
import { groq } from "next-sanity";
import { urlFor } from "../../lib/sanity";

export default function Page({
  posts,
  categories,
  logo,
  title,
  aboutUs,
  footer,
  pages,
  currentPage,
}) {
  // This includes setting the noindex header because static files always return a status 200 but the rendered not found page page should obviously not be indexed
  if (currentPage > pages || (pages > 0 && currentPage === 0)) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <link rel="icon" href={urlFor(logo.asset).width(20).url()} />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href={urlFor(logo.asset).width(20).url()} />
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
  const start = context.params.pageNumber.toString() + "0";
  const finish = Number(context.params.pageNumber) + 1;
  const end = finish + "0";
  // ================= POSTS Query ===========================
  const postsQuery = groq`
  {
    "latestPosts": *[_type == "post"] | order(_createdAt desc)[${start}...${end}] {
        ...,
          "body": [],
          "slug": slug.current,
          "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
          "categories": categories[0]->{
            _id,
            title,
            "slug": slug.current
          },
          "mainImageUrl": mainImage.asset->url,
          "author": author->{name},
          "mainImageMeta": mainImage.asset->metadata
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
    logo,
    title
  }
`;
  const data1 = await getClient().fetch(layoutQuery);
  const logo = data1[0].logo;
  const title = data1[0].title;

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

  function isInt(n) {
    return n === +n && n === (n | 0);
  }

  let pagesInCat = result.posts / 10;
  let pages;
  if (isInt(pagesInCat)) {
    pages = pagesInCat - 1;
  } else {
    pages = Math.floor(pagesInCat);
  }
  const currentPage = parseInt(context.params.pageNumber);

  const aboutUsQuery = groq`
  *[_type == "aboutUs"]`;
  const data3 = await getClient().fetch(aboutUsQuery);
  const aboutUsArr = Array.from(data3);
  const aboutUs = aboutUsArr[0];

  return {
    props: {
      posts,
      categories,
      logo,
      title,
      footer,
      currentPage,
      pages,
      aboutUs,
    },
    revalidate: 60,
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

  function isInt(n) {
    return n === +n && n === (n | 0);
  }
  let pagesInCat = result.posts / 10;
  let pages;
  if (isInt(pagesInCat)) {
    pages = pagesInCat - 1;
  } else {
    pages = Math.floor(pagesInCat);
  }

  let pagesParams = [];

  for (let index = 1; index <= pages; index++) {
    pagesParams.push({ params: { pageNumber: index.toString() } });
  }

  return {
    paths: pagesParams,
    fallback: "blocking",
  };
}
