"use strict";

import { itemModel } from "../models/item-model.js";
import { config } from '../config.js';
import { ApiError } from "../exceptions/api-error.js";

export const addItem = async (isActive, image, name, count, weightPerItem, pricePerItem, description) => {
    const item = await itemModel.findOne({ name });
    if (item) {
        throw new ApiError(404, 'You already have this item.');
    }

    await itemModel.create({ isActive, image, name, count, weightPerItem, pricePerItem, description });
};