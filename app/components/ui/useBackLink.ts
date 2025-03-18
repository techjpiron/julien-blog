import { useLocation } from "react-router";

export function getCurrentURL() {
  const location = useLocation();

  return `${location.pathname}${location.search}${location.hash}`;
}

export function useBackLink() {
  const location = useLocation();
  const back = location?.state?.back;

  if (typeof back === "string") {
    return back;
  }

  return "/";
}
