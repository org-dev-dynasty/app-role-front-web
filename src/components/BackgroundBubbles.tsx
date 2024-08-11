export function BackgroundBubbles({ isNavbarOpened, isPopUpOpened }: { isNavbarOpened: boolean, isPopUpOpened: boolean }) {
  const gradient = 'linear-gradient(180deg, #F2E3FC 0%, #9C4EDC 25%, #5A189A 50%, #3C096C 75%, #10002B 100%)';
  const style = {
    background: gradient,
    backdropFilter: 'blur(100px)', // Ajuste o valor do desfoque conforme necessário
  };
  return (
    <div style={style} className={`${isNavbarOpened || isPopUpOpened ? 'hidden' : ''} animate-slideandSpinInfiniteRightToLeft w-[32%] rounded-full h-[58%] absolute z-0 shadow-bubbleShadow opacity-50 blur-xl max-sm:w-[60%] max-sm:h-[30%] max-lg:w-[38%] max-lg:h-[30%]`}></div>
  );
}
// bg-gradient-to-tr from-dark-purple via-purple via-70% to-light-purple
// mobile: w-[80%] h-[36%]
