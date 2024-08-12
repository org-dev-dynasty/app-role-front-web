export function BackgroundBubbles({ isNavbarOpened, isPopUpOpened }: { isNavbarOpened: boolean, isPopUpOpened: boolean }) {
  const gradient = 'linear-gradient(180deg, #F2E3FC 0%, #9C4EDC 25%, #5A189A 50%, #3C096C 75%, #10002B 100%)';
  const style = {
    background: gradient,
    backdropFilter: 'blur(100px)', // Ajuste o valor do desfoque conforme necessário
    overflow: 'hidden',
    maxWidth: '100vw',
  };
  return (
    <div style={style} className={`${isNavbarOpened || isPopUpOpened ? 'hidden' : ''} animate-slideandSpinInfiniteRightToLeft w-[32vw] rounded-full h-[58vw] absolute z-0 shadow-bubbleShadow opacity-50 blur-xl max-sm:w-[60vw] max-sm:h-[30vw] max-lg:w-[38vw] max-lg:h-[30vw]`}></div>
  );
}
// bg-gradient-to-tr from-dark-purple via-purple via-70% to-light-purple
// mobile: w-[80%] h-[36%]
