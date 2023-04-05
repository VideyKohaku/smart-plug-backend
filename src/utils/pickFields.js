function pickFields(obj, fields) {
  console.log(obj)
  console.log(fields)
  return fields.reduce((prev, curr) => ({ ...prev, [curr]: obj[curr] }), {});
}

module.exports = pickFields
