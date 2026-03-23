import bcrypt from 'bcryptjs'

import { database, UserModel, PetModel} from './models.js'

database.connect('mongodb://localhost:27017/product')
	 .then(() => bcrypt.hash('123123123', 10))
    .then(hash => {
        const wendy = new UserModel({ name: 'Jack Skellington', email: 'jack@halloween', username: 'Jack', password: hash })
        const peter = new UserModel({ name: 'Sally Skellington', email: 'sally@halloween', username: 'Sally', password: hash })

return Promise.all([jack.save(), sally.save()])
	.then(([jack, sally]) => {
		console.log(jack, sally)

		const zero = new PetModel({ owner: jack.id, name: 'Zero', birthdate: new Date('2021-01-11'), weight: 0, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3NvOWdvMmExNjJzbWJ1cWk3a3l0d21obHM2Nnl1ZTJibHM4a3pyNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Bo95o8mSV8jHW/giphy.gif'})

		const scraps = new PetModel({ owner: jack.id, name: 'Scraps', birthdate: new Date('2025-02-03'), weight: 2, image: 'https://i.pinimg.com/originals/f3/d6/01/f3d601985924079467bc5102c09e1ef5.gif'})

		const sparky = new PetModel({ owner: sally.id, name: 'Sparky', birthdate: new Date('2020-10-28'), weight: 10, image: 'https://i.pinimg.com/originals/57/5c/9b/575c9b47dae40f5b0a85b9129d6c1b32.gif' })

		return Promise.all([zero.save(), scraps.save(), sparky.save()])
	})
	.then(([zero, scraps, sparky]) => console.log(zero, scraps, sparky))

})
.catch(error => console.error(error))
.finally(() => database.disconnect())
