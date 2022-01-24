import Link from "next/link";

export const serializers = {
  marks: {
    sup: (props) => <sup>{props.children}</sup>,
    sub: (props) => <sub>{props.children}</sub>,
    link: (props) => (
      <Link href={"https://google.com"}>
        <a target="_blanc" rel="noopener noreferer">
          {props.children}
        </a>
      </Link>
    ),
    internalLink: (props) => (
      <Link href={"https://google.com"}>
        <a rel="noopener noreferer">{props.children}</a>
      </Link>
    ),
  },
};
