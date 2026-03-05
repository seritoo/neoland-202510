// manager
class Data {
    setToken(token) {  // para guardar el userID
        sessionStorage.token = token
    }

    getLoggedInToken() {  // para cargar el user
        return sessionStorage.token
    }

    removeLoggedInToken() {
        delete sessionStorage.token
    }
}
// instance

export const data = new Data()

