export function handleScroll(id: string) {
  const section = document.getElementById(id);

  if (section) {
    const sectionPosition = section.offsetTop;
    window.scrollTo({
      top: sectionPosition,
      behavior: 'smooth',
    });
  }
}
