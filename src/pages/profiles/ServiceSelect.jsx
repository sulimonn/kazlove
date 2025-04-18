import React from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ServiceSelect = ({ servicesTypes, handleServiceChange, selectedServices }) => {
  const [services, setServices] = React.useState(selectedServices);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setServices([...services, { id: parseInt(value) }]);
      handleServiceChange([...services, { id: parseInt(value) }]);
    } else {
      setServices(services.filter((s) => s.id !== parseInt(value)));
      handleServiceChange(services.filter((s) => s.id !== parseInt(value)));
    }
  };

  return servicesTypes
    .filter((s) => s.services.length > 0)
    .map((serviceType) => (
      <Accordion
        key={serviceType.id}
        sx={{
          backgroundColor: 'transparent',
          backgroundImage: 'none',
          boxShadow: 'none',
          margin: '0 !important',
          width: '100%',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{serviceType.name}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ paddingY: 0 }}>
          <Stack
            spacing={1}
            component="ul"
            sx={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              columnCount: 1,
              columnFill: 'balance',
              display: 'block',
            }}
          >
            {serviceType.services.map((service) => (
              <Stack
                key={service.id}
                component="li"
                sx={{
                  breakInside: 'avoid',
                  display: 'list-item',
                  width: 'fit-content',
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={services.some((s) => s.id === service.id)}
                      name={service.id}
                      value={service.id}
                      onChange={handleChange}
                    />
                  }
                  label={service.name}
                />
              </Stack>
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    ));
};

export default ServiceSelect;
