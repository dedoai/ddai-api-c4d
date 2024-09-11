const {
    SecretsManagerClient,
    GetSecretValueCommand,
} = require('@aws-sdk/client-secrets-manager')

const client = new SecretsManagerClient();

const responseDTO = (statusCode = 200, body = {}, headers = {}) => ({
    statusCode: statusCode,
    headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        ...headers
    },
    body: JSON.stringify(body)
})

const getDbSecretPwd = async () => {
    const command = new GetSecretValueCommand({ SecretId: process.env.DB_SECRET_PASS_ID })
    const response = await client.send(command);
    if (!response?.SecretString)
        throw new Error('Failed to get secret ')
    return JSON.parse(response?.SecretString).password
}

module.exports = {
    responseDTO,
    getDbSecretPwd
}