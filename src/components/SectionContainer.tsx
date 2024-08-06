import { PropsWithChildren } from "react";

export function SectionContainer({ children }: PropsWithChildren) {
  return <section className="min-h-screen flex justify-around items-center py-16 text-white bg-gradient-to-r from-purple-950 to-purple-600 max-lg:flex-col">
  {children}
</section>
}