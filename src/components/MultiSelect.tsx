import { useEffect, useMemo, useState } from 'react';
import Select, {
  CSSObjectWithLabel,
  MultiValue,
  GroupBase,
  StylesConfig,
} from 'react-select';

export interface OptionsType {
  value: string;
  label: string;
}

export interface OptionsProps {
  options: MultiValue<OptionsType>; // Single array of options, not MultiValue
  onChange: (value: MultiValue<OptionsType>) => void;
  defaultValue?: string[]; // Array of string values
}

const customStyles: StylesConfig<OptionsType, true, GroupBase<OptionsType>> = {
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,
    background: '#616161',
    display: 'flex',
    flexWrap: 'nowrap',
    border: 'none',
    color: '#fff',
    caretColor: '#fff',
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    background: '#616161',
  }),
  clearIndicator: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: '#fff',
  }),
  dropdownIndicator: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: '#fff',
  }),
  multiValue: (provided: CSSObjectWithLabel) => ({
    ...provided,
    background: '#8f8f8f',
    color: '#fff',
  }),
  multiValueLabel: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: '#fff',
  }),
  option: (provided: CSSObjectWithLabel, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#454545 !important'
      : state.isFocused
      ? '#454545 !important'
      : 'transparent',
  }),
};

export function MultiSelectComponent(props: OptionsProps) {
  const [selectedMusic, setSelectedMusic] = useState<MultiValue<OptionsType>>([]);

  // Memoizing the options based on defaultValue
  const selectedOptions = useMemo(() => {
    if (props.defaultValue) {
      return props.options.filter(option =>
        props.defaultValue?.includes(option.value)
      );
    }
    return [];
  }, [props.defaultValue, props.options]);

  useEffect(() => {
    setSelectedMusic(selectedOptions); // Initialize the selected music based on defaultValue
  }, [selectedOptions]);

  const handleChange = (selected: MultiValue<OptionsType>) => {
    setSelectedMusic(selected);
    props.onChange(selected);
  };

  return (
    <div className="text-white">
      <Select
        value={selectedMusic} // Uses selectedMusic state as value
        onChange={handleChange}
        isMulti
        getOptionLabel={(option: OptionsType) => option.label}
        getOptionValue={(option: OptionsType) => option.value}
        options={props.options} // Passes correct options array
        isClearable={true}
        backspaceRemovesValue={true}
        placeholder="Selecione um ou mais valores"
        styles={customStyles}
      />
    </div>
  );
}