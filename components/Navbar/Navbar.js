import Links from "./Links";
import Banner from "./Banner";

export default function Navbar({
  categories,
  aboutUs,
  logo,
  recipeNavbar,
  isRecipeNavbarActive = false,
}) {
  return (
    <header>
      <Links
        categories={categories}
        aboutUs={aboutUs}
        recipeNavbar={recipeNavbar}
        isRecipeNavbarActive={isRecipeNavbarActive}
      />
      <div className="w-full h-20"></div>
      <Banner logo={logo} />
    </header>
  );
}
