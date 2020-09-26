const path = require('path');
const { Router } = require('express');
const routes = require('./routes');

const router = Router();
router.use('/api', routes);

// If no routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;
