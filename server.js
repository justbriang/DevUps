const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('app is running'));
const PORT = process.env.port || 3000;
app.listen(PORT, () => console.log(`server started on port ${3000}`));
