import express = require('express');
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send({ Message: "Hello World! " });
});

export default router;
