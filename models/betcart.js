module.exports = function Betcart(oldCart) {
    this.items = oldCart.items || {};
    this.totalBetQty = oldCart.totalBetQty || 0;
    this.totalBetAmount = oldCart.totalBetAmount || 0;


    this.add = function(item, id) {
        var storedItem = this.items[id];

        storedItem = this.items[id] = {item: item, qty: 0, betamount : 0};

        storedItem.qty++;
        storedItem.betamount = storedItem.item.betamount * storedItem.qty;
        this.totalBetQty++;
        this.totalBetAmount += storedItem.item.betamount;
    };



    
    this.reduceByOne = function(id){
        this.items[id].qty --;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty --;
        this.totalPrice -= this.items[id].item.price;

        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }
        };


        this.removeItem = function(id){
            this.totalQty -= this.items[id].item.qty;
            this.totalPrice -= this.items[id].item.price;
            delete this.items[id];

        };


    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };

};
