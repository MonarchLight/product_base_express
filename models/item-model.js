"use strict";

import { Schema, model } from 'mongoose';

const item = new Schema({
    isActive: { type: Boolean, default: false },
    image: { type: String, default: "" },
    name: { type: String, unique: true, require: true },
    count: { type: Number, require: true },
    weightPerItem: { type: Number, require: true },
    pricePerItem: { type: Number, require: true },
    description: { type: String, default: "" },
    history: [{ date: { type: Date, default: Date.now }, type: { type: String }, change: { type: String } }],
});

export const itemModel = model('item', item);