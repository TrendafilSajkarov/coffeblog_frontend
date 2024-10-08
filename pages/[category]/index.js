import Head from "next/head";
import DefaultErrorPage from "next/error";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AsideContent from "../../components/Site/AsideContent";
import CategoriesPageMainContent from "../../components/Site/CategoriesPageMainContent";

import { loadCategoryHomePageBreadcrumbSchema } from "../../utils/schemaOrg";

import { getClient } from "../../lib/sanity.server";
import { groq } from "next-sanity";
import { urlFor } from "../../lib/sanity";

import { revalidateTime } from "../../lib/revalidateTime";

export default function CategoryPage({
  categories,
  logo,
  siteTitle,
  aboutUs,
  footer,
  latestPosts,
  currentCategory,
  featuredPosts,
  featuredRecipes,
  pages = 0,
  currentPage = 0,
  recipeNavbar,
}) {
  // This includes setting the noindex header because static files always return a status 200 but the rendered not found page page should obviously not be indexed
  if (currentCategory === undefined) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <link rel="icon" href={urlFor(logo?.asset).width(144).url()} />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  return (
    <div>
      <Head>
        <title>
          {currentCategory[0].title} | {siteTitle}
        </title>
        <link rel="icon" href={urlFor(logo.asset).width(144).url()} />
        <meta name="description" content={currentCategory[0].description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={loadCategoryHomePageBreadcrumbSchema(
            currentCategory[0].title,
            siteTitle
          )}
        />
      </Head>
      <Navbar
        categories={categories}
        aboutUs={aboutUs}
        logo={logo}
        recipeNavbar={recipeNavbar}
      />
      <section className="container grid grid-cols-2 auto-rows-auto w-11/12 lg:grid-cols-3 gap-4 xl:w-3/4 max-w-screen-xl mx-auto my-6">
        <CategoriesPageMainContent
          latestPosts={latestPosts}
          currentCategory={currentCategory}
          pages={pages}
          currentPage={currentPage}
        />
        <AsideContent
          aboutUs={aboutUs}
          olderFeaturedPosts={featuredPosts}
          categories={categories}
          recipeNavbar={recipeNavbar}
          featuredRecipes={featuredRecipes}
        />
      </section>
      <Footer footer={footer} />
    </div>
  );
}

export async function getStaticProps(context) {
  const layoutQuery = groq`
    *[_type == "layout"]{
      logo,
      title
    }
  `;
  const data1 = await getClient().fetch(layoutQuery);
  const logo = data1[0].logo;
  const siteTitle = data1[0].title;

  const latestPostQuery = groq`
  {
    "latestPosts": *[_type == "category" && slug.current == '${context.params.category.toString()}']{
      "posts": *[_type == "post" && references(^._id)] | order(_createdAt desc)[0...10]{
        ...,
        "body": [],
        "estimatedReadingTime": round(length(pt::text(body)) / 5 / 250 ),
        "slug": slug.current,
        "mainImageUrl": mainImage.asset->url,
        "author": author->{name}
      }
    }
  }
  `;
  const result1 = await getClient().fetch(latestPostQuery);
  const latestPosts = result1.latestPosts[0]?.posts;

  const currentCategoryQuery = groq`
    {
      "currentCategory": *[_type == "category" && slug.current == '${context.params.category.toString()}'] {
          title,
          description,
          "slug": slug.current,
          _id,
          "posts": *[_type == "post" && references(^._id)].title
      }
    }
  `;
  const result2 = await getClient().fetch(currentCategoryQuery);
  const currentCategory = result2.currentCategory;

  // Check if the current Category exsists and if not return with the logo and siteTitle
  if (!currentCategory[0]) return { props: { logo, siteTitle } };

  function isInt(n) {
    return n === +n && n === (n | 0);
  }
  let pagesInCat = currentCategory[0].posts.length / 10;
  let pages;
  if (isInt(pagesInCat)) {
    pages = pagesInCat - 1;
  } else {
    pages = Math.floor(pagesInCat);
  }

  const featuredPostsQuery = groq`
  {
      "featuredPosts": *[_type == "post" && isFeaturedPost == true] | order(_createdAt desc)[0...10]{
        ...,
        "body": [],
        "estimatedReadingTime": round(length(pt::text(body)) / 5 / 250 ),
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
  }  
  `;
  const result = await getClient().fetch(featuredPostsQuery);
  const featuredPosts = result.featuredPosts;
  const featuredRecipes = result.featuredRecipes;

  const postQuery = groq`
    *[_type == "category"] | order(_createdAt) {
      title,
      "slug": slug.current,
      _id,
      "posts": *[_type == "post" && references(^._id)].title
    }
  `;
  const data = await getClient().fetch(postQuery);
  const categories = Array.from(data);

  const footerQuery = groq`
      *[_type == "footer"]
    `;
  const data2 = await getClient().fetch(footerQuery);
  const footer = Array.from(data2);

  const aboutUsQuery = groq`
  *[_type == "aboutUs"]`;
  const data3 = await getClient().fetch(aboutUsQuery);
  const aboutUsArr = Array.from(data3);
  const aboutUs = aboutUsArr[0];

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
      siteTitle,
      footer,
      aboutUs,
      latestPosts,
      currentCategory,
      featuredPosts,
      featuredRecipes,
      pages,
      recipeNavbar,
    },
    revalidate: revalidateTime,
  };
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const catQuery = groq`
    *[_type == "category"] | order(_createdAt) {
      title,
      "slug": slug.current,
      _id,
      "posts": *[_type == "post" && references(^._id)].title
    }
  `;
  const data = await getClient().fetch(catQuery);
  const cat = Array.from(data);

  // Get the paths we want to pre-render based on posts
  const cats = cat.map((category) => ({
    params: { category: category.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  // return { categories, fallback: false };
  return { paths: cats, fallback: "blocking" };
}
