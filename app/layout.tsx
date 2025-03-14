import { href, Link, Outlet } from "react-router";
import { ButtonLink } from "./components/Button";

export default function Layout() {
  return (
    <>
      <header className="w-full sticky top-0 py-4 bg-white border-b">
        <div className="max-w-3xl mx-auto flex justify-between">
          <Link to={href("/")}>Julien's Blog</Link>
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
      <main className="mx-auto max-w-3xl mt-8">
        <Outlet />
      </main>
    </>
  );
}
