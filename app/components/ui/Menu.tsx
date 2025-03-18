import {
  Menu as RACMenu,
  MenuItem as RACMenuItem,
  type MenuItemProps,
  type MenuProps,
} from "react-aria-components";

export { MenuTrigger, Popover } from "react-aria-components";

export function Menu<T extends object>(props: Omit<MenuProps<T>, "className">) {
  return (
    <RACMenu
      className="p2 min-w-36 outline-none bg-white shadow-xl border border-gray-300/25 rounded-md"
      {...props}
    />
  );
}

export function MenuItem(props: Omit<MenuItemProps, "className">) {
  return (
    <RACMenuItem
      className="m-2 px-2 py-2 rounded outline-none cursor-default relative grid grid-cols-1 gap-2 focus:bg-gray-200"
      {...props}
    />
  );
}
