import { PropsWithChildren } from "react";

export function SectionContainer({ children, id }: PropsWithChildren & { id?: string }) {
  return <section id={id} className="flex justify-around items-center py-16 text-white max-lg:flex-col">
  {children}
 </section>
}