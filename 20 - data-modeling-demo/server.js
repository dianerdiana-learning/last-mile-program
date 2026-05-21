require('dotenv').config();

const express = require('express');

const connectDB = require('./config/db');
const demoRoutes = require('./routes/demo.route');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Data Modeling Demo API is running',
    docs: {
      createSample: 'POST /api/demo/seed',
      users: 'GET /api/demo/users',
      tasks: 'GET /api/demo/tasks',
      populated: 'GET /api/demo/tasks/populated',
      validationTest: 'POST /api/demo/validate-invalid',
    },
  });
});

app.use('/api/demo', demoRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  });
