import { Form } from "react-router";
import { Heading } from "react-aria-components";
import { Button } from "~/components/Button";
import { Input, Label, TextArea, TextField } from "~/components/Field";
export function PostForm({
  defaultValue,
}: {
  defaultValue?: { title?: string; body?: string };
}) {
  return (
    <Form method="POST">
      <Heading slot="title">Edit Post</Heading>
      <TextField name="title" defaultValue={defaultValue?.title}>
        <Label>Title</Label>
        <Input />
      </TextField>
      <TextField name="body" defaultValue={defaultValue?.body}>
        <Label>Content</Label>
        <TextArea />
      </TextField>
      <Button variant="primary" type="submit" className="mt-4">
        Save
      </Button>
    </Form>
  );
}
