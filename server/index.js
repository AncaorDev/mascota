'use strict'
const port = process.env.PORT || 3000,
      app  = require('./app');

// Iniciar servidor
app.listen(port, () => {});
