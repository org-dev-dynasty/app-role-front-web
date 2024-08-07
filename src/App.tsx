import { useState } from "react";
import { Contact } from "./components/Contact";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import { Section2 } from "./components/Section2";
import { SectionContainer } from "./components/SectionContainer";
import { Overlay } from "./components/Overlay";


export function App() {
  const [showMenuItems, setShowMenuItems] = useState(false);

  const handleMenuClick = () => {
    setShowMenuItems(!showMenuItems);
  }

  return (
    <>
      <Navbar onClickMenuResponsible={handleMenuClick} openMenu={showMenuItems} />

      <main className="bg-gradient-to-r from-dark-purple via-purple via-70% to-light-purple font-nunito">
        {/* SECTION 1 - 3D */}
        <SectionContainer>
          <Header />
        </SectionContainer>
        <Section2 />
        <SectionContainer>
          <Contact />
        </SectionContainer>
        {showMenuItems && <Overlay onClick={handleMenuClick} />}
      </main>
    </>
  )
}