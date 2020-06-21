// React
import React from 'react';

// React Bootstrap
import { Form } from 'react-bootstrap';

export default function RadioButton({
  field: { name, onChange, onBlur },
  values,
  id,
  ...props
}) {
  return (
    <Form.Control
      type='text'
      id={id}
      placeholder='100.0'
      name={name}
      value={values[id]}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
  );
}