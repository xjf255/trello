import { useState } from 'react'
import Select, { SingleValue } from 'react-select'

interface OptionType {
  value: string
  label: string
}

export function CustomSelect({ options, disable=false }: { options: OptionType[], disable?: boolean }) {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(options[0])

  const handleChange = (
    newValue: SingleValue<OptionType>,
  ) => {
    setSelectedOption(newValue)
  }

  return (
    <Select
      className='select'
      isSearchable={false}
      options={options}
      value={selectedOption}
      onChange={handleChange}
      isDisabled={disable}
    />
  )
}