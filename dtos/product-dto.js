"use strict";
// DTO - data transfer object

export class ProductDto {
    id;
    isActive;
    image;
    name;
    count;
    weightPerItem;
    pricePerItem;
    description;
    history;

    constructor(model) {
        this.id = model._id;
        this.isActive = model.isActive;
        this.image = model.image;
        this.name = model.name;
        this.count = model.count;
        this.weightPerItem = model.weightPerItem;
        this.pricePerItem = model.pricePerItem;
        this.description = model.description;
        this.history = model.history;
    }
}