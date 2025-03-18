import { H1, H2, P } from "~/components/ui/Typography";

export function meta() {
  return [
    { title: "About | Julien's Blog" },
    {
      name: "description",
      content: "Welcome to Julien's Blog. This is part of his portfolio.",
    },
  ];
}
export default function About() {
  return (
    <>
      <H1>About this project</H1>
      <H2>Creator</H2>
      <P>Julien Piron</P>
      <H2>Credits</H2>
      <P>Pictures by Jeremy Bishop from Unsplash</P>
    </>
  );
}
