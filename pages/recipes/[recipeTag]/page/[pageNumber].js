import Navbar from "../../../../components/Navbar/Navbar";
import Footer from "../../../../components/Footer/Footer";
import RecipesTagsMainContent from "../../../../components/Site/RecipeTagsMainContent";

import Head from "next/head";
import DefaultErrorPage from "next/error";

import { urlFor } from "../../../../lib/sanity";
import { getClient } from "../../../../lib/sanity.server";
import { groq } from "next-sanity";

import { isNumeric } from "../../../../utils/utils";
import { loadCaroselSchema } from "../../../../utils/schemaOrg";

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
  currentTagSlug,
  currentTagTitle,
  currentTagDescription,
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
        <title>Recipes | {title}</title>
        <link rel="icon" href={urlFor(logo.asset).width(20).url()} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={loadCaroselSchema(latestRecipes)}
        />
        <meta name="description" content={currentTagDescription} />
      </Head>
      <Navbar
        categories={categories}
        aboutUs={aboutUs}
        logo={logo}
        isRecipeNavbarActive={true}
        recipeNavbar={recipeNavbar}
      />
      <section className="container grid grid-cols-2 auto-rows-auto w-11/12 lg:grid-cols-3 gap-4 xl:w-3/4 max-w-screen-xl mx-auto my-6">
        <RecipesTagsMainContent
          latestRecipes={latestRecipes}
          currentPage={currentPage}
          pages={pages}
          basURL={currentTagSlug}
          currentTagTitle={currentTagTitle}
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
  //==================================================================
  const recipeNavbarQuery = groq`
  *[_type == "recipeTag"]{
    ...,
    "recipesInThisTag": count(*[_type == "recipe" && references(^._id)]),
    "totalRecipes": count(*[_type == "recipe"])
  }
`;
  const navbarData = await getClient().fetch(recipeNavbarQuery);
  const recipeNavbar = Array.from(navbarData);
  //=================================================================

  //==============
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

  const recipeTagQuery = groq`
  *[_type == "recipeTag" && slug.current == "${context.params.recipeTag.toString()}"] {
    ...,
    "recipes": *[_type == "recipe" && references(^._id)] | order(_createdAt desc)[${beginStr}...${newendStr}]{
      ...,
      "author": author->{name},
      "recipeTags": recipeTags[0]->{
        _id,
        title,
        "slug": slug.current
    },
    "slug": slug.current
    },
    "recipesInTag": count(*[_type == "recipe" && references(^._id)]),
    "description": description
  }
    `;
  const recipeTag = await getClient().fetch(recipeTagQuery);
  const currentRecipeTag = Array.from(recipeTag);
  let latestRecipes = currentRecipeTag[0].recipes;

  const recipeCount = currentRecipeTag[0].recipesInTag;
  const currentTagSlug = currentRecipeTag[0].slug.current.toString();
  const currentTagTitle = currentRecipeTag[0].title.toString();
  const currentTagDescription = currentRecipeTag[0].description.toString();

  function isInt(n) {
    return n === +n && n === (n | 0);
  }
  let pagesInCat = recipeCount / 12;
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
      currentTagSlug,
      currentTagTitle,
      currentTagDescription,
      recipeNavbar,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts

  const recipeTagsQuery = groq`
      {
        "recipeTags": *[_type == "recipeTag"] | order(_createdAt) {
          title,
          "slug": slug.current,
          _id,
          "recipes": *[_type == "recipe" && references(^._id)].title
        }
      }
    `;
  const result = await getClient().fetch(recipeTagsQuery);

  function isInt(n) {
    return n === +n && n === (n | 0);
  }

  let pagesParams = [];

  result.recipeTags.map((cat) => {
    let pagesPerCat = cat.recipes.length / 12;
    let pagesNum;
    if (isInt(pagesPerCat)) {
      pagesNum = pagesPerCat - 1;
    } else {
      pagesNum = Math.floor(pagesPerCat);
    }

    if (pagesNum > 0) {
      for (let index = 1; index <= pagesNum; index++) {
        pagesParams.push({
          params: { recipeTag: cat.slug, pageNumber: index.toString() },
        });
      }
      return;
    }
    return pagesParams;
  });

  return {
    paths: pagesParams,
    fallback: "blocking",
  };
}
