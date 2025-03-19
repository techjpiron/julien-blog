import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Form, redirect, useNavigate } from "react-router";
import type { Route } from "./+types/login";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import { requireAnonymous } from "~/authentification.server";
import { env } from "~/env.server";
import { useIsSubmitting } from "~/hooks/useIsSubmitting";
import { UserSchema } from "~/schemas";
import { commitSession, getSession } from "~/session.server";
import { Button } from "~/components/ui/Button";
import { Dialog } from "~/components/ui/Dialog";
import { Input, TextField } from "~/components/ui/Form";
import { Modal, ModalOverlay } from "~/components/ui/Modal";
import { Heading, P } from "~/components/ui/Typography";

const LoginSchema = UserSchema.extend({
  redirectTo: z.string(),
});

export default function Login({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const { message, redirectTo } = loaderData;

  const [form, fields] = useForm({
    lastResult: actionData,
    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: LoginSchema }),
    defaultValue: {
      redirectTo: redirectTo ?? "/",
    },
  });

  const navigate = useNavigate();
  const isLoggingIn = useIsSubmitting();

  return (
    <ModalOverlay
      isDismissable
      defaultOpen
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      onOpenChange={(open) => {
        if (!open) {
          navigate(-1);
        }
      }}
    >
      <Modal
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, stiffness: 30 }}
      >
        <Dialog>
          <Form method="post" {...getFormProps(form)}>
            <Heading slot="title">Sign in</Heading>
            {message ? <P>{message}</P> : null}
            <input {...getInputProps(fields.redirectTo, { type: "hidden" })} />
            <TextField label="Username" field={fields.username}>
              <Input />
            </TextField>
            <TextField label="Password" field={fields.password} type="password">
              <Input />
            </TextField>
            <Button type="submit" className="mt-4">
              {isLoggingIn ? "Signing in..." : "Sign in"}
            </Button>
          </Form>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  await requireAnonymous(request);
  const searchParams = new URL(request.url).searchParams;
  const redirectTo = searchParams.get("redirectTo");
  const message = searchParams.get("message");

  return { redirectTo, message };
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: LoginSchema.refine(
      ({ password }) => {
        // Only for demo purposes, not safe in production
        return password === env.USER_PASSWORD;
      },
      { message: "Invalid credentials", path: ["username"] },
    ),
  });

  if (submission.status !== "success") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return submission.reply();
  }

  session.set("user", { username: submission.value.username });
  session.flash("notifications", [
    {
      message: "You've signed in",
      timeout: 3000,
    },
  ]);

  return redirect(submission.value.redirectTo ?? "/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
