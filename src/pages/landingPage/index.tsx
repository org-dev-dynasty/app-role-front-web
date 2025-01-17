import { useState } from "react";
import { Contact } from "../../components/Contact";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { Overlay } from "../../components/Overlay";
import { Popup } from "../../components/PopUp";
import { Section2 } from "../../components/Section2";
import { Section3 } from "../../components/Section3";
import { Section4 } from "../../components/Section4";
import { SectionContainer } from "../../components/SectionContainer";


export function LandingPage() {
    const [showMenuItems, setShowMenuItems] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleMenuClick = () => {
        if (showMenuItems) {
            setIsAnimating(true);
            setTimeout(() => {
                setShowMenuItems(!showMenuItems);
                setIsAnimating(false);
            }, 500);
        } else {
            setShowMenuItems(!showMenuItems);
        }


    }

    const animationMenu = showMenuItems && !isAnimating ? 'animate-slideInRight' : 'animate-slideOutRight';

    return (
        <>
            <Navbar onClickMenuResponsible={handleMenuClick} openMenu={showMenuItems} openPopUp={() => setIsPopupOpen(true)} isAnimating={isAnimating} />
            <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />



            <main className="bg-gradient-to-r from-dark-purple via-purple via-70% to-light-purple">
                {/* SECTION 1 - 3D */}
                <SectionContainer id="o_app">
                    <Header isNavbarOpened={showMenuItems} isPopUpOpened={isPopupOpen} />
                </SectionContainer>
                <Section2 />
                <Section3 />
                <Section4 />
                <SectionContainer id="contato">
                    <Contact />
                </SectionContainer>
                <Footer openPopUp={() => setIsPopupOpen(true)} isNavbarOpened={showMenuItems} isPopUpOpened={isPopupOpen} />
                {showMenuItems && <Overlay onClick={handleMenuClick} animationClass={animationMenu} />}
            </main>
        </>
    )
}