const { action } = require('./action')
const { schema } = require('./validatorSchema')

module.exports = {
    action,
    verb: 'DELETE',
    path: '/v1/c4d',
    validatorSchema: schema
}