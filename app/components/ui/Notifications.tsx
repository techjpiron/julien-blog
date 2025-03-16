import {
  Button,
  UNSTABLE_ToastRegion as ToastRegion,
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastQueue as ToastQueue,
  Text,
} from "react-aria-components";

export const toastQueue = new ToastQueue<{ message: string }>();

export function NotificationCenter() {
  return (
    <ToastRegion
      queue={toastQueue}
      className="absolute top-4 right-4 grid grid-cols-1 gap-2"
    >
      {({ toast }) => (
        <Toast
          toast={toast}
          className="z-50 rounded bg-blue-300 px-3 py-2 shadow-xl shadow-blue-300/30"
        >
          <ToastContent className="flex items-center space-x-2">
            <Text slot="description">{toast.content.message}</Text>
            <Button
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white p-1"
              slot="close"
            >
              x
            </Button>
          </ToastContent>
        </Toast>
      )}
    </ToastRegion>
  );
}
