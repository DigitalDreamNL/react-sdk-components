import React, { useState, useEffect } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText
} from '@material-ui/core';
import handleEvent from '../../helpers/event-utils';
import FieldValueList from '../../designSystemExtension/FieldValueList';
import type { PConnProps } from '../../../types/PConnProps';

interface CheckboxProps extends PConnProps {
  // If any, enter additional props that only exist on Checkbox here
}

export default function CheckboxComponent(props: CheckboxProps) {
  const {
    getPConnect,
    label,
    value = false,
    readOnly,
    testId,
    required,
    disabled,
    status,
    helperText,
    validatemessage,
    displayMode,
    hideLabel
  } = props;
  const helperTextToDisplay = validatemessage || helperText;

  const thePConn = getPConnect();
  const theConfigProps = thePConn.getConfigProps();
  const { caption } = theConfigProps;
  const actionsApi = thePConn.getActionsApi();
  const propName = thePConn.getStateProps().value;

  const [checked, setChecked] = useState(false);
  useEffect(() => {
    // This update theSelectedButton which will update the UI to show the selected button correctly
    setChecked(value);
  }, [value]);

  if (displayMode === 'LABELS_LEFT') {
    return <FieldValueList name={hideLabel ? '' : label} value={value} />;
  }

  if (displayMode === 'STACKED_LARGE_VAL') {
    return <FieldValueList name={hideLabel ? '' : label} value={value} variant='stacked' />;
  }

  const handleChange = event => {
    handleEvent(actionsApi, 'changeNblur', propName, event.target.checked);
  };

  const handleBlur = event => {
    thePConn.getValidationApi().validate(event.target.checked, "");   // 2nd arg empty string until typedef marked correctly as optional
  };

  let theCheckbox = <Checkbox color='primary' disabled={disabled} />;

  if (readOnly) {
    // Workaround for lack of InputProps readOnly from https://github.com/mui-org/material-ui/issues/17043
    //  Also note that we need to turn off the onChange call in the FormControlLabel wrapper, too. See below!
    theCheckbox = <Checkbox value={value || false} readOnly={readOnly} />;
  }

  return (
    <FormControl required={required} error={status === 'error'}>
      <FormGroup>
        <FormControlLabel
          control={theCheckbox}
          checked={checked}
          onChange={!readOnly ? handleChange : undefined}
          onBlur={!readOnly ? handleBlur : undefined}
          label={caption}
          labelPlacement='end'
          data-test-id={testId}
        />
      </FormGroup>
      <FormHelperText>{helperTextToDisplay}</FormHelperText>
    </FormControl>
  );
}
