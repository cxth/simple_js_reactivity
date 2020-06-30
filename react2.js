// reactive JS
// `target` the code we need to save
// `record` save this code inside the target
// this version is more scalable solution, a class to store our dependencies

let data = {price: 5, quantity: 2}
let target, total, salePrice

class Dep {
    constructor() {
        // the array
        this.subscribers = []
    }
    // push anon function in an array
    depend() {
        if (target && !this.subscribers.includes(target)) {
            this.subscribers.push(target)
        }
    }
    // run all anon function in the array
    notify() {
        this.subscribers.forEach(sub => sub())
    }

    //function record() { storage.push(target) } // this is now depend()
    //function replay() { storage.forEach(run => run()) } // this is now notify()
}

Object.keys(data).forEach(key => {
    let internalValue = data[key]
    const dep = new Dep() //create Dep instance in every object (to push in storage and run)

    Object.defineProperty(data, key, {
        get() {
            dep.depend()
            return internalValue
        },
        set(newVal) {
            internalValue = newVal
            dep.notify()
        }
    })
})



function watcher(myFunc) {
    target = myFunc
    target()
    target = null
}

watcher(() => {
    total = data.price * data.quantity
})

watcher(() => {
    salePrice = data.price * 0.9
})