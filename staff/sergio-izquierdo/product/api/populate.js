import mongoose from "mongoose"

const { Schema, ObjectId, model } = mongoose

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const URL_REGEX = /(www|http:|https:)+[^\s]+[\w]/


const userSchema = new Schema ({
	name: {
		type: String,
		minLength: 1,
		required: true // dato obligatorio
	},

	email: {
		type: String,
		minLength: 6,
		match: EMAIL_REGEX,
		required: true,
		unique: true
	},

	username: {
		type: String,
		minLength: 3,
		required: true,
		unique: true
	},

	password: {
		type: String,
		minLength: 8,
		required: true
	},

	image: {
		type:String,
		match: URL_REGEX,
		default: null
	},

	role: {
		type: String,
		enum: ['regular', 'administrator'], // puede ser una cosa u otra, se pone un array donde se especifican las opciones.
		default: 'regular',
		required: true
	}
})

const petSchema = new Schema ({
	owner: {
		type: ObjectId,
	},

	name: {
		type: String,
		minLength: 1,
		required: true // dato obligatorio
	},

	birthdate: {
		type: Date,
		required: true
	},

	weight: {
		type: Number,
		required: true
	},

	image: {
		type:String,
		match: URL_REGEX,
		required: true
	}
})

const User = model('User', userSchema)
const Pet = model('Pet', petSchema)

mongoose.connect('mongodb://localhost:27017/product')

const jack = new User({ name: 'Jack Skellington', email: 'jack@halloween.com', username: 'Jack', password: '123123123'})

const sally = new User({ name: 'Sally Skellington', email: 'sally@halloween.com', username: 'Sally', password: '123123123'})

Promise.all([jack.save(), sally.save()])
	.then(([jack, sally]) => {
		console.log(jack, sally)

		const zero = new Pet({ owner: jack.id, name: 'Zero', birthdate: new Date('2021-01-11'), weight: 0, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3NvOWdvMmExNjJzbWJ1cWk3a3l0d21obHM2Nnl1ZTJibHM4a3pyNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Bo95o8mSV8jHW/giphy.gif'})

		const scraps = new Pet({ owner: jack.id, name: 'Scraps', birthdate: new Date('2025-02-03'), weight: 2, image: 'https://i.pinimg.com/originals/f3/d6/01/f3d601985924079467bc5102c09e1ef5.gif'})

		const sparky = new Pet({ owner: sally.id, name: 'Sparky', birthdate: new Date('2020-10-28'), weight: 10, image: 'https://i.pinimg.com/originals/57/5c/9b/575c9b47dae40f5b0a85b9129d6c1b32.gif' })

		return Promise.all([zero.save(), scraps.save(), sparky.save()])
	})
	.then(([zero, scraps, sparky]) => console.log(zero, scraps, sparky))
	.catch(error => console.error(error))
