import { H1, H2, Link, P } from "~/components/ui/Typography";

export default function About() {
  return (
    <>
      <H1>About this project</H1>
      <P>This is a demo blog to display my frontend skills.</P>
      <H2>Creator</H2>
      <P>Julien Piron</P>
      <H2>Credits</H2>
      <P>
        Pictures from{" "}
        <Link
          className="mx-0 px-0"
          to="https://unsplash.com/fr/@anniespratt?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          target="_blank"
          rel="noopener noreferrer"
        >
          Annie Spratt
        </Link>{" "}
        on{" "}
        <Link
          className="mx-0 px-0"
          to="https://unsplash.com/fr/photos/plante-verte-sur-pot-floral-bleu-et-jaune-SPzrrv3A3_s?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          target="_blank"
          rel="noopener noreferrer"
        >
          Unsplash
        </Link>
      </P>
    </>
  );
}

export function meta() {
  return [
    { title: "About | Julien's Blog" },
    {
      name: "description",
      content: "Welcome to Julien's Blog. This is part of his portfolio.",
    },
  ];
}
