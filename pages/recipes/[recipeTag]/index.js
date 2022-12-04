import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import RecipesPageMainContent from "../../../components/Site/RecipesPageMainContent";

import Head from "next/head";
import DefaultErrorPage from "next/error";

import { urlFor } from "../../../lib/sanity";
import { getClient } from "../../../lib/sanity.server";
import { groq } from "next-sanity";

import { loadCaroselSchema } from "../../../utils/schemaOrg";

export default function Recipes({
  categories,
  logo,
  title,
  aboutUs,
  footer,
  latestRecipes,
  pages,
  currentTagSlug,
  currentTagTitle,
  recipeTagDontExist = false,
  recipeNavbar,
}) {
  if (recipeTagDontExist) {
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
          currentPage={0}
          pages={pages}
          baseURL={`${currentTagSlug}`}
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

  const checkIfRecipeTagExsists = groq`
  count(*[_type == "recipeTag" && slug.current == "${context.params.recipeTag.toString()}"])
  `;

  let recipeTagDontExist;
  const isRecipeTag = await getClient().fetch(checkIfRecipeTagExsists);
  if (isRecipeTag === 0) {
    recipeTagDontExist = true;
    return {
      props: {
        recipeTagDontExist,
        logo,
      },
    };
  }

  const recipeTagQuery = groq`
  *[_type == "recipeTag" && slug.current == "${context.params.recipeTag.toString()}"] {
    ...,
    "recipes": *[_type == "recipe" && references(^._id)] | order(_createdAt desc)[0...12]{
      ...,
      "author": author->{name},
      "recipeTags": recipeTags[0]->{
        _id,
        title,
        "slug": slug.current
    },
    "slug": slug.current
    },
    "recipesInTag": count(*[_type == "recipe" && references(^._id)])
  }
    `;
  const recipeTag = await getClient().fetch(recipeTagQuery);
  const currentRecipeTag = Array.from(recipeTag);

  let latestRecipes = currentRecipeTag[0].recipes;

  const recipeCount = currentRecipeTag[0].recipesInTag;
  const currentTagSlug = currentRecipeTag[0].slug.current.toString();
  const currentTagTitle = currentRecipeTag[0].title.toString();

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
      currentTagSlug,
      currentTagTitle,
      recipeNavbar,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const recipeTagQuery = groq`
      *[_type == "recipeTag"] | order(_createdAt) {
        title,
        "slug": slug.current,
        _id,
        "posts": *[_type == "recipe" && references(^._id)].title
      }
    `;
  const data = await getClient().fetch(recipeTagQuery);
  const cat = Array.from(data);

  // Get the paths we want to pre-render based on posts
  const cats = cat.map((category) => ({
    params: { recipeTag: category.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  // return { categories, fallback: false };
  return { paths: cats, fallback: "blocking" };
}
