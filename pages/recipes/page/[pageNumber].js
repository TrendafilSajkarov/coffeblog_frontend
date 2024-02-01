import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import RecipesPageMainContent from "../../../components/Site/RecipesPageMainContent";

import Head from "next/head";
import DefaultErrorPage from "next/error";

import { urlFor } from "../../../lib/sanity";
import { getClient } from "../../../lib/sanity.server";
import { groq } from "next-sanity";

import { isNumeric } from "../../../utils/utils";
import { loadCaroselSchema } from "../../../utils/schemaOrg";
import { loadRecipesNumberBreadcrumbSchema } from "../../../utils/schemaOrg";

export default function Recipes({
  categories,
  logo,
  title,
  aboutUs,
  footer,
  latestRecipes,
  pages,
  currentPage,
  isPageNumberNaN,
  recipeNavbar,
}) {
  // This includes setting the noindex header because static files always return a status 200 but the rendered not found page page should obviously not be indexed
  if (
    currentPage > pages ||
    (pages > 0 && currentPage === 0) ||
    currentPage < 0 ||
    isPageNumberNaN
  ) {
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
        <title>
          Recipes - Page {currentPage} | {title}
        </title>
        <link rel="icon" href={urlFor(logo.asset).width(144).url()} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={loadCaroselSchema(latestRecipes)}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={loadRecipesNumberBreadcrumbSchema(
            currentPage,
            title
          )}
        />
        <meta
          name="description"
          content="In our Recipes category discover many recipes and guides for making coffee and many other coffee drinks."
        />
      </Head>
      <Navbar
        categories={categories}
        aboutUs={aboutUs}
        logo={logo}
        isRecipeNavbarActive={true}
        recipeNavbar={recipeNavbar}
      />
      <section className="container grid grid-cols-2 auto-rows-auto w-11/12 lg:grid-cols-3 gap-4 xl:w-3/4 max-w-screen-xl mx-auto my-6">
        <RecipesPageMainContent
          latestRecipes={latestRecipes}
          currentPage={currentPage}
          pages={pages}
          baseURL="/recipes"
        />
      </section>
      <Footer footer={footer} />
    </div>
  );
}

export async function getStaticProps(context) {
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

  const aboutUsQuery = groq`
      *[_type == "aboutUs"]`;
  const data3 = await getClient().fetch(aboutUsQuery);
  const aboutUsArr = Array.from(data3);
  const aboutUs = aboutUsArr[0];

  const layoutQuery = groq`
      *[_type == "layout"]{
        logo,
        title
      }
    `;
  const data1 = await getClient().fetch(layoutQuery);
  const logo = data1[0].logo;
  const title = data1[0].title;

  const footerQuery = groq`
        *[_type == "footer"]
      `;
  const data2 = await getClient().fetch(footerQuery);
  const footer = Array.from(data2);
  //==========================================================
  const recipeNavbarQuery = groq`
  *[_type == "recipeTag"]{
    ...,
    "recipesInThisTag": count(*[_type == "recipe" && references(^._id)]),
    "totalRecipes": count(*[_type == "recipe"])
  }
`;
  const navbarData = await getClient().fetch(recipeNavbarQuery);
  const recipeNavbar = Array.from(navbarData);
  //============ get recipes ================================

  const begin = context.params.pageNumber * 12;
  let isPageNumberNaN = false;
  let isPageNumberNumber = isNumeric(context.params.pageNumber);

  let beginStr;
  let newendStr;

  if (isPageNumberNumber) {
    beginStr = begin.toString();
    let newEnd = begin + 12;
    newendStr = newEnd.toString();
  } else {
    beginStr = "0";
    newendStr = "12";
    isPageNumberNaN = true;
  }

  const currentPage = parseInt(context.params.pageNumber);

  const recipesQuery = groq`
      *[_type == "recipe"] | order(_createdAt desc)[${beginStr}...${newendStr}]{
        title,
        "slug": slug.current,
        _id,
        mainImage,
        "recipeTags": recipeTags[0]->{
            _id,
            title,
            "slug": slug.current
        },
        "author": author->{name},
      }
    `;
  const recipes = await getClient().fetch(recipesQuery);
  const latestRecipes = Array.from(recipes);

  const recipeCount = groq`
      count(*[_type == "recipe"])
  `;
  const countedRec = await getClient().fetch(recipeCount);

  function isInt(n) {
    return n === +n && n === (n | 0);
  }
  let pagesInCat = countedRec / 12;
  let pages;
  if (isInt(pagesInCat)) {
    pages = pagesInCat - 1;
  } else {
    pages = Math.floor(pagesInCat);
  }

  return {
    props: {
      categories,
      logo,
      title,
      footer,
      aboutUs,
      latestRecipes,
      pages,
      currentPage,
      isPageNumberNaN,
      recipeNavbar,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts

  const postsQuerry = groq`
    {
      "recipes": count(*[_type == "recipe"])
    }
  `;
  const result = await getClient().fetch(postsQuerry);

  function isInt(n) {
    return n === +n && n === (n | 0);
  }
  let pagesInCat = result.recipes / 10;
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
