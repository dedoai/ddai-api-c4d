const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'DELETE']
const ALLOWED_PATH = ['/c4d']

const checkMethod = (method) => {
    return ALLOWED_METHODS.includes(method)
}

const checkPath = (path) => {
    return ALLOWED_PATH.includes(path)
}

const okDTO = (data) => {
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}

module.exports = {
    checkMethod,
    checkPath,
    okDTO
}   