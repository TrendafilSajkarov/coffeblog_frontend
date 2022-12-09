import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import Latest from "../components/Latest/Latest";
import Site from "../components/Site/Site";
import Footer from "../components/Footer/Footer";
// import Footer from "../components/Footer/Footer";

import { getClient } from "../lib/sanity.server";
import { groq } from "next-sanity";
import { urlFor } from "../lib/sanity";

export default function Home({
  categories,
  aboutUs,
  logo,
  title,
  description,
  siteData,
  footer,
  recipeNavbar,
}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={urlFor(logo.asset).width(20).url()} />
      </Head>
      <Navbar
        categories={categories}
        aboutUs={aboutUs}
        logo={logo}
        recipeNavbar={recipeNavbar}
      />
      <Latest
        featuredPosts={siteData.featuredFourPosts}
        featuredRecipes={siteData.featuredRecipes}
      />
      <Site
        currentPage={0}
        pages={siteData.pages}
        latestPosts={siteData.latestPosts}
        categories={categories}
        aboutUs={aboutUs}
        olderFeaturedPosts={siteData.olderFeaturedPosts}
        recipeNavbar={recipeNavbar}
        featuredRecipes={siteData.featuredRecipes}
      />
      <Footer footer={footer} />
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

  const aboutUsQuery = groq`
  *[_type == "aboutUs"]`;
  const data3 = await getClient(preview).fetch(aboutUsQuery);
  const aboutUsArr = Array.from(data3);
  const aboutUs = aboutUsArr[0];

  const layoutQuery = groq`
  *[_type == "layout"]{
    logo,
    title,
    description
  }
`;
  const data1 = await getClient(preview).fetch(layoutQuery);
  const logo = data1[0].logo;
  const title = data1[0].title;
  const description = data1[0].description;

  const footerQuery = groq`
    *[_type == "footer"]
  `;
  const data2 = await getClient(preview).fetch(footerQuery);
  const footer = Array.from(data2);

  const siteQuery = groq`
  {
    "latestPosts": *[_type == "post"] | order(_createdAt desc)[0...10]{
    ...,
      "body": [],
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
      "slug": slug.current,
      "categories": categories[0]->{
        _id,
        title,
        "slug": slug.current
      },
      "mainImageUrl": mainImage.asset->url,
      "author": author->{name},
      "mainImageMeta": mainImage.asset->metadata
  },
  "featuredFourPosts": *[_type == "post" && isFeaturedPost == true] | order(_createdAt desc)[0...4]{
    ...,
      "body": [],
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
      "slug": slug.current,
      "categories": categories[0]->{
        _id,
        title,
        "slug": slug.current
      },
      "mainImageUrl": mainImage.asset->url,
      "author": author->{name}  
  },
  "olderFeaturedPosts": *[_type == "post"] | order(_createdAt desc)[4...10]{
    ...,
      "body": [],
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
      "slug": slug.current,
      "categories": categories[0]->{
        _id,
        title,
        "slug": slug.current
      },
      "mainImageUrl": mainImage.asset->url,
      "author": author->{name}  
  }, 
  "featuredRecipes": *[_type == "recipe" && isFeaturedRecipe == true] | order(_createdAt desc)[0...10]{
    "title": title,
    "description": description,
    "_id": _id,
    "_createdAt": _createdAt,
    "_updatedAt": _updatedAt,
    "mainImage": mainImage,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.altText,
    "slug": slug.current,
    "author": author->{name},
    "recipeTags": recipeTags[0]->{
      "description": description,
      "title": title,
      "slug": slug.current
    }
  },
  "posts": count(*[_type == "post"]),
  "logo": *[_type == "layout"]{logo}
  }
  `;
  const result = await getClient(preview).fetch(siteQuery);

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
  const siteData = { ...result, pages };

  //=========================================
  const recipeNavbarQuery = groq`
  *[_type == "recipeTag"]{
    ...,
    "recipesInThisTag": count(*[_type == "recipe" && references(^._id)]),
    "totalRecipes": count(*[_type == "recipe"])
  }
`;
  const navbarData = await getClient().fetch(recipeNavbarQuery);
  const recipeNavbar = Array.from(navbarData);

  //==========================================================

  return {
    props: {
      categories,
      logo,
      title,
      description,
      siteData,
      footer,
      aboutUs,
      recipeNavbar,
    },
    revalidate: 60,
  };
}
