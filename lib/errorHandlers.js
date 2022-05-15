`use strict`

function errorHandler(error) {
    console.error(error)
    throw new Error("Failed in server")
}
module.exports = {
    errorHandler
}