import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Image from "next/image";
import Head from "next/head";

import { urlFor, PortableText } from "../lib/sanity";
import { serializers } from "../lib/serializers";

import { getClient } from "../lib/sanity.server";
import { groq } from "next-sanity";

import { revalidateTime } from "../lib/revalidateTime";

export default function AboutPage({
  categories,
  logo,
  title,
  aboutUs,
  footer,
  recipeNavbar,
}) {
  return (
    <div>
      <Head>
        <title>About Us | {title}</title>
        <link rel="icon" href={urlFor(logo.asset).width(144).url()} />
      </Head>
      <Navbar
        categories={categories}
        aboutUs={aboutUs}
        logo={logo}
        recipeNavbar={recipeNavbar}
      />
      <section className="container mx-auto pt-5 space-y-5 flex flex-col prose">
        <div className="relative w-full h-96">
          <Image
            unoptimized
            src={urlFor(aboutUs.mainImage).width(800).url()}
            layout="fill"
            objectFit="cover"
            alt={aboutUs.mainImage.altText}
          />
        </div>
        <PortableText blocks={aboutUs.content} serializers={serializers} />
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

  return {
    props: {
      categories,
      logo,
      title,
      footer,
      aboutUs,
      recipeNavbar,
    },
    revalidate: revalidateTime,
  };
}
