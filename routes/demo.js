const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('demo/index');
})

module.exports = router;