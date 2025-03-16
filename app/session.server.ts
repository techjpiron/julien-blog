import { createCookieSessionStorage } from "react-router";

type SessionData = never;
type SessionFlashData = {
  notifications: Array<{ message: string; timeout: number }>;
};

export const { commitSession, getSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    },
  });
