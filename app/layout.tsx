import { useEffect } from "react";
import { data, href, Outlet } from "react-router";
import type { Route } from "./+types/layout";
import { LogoutForm } from "./routes/logout";
import { commitSession, getSession } from "~/session.server";
import { NotificationCenter, toastQueue } from "~/components/ui/Notifications";
import { Link } from "~/components/ui/Typography";

export default function Layout({ loaderData }: Route.ComponentProps) {
  const { notifications, user } = loaderData;

  useEffect(() => {
    notifications?.forEach(({ message, timeout }) =>
      toastQueue.add({ message }, { timeout }),
    );
  }, [notifications]);

  return (
    <>
      <header className="fixed top-0 z-20 w-full bg-white/90 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex max-w-3/4 justify-between px-4 py-4 items-center">
          <Link
            to={href("/")}
            className="font-header text-gray-900 no-underline"
          >
            Julien&apos;s Blog
          </Link>
          <nav>
            <ul className="flex space-x-2 items-baseline">
              <li>
                <Link to={href("/posts/new")}>New Post</Link>
              </li>
              <li>
                <Link to={href("/about")}>About</Link>
              </li>
              <li>
                {user ? (
                  <LogoutForm />
                ) : (
                  <Link to={href("/login")}>Sign in</Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="mx-auto mt-24 max-w-3/4 px-4">
        <Outlet />
      </main>
      <NotificationCenter />
    </>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const notifications = session.get("notifications");
  const user = session.get("user");

  return data(
    { notifications, user },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
}
