import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Form, href, redirect, useNavigate } from "react-router";
import type { Route } from "./+types/post.edit";
import { parseWithZod } from "@conform-to/zod";
import { requireUser } from "~/authentification.server";
import { useIsSubmitting } from "~/hooks/useIsSubmitting";
import { PostSchema, UpdatePostSchema } from "~/schemas";
import { commitSession, getSession } from "~/session.server";
import { Button } from "~/components/ui/Button";
import { Dialog } from "~/components/ui/Dialog";
import { Input, TextArea, TextField } from "~/components/ui/Form";
import { Modal, ModalOverlay } from "~/components/ui/Modal";
import { Link, Heading } from "~/components/ui/Typography";

export default function EditPost({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { post } = loaderData;

  const navigate = useNavigate();
  const isUpdating = useIsSubmitting();

  const [form, fields] = useForm({
    lastResult: actionData,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: UpdatePostSchema }),
    shouldValidate: "onInput",
    shouldRevalidate: "onInput",
    defaultValue: post,
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
            <Heading slot="title">Edit Post</Heading>
            <input {...getInputProps(fields.id, { type: "hidden" })} />
            <TextField label="Title" field={fields.title}>
              <Input />
            </TextField>
            <TextField label="Content" field={fields.body}>
              <TextArea />
            </TextField>
            <div className="mt-4 flex items-baseline gap-2">
              <Link to={".."} onClick={() => navigate(-1)}>
                Cancel
              </Link>
              <Button type="submit">
                {isUpdating ? "Updating..." : "Update"}
              </Button>
            </div>
          </Form>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}

export function meta() {
  return [
    {
      name: "robots",
      content: "noindex",
    },
  ];
}

export async function loader({ params, request }: Route.LoaderArgs) {
  await requireUser(request, "You need to be signed in to edit this post.");
  const { postId } = params;

  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
  )
    .then((response) => response.json())
    .then(PostSchema.parse);

  return { post };
}

export async function action({ request, params }: Route.ActionArgs) {
  await requireUser(request, "You need to be signed in to edit this post.");
  const session = await getSession(request.headers.get("Cookie"));

  const formData = await request.formData();

  const submission = parseWithZod(formData, { schema: UpdatePostSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`, {
    method: "PATCH",
    body: JSON.stringify(submission.value),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  session.flash("notifications", [
    {
      message: "Your post was successfully modified!",
      timeout: 5000,
    },
  ]);

  return redirect(href("/posts/:postId", { postId: String(params.postId) }), {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
