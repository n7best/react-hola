import React from 'react';
import PropTypes from 'prop-types';

export default function withTranslation(WrappedComponent, langKey) {
  function WithTranslation(props, context) {
    let langs;
    if (langKey) {
      langs = context.getContentByKey(langKey);
    }
    return (
      <WrappedComponent
        {...props}
        langs={langs}
        locale={context.locale}
      />
    );
  }

  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  WithTranslation.displayName = `withTranslation(${wrappedComponentName})`;

  WithTranslation.contextTypes = {
    locale: PropTypes.string,
    getContentByKey: PropTypes.func
  };

  return WithTranslation;
}
