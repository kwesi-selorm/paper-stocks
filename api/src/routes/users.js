"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send({ Message: "Hello World! " });
});
exports["default"] = router;
