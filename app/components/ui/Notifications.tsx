import { motion } from "motion/react";
import {
  Button,
  UNSTABLE_ToastRegion as ToastRegion,
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastQueue as ToastQueue,
  Text,
} from "react-aria-components";
import { focusRing } from "./FocusRing";

export const toastQueue = new ToastQueue<{ message: string }>();

const AnimatedToast = motion.create(Toast);

export function NotificationCenter() {
  return (
    <ToastRegion
      queue={toastQueue}
      className={focusRing({
        className: "absolute top-8 right-4 z-50 grid grid-cols-1 gap-2",
      })}
    >
      {({ toast }) => (
        <AnimatedToast
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          key={toast.key}
          toast={toast}
          className={focusRing({
            className:
              "flex w-full max-w-xs items-center rounded-lg bg-gray-800 p-4 text-gray-400 shadow-sm",
          })}
        >
          <ToastContent className="flex w-full items-center">
            <Text slot="description">{toast.content.message}</Text>
            <Button
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800 p-1.5 text-xl text-gray-500 hover:bg-gray-700 hover:text-white"
              slot="close"
            >
              &times;
            </Button>
          </ToastContent>
        </AnimatedToast>
      )}
    </ToastRegion>
  );
}
