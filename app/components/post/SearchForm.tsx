import { SearchField } from "react-aria-components";
import { Form, useSearchParams, useSubmit } from "react-router";
import { Input } from "~/components/ui/Field";
import { Button } from "~/components/ui/Button";
import { useRef } from "react";

export function SearchForm() {
  const [params] = useSearchParams();
  const query = params.get("q") ?? "";

  const submit = useSubmit();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form
      className="mt-4"
      ref={formRef}
      onChange={(event) => submit(event.currentTarget)}
    >
      <SearchField
        className="flex"
        name="q"
        aria-label="Search posts"
        defaultValue={query}
        onClear={() => submit(formRef.current?.target ?? {})}
        onChange={() => submit(formRef.current?.target ?? {})}
      >
        <Input placeholder="Search" />
        <Button>X</Button>
      </SearchField>
      <input type="hidden" name="p" value="1" />
    </Form>
  );
}
