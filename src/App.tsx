import { useState } from 'react'
import { Contact } from './components/Contact'
import { Header } from './components/Header'
import { Navbar } from './components/Navbar'
import { Section2 } from './components/Section2.tsx'
import { SectionContainer } from './components/SectionContainer'
import { Overlay } from './components/Overlay'
import { Section4 } from './components/Section4.tsx'
import { Section3 } from './components/Section3.tsx'
import { Popup } from './components/PopUp.tsx'
import { Footer } from './components/Footer.tsx'
import DialogDemo from './components/CreateEventModal.tsx'

export function App() {
  const [showMenuItems, setShowMenuItems] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handleMenuClick = () => {
    if (showMenuItems) {
      setIsAnimating(true)
      setTimeout(() => {
        setShowMenuItems(!showMenuItems)
        setIsAnimating(false)
      }, 500)
    } else {
      setShowMenuItems(!showMenuItems)
    }
  }

  const animationMenu =
    showMenuItems && !isAnimating
      ? 'animate-slideInRight'
      : 'animate-slideOutRight'

  return (
    <>
      <Navbar
        onClickMenuResponsible={handleMenuClick}
        openMenu={showMenuItems}
        openPopUp={() => setIsPopupOpen(true)}
        isAnimating={isAnimating}
      />
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

      <main className="bg-gradient-to-r from-dark-purple via-purple via-70% to-light-purple">
        {/* SECTION 1 - 3D */}
        <SectionContainer id="o_app">
          <Header isNavbarOpened={showMenuItems} isPopUpOpened={isPopupOpen} />
        </SectionContainer>
        <Section2 />
        <Section3/>
        <Section4 />
        <SectionContainer id="contato">
          <Contact />
        </SectionContainer>
        <Footer openPopUp={() => setIsPopupOpen(true)} isNavbarOpened={showMenuItems} isPopUpOpened={isPopupOpen}/>
        {showMenuItems && <Overlay onClick={handleMenuClick} animationClass={animationMenu} />}
      </main> 
    </>
  )
}
