import { useEffect } from "react";
import { data, href, Outlet } from "react-router";
import type { Route } from "./+types/layout";
import { Button } from "./components/ui/Button";
import { getCurrentURL } from "./components/ui/useBackLink";
import { commitSession, getSession } from "~/session.server";
import { MenuItem, MenuTrigger, Popover, Menu } from "~/components/ui/Menu";
import { NotificationCenter, toastQueue } from "~/components/ui/Notifications";
import { Link } from "~/components/ui/Typography";

export default function Layout({ loaderData }: Route.ComponentProps) {
  const { notifications, user } = loaderData;
  const currentURL = getCurrentURL();

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
            <MenuTrigger>
              <Button aria-label="Menu">☰</Button>
              <Popover>
                <Menu>
                  <MenuItem
                    href={href("/posts/new")}
                    routerOptions={{
                      state: {
                        back: currentURL,
                      },
                    }}
                  >
                    New Post
                  </MenuItem>
                  <MenuItem href={href("/about")}>About</MenuItem>
                  {user ? (
                    <MenuItem
                      href={href("/logout")}
                      routerOptions={{
                        state: {
                          back: currentURL,
                        },
                      }}
                    >
                      Sign out
                    </MenuItem>
                  ) : (
                    <MenuItem
                      href={href("/login")}
                      routerOptions={{
                        state: {
                          back: currentURL,
                        },
                      }}
                    >
                      Sign in
                    </MenuItem>
                  )}
                </Menu>
              </Popover>
            </MenuTrigger>
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
