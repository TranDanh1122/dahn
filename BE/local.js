const app = require('./index');
const express = require('express');

 // file đã export express app
app.listen(3000, () => {
  console.log('BE listening on http://localhost:3000');
});