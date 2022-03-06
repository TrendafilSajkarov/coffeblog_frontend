import Link from "next/link";
import Menu from "./Menu";
import { useState, useEffect, useRef } from "react";

import Search from "./Search";

export default function Links({ categories, aboutUs }) {
  const ref = useRef();

  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (openSearch && ref.current && !ref.current.contains(e.target)) {
        setOpenSearch(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside, {
      passive: true,
    });

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside, {
        passive: true,
      });
    };
  }, [openSearch]);

  return (
    <div className="h-auto w-full fixed top-0 z-50 bg-gray-50 bg-opacity-90 shadow-sm font-serif font-light">
      {openMenu && (
        <Menu
          setOpenMenu={setOpenMenu}
          aboutUs={aboutUs}
          categories={categories}
        />
      )}
      <nav className="relative container mx-auto flex justify-around items-center">
        <div
          className="hover:cursor-pointer hover:border hover:border-slate-600 rounded border border-transparent"
          onClick={() => setOpenMenu(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>

        <div className="flex-1 max-w-xl md:inline hidden">
          <ul className="flex justify-around">
            <li>
              <Link href="/">
                <a className="uppercase hover:underline">HOME</a>
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category._id}>
                <Link href={`/${category.slug}`}>
                  <a className="uppercase hover:underline">{category.title}</a>
                </Link>
              </li>
            ))}
            <li>
              <Link href={`/${aboutUs.slug.current}`}>
                <a className="uppercase hover:underline">{aboutUs.title}</a>
              </Link>
            </li>
          </ul>
        </div>
        <div ref={ref} className="sm:relative">
          {openSearch ? (
            <div
              className="hover:cursor-pointer"
              onClick={() => setOpenSearch(!openSearch)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 my-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          ) : (
            <div
              className="hover:cursor-pointer"
              onClick={() => setOpenSearch(!openSearch)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 my-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          )}
          {openSearch && <Search setOpenSearch={setOpenSearch} />}
        </div>
      </nav>
    </div>
  );
}
