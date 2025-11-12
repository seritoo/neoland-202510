var peter = {
    name: 'Peter'
}
peter.salute = function(to){
return this.name + ': Hello, ' + to.name + '!'
}

var wendy = {
    name: 'Wendy'
}

var james = {
    name: 'James'
}
wendy.salute = peter.salute
james.salute = wendy.salute

console.log(peter.salute(wendy))
// Peter: Hello, Wendy!
console.log(wendy.salute(james))
// Wendy: Hello, James!
console.log(james.salute(peter))
// James: Hello, Peter!
