import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import AsideContent from "../../../components/Site/AsideContent";
import RecipeInfo from "../../../components/Recipe/RecipeInfo";
import PreparationSteps from "../../../components/Recipe/PreparationSteps";
import RecipesPageMainContent from "../../../components/Site/RecipesPageMainContent";

import Head from "next/head";
import DefaultErrorPage from "next/error";
import Image from "next/image";

import { urlFor, PortableText } from "../../../lib/sanity";
import { serializers } from "../../../lib/serializers";
import { getClient } from "../../../lib/sanity.server";
import { groq } from "next-sanity";

import { getDate } from "../../../utils/utils";
import { loadRecipeSchema } from "../../../utils/schemaOrg";

export default function Recipe({
  categories,
  logo,
  title,
  aboutUs,
  footer,
  featuredPosts,
  latestRecipes,
  pages,
  currentTagSlug,
  currentTagTitle,
  recipeTagDontExist = false,
  recipeNavbar,
  singleRecipe,
  featuredRecipes,
}) {
  if (recipeTagDontExist) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <link rel="icon" href={urlFor(logo.asset).width(144).url()} />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }
  return (
    <div>
      <Head>
        <title>{singleRecipe[0].title}</title>
        <link rel="icon" href={urlFor(logo.asset).width(144).url()} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={loadRecipeSchema(singleRecipe[0])}
        />
        <meta name="description" content={singleRecipe[0].description} />
        <meta name="twitter:card" content="summary_large_image" />
        {/* <meta name="twitter:site" content="@username of website. Either twitter:site or twitter:site:id is required." />
        <meta name="twitter:creator" content="@username of content creator" />
        <meta property="og:url" content={basePath} /> */}
        <meta property="og:title" content={singleRecipe[0].title} />
        <meta property="og:description" content={singleRecipe[0].description} />
        <meta
          property="og:image:alt"
          content={singleRecipe[0].mainImage.altText}
        />
        <meta
          property="og:image"
          content={urlFor(singleRecipe[0].mainImage.asset).width(800).url()}
        />
        <meta property="og:type" content="website" />
      </Head>
      <Navbar
        categories={categories}
        aboutUs={aboutUs}
        logo={logo}
        isRecipeNavbarActive={true}
        recipeNavbar={recipeNavbar}
      />
      <section className="container max-w-screen-xl mx-auto my-6">
        <div className="relative w-full h-screen max-h-700 shadow-md">
          <Image
            src={urlFor(singleRecipe[0].mainImage.asset)
              .width(800)
              .auto("format")
              .url()}
            priority="true"
            layout="fill"
            objectFit="cover"
            quality={100}
            alt={singleRecipe[0].mainImage.altText}
          />

          <div className="absolute shadow-sm border-gray-200 border bg-white py-0 -bottom-6 left-5 right-5 md:left-20 md:right-20 lg:left-32 lg:right-32 flex items-center">
            <div className="hidden top-4 md:flex flex-col items-center bg-gray-100 bg-opacity-50 w py-2 px-6 mx-6 shadow-lg">
              <div className="text-xs font-medium text-gray-700 uppercase">
                Updated on
              </div>
              <div className="text-4xl font-extrabold text-gray-700 ">
                {getDate(singleRecipe[0]._updatedAt)[0]}
              </div>
              <div className="text-base font-medium h-auto text-gray-700">
                {getDate(singleRecipe[0]._updatedAt)[1]}{" "}
                {getDate(singleRecipe[0]._updatedAt)[3]}
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center py-3 font-serif text-center text-4xl">
              <div className="uppercase text-yellow-600 text-base flex-grow-0">
                {singleRecipe[0].categories.title}
              </div>
              <h1 className="font-light px-1">{singleRecipe[0].title}</h1>
              <p className="text-xs text-gray-400">
                By {singleRecipe[0].author.name} | Preparation:{" "}
                {singleRecipe[0].recipeInfo.totalTime} min
              </p>
              <p className="md:hidden text-xs text-gray-400">
                Updated On: {getDate(singleRecipe[0]._updatedAt)[1]}{" "}
                {getDate(singleRecipe[0]._updatedAt)[0]}{" "}
                {getDate(singleRecipe[0]._updatedAt)[2]}
              </p>
            </div>
          </div>
        </div>
        <section className="container grid grid-cols-2 auto-rows-auto w-11/12 lg:grid-cols-3 gap-4 xl:w-3/4 max-w-screen-xl mx-auto my-6">
          <article className="col-span-2 px-1 md:px-4 flex flex-col items-center">
            <div className="prose w-full prose-th:text-base prose-th:font-medium prose-th:py-1 prose-img:mx-auto prose-figcaption:italic prose-figcaption:text-xs prose-figcaption:text-center prose-a:text-blue-600 font-sans prose-headings:font-medium prose-headings:text-3xl prose-headings:font-serif prose-blockquote:font-serif">
              <PortableText
                className="prose mt-16 w-full prose-th:text-base prose-th:font-medium prose-th:py-1 prose-img:mx-auto prose-figcaption:italic prose-figcaption:text-xs prose-figcaption:text-center prose-a:text-blue-600 font-sans prose-headings:font-medium prose-headings:text-3xl prose-headings:font-serif prose-blockquote:font-serif"
                blocks={singleRecipe[0].recipeBody}
                serializers={serializers}
              />
            </div>
            <RecipeInfo singleRecipe={singleRecipe[0]} />
            <div className="prose w-full mt-16 prose-li:marker:text-yellow-600 prose-th:text-base prose-th:font-medium prose-th:py-1 prose-img:mx-auto prose-figcaption:italic prose-figcaption:text-xs prose-figcaption:text-center prose-a:text-blue-600 font-sans prose-headings:font-medium prose-headings:text-3xl prose-headings:font-serif prose-blockquote:font-serif">
              {singleRecipe[0].recipeIngredients && (
                <h2 className="border-b-2 border-yellow-600">Ingredients:</h2>
              )}
              <PortableText
                blocks={singleRecipe[0].recipeIngredients}
                serializers={serializers}
              />
            </div>
            <PreparationSteps recipe={singleRecipe[0].stepByStep} />
          </article>
          <AsideContent
            aboutUs={aboutUs}
            olderFeaturedPosts={featuredPosts}
            categories={categories}
            recipeNavbar={recipeNavbar}
            featuredRecipes={featuredRecipes}
          />
        </section>
      </section>
      {/* <section className="container grid grid-cols-2 auto-rows-auto w-11/12 lg:grid-cols-3 gap-4 xl:w-3/4 max-w-screen-xl mx-auto my-6">
        <RecipesPageMainContent
          latestRecipes={latestRecipes}
          currentPage={0}
          pages={pages}
          baseURL={`${currentTagSlug}`}
          currentTagTitle={currentTagTitle}
        />
      </section> */}
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

  const featuredPostsQuery = groq`
      {
          "featuredPosts": *[_type == "post" && isFeaturedPost == true] | order(_createdAt desc)[0...10]{
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
        }
      }
      `;
  const result = await getClient().fetch(featuredPostsQuery);
  const featuredPosts = result.featuredPosts;
  const featuredRecipes = result.featuredRecipes;
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

  //=========================================================================================
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
  //=============================================================

  const recipeQuery = groq`
    *[_type == "recipe" && slug.current == "${context.params.recipe.toString()}"]{
      ...,
      recipeBody[]{
        ...,
        markDefs[]{
          ...,
          _type == "internalLink" => {
            "postSlug": @.reference->slug.current,
            "categorySlug": @.reference->categories[0]->slug.current
          },
          _type == "internalRecipeLink" => {
            "recipeSlug": @.reference->slug.current,
            "recipeTagSlug": @.reference->recipeTags[0]->slug.current
          },
          _type == "internalCategoryLink" => {
            "categorySlug": @.reference->slug.current,
          },
        },
        _type == "image" => {
          "metadata": @.asset->
        },
        images[]{
          ...,
          "asset": @.asset->
        }
      },
      "stepByStep": recipesSteps.ingredients[]{
        ...,
        steps[]{
          ...,
          stepText[]{
            ...,
            markDefs[]{
              ...,
              _type == "internalLink" => {
                "postSlug": @.reference->slug.current,
                "categorySlug": @.reference->categories[0]->slug.current
              },
              _type == "internalRecipeLink" => {
                "recipeSlug": @.reference->slug.current,
                "recipeTagSlug": @.reference->recipeTags[0]->slug.current
              },
              _type == "internalCategoryLink" => {
                "categorySlug": @.reference->slug.current,
              },
            },
            _type == "image" => {
              "metadata": @.asset->
            },
            images[]{
              ...,
              "asset": @.asset->
            }
          }
        }
      }, 
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
      "mainImageUrl": mainImage.asset->url,
      "author": author->{name},
      "categories": recipeTags[0]->{title, "slug": slug.current}
    }
  `;
  const singleRecipeData = await getClient().fetch(recipeQuery);
  const singleRecipe = Array.from(singleRecipeData);

  return {
    props: {
      categories,
      logo,
      title,
      footer,
      aboutUs,
      featuredPosts,
      latestRecipes,
      pages,
      currentTagSlug,
      currentTagTitle,
      recipeNavbar,
      singleRecipe,
      featuredRecipes,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const recipeTagQuery = groq`
  *[_type == "recipe"]{
    "recipeSlug": slug.current,
    "recipeTagSlug": recipeTags[0]->{"slug": slug.current
  }
 } `;
  const data = await getClient().fetch(recipeTagQuery);
  const cat = Array.from(data);

  // Get the paths we want to pre-render based on posts
  const cats = cat.map((category) => ({
    params: {
      recipeTag: category.recipeTagSlug.slug,
      recipe: category.recipeSlug,
    },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  // return { categories, fallback: false };
  return { paths: cats, fallback: "blocking" };
}
