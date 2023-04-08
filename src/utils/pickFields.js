function pickFields(obj, fields) {
  return fields.reduce((prev, curr) => ({ ...prev, [curr]: obj[curr] }), {});
}

module.exports = pickFields
