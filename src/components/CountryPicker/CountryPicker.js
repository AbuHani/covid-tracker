import React, { useState, useEffect } from "react";
import { getCountries } from "services/api";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function CountryPicker({className, handleCountryChange }) {

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const countries = await getCountries()

      if (active) {
        setOptions(countries);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
  <div className={className}>
      <Autocomplete
      multiple
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={handleCountryChange}
      getOptionSelected={(option, value) => option.Country === value.Country}
      getOptionLabel={(option) => option.Country}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Countries"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  </div>
  );
}
