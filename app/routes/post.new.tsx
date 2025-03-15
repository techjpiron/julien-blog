import { href, redirect, Form, useNavigation } from "react-router";
import type { Route } from "./+types/post.new";
import { PostSchema } from "~/schemas";
import { Modal } from "~/components/ui/Modal";
import { Dialog } from "~/components/ui/Dialog";
import { Heading } from "react-aria-components";
import { Button } from "~/components/ui/Button";
import { Input, Label, TextArea, TextField } from "~/components/ui/Field";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const title = formData.get("title");
  const body = formData.get("body");
  const data = PostSchema.omit({ id: true }).parse({
    title,
    body,
    userId: 0,
  });

  const newPost = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then(PostSchema.parse);

  return redirect(href("/posts/:postId", { postId: String(newPost.id) }));
}

export default function NewPost() {
  const navigation = useNavigation();

  return (
    <Modal isOpen>
      <Dialog>
        <Form method="POST">
          <Heading slot="title">Edit Post</Heading>
          <TextField name="title">
            <Label>Title</Label>
            <Input />
          </TextField>
          <TextField name="body">
            <Label>Content</Label>
            <TextArea />
          </TextField>
          <Button variant="primary" type="submit" className="mt-4">
            {navigation.formAction === "/posts/new" ? "Saving..." : "Save"}
          </Button>
        </Form>
      </Dialog>
    </Modal>
  );
}
