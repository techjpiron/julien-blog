import { useFormAction, useNavigation } from "react-router";

export function useIsSubmitting() {
  const navigation = useNavigation();
  const formAction = useFormAction();

  return navigation.formAction === formAction;
}
