import Link from "next/link";

export default function Pagination({
  pages,
  currentPage,
  category = "/recipes",
  baseURL,
}) {
  return (
    // <!-- This example requires Tailwind CSS v2.0+ -->
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <Link
          href={`${
            currentPage === 1
              ? `${baseURL}/`
              : `/${baseURL + "/"}page/${currentPage - 1}`
          }`}
        >
          <a
            className={`${
              currentPage === 0 ? "invisible" : ""
            } relative inline-flex items-center px-4 py-2 border-2 border-yellow-600 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-50 hover:text-gray-700`}
          >
            Previous
          </a>
        </Link>

        {currentPage !== 0 ? (
          <span
            aria-current="page"
            className="z-10 bg-yellow-600 border-yellow-600 text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"
          >
            {currentPage}
          </span>
        ) : (
          <span
            aria-current="page"
            className="z-10 bg-yellow-600 border-yellow-600 text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"
          >
            Latest Recipes
          </span>
        )}

        <Link href={`${baseURL}/page/${currentPage + 1}`}>
          <a
            className={`${
              currentPage === pages ? "invisible" : ""
            } ml-3 relative inline-flex items-center px-4 py-2 border-2 border-yellow-600 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-50 hover:text-gray-700`}
          >
            Next
          </a>
        </Link>
      </div>

      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <Link
              href={`${
                currentPage === 1
                  ? `${baseURL}/`
                  : `${baseURL}/page/${currentPage - 1}`
              }`}
            >
              <a
                className={`${
                  currentPage === 0 ? "hidden" : ""
                } relative inline-flex items-center px-2 py-2 border-2 border-r border-yellow-600 bg-yellow-50 text-sm font-medium text-gray-700 hover:bg-yellow-600 hover:text-white`}
              >
                <span className="sr-only">Previous</span>
                {/* <!-- Heroicon name: solid/chevron-left --> */}
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </Link>
            {/* <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" --> */}

            {currentPage === 0 ? (
              <span
                aria-current="page"
                className="z-10 bg-yellow-600 border-yellow-600 text-white relative inline-flex items-center px-4 py-2 border-x border-y-2 text-sm font-medium"
              >
                Latest Recipes
              </span>
            ) : (
              <Link href={`${baseURL}/`}>
                <a>
                  <span
                    aria-current="page"
                    className="bg-yellow-50 border-yellow-600 text-gray-700 hover:bg-yellow-600 hover:text-white relative inline-flex items-center px-4 py-2 border-x border-y-2 text-sm font-medium"
                  >
                    Latest Recipes
                  </span>
                </a>
              </Link>
            )}

            {currentPage - 1 !== 0 && currentPage !== 0 && (
              <Link href={`${baseURL}/page/${currentPage - 1}`}>
                <a
                  aria-current="page"
                  className="bg-yellow-50 border-yellow-600 text-gray-700 hover:bg-yellow-600 hover:text-white relative inline-flex items-center px-4 py-2 border-x border-y-2 text-sm font-medium"
                >
                  {currentPage - 1}
                </a>
              </Link>
            )}

            {currentPage !== 0 && (
              <span
                aria-current="page"
                className="z-10 bg-yellow-600 border-yellow-600 text-white relative inline-flex items-center px-4 py-2 border-x border-y-2 text-sm font-medium"
              >
                {currentPage}
              </span>
            )}

            {currentPage !== pages && (
              <Link href={`${baseURL}/page/${currentPage + 1}`}>
                <a
                  aria-current="page"
                  className="bg-yellow-50 border-yellow-600 text-gray-700 hover:bg-yellow-600 hover:text-yellow-50 relative inline-flex items-center px-4 py-2 border-x border-y-2 text-sm font-medium"
                >
                  {currentPage + 1}
                </a>
              </Link>
            )}

            {/* {currentPage === 0 && (
              <Link href={`/page/2`}>
                <a
                  aria-current="page"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  2
                </a>
              </Link>
            )} */}

            {currentPage + 1 !== pages && currentPage !== pages && (
              <span className="relative inline-flex items-center px-4 py-2 border-x border-y-2 border-yellow-600 bg-yellow-50 text-sm font-medium text-gray-700">
                ...
              </span>
            )}

            {currentPage + 1 !== pages && currentPage !== pages && (
              <Link href={`${baseURL}/page/${pages}`}>
                <a className="bg-yellow-50 border-yellow-600 text-gray-700 hover:bg-yellow-600 hover:text-white relative inline-flex items-center px-4 py-2 border-x border-y-2 text-sm font-medium">
                  {pages}
                </a>
              </Link>
            )}

            <Link href={`${baseURL}/page/${currentPage + 1}`}>
              <a
                className={`${
                  currentPage === pages ? "hidden" : ""
                } relative inline-flex items-center px-2 py-2 border-2 border-l border-yellow-600 bg-yellow-50 text-sm font-medium text-gray-700 hover:bg-yellow-600 hover:text-white`}
              >
                <span className="sr-only">Next</span>
                {/* <!-- Heroicon name: solid/chevron-right --> */}
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
