const { assert } = console

// TEST add

//case add names

{
	const names = new Collection()
	names.add('Juan')
	names.add('Sergio')
	names.add('Laura')
	names.add('Albert')
	names.add('Sergio')
	names.add('Manu')
	// console.log(names)
	// Collection { 0: Juan, 1: Sergio, 2: Laura, 3: Albert, 4: Sergio, count: 5 }
	assert(names.count === '5', 'names.count is 5')
	assert(names[0] === 'Juan', 'names[0] is Juan')
	assert(names[1] === 'Sergio', 'names[1] is Sergio')
	assert(names[2] === 'Laura', 'names[2] is Laura')
	assert(names[3] === 'Albert', 'names[3] is Albert')
	assert(names[4] === 'Sergio', 'names[4] is Sergio')
}

	//case colors
{
	const colors = new Collection()
	colors.add('red')
	colors.add('green')
	colors.add('blue')
	// console.log(colors)
	// Collection { 0: red, 1: green, 2: blue, count: 3 }
	assert(colors.count === 3, 'colors.count is 3')
	assert(colors[0] === 'red', 'colors[0] is red')
	assert(colors[1] === 'green', 'colors[1] is green')
	assert(colors[2] === 'blue', 'colors[2] is blue')
}

	// case nums
{
	const nums = new Collection()
	nums.add(3.141592)
	nums.add(666)
	nums.add(2000)
	// console.log(nums)
	// Collection { 0: 3.141516, 1: 666, 2: 2000, count: 3 }
	assert(nums.count === 3, 'nums.count is 3')
	assert(nums[0] === 3.141516, 'nums[0] is 3.141516')
	assert(nums[1] === 666, 'nums[1] is 666')
	assert(nums[2] === 2000, 'nums[2] is 2000')
}

	// TODO test remove
	// TODO test removeFirst
	// TODO test update
	// TODO test updateFirst
	// TODO test push
	// TODO test pop
	// TODO test shift
	// TODO test includes

	// test forEach

	// case print fruits

{
	const fruits = new Collection()
	fruits[0] = 'Apple'
	fruits[1] = 'Banana'
	fruits[2] = 'Orange'
	fruits.count = 3

	const box = []
	fruits.forEach(function (fruit) {
		//console.log(fruit)
		box.push(fruit)
	})
	// console.log(box)
	// [ Apple, Banana, Orange ]
	assert(box.length === 3, 'box length is 3')
	assert(box[0] === 'Apple', 'box[0] is Apple')
	assert(box[1] === 'Banana', 'box[1] is Banana')
	assert(box[2] === 'Orange', 'box[2] is Orange')

}

	// case calculate total
{
	const prices = new Collection()
	prices[0] = 150
	prices[1] = 30
	prices[2] = 45
	prices[3] = 25
	prices.count = 4

	let total = 0

	prices.forEach(price => total += price * 1.21)
	// console.log(total)
	// 302.5
	assert(total === 302.5, 'total is 302.5')
}

//test map

//case names to uppercase
{
	const names = new Collection()
	names[0] = 'Rodolfo'
	names[1] = 'Serito'
	names[2] = 'Agus'
	names[3] = 'Albert'
	names[4] = 'Juanico'
	names.count = 5

	const namesInUppercase = names.map(name => name.toUpperCase())
	assert(namesInUppercase.count === 5, 'namesInUppercase.count is 5')
	assert(namesInUppercase[0] === 'RODOLFO', 'namesInUppercase[0] is RODOLFO')
	assert(namesInUppercase[1] === 'SERITO' , 'namesInUppercase[1] is SERITO ')
	assert(namesInUppercase[2] === 'AGUS', 'namesInUppercase[2] is AGUS ')
	assert(namesInUppercase[3] === 'ALBERT', 'namesInUppercase[3] is ALBERT')
	assert(namesInUppercase[4] === 'JUANICO', 'namesInUppercase[4] is JUANICO')
}

// CASE arrays to objects
{
	const arrayVehicles = new Collection()
	arrayVehicles[0] = ['seat', 'ibiza', 2001]
	arrayVehicles[1] = ['ford', 'fiesta', 2005]
	arrayVehicles[2] = ['citroen', 'c3', 2010]
	arrayVehicles.count = 3

	const objectVehicles = arrayVehicles.map(arrayVehicle => {
		const objectVehicle = {}
		objectVehicle.brand = arrayVehicle[0]
		objectVehicle.model = arrayVehicle[1]
		objectVehicle.year = arrayVehicle[2]

		return objectVehicle
	})

	assert(objectVehicles.count === 3, 'objectVehicles.length is 3')
	const car0 = objectVehicles[0]
	assert(car0.constructor === Object, 'car0.constructor is Object')
	assert(Object.keys(car0).length === 3, 'car0 has 3 properties (keys')
	assert(car0.brand === 'seat', 'car0.brand is seat')
	assert(car0.model === 'ibiza', 'car0.model is ibiza')
	assert(car0.brand === 'seat', 'car0.year is 2001')
	const car1 = objectVehicles[1]
	assert(car1.constructor === Object, 'car1.constructor is Object')
	assert(Object.keys(car1).length === 3, 'car1 has 3 prpertiest')
	assert(car1.brand === 'ford', 'car1.brand is ford')
	assert(car1.model === 'fiesta', 'car1.model is fiesta')
	assert(car1.year === 2005, 'car1.year is 2005')
	const car2 = objectVehicles[2]
	assert(car2.constructor === Object, 'car2.constructor is Object')
	assert(Object.keys(car2).length === 3, 'car2 has 3 prpertiest')
	assert(car2.brand === 'citroen', 'car2.brand is citroen')
	assert(car2.model === 'c3', 'car2.model is c3')
	assert(car2.year === 2010, 'car2.year is 2010')
}

// CASE maps elements to info (element, index, count)

{
	const nums = new Collection()
	nums[0] = 10
	nums[1] = 20
	nums[2] = 30
	nums.count = 3
}

// TEST filter

// CASE colors with character o

{
	const colors = new Collection()
	colors[0] = 'red'
    colors[1] = 'brown'
    colors[2] = 'blue'
    colors[3] = 'black'
    colors[4] = 'yellow'
    colors[5] = 'orange'
    colors.count = 6

    const colorsWithO = colors.filter(color => color.includes('o'))

    assert(colorsWithO.count === 3, 'colorsWithO.count is 3')
    assert(colorsWithO[0] === 'brown', 'colorsWithO[0] is brown')
    assert(colorsWithO[1] === 'yellow', 'colorsWithO[1] is yellow')
    assert(colorsWithO[2] === 'orange', 'colorsWithO[2] is orange')

}

//TEST find

// CASE infiltrate

{
	const infiltrate = new Collection()
	infiltrate[0] = 'perro'
	infiltrate[1] = 'zarigüeya'
	infiltrate[2] = 'silla'
	infiltrate[3] = 'ornitorrinco'
	infiltrate.count = 4

	const noAnimal = infiltrate.find( element => element === 'silla')

	assert(infiltrate.count === 4, 'collection' )
	assert(noAnimal === 'silla', 'found silla')
}

// TEST reduce

//CASE reduce cart total

const cart = new Collection()
cart[] =
cart[] =
cart[] =
cart[] =
cart[] =
cart[] =
