import { Contact } from "./components/Contact";
import { Header } from "./components/Header";
import { SectionContainer } from "./components/SectionContainer";


export function App() {
  return (
    <>
      <main>
        {/* SECTION 1 - 3D */}
        <SectionContainer>
          <Header />
        </SectionContainer>
        <SectionContainer>
          <Contact />
        </SectionContainer>
      </main>
    </>
  )
}