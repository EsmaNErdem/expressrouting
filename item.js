const items = require("./fakeDb")

class Item{
    constructor(name,price) {
        this.name = name;
        this.price = price;
        
        // keep track of all items
        items.push(this);
    }

    // Static method to get all items
    // Static methods: These methods are defined on the class itself, rather than on its prototype. They are called on the class itself, not on instances of the class, and cannot access instance variables and methods
    static getAllItems() {
        return items;
    }

    static findItem(name) {
        const searchItem = items.find(obj => obj.name === name);
        if (searchItem === undefined){
            throw { message: "Not Found", status: 404 }
        }
        return searchItem
    }

    static patchItem(name, body) {
        let searchItem = Item.findItem(name)
        if (searchItem === undefined){
            throw { message: "Not Found", status: 404 }
        }
        searchItem.name = body.name
        searchItem.price = body.price
        return searchItem
    }

    static deleteItem(name) {
        const indexItem = items.findIndex(obj => obj.name === name);
        if (indexItem=== -1){
            throw { message: "Not Found", status: 404 }
        }
        items.splice(indexItem, 1)
        return items
    }

}

module.exports = Item;