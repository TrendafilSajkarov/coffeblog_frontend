import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AsideContent from "../../components/Site/AsideContent";

import { getDate } from "../../utils/utils";
import { serializers } from "../../lib/serializers";

import { PortableText, urlFor } from "../../lib/sanity";
import { getClient } from "../../lib/sanity.server";
import { groq } from "next-sanity";

import Image from "next/image";
import Head from "next/head";
import DefaultErrorPage from "next/error";

export default function PostPage({
  categories,
  aboutUs,
  logo,
  footer,
  singlePost,
  featuredPosts,
  featuredRecipes,
  recipeNavbar,
}) {
  // This includes setting the noindex header because static files always return a status 200 but the rendered not found page page should obviously not be indexed
  if (!singlePost[0]) {
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
    <div className="">
      <Head>
        <title>{singlePost[0].title}</title>
        <link rel="icon" href={urlFor(logo.asset).width(144).url()} />
        <meta name="description" content={singlePost[0].description} />
        <meta name="twitter:card" content="summary_large_image" />
        {/* <meta name="twitter:site" content="@username of website. Either twitter:site or twitter:site:id is required." />
        <meta name="twitter:creator" content="@username of content creator" />
        <meta property="og:url" content={basePath} /> */}
        <meta property="og:title" content={singlePost[0].title} />
        <meta property="og:description" content={singlePost[0].description} />
        <meta
          property="og:image:alt"
          content={singlePost[0].mainImage.altText}
        />
        <meta
          property="og:image"
          content={urlFor(singlePost[0].mainImage.asset).width(800).url()}
        />
        <meta property="og:type" content="website" />
      </Head>
      <Navbar
        categories={categories}
        aboutUs={aboutUs}
        logo={logo}
        recipeNavbar={recipeNavbar}
      />

      <section className="container max-w-screen-xl mx-auto my-6">
        <div className="relative w-full h-screen max-h-700 shadow-md">
          <Image
            src={urlFor(singlePost[0].mainImage.asset)
              .width(800)
              .auto("format")
              .url()}
            priority="true"
            layout="fill"
            objectFit="cover"
            quality={100}
            alt={singlePost[0].mainImage.altText}
          />

          <div className="absolute shadow-sm border-gray-200 border bg-white py-0 -bottom-6 left-5 right-5 md:left-20 md:right-20 lg:left-32 lg:right-32 flex items-center">
            <div className="hidden top-4 md:flex flex-col items-center bg-gray-100 bg-opacity-50 w py-2 px-6 mx-6 shadow-lg">
              <div className="text-xs font-medium text-gray-700 uppercase">
                Updated on
              </div>
              <div className="text-4xl font-extrabold text-gray-700 ">
                {getDate(singlePost[0]._updatedAt)[0]}
              </div>
              <div className="text-base font-medium h-auto text-gray-700">
                {getDate(singlePost[0]._updatedAt)[1]}{" "}
                {getDate(singlePost[0]._updatedAt)[3]}
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center py-3 font-serif text-4xl">
              <div className="uppercase text-yellow-600 text-base flex-grow-0">
                {singlePost[0].categories.title}
              </div>
              <h1 className="font-light px-1 text-center">
                {singlePost[0].title}
              </h1>
              <div className="w-full flex justify-around">
                <p className="text-xs flex flex-col sm:flex-row md:block text-gray-500 text-center">
                  <span className="">By {singlePost[0].author.name} | </span>
                  <span className="whitespace-nowrap sm:pl-1 md:pl-0">
                    {singlePost[0].estimatedReadingTime} min read
                  </span>
                </p>
                <p className="flex flex-col sm:flex-row md:hidden text-xs text-gray-500">
                  <span className="">Updated On: </span>
                  <span className="whitespace-nowrap sm:pl-1">
                    {getDate(singlePost[0]._updatedAt)[1]}{" "}
                    {getDate(singlePost[0]._updatedAt)[0]}{" "}
                    {getDate(singlePost[0]._updatedAt)[2]}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <section className="container grid grid-cols-2 auto-rows-auto w-11/12 lg:grid-cols-3 gap-4 xl:w-3/4 max-w-screen-xl mx-auto my-6">
          <article className="col-span-2 px-1 md:px-4 flex flex-col items-center">
            {singlePost[0].disclaimer && (
              <div className="bg-yellow-600 max-w-xl mt-10 prose selection:bg-white selection:text-yellow-600">
                <div className="border border-white border-dashed m-1">
                  <div className="text-white px-4 py-1">
                    <strong>Disclaimer:</strong> CoffeenatedStories.com is a
                    member of the Amazon Associates Program, and as an Amazon
                    Associate, we earn from qualifying purchases.
                  </div>
                  {/* <div className="bg-sky-500 border-2 text-center border-white my-2 mx-3 px-2 text-white shadow-sm shadow-white">
                    <p>
                      With that being said, enroll in{" "}
                      <div>
                        <a
                          className="font-semibold text-lg text-sky-900"
                          href="https://amzn.to/3Qbdsl6"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Amazon Prime
                        </a>
                      </div>{" "}
                      and unlock incredible savings of up to{" "}
                      <span className="text-xl font-semibold">40%</span> during{" "}
                      <div>
                        <a
                          className="font-bold text-xl text-sky-900 whitespace-nowrap"
                          href="https://amzn.to/46CPzZz"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Prime Day Deals
                        </a>
                      </div>
                      <span className="font-semibold whitespace-nowrap">
                        {" "}
                        on October 10th and 11th
                      </span>{" "}
                    </p>
                  </div> */}
                </div>
              </div>
            )}
            <PortableText
              className="prose w-full mt-10 prose-th:text-base prose-th:font-medium prose-th:py-1 prose-img:mx-auto prose-figcaption:italic prose-figcaption:text-xs prose-figcaption:text-center prose-a:text-blue-600 font-sans prose-headings:font-medium prose-headings:text-3xl prose-headings:font-serif prose-blockquote:font-serif"
              blocks={singlePost[0].body}
              serializers={serializers}
            />
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
      <Footer footer={footer} />
    </div>
  );
}

export async function getStaticProps(context) {
  const singlePostQuery = groq`
        *[_type == "post" && slug.current == "${context.params.post.toString()}"]{
            ...,
            body[]{
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
              _type == "productsGallery" => {
                ...,
                allProducts[]{
                  ...,
                  "asset": @.asset->
                }
              },
              _type == "miniProdGallery" => {
                ...,
                allMiniProducts[]{
                  ...,
                  "asset": @.asset->
                }
              },
              _type == "productProCon" => {
                ...,
                "productImageObject": @.productImage.asset->
              },
              _type == "productFeatures" => {
                ...,
                "productImageObject": @.productWithFeaturesImage.asset->
              },
              _type == "amazonBanner" => {
                ...,
              },
              _type == "textPlusImageGallery" => {
                ...,
              },
              _type == "adPlaceholder" => {
                "adPlaceholder": @->
              },
              _type == "richParagraph" => {
                ...,
                "paragraphImageMeta": @.paragraphImage.asset->
              },
              images[]{
                ...,
                "asset": @.asset->
              }
            },
            "estimatedReadingTime": round(length(pt::text(body)) / 5 / 250 ),
            "mainImageUrl": mainImage.asset->url,
            "author": author->{name},
            "categories": categories[0]->{title, "slug": slug.current}
        }
    `;
  const data3 = await getClient().fetch(singlePostQuery);
  const singlePost = Array.from(data3);

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
        }
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

  const layoutQuery = groq`
      *[_type == "layout"]{
        logo
      }
    `;
  const data1 = await getClient().fetch(layoutQuery);
  const logo = data1[0].logo;

  const footerQuery = groq`
        *[_type == "footer"]
      `;
  const data2 = await getClient().fetch(footerQuery);
  const footer = Array.from(data2);

  const aboutUsQuery = groq`
  *[_type == "aboutUs"]`;
  const data4 = await getClient().fetch(aboutUsQuery);
  const aboutUsArr = Array.from(data4);
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
      featuredPosts,
      featuredRecipes,
      singlePost,
      categories,
      logo,
      footer,
      aboutUs,
      recipeNavbar,
    }, // will be passed to the page component as props
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const allPostsQuery = groq`
        {
            "allPosts": *[_type == "post"]{
                "slug": slug.current,
                "categories": categories[0]->{
                  "slug": slug.current
                }
           }
        }
    `;
  const res = await getClient().fetch(allPostsQuery);
  const data = Array.from(res.allPosts);

  // Get the paths we want to pre-render based on posts
  const allPosts = data.map((post) => ({
    params: {
      post: post.slug,
      category: post.categories.slug,
    },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  // return { categories, fallback: false };
  return { paths: allPosts, fallback: "blocking" };
}
