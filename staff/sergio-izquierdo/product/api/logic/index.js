export * from './models/index.js'


import {registerUser} from './registerUser.js'
import {getUser} from './getUser.js'
import {authenticateUser} from './authenticateUser.js'
import {changeUserEmail} from './changeUserEmail.js'
import {changeUserImage} from './changeUserImage.js'
import {changeUserName} from './changeUserName.js'
import {changeUserPassword} from './changeUserPassword.js'
import {changeUserUsername} from './changeUserUsername.js'

import {getPet} from './getPet.js'
import {getPets} from './getPets.js'
import {modifyPet} from './modifyPet.js'
import {removePet} from './removePet.js'
import {addPet} from './addPet.js'

export const logic = {
    registerUser,
    authenticateUser,
    changeUserEmail,
    changeUserPassword,
    changeUserName,
    changeUserUsername,
    changeUserImage,
    getUser,
    getPet,
    getPets,
    modifyPet,
    removePet,
    addPet
}


