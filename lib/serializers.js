import Link from "next/link";

import YoutubeComponent from "../components/Post/YoutubeComponent";
import ImageComponent from "../components/Post/ImageComponent";
import GalleryComponent from "../components/Post/Gallery/GalleryComponent";
import ProguctsGalleryComponent from "../components/Post/ProductsGallery/ProductsGallery";
import ProductProConComponent from "../components/Post/ProductProCon/ProductProCon";
import ProductWithFeaturesComponent from "../components/Post/ProductWithFeatures/ProductWithFeatures";
import AmazonBannerComponent from "../components/Post/AmazonBanner/AmazonBanner";
import MiniProdGalleryComponent from "../components/Post/MiniProdGallery/MiniProdGallery";
import TextPlusImageGallery from "../components/Post/AmazonBanner/TextPlusImageGallery";
import AdPlaceholder from "../components/Post/AmazonBanner/AdPlaceholder";
import RichParagraph from "../components/Post/RichParagraph/RichParagraph";

import HtmlTable from "../components/Post/HtmlTable/HtmlTable";

export const serializers = {
  marks: {
    sup: (props) => <sup>{props.children}</sup>,
    sub: (props) => <sub>{props.children}</sub>,
    link: (props) => {
      let url = props.mark.href || "";
      let testStr = "coffeenatedstories.com";
      let isBlank = "";
      if (url.includes(testStr)) {
        isBlank = "";
      } else {
        isBlank = "_blanc";
      }
      return (
        <Link href={props.mark.href}>
          <a target={isBlank} rel="noopener noreferer">
            {props.children}
          </a>
        </Link>
      );
    },
    internalLink: (props) => (
      <Link
        href={{
          pathname: `/[category]/[post]`,
          query: {
            post: props.mark.postSlug,
            category: props.mark.categorySlug,
          },
        }}
      >
        <a>{props.children}</a>
      </Link>
    ),
    internalCategoryLink: (props) => (
      <Link
        href={{
          pathname: `/[category]`,
          query: { category: `${props.mark.categorySlug}` },
        }}
      >
        <a>{props.children}</a>
      </Link>
    ),
    internalRecipeLink: (props) => (
      <Link
        href={{
          pathname: `/recipes/[recipeTagSlug]/[recipe]`,
          query: {
            recipeTagSlug: `${props.mark.recipeTagSlug}`,
            recipe: `${props.mark.recipeSlug}`,
          },
        }}
      >
        <a>{props.children}</a>
      </Link>
    ),
  },
  types: {
    image: ImageComponent,
    youtube: YoutubeComponent,
    gallery: GalleryComponent,
    htmltable: HtmlTable,
    productsGallery: ProguctsGalleryComponent,
    productProCon: ProductProConComponent,
    productFeatures: ProductWithFeaturesComponent,
    amazonBanner: AmazonBannerComponent,
    miniProdGallery: MiniProdGalleryComponent,
    textPlusImageGallery: TextPlusImageGallery,
    adPlaceholder: AdPlaceholder,
    richParagraph: RichParagraph,
  },
};

// key: (props) => (<pre>{JSON.stringify(props, null, 2)}</pre>)
