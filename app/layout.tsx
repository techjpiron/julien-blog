import { data, href, Link, Outlet } from "react-router";
import { ButtonLink } from "~/components/ui/Button";
import { NotificationCenter, toastQueue } from "./components/ui/Notifications";
import type { Route } from "./+types/layout";
import { commitSession, getSession } from "./session.server";
import { useEffect } from "react";

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
      <NotificationCenter />
    </>
  );
}
