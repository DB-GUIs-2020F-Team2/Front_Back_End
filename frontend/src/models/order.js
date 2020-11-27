export class Order{
    constructor(id, customer, datePlaced,shipped,completed,dateCompleted, productQuantity){
        this.id = id;
        this.customer = customer;
        this.datePlaced = datePlaced;
        this.shipped = shipped;
        this.completed = completed;
        this.dateCompleted = dateCompleted;
        this.productQuantity = productQuantity; // will be dictionary: {productId: quantity} e.g {1:5,2:21,7:2,41:3,6:2 }
                                                // will have to be {"one":5, "three": 4}... then use toString and parseInt to convert b/w #s and strings 
    }
}