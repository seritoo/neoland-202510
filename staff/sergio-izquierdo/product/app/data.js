// manager
class Data {
    constructor() {
        this.users = []
        this.usersCount = 0
        this.pets = []
        this.petsCount = 0
        this.loggedInUserId = null
    }

    setLoggedInUserId(userId) {  // para guardar el userID
        this.loggedInUserId = userId
    }

    getLoggedInUserId() {  // para cargar el user
        return this.loggedInUserId
    }
}
// instance

export const data = new Data()

