const {
    SecretsManagerClient,
    GetSecretValueCommand,
} = require('@aws-sdk/client-secrets-manager')

const client = new SecretsManagerClient();

const responseDTO = (statusCode, data) => {
    return {
        statusCode,
        body: JSON.stringify({ data })
    }
}

const getDbSecretPwd = async () => {
    const command = new GetSecretValueCommand({ SecretId: process.env.DB_SECRET_PASS_ID })
    const response = await client.send(command);
    if (!response?.SecretString)
        throw new Error('Failed to get secret')

    return JSON.parse(response?.SecretString).password
}

module.exports = {
    responseDTO,
    getDbSecretPwd
}