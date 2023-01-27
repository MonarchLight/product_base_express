'use strict';

import { Router } from "express";
import { check } from 'express-validator';

import * as controller from "../controllers/item-controller.js";

export { router };

const router = new Router();

/**
 * @api {post} /add-item Add item
 * @apiVersion 1.0.0
 * @apiName PostItem
 * @apiGroup Item
 *
 *
 * @apiBody {Boolean} isActive Switches (default: false)
 * @apiBody {String} image Photo URL (default: "")
 * @apiBody {String} name Item name (unique, require)
 * @apiBody {Number} count Аmount (require)
 * @apiBody {Number} weightPerItem Unit weight (require)
 * @apiBody {Number} pricePerItem Unit price (require)
 * @apiBody {String} description Description (default: "")
 *
 *
 * @apiSuccess {json} object object with item
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      status: true,
 *      payload: { login },
 *      error: null,
 * }
 *
 * @apiError {json} object object with error
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *      status: false,
 *      payload: null,
 *      error: {
 *        message: error,
 *        description: error,
 *        code: 400 },
 *     }
 */

router.post('/add-item', [
    check('isActive', '`Active` must be true or false.').optional().isBoolean(),
    check('image', '`Image` must be string.').optional().isString(),
    check('name', '`Name` can not be empty.').isString().notEmpty(),
    check('count', '`Count` must be integer.').isInt(), //>0
    check('weightPerItem', '`Weight` must be no more than 3 characters after the comma.').isNumeric().isFloat(), //matches(/^\d+(?:\.\d{1,3})?$/)
    check('pricePerItem', '`Price` must be no more than 2 characters after the comma.').matches(/^\d+(?:\.\d{1,2})?$/),
    check('description', '`Description` must be string.').optional().isString(),
], controller.addItem);