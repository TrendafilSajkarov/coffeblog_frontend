import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import RecipesPageMainContent from "../../components/Site/RecipesPageMainContent";

import Head from "next/head";

import { urlFor } from "../../lib/sanity";
import { getClient } from "../../lib/sanity.server";
import { groq } from "next-sanity";

import { loadCaroselSchema } from "../../utils/schemaOrg";

export default function Recipes({
  categories,
  logo,
  title,
  aboutUs,
  footer,
  latestRecipes,
  pages,
  recipeNavbar,
}) {
  return (
    <div>
      <Head>
        <title>Recipes | {title}</title>
        <link rel="icon" href={urlFor(logo.asset).width(20).url()} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={loadCaroselSchema(latestRecipes)}
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
        recipeNavbar={recipeNavbar}
        isRecipeNavbarActive={true}
      />
      <section className="container grid grid-cols-2 auto-rows-auto w-11/12 lg:grid-cols-3 gap-4 xl:w-3/4 max-w-screen-xl mx-auto my-6">
        <RecipesPageMainContent
          latestRecipes={latestRecipes}
          currentPage={0}
          pages={pages}
          baseURL="recipes"
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

  const recipesQuery = groq`
      *[_type == "recipe"] | order(_createdAt desc)[0...12]{
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
      recipeNavbar,
    },
    revalidate: 60,
  };
}
