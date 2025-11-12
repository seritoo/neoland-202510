var collection = {
    count: 0
}

collection.add = function(item){
    this[this.count] = item
    this.count++
}
collection.add('Peter')
collection.add('Wendy')
collection.add('James')
console.log(collection)

collection.remove = function(item){
   for( var i = 0; i < this.count; i++)
       if(this[i] === item)
           delete this[i];
}

collection.remove('Wendy')
console.log(collection)

collection.add('Wendy')
collection.add('Pepito')
collection.add('Wendy')
console.log(collection)

collection.removeFirst = function(item) {
    for (var i = 0; i < this.count; i++)
        if (this[i] === item) {
            delete this[i]

            return
        }
}
collection.removeFirst('Wendy')
console.log(collection)

collection.add('Pepito')
console.log(collection)

collection.update = function (src, update){
    for(var i = 0; i < this.count; i++){
        if(this[i] === src)
            this[i] = update
    }

}
collection.update('Pepito', 'Jiminy')
console.log(collection)
