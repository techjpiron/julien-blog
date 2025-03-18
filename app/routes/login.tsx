import { getFormProps, useForm } from "@conform-to/react";
import { Form, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/login";
import { parseWithZod } from "@conform-to/zod";
import { requireAnonymous } from "~/authentification.server";
import { env } from "~/env.server";
import { UserSchema } from "~/schemas";
import { commitSession, getSession } from "~/session.server";
import { Button } from "~/components/ui/Button";
import { Dialog } from "~/components/ui/Dialog";
import { Input, TextField } from "~/components/ui/Form";
import { Modal, ModalOverlay } from "~/components/ui/Modal";
import { Heading } from "~/components/ui/Typography";

export default function Login({ actionData }: Route.ComponentProps) {
  const [form, fields] = useForm({
    lastResult: actionData,
    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: UserSchema }),
  });
  const navigation = useNavigation();
  const isLoggingIn = navigation.formAction === "/login";

  return (
    <ModalOverlay isOpen initial={{ opacity: 0.8 }} animate={{ opacity: 1 }}>
      <Modal
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, stiffness: 30 }}
      >
        <Dialog>
          <Form method="post" {...getFormProps(form)}>
            <Heading slot="title">Sign in</Heading>
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
  return {};
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: UserSchema.refine(
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

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
