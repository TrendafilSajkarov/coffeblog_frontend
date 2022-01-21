import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AsideContent from "../../components/Site/AsideContent";
import CategoriesPageMainContent from "../../components/Site/CategoriesPageMainContent";

import { getClient } from "../../lib/sanity.server";
import { groq } from "next-sanity";

export default function CategoryPage({
  categories,
  logo,
  aboutUs = null,
  footer,
  siteData,
}) {
  return (
    <div>
      <Navbar categories={categories} aboutUs={aboutUs} logo={logo} />
      <section className="container grid grid-cols-2 auto-rows-auto w-11/12 lg:grid-cols-3 gap-4 xl:w-3/4 max-w-screen-xl mx-auto my-6">
        {/* <CategoriesPageMainContent
          latestPosts={siteData.latestPosts}
          currentCategory={siteData.currentCategory}
        /> */}
        {/* <AsideContent
          aboutUs={aboutUs}
          olderFeaturedPosts={siteData.featuredPosts}
          categories={categories}
        /> */}
      </section>
      <Footer footer={footer} />
    </div>
  );
}

export async function getStaticProps() {
  const siteQuery = groq`
  {
    "latestPosts": *[_type == "post"] | order(_createdAt desc)[0...10]{
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
  {
    "currentCategory": *[_type == "category" && slug.current == 'buyers-guide'] {
        title,
        "slug": slug.current,
        _id,
        "posts": *[_type == "post" && references(^._id)].title
      }
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
  }
  }
  `;
  const result = await getClient().fetch(siteQuery);

  const count = result.currentCategory.posts.length / 10;
  const pages = Math.floor(count);
  const siteData = { ...result, pages };

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
  console.log(siteData.currentCategory);
  return {
    props: {
      categories,
      logo,
      footer,
      siteData,
    },
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
  return { paths: cats, fallback: false };
}
