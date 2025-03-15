import { href, Link, Outlet } from "react-router";
import { ButtonLink } from "~/components/ui/Button";

export default function Layout() {
  return (
    <>
      <header className="sticky top-0 w-full border-b bg-white py-4">
        <div className="mx-auto flex max-w-3xl justify-between">
          <Link to={href("/")}>Julien&apos;s Blog</Link>
          <nav>
            <ul>
              <li>
                <ButtonLink variant="secondary" to={href("/posts/new")}>
                  New Post
                </ButtonLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="mx-auto mt-8 max-w-3xl">
        <Outlet />
      </main>
    </>
  );
}
