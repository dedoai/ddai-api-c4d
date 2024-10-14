const { action } = require('./action')
const { schema } = require('./validatorSchema')
const { ENTITY_NAME } = require('../../constants')

module.exports = {
    action,
    verb: 'POST',
    path: '/v1/' + ENTITY_NAME,
    validatorSchema: schema
}