import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  TextField,
} from '@material-ui/core';
import {
  Autocomplete
} from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  comboBox: {
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"]': {
      padding: 0,
    },
  },
  textField: {
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"] .MuiAutocomplete-input': {
      padding: theme.spacing(0.625),
    },
    marginTop: theme.spacing(2),
  },
}));

type ComboBoxProps<T> = {
  required?: boolean;
  label?: string;
  options: T[];
  optionLabel: keyof T;
  onChange?: (value: T | null) => void;
}

export default function ComboBox<T>({
  required = false,
  label = '',
  options,
  optionLabel,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (value: T | null) => { return; }
}: ComboBoxProps<T>): JSX.Element {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink>
        {`${label}${required ? '*' : ''}`}
      </InputLabel>
      <Autocomplete
        size="small"
        className={classes.comboBox}
        onChange={(_event, value) => { onChange(value); }}
        options={options}
        getOptionLabel={(option) => option[optionLabel] as unknown as string}
        renderInput={(params) => (
          <TextField
            margin="none"
            {...params}
            fullWidth
            size="small"
            className={classes.textField}
            variant="outlined"
          />
        )}
      />
    </FormControl>
  );
}
