var peter = {
    name: 'Peter'
}
peter.salute = function(to){
   // return peter.name + ': Hello, ' + to + '!'
return this.name + ': Hello, ' + to + '!'
}

var petro = peter
petro.name = 'Petro'
peter = undefined

console.log(petro.salute('Wendy'))
// Peter: Hello, Wendy!
console.log(petro.salute('James'))
// Peter: Hello, James!
var wendy = {
    name: 'Wendy'
}
wendy.salute = petro.salute

console.log(wendy.salute('Petro'))
// Wendy: Hello, Petro!
console.log(wendy.salute('James'))
// Wendy: Hello, James!
