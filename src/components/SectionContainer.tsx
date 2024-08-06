import { PropsWithChildren } from "react";

export function SectionContainer({ children }: PropsWithChildren) {
  return <section className="h-[94vh] flex justify-around items-center py-16 text-white max-lg:flex-col">
  {children}
</section>
}