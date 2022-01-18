import MainContent from "./MainContent";
import AsideContent from "./AsideContent";

export default function Site({
  latestPosts,
  categories,
  aboutUs,
  olderFeaturedPosts,
  pages = 0,
  currentPage = 0,
}) {
  const latestPost = latestPosts[0];
  return (
    <section className="container grid grid-cols-2 auto-rows-auto lg:grid-cols-3 gap-4 xl:w-3/4 max-w-screen-xl md:px-5 mx-auto">
      <MainContent
        pages={pages}
        currentPage={currentPage}
        latestPost={latestPost}
        latestPosts={latestPosts}
      />
      <AsideContent
        aboutUs={aboutUs}
        olderFeaturedPosts={olderFeaturedPosts}
        categories={categories}
      />
    </section>
  );
}
