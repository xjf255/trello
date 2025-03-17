import { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { ItemStatusBoard } from '../types';

interface CustomSelectProps {
  options: ItemStatusBoard[];
  updateBoard: (value: ItemStatusBoard | null) => void;
  initialState: SingleValue<ItemStatusBoard | null>;
}

export function CustomSelect({ options, updateBoard, initialState }: CustomSelectProps) {
  const [selectedOption, setSelectedOption] = useState<ItemStatusBoard | null>(initialState);

  const handleChange = (newValue: SingleValue<ItemStatusBoard>) => {
    console.log(newValue)
    setSelectedOption(newValue);
    updateBoard(newValue);
  };

  return (
    <Select
      className="select"
      isSearchable={false}
      options={options}
      defaultValue={initialState}
      value={selectedOption}
      onChange={handleChange}
    />
  );
}