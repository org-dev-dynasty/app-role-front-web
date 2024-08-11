export function handleScroll(id: string) {
  const section = document.getElementById(id);
  console.log('HANDLE SCROL' + section);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}