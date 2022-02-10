/**
 * @source minthazi2019tavasz
 * Load a dependency from an object repository
 * @param objectRepository object repository
 * @param propertyName dependency name
 * @returns {*}
 */

module.exports = (objectRepository, propertyName) => {
  if (objectRepository && objectRepository[propertyName]) {
      return objectRepository[propertyName];
  }
  throw new TypeError(`${propertyName} required.`);
};