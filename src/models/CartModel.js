export class Cart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        let collection = this;
        let match = null;
        for(let i = 0; i < this.items.length; i++) {
            if (this.items[i].item === item) {
                match = this.items[i];
                break;
            }
        }
        if(match) {
            match.qtyUp();
        } else {
            this.items.push(new CartItem(item, (function () {
                return function () {
                    collection.removeItem(this);
                }
            })()));
        }
    }

    removeItem(item) {
        let index = this.items.indexOf(item);
        this.items.splice(index, 1);
    }

    getItems() {
        return this.items;
    }

    getQuantity() {
        let output = 0;
        for(let i = 0; i < this.items.length; i++) {
            output += this.items[i].qty;
        }
        return output;
    }
}

class CartItem {
    constructor(item, removeFromCart) {
        this.item = item;
        this.qty = 1;
        this.removeFromCart = removeFromCart;
    }
    qtyUp() {
        this.qty++;
    }
}