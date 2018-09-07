var EventEmitter = require('events').EventEmitter

var life = new EventEmitter()

life.setMaxListeners(15)

//addEventListener

life.on('求安慰', function(who) {
    console.log('給' + who + '倒水')
})

life.on('求安慰', function(who) {
    console.log('給' + who + '揉肩')
})

life.on('求安慰', function(who) {
    console.log('給' + who + '做飯')
})

life.on('求安慰', function(who) {
    console.log('給' + who + '洗衣服')
})

life.on('求安慰', function(who) {
    console.log('給' + who + '.....5')
})

life.on('求安慰', function(who) {
    console.log('給' + who + '.....6')
})

life.on('求安慰', function(who) {
    console.log('給' + who + '....7')
})

life.on('求安慰', function(who) {
    console.log('給' + who + '你想累死我')
})

life.on('求安慰', function(who) {
    console.log('給' + who + '你想累死我')
})

life.on('求安慰', function(who) {
    console.log('給' + who + '你想累死我')
})

life.on('求安慰', function(who) {
    console.log('給' + who + '你想累死我')
})

life.on('求溺愛', function(who) {
    console.log('給' + who + '買衣服')
})
life.on('求溺愛', function(who) {
    console.log('給' + who + '交工資')
})

var hasConforListener = life



life.emit('求安慰', '漢子')

