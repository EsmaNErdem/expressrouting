const Item = require('../item')
const express = require("express")

const router = new express.Router()

router.get("", function (req, res, next) {
    try {
        return res.json({ items: Item.getAllItems() });
    } catch (e) {
        return next(e)
    }
});

router.post("", function (req, res, next) {
    try {
        let newItem = new Item(req.body.name, req.body.price)
        return res.status(201).json({added: newItem})
    } catch (e) {
        return next(e)
    }
});

router.get("/:name", function (req, res, next) {
    try {
        const found = Item.findItem(req.params.name)
        return res.json({ item: found});
    } catch (e) {
        return next(e)
    }
});

router.patch("/:name", function (req, res, next) {
    try {
        return res.json({ updated: Item.patchItem(req.params.name, req.body)});
    } catch (e) {
        return next(e)
    }
});

router.delete("/:name", function (req, res, next) {
    try {
        Item.deleteItem(req.params.name, req.body)
        return res.json({ "deleted": items });
    } catch (e) {
        return next(e)
    }
});


 
module.exports = router;