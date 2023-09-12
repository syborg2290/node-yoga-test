const express = require('express');
const router = express.Router();

router.get('/data', (req, res) => {
  res.json({ message: 'Sample GET endpoint for API' });
});

router.post('/data', (req, res) => {
  const { data } = req.body;
  res.json({ message: `Received POST request with data: ${data}` });
});

module.exports = router;
