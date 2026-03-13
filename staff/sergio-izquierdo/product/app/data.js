// manager
class Data {
    setToken(token) {  // para guardar el userID
        sessionStorage.token = token
    }

    getToken() {  // para cargar el user
        return sessionStorage.token
    }

    removeToken() {
        delete sessionStorage.token
    }
}
// instance

export const data = new Data()

