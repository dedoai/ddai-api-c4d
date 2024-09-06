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
    const response = await client.send(new GetSecretValueCommand({ SecretId: process.env.DB_SECRET_PASS_ID }));

    if (!response?.SecretString)
        throw new Error('Failed to get secret')

    return response?.SecretString;
}

module.exports = {
    responseDTO,
    getDbSecretPwd
}