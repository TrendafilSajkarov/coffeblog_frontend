import Head from "next/head";
import DefaultErrorPage from "next/error";

import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import AsideContent from "../../../components/Site/AsideContent";
import CategoriesPageMainContent from "../../../components/Site/CategoriesPageMainContent";

import { getClient } from "../../../lib/sanity.server";
import { groq } from "next-sanity";
import { urlFor } from "../../../lib/sanity";

export default function CategoryPageWithNumber({
  categories,
  logo,
  aboutUs,
  footer,
  latestPosts,
  currentCategory,
  featuredPosts,
  pages,
  currentPage,
}) {
  // This includes setting the noindex header because static files always return a status 200 but the rendered not found page page should obviously not be indexed
  if (
    currentPage > pages ||
    (pages > 0 && currentPage === 0) ||
    currentPage < 0
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
        <title>{currentCategory[0].title}</title>
        <link rel="icon" href={urlFor(logo.asset).width(20).url()} />
      </Head>
      <Navbar categories={categories} aboutUs={aboutUs} logo={logo} />
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
        />
      </section>
      <Footer footer={footer} />
    </div>
  );
}

export async function getStaticProps(context) {
  const start = context.params.pageNumber.toString() + "0";
  const finish = Number(context.params.pageNumber) + 1;
  const end = finish + "0";

  const latestPostQuery = groq`
    {
      "latestPosts": *[_type == "category" && slug.current == '${context.params.category.toString()}']{
        "posts": *[_type == "post" && references(^._id)] | order(_createdAt desc)[${start}...${end}]{
          ...,
          "body": [],
          "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
          "slug": slug.current,
          "mainImageUrl": mainImage.asset->url,
          "author": author->{name}
        }
      }
    }
    `;
  const result1 = await getClient().fetch(latestPostQuery);
  const latestPosts = result1.latestPosts[0].posts;

  const currentCategoryQuery = groq`
      {
        "currentCategory": *[_type == "category" && slug.current == '${context.params.category.toString()}'] {
            title,
            "slug": slug.current,
            _id,
            "posts": *[_type == "post" && references(^._id)].title
        }
      }
    `;
  const result2 = await getClient().fetch(currentCategoryQuery);
  const currentCategory = result2.currentCategory;

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

  const currentPage = parseInt(context.params.pageNumber);

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
      }
    }  
    `;
  const result = await getClient().fetch(featuredPostsQuery);
  const featuredPosts = result.featuredPosts;

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
  const data3 = await getClient().fetch(aboutUsQuery);
  const aboutUsArr = Array.from(data3);
  const aboutUs = aboutUsArr[0];

  return {
    props: {
      categories,
      logo,
      footer,
      aboutUs,
      latestPosts,
      currentCategory,
      featuredPosts,
      pages,
      currentPage,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts

  const postsQuerry = groq`
    {
      "categories": *[_type == "category"] | order(_createdAt) {
        title,
        "slug": slug.current,
        _id,
        "posts": *[_type == "post" && references(^._id)].title
      }
    }
  `;
  const result = await getClient().fetch(postsQuerry);

  function isInt(n) {
    return n === +n && n === (n | 0);
  }

  let pagesParams = [];

  result.categories.map((cat) => {
    let pagesPerCat = cat.posts.length / 10;
    let pagesNum;
    if (isInt(pagesPerCat)) {
      pagesNum = pagesPerCat - 1;
    } else {
      pagesNum = Math.floor(pagesPerCat);
    }

    if (pagesNum > 0) {
      for (let index = 1; index <= pagesNum; index++) {
        pagesParams.push({
          params: { category: cat.slug, pageNumber: index.toString() },
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
