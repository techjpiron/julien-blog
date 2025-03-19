import { useForm, getFormProps } from "@conform-to/react";
import { href, redirect, Form, Link, useNavigate } from "react-router";
import type { Route } from "./+types/post.new";
import { parseWithZod } from "@conform-to/zod";
import { requireUser } from "~/authentification.server";
import { useIsSubmitting } from "~/hooks/useIsSubmitting";
import { InsertPostSchema, PostSchema } from "~/schemas";
import { commitSession, getSession } from "~/session.server";
import { Button } from "~/components/ui/Button";
import { Dialog } from "~/components/ui/Dialog";
import { Input, TextArea, TextField } from "~/components/ui/Form";
import { Modal, ModalOverlay } from "~/components/ui/Modal";
import { Heading } from "~/components/ui/Typography";

export default function NewPost({ actionData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const isSaving = useIsSubmitting();

  const [form, { title, body }] = useForm({
    lastResult: actionData,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: InsertPostSchema }),
    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",
  });

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
          <Form method="POST" {...getFormProps(form)}>
            <Heading slot="title">Create Post</Heading>
            <TextField label="Title" field={title} autoComplete="off">
              <Input />
            </TextField>
            <TextField label="Content" field={body}>
              <TextArea />
            </TextField>
            <div className="mt-4 flex items-baseline gap-2">
              <Link to={".."} onClick={() => navigate(-1)}>
                Cancel
              </Link>
              <Button type="submit">{isSaving ? "Saving..." : "Save"}</Button>
            </div>
          </Form>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}

export function meta() {
  return [
    { title: "New Post | Julien's Blog" },
    {
      name: "robots",
      content: "noindex",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  await requireUser(request, "You need to be signed in to create posts.");
  return {};
}

export async function action({ request }: Route.ActionArgs) {
  await requireUser(request, "You need to be signed in to create posts.");
  const session = await getSession(request.headers.get("Cookie"));

  const formData = await request.formData();

  const submission = parseWithZod(formData, { schema: InsertPostSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const newPost = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(submission.value),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then(PostSchema.parse);

  session.flash("notifications", [
    { message: "Your post was successfully created!", timeout: 5_000 },
  ]);

  return redirect(href("/posts/:postId", { postId: String(newPost.id) }), {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
