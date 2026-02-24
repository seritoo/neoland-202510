// manager
class Data {
    setLoggedInUserId(userId) {  // para guardar el userID
        sessionStorage.userId = userId
    }

    getLoggedInUserId() {  // para cargar el user
        return sessionStorage.userId
    }

    removeLoggedInUserId() {
        delete sessionStorage.userId
    }
}
// instance

export const data = new Data()

