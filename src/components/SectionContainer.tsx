import { PropsWithChildren } from "react";

export function SectionContainer({ children }: PropsWithChildren) {
  return <section className="min-h-screen flex justify-around items-center py-16 text-white max-lg:flex-col">
  {children}
</section>
}