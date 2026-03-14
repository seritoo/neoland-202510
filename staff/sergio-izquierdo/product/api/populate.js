import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://localhost:27017') //creamos un cliente que se va a conectar ahí, la dirección de mongo en nuestra máquina

client.connect()
	.then(() => {   //si ha ido bien la conexión, elegimos base de datos, product en nuestro caso
		const db = client.db('product')

		const users = db.collection('users') // traemos la collección de users
		const pets = db.collection('pets') // nos traemos la colleción de mascotas

		/* users.find({}).toArray()
			.then(users => console.table(users))
			.catch(error => console.error(error)) */

		/* users.insertOne({ name: 'Le Chuga', email: 'le@chuga.com', username: 'lechuga', password: '123123123'})
			.then(result => console.log(result))
			.catch(error => console.error(error)) */

		/* users.updateOne({_id: new ObjectId('69b43cb74749f0937d8563b3')}, {$set: {name: 'Sally Skellington'}})
			.then(result => console.log(result))
			.catch(error => console.error(error)) */

		users.deleteOne({_id: new ObjectId('69b43a724749f0937d8563b1')})
			.then(result => console.log(result))
			.catch(error => console.error(error))

		/* users.findOne({_id: new ObjectId('69b43cb74749f0937d8563b3')})
			.then(user => console.log(user))
			.catch(error => console.error(error)) */

		/* users.find({name: /s/i }).toArray()
			.then(users => console.table(users))
			.catch(error => console.error(error)) */

		/* pets.insertOne({userId: new ObjectId('69b43bf14749f0937d8563b2'), name: 'Zero', birthdate: new Date('2020-02-20'), wegith: 0, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3NvOWdvMmExNjJzbWJ1cWk3a3l0d21obHM2Nnl1ZTJibHM4a3pyNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Bo95o8mSV8jHW/giphy.gif'})
			.then(result => console.log(result))
			.catch(error => console.error(error)) */

		/* pets.deleteOne({ userId: new ObjectId('69b43bf14749f0937d8563b2')})
			.then(result => console.log(result))
			.catch(error => console.error(error)) */

		/* pets.deleteMany({ userId: new ObjectId('69b43a724749f0937d8563b1')})
			.then(result => console.log(result))
			.catch(error => console.error(error)) */


	})
	.catch(error => console.error(error))
