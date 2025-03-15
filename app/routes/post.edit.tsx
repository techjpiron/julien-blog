import { Form, href, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/post.edit";
import { PostSchema } from "~/schemas";
import { Heading } from "react-aria-components";
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

  const title = formData.get("title");
  const body = formData.get("body");
  const data = PostSchema.partial().parse({
    title,
    body,
    id: params.postId,
  });

  await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return redirect(href("/posts/:postId", { postId: String(params.postId) }));
}

export default function EditPost({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;
  const navigation = useNavigation();

  return (
    <Modal isOpen>
      <Dialog>
        <Form method="POST">
          <pre>{JSON.stringify(navigation.formAction)}</pre>
          <Heading slot="title">Edit Post</Heading>
          <TextField name="title" defaultValue={post.title}>
            <Label>Title</Label>
            <Input />
          </TextField>
          <TextField name="body" defaultValue={post.body}>
            <Label>Content</Label>
            <TextArea />
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
