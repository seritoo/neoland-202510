//body

document.body.className = 'p-4 h-screen'

// landing

const landingView = document.createElement('div')

const landingTitle = document.createElement('h1')
landingTitle.textContent = 'MyPet'
landingTitle.className = 'font-bold text-2xl'
landingView.appendChild(landingTitle)

const landingWelcome = document.createElement('p')
landingWelcome.textContent = 'Welcome!'
landingWelcome.className = 'text-xl'
landingView.appendChild(landingWelcome)

const landingAccess = document.createElement('p')
const landingLoginLink = document.createElement('a')
landingLoginLink.textContent = 'Login'
landingLoginLink.href = ''
landingLoginLink.className = 'underline text-blue-500'
landingAccess.appendChild(landingLoginLink)
const landingOrText = document.createTextNode(' or ')
landingAccess.appendChild(landingOrText)
const landingRegisterLink = document.createElement('a')
landingRegisterLink.textContent = 'Register'
landingRegisterLink.href = ''
landingRegisterLink.className = 'underline text-blue-500'
landingAccess.appendChild(landingRegisterLink)
landingView.appendChild(landingAccess)

landingLoginLink.addEventListener('click', function (event) {
    event.preventDefault()

    landingView.style.display = 'none'
    loginView.style.display = ''
})

landingRegisterLink.addEventListener('click', function (event) {
    event.preventDefault()

    landingView.style.display = 'none'
    registerView.style.display = ''
})

document.body.appendChild(landingView)

// register

const registerView = document.createElement('div')
registerView.style.display = 'none'

const registerTitle = document.createElement('h1')
registerTitle.textContent = 'Mypet'
registerTitle.className = 'font-bold text-2xl'
registerView.appendChild(registerTitle)

const registerSubtitle = document.createElement('h2')
registerSubtitle.textContent = 'Register'
registerSubtitle.className = 'font-bold'
registerView.appendChild(registerSubtitle)

const registerForm = document.createElement('form')
registerForm.className = 'flex flex-col'
const registerNameLabel = document.createElement('label')
registerNameLabel.textContent = 'Name'
registerNameLabel.htmlFor = 'name'
registerForm.appendChild(registerNameLabel)
const registerNameInput = document.createElement('input')
registerNameInput.id = 'name'
registerNameInput.className = 'border border-black'
registerForm.appendChild(registerNameInput)
const registerEmailLabel = document.createElement('label')
registerEmailLabel.textContent = 'Email'
registerEmailLabel.htmlFor = 'email'
registerForm.appendChild(registerEmailLabel)
const registerEmailInput = document.createElement('input')
registerEmailInput.id = 'email'
registerEmailInput.type = 'email'
registerEmailInput.className = 'border border-black'
registerForm.appendChild(registerEmailInput)
const registerUsernameLabel = document.createElement('label')
registerUsernameLabel.textContent = 'Username'
registerUsernameLabel.htmlFor = 'username'
registerForm.appendChild(registerUsernameLabel)
const registerUsernameInput = document.createElement('input')
registerUsernameInput.id = 'username'
registerUsernameInput.className = 'border border-black'
registerForm.appendChild(registerUsernameInput)
const registerPasswordLabel = document.createElement('label')
registerPasswordLabel.textContent = 'Password'
registerPasswordLabel.htmlFor = 'password'
registerForm.appendChild(registerPasswordLabel)
const registerPasswordInput = document.createElement('input')
registerPasswordInput.id = 'password'
registerPasswordInput.type = 'password'
registerPasswordInput.className = 'border border-black'
registerForm.appendChild(registerPasswordInput)
const registerShowPasswordButton = document.createElement('button')
registerShowPasswordButton.textContent = 'Show'
registerShowPasswordButton.type = 'button'
registerShowPasswordButton.className = 'border border-black bg-gray-300 px-2 self-end'
registerForm.appendChild(registerShowPasswordButton)

registerShowPasswordButton.addEventListener('click', function (event) {
    event.preventDefault()

    if (registerPasswordInput.type === 'password') {
        registerPasswordInput.type = 'text'
        registerShowPasswordButton.textContent = 'Hide'
    }
    else if (registerPasswordInput.type === 'text') {
        registerPasswordInput.type = 'password'
        registerShowPasswordButton.textContent = 'Show'
    }

})

const registerPasswordRepeatLabel = document.createElement('label')
registerPasswordRepeatLabel.textContent = 'Repeat Password'
registerForm.appendChild(registerPasswordRepeatLabel)
const registerPasswordRepeatInput = document.createElement('input')
registerPasswordRepeatInput.type = 'password'
registerPasswordRepeatInput.className = 'border border-black'
registerForm.appendChild(registerPasswordRepeatInput)
const RegisterShowPasswordRepeatButton = document.createElement('button')
RegisterShowPasswordRepeatButton.textContent = 'Show'
RegisterShowPasswordRepeatButton.className = 'border border-black bg-gray-300 px-2 self-end'
registerForm.appendChild(RegisterShowPasswordRepeatButton)

RegisterShowPasswordRepeatButton.addEventListener('click', function (event) {
    event.preventDefault()

    if (registerPasswordRepeatInput.type === 'password') {
        registerPasswordRepeatInput.type = 'text'
        RegisterShowPasswordRepeatButton.textContent = 'Hide'
    }
    else if (registerPasswordRepeatInput.type === 'text') {
        registerPasswordRepeatInput.type = 'password'
        RegisterShowPasswordRepeatButton.textContent = 'Show'
    }
})

const registerSubmitButton = document.createElement('button')
registerSubmitButton.textContent = 'Register'
registerSubmitButton.type = 'submit'
registerSubmitButton.className = 'border border-black bg-gray-300 px-2'
registerForm.appendChild(registerSubmitButton)
registerView.appendChild(registerForm)

registerForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const name = registerNameInput.value
    const email = registerEmailInput.value
    const username = registerUsernameInput.value
    const password = registerPasswordInput.value
    const passwordRepeat = registerPasswordRepeatInput.value

    try {
        logic.registerUser(name, email, username, password, passwordRepeat)

        registerForm.reset()
        registerFeedback.textContent = ''

        registerView.style.display = 'none'
        loginView.style.display = ''
    } catch (error) {
        registerFeedback.textContent = error.message
    }
})

const registerLoginLink = document.createElement('a')
registerLoginLink.textContent = 'Login'
registerLoginLink.href = ''
registerLoginLink.className = 'underline text-blue-500'
registerView.appendChild(registerLoginLink)

registerLoginLink.addEventListener('click', function (event) {
    event.preventDefault()

    registerView.style.display = 'none'
    loginView.style.display = ''
})

const registerFeedback = document.createElement('p')
registerView.appendChild(registerFeedback)

document.body.appendChild(registerView)

// login

const loginView = document.createElement('div')
loginView.style.display = 'none'

const loginTitle = document.createElement('h1')
loginTitle.textContent = 'MyPet'
loginTitle.className = 'font-bold text-2xl'
loginView.appendChild(loginTitle)

const loginSubtitle = document.createElement('h2')
loginSubtitle.textContent = 'Login'
loginSubtitle.className = 'font-bold'
loginView.appendChild(loginSubtitle)

const loginForm = document.createElement('form')
loginForm.className = 'flex flex-col'
const loginUsernameLabel = document.createElement('label')
loginUsernameLabel.textContent = 'Username'
loginUsernameLabel.htmlFor = 'username'
loginForm.appendChild(loginUsernameLabel)
const loginUsernameInput = document.createElement('input')
loginUsernameInput.id = 'username'
loginUsernameInput.className = 'border border-black'
loginForm.appendChild(loginUsernameInput)
const loginPasswordLabel = document.createElement('label')
loginPasswordLabel.textContent = 'Password'
loginPasswordLabel.htmlFor = 'password'
loginForm.appendChild(loginPasswordLabel)
const loginPasswordInput = document.createElement('input')
loginPasswordInput.className = 'border border-black'
loginPasswordInput.id = 'password'
loginPasswordInput.type = 'password'
loginForm.appendChild(loginPasswordInput)
const loginSubmitButton = document.createElement('button')
loginSubmitButton.textContent = 'Login'
loginSubmitButton.type = 'submit'
loginSubmitButton.className = 'border border-black bg-gray-300 px-2'
loginForm.appendChild(loginSubmitButton)
loginView.appendChild(loginForm)

loginForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const username = loginUsernameInput.value
    const password = loginPasswordInput.value

    try {
        logic.loginUser(username, password)

        loginForm.reset()
        loginFeedback.textContent = ''

        loginView.style.display = 'none'
        homeView.style.display = ''
    } catch (error) {
        loginFeedback.textContent = error.message
    }
})

const loginRegisterLink = document.createElement('a')
loginRegisterLink.textContent = 'Register'
loginRegisterLink.href = ''
loginRegisterLink.className = 'underline text-blue-500'
loginView.appendChild(loginRegisterLink)

loginRegisterLink.addEventListener('click', function (event) {
    event.preventDefault()

    loginView.style.display = 'none'
    registerView.style.display = ''
})

const loginFeedback = document.createElement('p')
loginView.appendChild(loginFeedback)

document.body.appendChild(loginView)

// home

const homeView = document.createElement('div')
homeView.style.display = 'none'

const homeTitle = document.createElement('h1')
homeTitle.textContent = 'MyPet'
homeView.appendChild(homeTitle)

const homeSubtitle = document.createElement('h2')
homeSubtitle.textContent = 'Welcome Home!'
homeView.appendChild(homeSubtitle)

const homeLogoutButton = document.createElement('button')
homeLogoutButton.textContent = 'Logout'
homeView.appendChild(homeLogoutButton)

homeLogoutButton.addEventListener('click', function (event) {
    event.preventDefault()

    homeView.style.display = 'none'
    loginView.style.display = ''
})

document.body.appendChild(homeView)



