import { href, redirect, Form, useNavigation } from "react-router";
import type { Route } from "./+types/post.new";
import { InsertPostSchema, PostSchema } from "~/schemas";
import { Modal } from "~/components/ui/Modal";
import { Dialog } from "~/components/ui/Dialog";
import { Button } from "~/components/ui/Button";
import { Input, TextArea, TextField } from "~/components/ui/Form";
import { parseWithZod } from "@conform-to/zod";
import { useForm, getFormProps } from "@conform-to/react";
import { commitSession, getSession } from "~/session.server";
import { Heading } from "~/components/ui/Typography";

export function meta() {
  return [
    { title: "New Post | Julien's Blog" },
    {
      name: "robots",
      content: "noindex",
    },
  ];
}

export async function action({ request }: Route.ActionArgs) {
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

export default function NewPost({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const [form, { title, body }] = useForm({
    lastResult: actionData,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: InsertPostSchema }),
    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",
  });

  return (
    <Modal isOpen>
      <Dialog>
        <Form method="POST" {...getFormProps(form)}>
          <Heading slot="title">Create Post</Heading>
          <TextField label="Title" field={title} autoComplete="off">
            <Input />
          </TextField>
          <TextField label="Content" field={body}>
            <TextArea />
          </TextField>
          <Button type="submit" className="mt-4">
            {navigation.formAction === "/posts/new" ? "Saving..." : "Save"}
          </Button>
        </Form>
      </Dialog>
    </Modal>
  );
}
