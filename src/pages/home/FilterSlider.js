import * as React from 'react';
import PropTypes from 'prop-types';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.node,
};

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = styled(Slider)(({ theme }) => ({
  color: '#007bff',
  height: 5,
  padding: '15px 0',
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    boxShadow: '0 0 2px 0px rgba(0, 0, 0, 0.1)',
    '&:focus, &:hover, &.Mui-active': {
      boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.1)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
    '&:before': {
      boxShadow:
        '0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)',
    },
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 12,
    fontWeight: 'normal',
    top: -6,
    backgroundColor: 'unset',
    color: theme.palette.text.primary,
    '&::before': {
      display: 'none',
    },
    '& *': {
      background: 'transparent',
      color: '#000',
      ...theme.applyStyles('dark', {
        color: '#fff',
      }),
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
    height: 5,
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    boxShadow: 'inset 0px 0px 4px -2px #000',
    backgroundColor: '#d0d0d0',
  },
  ...theme.applyStyles('dark', {
    color: '#0a84ff',
  }),
}));

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider({ filter, saveFilters }) {
  const defaultValue = (localStorage.getItem(filter.id) &&
    localStorage.getItem(filter.id).split(',').map(Number)) || [filter.min, filter.max];
  const [value, setValue] = React.useState(defaultValue);
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  // Debounce effect: only updates `debouncedValue` 200ms after user stops moving the slider
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  // Dispatch the action whenever the debounced value changes
  React.useEffect(() => {
    if (debouncedValue) {
      saveFilters((prev) => [
        ...prev?.filter((f) => f.id !== filter.id),
        { id: filter.id, option: debouncedValue },
      ]);
    }
  }, [debouncedValue, saveFilters, filter.id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', pt: 0.5 }}>
      <IOSSlider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        max={filter.max}
        min={filter.min}
        marks={[
          { value: filter.min, label: filter.min },
          { value: filter.max, label: filter.max },
        ]}
        step={filter.step}
      />
    </Box>
  );
}
