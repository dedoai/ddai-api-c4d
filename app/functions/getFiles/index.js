const { action } = require('./action')
const { schema } = require('./validatorSchema')

module.exports = {
    action,
    verb: 'GET',
    path: '/v1/c4d/files',
    validatorSchema: schema
}