const {
    SecretsManagerClient,
    GetSecretValueCommand,
} = require('@aws-sdk/client-secrets-manager')

const client = new SecretsManagerClient();
const secret_name = "rds!db-328bc97f-8f6d-4cb8-a9e2-1ca01c0e88d1";

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


const secret = response.SecretString;

module.exports = {
    responseDTO,
    getDbSecretPwd
}