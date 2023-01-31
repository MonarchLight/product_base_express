"use strict";

import { Schema, model } from 'mongoose';

const productHistory = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'product' },
    date: { type: Date, default: Date.now() },
    type: { type: String },
    change: { type: String },
});

export const productHistoryModel = model('productHistory', productHistory);