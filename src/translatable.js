import WithTranslation from './translate';

function translatable(key) {
  return component => WithTranslation(component, key);
}

export default translatable;
