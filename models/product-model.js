"use strict";

import { Schema, model } from 'mongoose';

const product = new Schema({
    isActive: { type: Boolean, default: false },
    image: { type: String, default: "" },
    name: { type: String, unique: true, require: true },
    count: { type: Number, require: true },
    weightPerItem: { type: Number, require: true },
    pricePerItem: { type: Number, require: true },
    description: { type: String, default: "" },
    history: [{ date: { type: Date, default: null }, productHistory: { type: Schema.Types.ObjectId, ref: 'productHistory' } }],
});

export const productModel = model('product', product);