import Links from "./Links";
import Banner from "./Banner";

export default function Navbar({ categories, aboutUs, logo }) {
  return (
    <header>
      <Links categories={categories} aboutUs={aboutUs} />
      <div className="w-full h-9"></div>
      <Banner logo={logo} />
    </header>
  );
}
