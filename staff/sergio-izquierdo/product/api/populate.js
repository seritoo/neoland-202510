import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://localhost:27017') //creamos un cliente que se va a conectar ahí, la dirección de mongo en nuestra máquina

client.connect()
	.then(() => {   //si ha ido bien la conexión, elegimos base de datos, product en nuestro caso
		const db = client.db('product')

		const users = db.collection('users')

		/* users.find({}).toArray()
			.then(users => console.table(users))
			.catch(error => console.error(error)) */

		/* users.insertOne({ name: 'Le Chuga', email: 'le@chuga.com', username: 'lechuga', password: '123123123'})
			.then(result => console.log(result))
			.catch(error => console.error(error)) */

		/* users.updateOne({_id: new ObjectId('69b43cb74749f0937d8563b3')}, {$set: {name: 'Sally Skellington'}})
			.then(result => console.log(result))
			.catch(error => console.error(error)) */

		/* users.deleteOne({_id: new ObjectId('69b46f6157d8cf4f387d4371')})
			.then(result => console.log(result))
			.catch(error => console.error(error)) */

		/* users.findOne({_id: new ObjectId('69b43cb74749f0937d8563b3')})
			.then(user => console.log(user))
			.catch(error => console.error(error)) */

		users.find({name: /s/i }).toArray()
			.then(users => console.table(users))
			.catch(error => console.error(error))


	})
	.catch(error => console.error(error))
