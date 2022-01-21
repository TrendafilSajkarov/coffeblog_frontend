import Image from "next/image";
import Link from "next/link";
import Pagination from "../Pagination/Pagination";

import { getDate } from "../../utils/utils";

export default function CategoriesPageMainContent({
  latestPosts,
  currentCategory,
  pages,
  currentPage,
}) {
  return (
    <h1>Hello</h1>
    // <main className="col-span-2 flex flex-col px-1">
    //   <h4 className="uppercase font-serif text-yellow-600 text-xs">
    //     Latest Posts from {currentCategory.title}
    //   </h4>

    //   <section className="flex flex-col">
    //     <ul className="space-y-6 mt-4">
    //       {latestPosts.map((post, i) => {
    //         return (
    //           <li key={post._id} className="flex w-full h-52 group">
    //             <div className="relative h-full w-full flex-1 mr-3">
    //               <Image
    //                 src={post.featuredImage}
    //                 layout="fill"
    //                 objectFit="cover"
    //               />
    //               <div className="absolute top-2 flex flex-col items-center bg-gray-100 bg-opacity-50 px-3 mx-3 shadow-lg">
    //                 <div className="text-2xl font-extrabold text-gray-700 ">
    //                   {getDate(post.createdAt)[0]}
    //                 </div>
    //                 <div className="text-base font-medium h-auto text-gray-700">
    //                   {getDate(post.createdAt)[1]}
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="flex flex-1 flex-col justify-between items-center font-serif">
    //               <h4 className="uppercase text-yellow-600 text-xs ">
    //                 {currentCategory.name}
    //               </h4>
    //               <Link href={`/${currentCategory.slug}/${post.slug}`}>
    //                 <a>
    //                   <h3 className="text-lg font-medium group-hover:underline">
    //                     {post.title}
    //                   </h3>
    //                 </a>
    //               </Link>

    //               <p className="text-xs text-gray-400">By Admin | 3 min read</p>
    //               <p className="text-base line-clamp-5">{post.excerpt}</p>
    //               <Link href={`/${currentCategory.slug}/${post.slug}`}>
    //                 <a>
    //                   <button className="border-2 border-yellow-600 uppercase hover:underline shadow-md px-6 py-1 mt-6 text-gray-600 text-xs">
    //                     Read More
    //                   </button>
    //                 </a>
    //               </Link>
    //             </div>
    //           </li>
    //         );
    //       })}
    //       {pages > 0 && (
    //         <Pagination
    //           pages={pages}
    //           currentPage={currentPage}
    //           category={currentCategory.slug}
    //         />
    //       )}
    //     </ul>
    //   </section>
    // </main>
  );
}
