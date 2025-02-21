import { forwardRef } from 'react';
import { Input } from '../ui/input';
import { useInputMask } from '@/hooks/useInputMask';

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string;
}

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, onChange, value, ...props }, ref) => {
    const { unmaskValue, maskValue } = useInputMask(mask);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.target.value = unmaskValue(event.target.value);

      onChange?.(event);
    };

    return (
      <Input
        {...props}
        ref={ref}
        value={maskValue(String(value))}
        onChange={handleChange}
      />
    );
  }
);

export default MaskedInput;
