'use strict';

import { Router } from "express";
import { check } from 'express-validator';

import * as controller from "../controllers/product-controller.js";

export { router };

const router = new Router();

/** /api/product Add product
 * @api {post} /api/product Add product
 * @apiVersion 1.0.0
 * @apiName PostProduct
 * @apiGroup Product
 * @apiDescription Add product
 *
 *
 * @apiBody {Boolean} isActive Switches, optional. (default: false)
 * @apiBody {String} image Photo URL, optional. (default: "")
 * @apiBody {String} name Product name (unique, require)
 * @apiBody {Number} count Аmount (require)
 * @apiBody {Number} weightPerItem Unit weight (require)
 * @apiBody {Number} pricePerItem Unit price (require)
 * @apiBody {String} description Description, optional. (default: "")
 *
 *
 * @apiSuccess {json} Object Object with message
 * @apiSuccessExample {json} Success-Response:
    HTTP/1.1 201 OK
 {
    "status": true,
    "error": null,
    "payload": {
        "isActive": false,
        "image": "fdgdfger",
        "name": "uio",
        "count": 1,
        "weightPerItem": 12.122,
        "pricePerItem": 13.5,
        "description": "sdfgdfg",
        "history": [
            {
                "date": "2023-01-30T13:22:20.250Z",
                "productHistory": "63d7c48ce8e1b86755cd2bdd",
                "_id": "63d7c48ce8e1b86755cd2be0"
            }
        ],
        "_id": "63d7c48ce8e1b86755cd2bdf",
        "__v": 0
    }
}

 *
 * @apiError {json} Object Object with message, errors[{}]
 * @apiErrorExample {json} Error-Response:
    HTTP/1.1 400 Bad Request
 {
    "message": "Validation error.",
    "errors": [
        {
            "value": "",
            "msg": "`Name` can not be empty.",
            "param": "name",
            "location": "body"
        },
        {
            "value": "",
            "msg": "`Count` must be integer.",
            "param": "count",
            "location": "body"
        },
        {
            "value": "",
            "msg": "`Weight` must be no more than 3 characters after the dot.",
            "param": "weightPerItem",
            "location": "body"
        },
        {
            "value": "",
            "msg": "`Price` must be no more than 2 characters after the dot.",
            "param": "pricePerItem",
            "location": "body"
        }
    ]
}
 */

router.post('/product', [
    check('isActive', '`Active` must be true or false.').optional().isBoolean(),
    check('image', '`Image` must be string.').optional().isString(),
    check('name', '`Name` can not be empty.').isString().notEmpty(),
    check('count', '`Count` must be integer.').isInt(), //>0
    check('weightPerItem', '`Weight` must be no more than 3 characters after the dot.').matches(/^\d+(?:\.\d{1,3})?$/),
    check('pricePerItem', '`Price` must be no more than 2 characters after the dot.').matches(/^\d+(?:\.\d{1,2})?$/),
    check('description', '`Description` must be string.').optional().isString(),
], controller.addProduct)



    .put('/product/:id', [
        check('isActive', '`Active` must be true or false.').optional().isBoolean(),
        check('image', '`Image` must be string.').optional().isString(),
        check('name', '`Name` can not be empty.').optional().isString().notEmpty(),
        check('count', '`Count` must be integer.').optional().isInt(), //>0
        check('weightPerItem', '`Weight` must be no more than 3 characters after the dot.').optional().matches(/^\d+(?:\.\d{1,3})?$/),
        check('pricePerItem', '`Price` must be no more than 2 characters after the dot.').optional().matches(/^\d+(?:\.\d{1,2})?$/),
        check('description', '`Description` must be string.').optional().isString(),
    ], controller.updateProduct)



    .get('/product/history', controller.getAllProductsHistory)



    .get('/product', controller.getAllProducts)



    .delete('/product/:id', controller.deleteProduct);