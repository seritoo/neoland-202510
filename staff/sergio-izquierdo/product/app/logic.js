function Logic() {

}

Logic.prototype.registerUser = function(name, email, username,password, passwordRepeat) {
	if(name !== 'string') throw Error('invalid name type')
	if(name.length < 2) throw Error('invalid name length')

	if(email !== 'string') throw Error('invalid email type')
	if(email.length < 6) throw Error('invalid email length')

	if(username !== 'string') throw Error('invalid username type')
	if(username.length < 3) throw Error('invalid username length')

	

}

const logic = new Logic()
