// reactive JS
// `target` the code we need to save
// `record` save this code inside the target


let price = 5
let quantity = 10
let total = 0
let target = null
let storage = []

target = () => {
    total = price * quantity
}

function record() { storage.push(target) }
function replay() { storage.forEach(run => run()) }


