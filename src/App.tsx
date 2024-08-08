import { useState } from "react";
import { Contact } from "./components/Contact";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import { Section2 } from "./components/Section2.tsx";
import { SectionContainer } from "./components/SectionContainer";
import { Overlay } from "./components/Overlay";
import {Section4} from "./components/Section4.tsx";
import {Section3} from "./components/Section3.tsx";
import {Popup} from "./components/PopUp.tsx";


export function App() {
  const [showMenuItems, setShowMenuItems] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleMenuClick = () => {
    setShowMenuItems(!showMenuItems);
  }

  return (
    <>
      <Navbar onClickMenuResponsible={handleMenuClick} openMenu={showMenuItems} openPopUp={() => setIsPopupOpen(true)}/>
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}/>


      <main className="bg-gradient-to-r from-dark-purple via-purple via-70% to-light-purple font-nunito">
        {/* SECTION 1 - 3D */}
        <SectionContainer>
          <Header />
        </SectionContainer>
        <Section2 />
        <Section3/>
        <Section4 />
        <SectionContainer>
          <Contact />
        </SectionContainer>
        {showMenuItems && <Overlay onClick={handleMenuClick} />}
      </main>
    </>
  )
}