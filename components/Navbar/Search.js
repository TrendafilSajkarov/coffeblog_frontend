import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";

import { urlFor } from "../../lib/sanity";

export default function Search({ setOpenSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      searchCharacters(debouncedSearchTerm).then((results) => {
        setIsSearching(false);
        setResults(results);
      });
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="absolute z-10 right-0 bg-gray-100 px-2">
      <div className="container lg:max-w-2xl mx-auto flex flex-col items-center justify-center md:justify-end">
        <div className="sm:w-full flex items-stretch bg-transparent text-gray-600 py-2">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="search"
              name="search"
              id="search"
              className="bg-white h-10 px-2 xs:px-5 rounded-lg text-sm focus:outline-none focus:ring-slate-200 focus:border-collapse focus:ring-2 w-full xs:w-72"
              placeholder="Search Posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </form>
        </div>
        {isSearching && (
          <h4 className="font-serif text-yellow-600 text-base mb-3">
            Searching ...
          </h4>
        )}
        {results !== [] &&
        results.posts !== undefined &&
        results.posts?.length === 0 ? (
          <h4 className="font-serif text-yellow-600 text-base mb-3">
            No Results
          </h4>
        ) : null}
        {results !== [] &&
        results.posts !== undefined &&
        results.posts?.length !== 0 ? (
          <section className="mt-9 w-full max-h-96 overflow-auto">
            <h4 className="font-serif text-yellow-600 text-base mb-3">
              {`Search Results for "${searchTerm}"`}
            </h4>
            <ul>
              {results.posts &&
                results.posts.map((post) => {
                  return (
                    <li
                      key={post._id}
                      className="min-h-max w-full py-2 group border-b-2 border-red-300 last:border-none"
                    >
                      <div className="h-full grid grid-cols-3">
                        <div className="relative col-span-1 h-full w-full">
                          <Image
                            src={urlFor(post.mainImage)
                              .width(150)
                              .height(150)
                              .url()}
                            layout="fill"
                            objectFit="cover"
                            alt={post.mainImage.altText}
                          />
                        </div>
                        <div className="col-start-2 col-end-4 min-h-100 flex flex-col font-serif pl-3">
                          <h4 className="uppercase text-yellow-600 text-xs whitespace-nowrap ">
                            {post.categories.title}
                          </h4>
                          <Link href={`/${post.categories.slug}/${post.slug}`}>
                            <a>
                              <h3 className="line-clamp-3 font-light group-hover:underline prose-sm text-base">
                                {post.title}
                              </h3>
                            </a>
                          </Link>

                          <p className="justify-self-end text-xs prose-sm text-gray-400">
                            By {post.author.name} | {post.estimatedReadingTime}{" "}
                            min read
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}

function searchCharacters(search) {
  return fetch(`/api/search?q=${search}`)
    .then((r) => r.json())
    .then((r) => r)
    .catch((error) => {
      console.error(error);
      return [];
    });
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
