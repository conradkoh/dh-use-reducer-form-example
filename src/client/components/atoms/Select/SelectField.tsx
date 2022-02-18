import React, { useCallback, useMemo } from 'react';
import { FunctionComponent } from 'react';
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  SelectProps,
} from '@mui/material';
import hash from 'object-hash';
export interface SelectFieldProps<T = any> {
  className?: string;
  label: string;
  options: SelectFieldOption<T>[];
  value?: T;
  onChange: (newVal: T) => void;
}

export interface SelectFieldOption<T = any> {
  value: T;
  text: string;
}
const SelectField: FunctionComponent<SelectFieldProps> = ({
  className,
  label,
  value,
  options,
  onChange,
}) => {
  const optionsFormatted = useMemo(() => {
    return options.map((o) => {
      const item = { ...o, id: hash(o?.value) };
      return item;
    });
  }, [options]);
  //index select options
  const optionsIndex = useMemo(() => {
    return optionsFormatted.reduce((state, o) => {
      state[o.id] = o;
      return state;
    }, {});
  }, [optionsFormatted]);
  //prepare and cache select elements
  const optionElems = useMemo(() => {
    return optionsFormatted.map((o) => (
      <MenuItem key={o.id} value={o.id}>
        {o.text}
      </MenuItem>
    ));
  }, [optionsFormatted]);
  //get the actual item by index
  const handleChange: SelectProps<string>['onChange'] = useCallback(
    (e) => {
      const id = e.target.value;
      const selected = optionsIndex[id];
      onChange(selected?.value);
    },
    [optionsIndex, onChange]
  );
  const selectedId = useMemo(() => {
    return optionsFormatted.find((o) => o.id == hash(value))?.id;
  }, [value, optionsFormatted]);
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        className={className}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedId || ''}
        label={label}
        onChange={handleChange}
      >
        {optionElems}
      </Select>
    </FormControl>
  );
};
export default SelectField;
