import { Form, href, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/post.edit";
import { parseWithZod } from "@conform-to/zod";
import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
} from "@conform-to/react";
import { PostSchema, UpdatePostSchema } from "~/schemas";
import { FieldError, Heading } from "react-aria-components";
import { Button } from "~/components/ui/Button";
import { Input, Label, TextArea, TextField } from "~/components/ui/Field";
import { Dialog } from "~/components/ui/Dialog";
import { Modal } from "~/components/ui/Modal";

export async function loader({ params }: Route.LoaderArgs) {
  const { postId } = params;

  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
  )
    .then((response) => response.json())
    .then(PostSchema.parse);

  return { post };
}

export async function action({ request, params }: Route.ActionArgs) {
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

  return redirect(href("/posts/:postId", { postId: String(params.postId) }));
}

export default function EditPost({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { post } = loaderData;
  const navigation = useNavigation();

  const [form, fields] = useForm({
    lastResult: actionData,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: UpdatePostSchema }),
    shouldValidate: "onInput",
    shouldRevalidate: "onInput",
    defaultValue: post,
  });

  return (
    <Modal isOpen>
      <Dialog>
        <Form method="POST" {...getFormProps(form)}>
          <pre>{JSON.stringify(navigation.formAction)}</pre>
          <Heading slot="title">Edit Post</Heading>
          <input {...getInputProps(fields.id, { type: "hidden" })} />
          <TextField
            {...getInputProps(fields.title, { type: "text" })}
            isInvalid={!fields.title.valid}
          >
            <Label>Title</Label>
            <Input />
            <FieldError>{fields.title.errors?.[0]}</FieldError>
          </TextField>
          <TextField
            {...getTextareaProps(fields.body)}
            isInvalid={!fields.body.valid}
          >
            <Label>Content</Label>
            <TextArea />
            <FieldError>{fields.body.errors?.[0]}</FieldError>
          </TextField>
          <Button variant="primary" type="submit" className="mt-4">
            {navigation.formAction?.match(`/posts/${post.id}/edit`)
              ? "Updating..."
              : "Update"}
          </Button>
        </Form>
      </Dialog>
    </Modal>
  );
}
