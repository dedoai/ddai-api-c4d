const ApplicationError = require('./ApplicationError')
const validate = (input, validatorSchema) => {
  const { error, value } = validatorSchema.validate(input);
  if (error) {
    throw new ApplicationError('Invalid input:  ' + error.details[0].message, 400);
  }
  return value
}
module.exports = {
  validate
};
