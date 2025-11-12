var quien = ['oye papi', 'oye mami', 'ey bro', 'ey sister', 'ye nano', 'acho tío', 'mozaaa', 'que pasa pisha']
var que = ['ya tu sabe', 'you know men', 'no sabe tu ni na', 'charra', 'que lo que', 'whats tha craic']
var eso = ['me guta la gasolina', 'dale don dale', 'perrea perrea', 'hasta el suelo', 'pa que mis gatas prendan los motores', 'dile que bailando la conocí', 'mueve tu cu mi pa se pone contento']
// la condición es menor que la longitud total del array
for(var i = 0; i < quien.length; i++ ){
    for(var j = 0; j < que.length; j++){
        for(var k = 0; k < eso.length; k++)
            console.log(quien[i] + ' ' + que[j] + ' ' + eso[k])
    }
}
