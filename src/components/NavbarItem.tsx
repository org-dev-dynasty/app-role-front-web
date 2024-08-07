import { PropsWithChildren } from "react";

export function NavbarItem({ children, className }: PropsWithChildren & { className?: string }) {
  return <h1 className={`text-lg font-light text-white cursor-pointer transform ${className} hover:scale-110 ease-in-out duration-300`}>
    {children}
  </h1>
}