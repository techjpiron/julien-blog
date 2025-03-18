import { useEffect } from "react";
import type { Route } from "./+types/layout";
import { data, href, Outlet } from "react-router";
import { commitSession, getSession } from "~/session.server";
import { NotificationCenter, toastQueue } from "~/components/ui/Notifications";
import { Link } from "~/components/ui/Typography";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const notifications = session.get("notifications");

  return data(
    { notifications },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  const { notifications } = loaderData;

  useEffect(() => {
    notifications?.forEach(({ message, timeout }) =>
      toastQueue.add({ message }, { timeout }),
    );
  }, [notifications]);

  return (
    <>
      <header className="sticky top-0 z-20 w-full bg-white/90 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex max-w-3/4 justify-between px-4 py-4">
          <Link
            to={href("/")}
            className="font-header text-gray-900 no-underline"
          >
            Julien&apos;s Blog
          </Link>
          <nav>
            <ul className="flex space-x-2">
              <li>
                <Link to={href("/posts/new")}>New Post</Link>
              </li>
              <li>
                <Link to={href("/about")}>About</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="mx-auto mt-8 max-w-3/4 px-4">
        <Outlet />
      </main>
      <NotificationCenter />
    </>
  );
}
