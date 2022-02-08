export default function Search() {
  return (
    <div className="relative bg-gray-50 p-4">
      <div className="container xl:max-w-7xl mx-auto flex items-center justify-center md:justify-end">
        <div className="relative w-72 text-gray-600 py-2">
          <form>
            <input
              type="search"
              name="search"
              id="search"
              className="bg-white h-10 px-5 rounded-full text-sm focus:outline-none w-72"
              placeholder="Search Posts..."
            />
            {/* <div className="absolute top-0 right-0 text-black mt-3 mr-4">
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
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}
