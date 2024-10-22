import { useState } from 'react'
import Select, {
  ClearIndicatorProps,
  CSSObjectWithLabel,
  MultiValue,
  GroupBase,
  StylesConfig
} from 'react-select'

export interface OptionsType {
  value: string
  label: string
}

export interface OptionsProps {
  options: MultiValue<OptionsType>
  onChange: (value: MultiValue<OptionsType>) => void
  defaultValue?: string[]
}

const customStyles: StylesConfig<OptionsType, true, GroupBase<OptionsType>> = {
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,
    background: '#616161',
    display: 'flex',
    flexWrap: 'nowrap',
    border: 'none',
    color: '#fff',
    caretColor: '#fff'
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    background: '#616161'
  }),
  clearIndicator: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: '#fff'
  }),
  dropdownIndicator: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: '#fff'
  }),
  multiValue: (provided: CSSObjectWithLabel) => ({
    ...provided,
    background: '#8f8f8f',
    color: '#fff'
  }),
  multiValueLabel: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: '#fff'
  }),
  option: (provided: CSSObjectWithLabel, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#454545 !important'
      : state.isFocused
      ? '#454545 !important'
      : 'transparent'
  }),
}

export function MultiSelectComponent(props: OptionsProps) {
  const [selectedMusic, setSelectedMusic] =
    useState<MultiValue<OptionsType> | null>(null)


  const handleChange = (selected: MultiValue<OptionsType>) => {
    setSelectedMusic(selected)
    props.onChange(selected)
  }

  const [selectedOptions, setSelectedOptions] = useState<MultiValue<OptionsType> | null>(null)


  if (props.defaultValue) {
    const selectedLabels = props.defaultValue; // Apenas os labels das opções selecionadas
    const sel = props.options.filter(option => selectedLabels.includes(option.value))


    // Encontra as opções correspondentes pelos labels
    setSelectedOptions(sel);
  }



  return (
    <div className="text-white">
      <Select
        defaultValue={selectedOptions}
        value={selectedMusic}
        onChange={handleChange}
        isMulti
        getOptionLabel={(option: OptionsType) => option.label}
        getOptionValue={(option: OptionsType) => option.value}
        options={[props]}
        isClearable={true}
        backspaceRemovesValue={true}
        placeholder="Selecione um ou mais valores"
        styles={customStyles}
      />
    </div>
  )
}
