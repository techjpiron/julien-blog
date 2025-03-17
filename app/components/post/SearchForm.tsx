import { SearchField } from "react-aria-components";
import { Form, useNavigation, useSearchParams, useSubmit } from "react-router";
import { Input } from "~/components/ui/Field";
import { Button } from "~/components/ui/Button";
import { useRef } from "react";

export function SearchForm() {
  const [params] = useSearchParams();
  const query = params.get("q") ?? "";

  const navigation = useNavigation();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");
  const isFirstSearch = query.length == 0;
  console.log({ isFirstSearch });

  const submit = useSubmit();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form
      className="mt-4"
      ref={formRef}
      onChange={(event) =>
        submit(event.currentTarget, { replace: !isFirstSearch })
      }
    >
      <SearchField
        className="flex"
        name="q"
        aria-label="Search posts"
        value={query}
        onClear={() =>
          submit(formRef.current?.target ?? {}, { replace: !isFirstSearch })
        }
        onChange={() =>
          submit(formRef.current?.target ?? {}, { replace: !isFirstSearch })
        }
      >
        <Input placeholder="Search" />
        <span aria-hidden>{searching ? "Searching" : null}</span>
        <Button>X</Button>
      </SearchField>
      <input type="hidden" name="p" value="1" />
    </Form>
  );
}
