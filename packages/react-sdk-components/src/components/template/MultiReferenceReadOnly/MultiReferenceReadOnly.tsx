import PropTypes from "prop-types";
import React from "react";

export default function MultiReferenceReadOnly(props) {
  const { getPConnect, label, hideLabel, config } = props;
  const { referenceList, readonlyContextList } = config;

  // When referenceList does not contain selected values, it should be replaced with readonlyContextList while calling SimpleTableManual
  let readonlyContextObject;
  if ( !PCore.getAnnotationUtils().isProperty(referenceList)) {
    readonlyContextObject = {
      referenceList: readonlyContextList
    };
  }

  const component =  getPConnect().createComponent({
    type: "SimpleTable",
    config: {
      ...config,
      ...readonlyContextObject,
      label,
      hideLabel
    }
  });

   return (
    <React.Fragment>{component}</React.Fragment>
  )
}

MultiReferenceReadOnly.defaultProps = {
  label: "",
  hideLabel: false
};

MultiReferenceReadOnly.propTypes = {
  config: PropTypes.object.isRequired,
  getPConnect: PropTypes.func.isRequired,
  label: PropTypes.string,
  hideLabel: PropTypes.bool
};
