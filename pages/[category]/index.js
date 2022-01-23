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
  latestPosts,
  currentCategory,
  featuredPosts,
  pages = 0,
  currentPage = 0,
}) {
  return (
    <div>
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
  const latestPostQuery = groq`
  {
    "latestPosts": *[_type == "category" && slug.current == '${context.params.category.toString()}']{
      "posts": *[_type == "post" && references(^._id)] | order(_createdAt desc)[0...10]{
        ...,
        "body": [],
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

  const count = currentCategory[0].posts.length / 10;
  const pages = Math.floor(count);

  const featuredPostsQuery = groq`
  {
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

  return {
    props: {
      categories,
      logo,
      footer,
      latestPosts,
      currentCategory,
      featuredPosts,
      pages,
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
