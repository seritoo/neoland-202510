const landingView = createView()
//hideView(landingView)

const landingTitle = createTitle()
setTextContent(landingTitle, 'MyPet')
setClass(landingTitle, 'font-bold text-4xl alaign-middle')
addChild(landingView, landingTitle)

const landingWelcome = createParagraph()
setTextContent(landingWelcome, 'Welcome!')
setClass(landingWelcome, 'text-xl text')
addChild(landingView, landingWelcome)

const landingAccess =  createNavigation()

const landingLoginLink = createLink()
setTextContent(landingLoginLink, 'Login')
setClass(landingLoginLink, 'underline text-blue-800 font-bold ')
addChild(landingAccess, landingLoginLink)

const landingOrText = createTextNode(' or ')
addChild(landingAccess, landingOrText)

const landingRegisterLink = createLink()
setTextContent(landingRegisterLink, 'Register')
setClass(landingRegisterLink, 'underline text-blue-800 font-bold')
addChild(landingAccess, landingRegisterLink)
addChild(landingView, landingAccess)

landingLoginLink.addEventListener('click', function (event) {
    event.preventDefault()

    hideView(landingView)
    showView(loginView)
})

landingRegisterLink.addEventListener('click', function (event) {
    event.preventDefault()

    hideView(landingView)
    showView(registerView)
})

addChild(document.body, landingView)
