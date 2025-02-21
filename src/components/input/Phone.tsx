import { forwardRef } from 'react';
import MaskedInput from './Masked';

const PhoneInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  const isLocalPhone = String(props.value).length <= 10;

  return (
    <MaskedInput
      mask={isLocalPhone ? '(##) ####-####' : '(##) #####-####'}
      ref={ref}
      {...props}
    />
  );
});

PhoneInput.displayName = 'PhoneInput';
export default PhoneInput;
