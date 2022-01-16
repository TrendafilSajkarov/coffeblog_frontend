import Links from "./Links";
import Banner from "./Banner";

export default function Navbar({ categories, aboutUs, logo }) {
  return (
    <header>
      <Links categories={categories} aboutUs={aboutUs} />
      <Banner logo={logo} />
    </header>
  );
}
