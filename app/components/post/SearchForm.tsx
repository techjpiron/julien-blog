import { useRef } from "react";
import { SearchField, Button } from "react-aria-components";
import { Form, useNavigation, useSearchParams, useSubmit } from "react-router";
import { useSpinDelay } from "spin-delay";
import { Input } from "~/components/ui/Form";

export function SearchForm() {
  const [params] = useSearchParams();
  const query = params.get("q") ?? "";

  const navigation = useNavigation();
  const showSpinner = useSpinDelay(
    navigation.location !== undefined &&
      new URLSearchParams(navigation.location.search).has("q"),
    { delay: 200, minDuration: 500 },
  );
  const isFirstSearch = query.length == 0;

  const submit = useSubmit();
  const formRef = useRef<HTMLFormElement>(null);

  useRef(() => {
    const searchField = document.getElementById("search-post-input");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = query;
    }
  });

  return (
    <Form
      className="mt-16 mb-8"
      ref={formRef}
      onChange={(event) =>
        submit(event.currentTarget, {
          replace: !isFirstSearch,
          preventScrollReset: true,
        })
      }
    >
      <SearchField
        className="relative flex max-w-lg items-center"
        id="search-post-input"
        name="q"
        aria-label="Search posts"
        autoComplete="off"
        defaultValue={query}
        onClear={() =>
          submit(formRef.current?.target ?? {}, {
            replace: !isFirstSearch,
            preventScrollReset: true,
          })
        }
        onChange={() =>
          submit(formRef.current?.target ?? {}, {
            replace: !isFirstSearch,
            preventScrollReset: true,
          })
        }
      >
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`size-4 animate-spin fill-none stroke-gray-500 text-gray-500 ${showSpinner ? "" : "invisible"}`}
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
        <Input placeholder="Search posts" className="p-2.5 ps-10" />
        <Button className="absolute inset-y-0 end-0 flex items-center pe-3">
          &times;
        </Button>
      </SearchField>
      <input type="hidden" name="p" value="1" />
    </Form>
  );
}
