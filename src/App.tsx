import { Contact } from "./components/Contact";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import { Section2 } from "./components/Section2.tsx";
import { SectionContainer } from "./components/SectionContainer";


export function App() {
  return (
    <>
      <main className="bg-gradient-to-r from-dark-purple via-purple via-70% to-light-purple font-nunito">
        <Navbar />
        {/* SECTION 1 - 3D */}
        <SectionContainer>
          <Header />
        </SectionContainer>
        <Section2 />
        <SectionContainer>
          <Contact />
        </SectionContainer> 
      </main>
    </>
  )
}