import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AsideContent from "../../components/Site/AsideContent";

import { getDate } from "../../utils/utils";
import { serializers } from "../../lib/serializers";

import { PortableText, urlFor } from "../../lib/sanity";
import { getClient } from "../../lib/sanity.server";
import { groq } from "next-sanity";

import Image from "next/image";

export default function PostPage({
  categories,
  aboutUs = null,
  logo,
  footer,
  singlePost,
  featuredPosts,
}) {
  return (
    <div className="">
      <Navbar categories={categories} aboutUs={aboutUs} logo={logo} />

      <section className="container max-w-screen-xl mx-auto my-6">
        <div className="relative w-full h-screen max-h-600 shadow-md">
          <Image
            src={urlFor(singlePost[0].mainImage.asset).width(1200).url()}
            layout="fill"
            objectFit="cover"
            quality={100}
          />

          <div className="absolute shadow-sm border-gray-200 border bg-white py-0 -bottom-6 left-5 right-5 md:left-20 md:right-20 lg:left-32 lg:right-32 flex items-center">
            <div className="hidden top-4 md:flex flex-col items-center bg-gray-100 bg-opacity-50 w py-2 px-6 mx-6 shadow-lg">
              <div className="text-4xl font-extrabold text-gray-700 ">
                {getDate(singlePost[0]._createdAt)[0]}
              </div>
              <div className="text-base font-medium h-auto text-gray-700">
                {getDate(singlePost[0]._createdAt)[1]}
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center py-3 font-serif text-4xl">
              <h4 className="uppercase text-yellow-600 text-base flex-grow-0">
                {singlePost[0].categories.title}
              </h4>
              <h3 className="font-light">{singlePost[0].title}</h3>
              <p className="text-xs text-gray-400">
                By {singlePost[0].author.name} |{" "}
                {singlePost[0].estimatedReadingTime} min read
              </p>
            </div>
          </div>
        </div>
        <section className="container grid grid-cols-2 auto-rows-auto w-11/12 lg:grid-cols-3 gap-4 xl:w-3/4 max-w-screen-xl mx-auto my-6">
          <article className="col-span-2 px-1 md:px-4 flex flex-col items-center">
            <PortableText
              className="prose mt-16 prose-img:mx-auto prose-figcaption:italic prose-figcaption:text-xs prose-figcaption:text-center prose-a:text-blue-600 font-sans prose-headings:font-medium prose-headings:text-3xl prose-headings:font-serif prose-blockquote:font-serif"
              blocks={singlePost[0].body}
              serializers={serializers}
            />
          </article>
          <AsideContent
            aboutUs={aboutUs}
            olderFeaturedPosts={featuredPosts}
            categories={categories}
          />
        </section>
      </section>
      <Footer footer={footer} />
    </div>
  );
}

// "url": "${
//   process.env.SITE_ADDRESS
// }" + categories[0]->{slug.current} + @.item->slug.current,

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
                }
              }
            },
            "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
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

  return {
    props: {
      featuredPosts,
      singlePost,
      categories,
      logo,
      footer,
    }, // will be passed to the page component as props
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
  return { paths: allPosts, fallback: false };
}

//================ OLD ===========================================
//   const res = await fetch(
//     `http://localhost:3000/api/singlePost?post=${context.params.post}`
//   );
//   const singlePost = await res.json();

//   const res1 = await fetch(`http://localhost:3000/api/categories`);

//   const categories = await res1.json();

//   if (!categories) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { categories, singlePost }, // will be passed to the page component as props
//   };
