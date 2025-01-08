export function useInputMask(mask: string) {
  const unmaskValue = (value: string) => value.replace(/\D/g, '');

  const maskValue = (value: string) => {
    const newValue = value.replace(/\D/g, '');
    let maskedValue = '';
    let i = 0;

    if (!value) return '';

    for (const m of mask) {
      if (m === '#') {
        if (newValue[i]) {
          maskedValue += newValue[i];
          i++;
        } else {
          break;
        }
      } else {
        maskedValue += m;
      }
    }
    return maskedValue;
  };

  return { maskValue, unmaskValue };
}
