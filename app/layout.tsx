import { href, Link, Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <header>
        <Link to={href("/")}>Julien's Blog</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
