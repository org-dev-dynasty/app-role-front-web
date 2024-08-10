import { PropsWithChildren } from "react";

export function NavbarItem({ children, className, onClick }: PropsWithChildren & { className?: string, onClick?: () => void }) {
  return <h1 onClick={onClick} className={`flex items-center justify-center font-light text-white cursor-pointer transform ${className} hover:scale-110 ease-in-out duration-300`}>
    {children}
  </h1>
}