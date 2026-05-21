const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || '';

const salesSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

const Sales = mongoose.model('Sales', salesSchema);

const sampleSalesData = [
  { productName: 'Laptop', category: 'Electronics', price: 1200, quantity: 2 },
  {
    productName: 'Headphones',
    category: 'Electronics',
    price: 150,
    quantity: 5,
  },
  { productName: 'Phone', category: 'Electronics', price: 800, quantity: 3 },
  { productName: 'Notebook', category: 'Stationery', price: 5, quantity: 20 },
  { productName: 'Pen', category: 'Stationery', price: 2, quantity: 50 },
  { productName: 'Desk', category: 'Furniture', price: 250, quantity: 4 },
  { productName: 'Chair', category: 'Furniture', price: 120, quantity: 6 },
  {
    productName: 'Smartwatch',
    category: 'Electronics',
    price: 300,
    quantity: 4,
  },
  { productName: 'Backpack', category: 'Accessories', price: 60, quantity: 10 },
  { productName: 'Mouse', category: 'Electronics', price: 40, quantity: 12 },
];

async function runAggregationDemo() {
  try {
    console.log(`Connecting to MongoDB: ${MONGODB_URI}`);
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    console.log('Connected to MongoDB successfully.');

    await Sales.deleteMany({});
    await Sales.insertMany(sampleSalesData);
    console.log(`Inserted ${sampleSalesData.length} sample sales records.`);

    // Step 3.1: $match stage
    const electronicsSales = await Sales.aggregate([
      { $match: { category: 'Electronics' } },
    ]);
    console.log('\n$match result (category = Electronics):');
    console.table(electronicsSales);

    // Step 3.2: $group stage
    const groupedSales = await Sales.aggregate([
      {
        $group: {
          _id: '$category',
          productCount: { $sum: 1 },
          totalRevenue: { $sum: { $multiply: ['$price', '$quantity'] } },
        },
      },
    ]);
    console.log('\n$group result (by category):');
    console.table(groupedSales);

    // Step 4.1: $project stage
    const projectedSales = await Sales.aggregate([
      {
        $project: {
          _id: 0,
          productName: 1,
          category: 1,
          totalAmount: { $multiply: ['$price', '$quantity'] },
        },
      },
    ]);
    console.log('\n$project result (productName, category, totalAmount):');
    console.table(projectedSales);

    // Step 4.2: $sort stage
    const sortedSales = await Sales.aggregate([
      {
        $project: {
          _id: 0,
          productName: 1,
          category: 1,
          price: 1,
          quantity: 1,
          totalAmount: { $multiply: ['$price', '$quantity'] },
        },
      },
      { $sort: { totalAmount: -1 } },
    ]);
    console.log('\n$sort result (by totalAmount desc):');
    console.table(sortedSales);

    // Step 5.1: Combined pipeline $match -> $group -> $project -> $sort
    const fullPipelineResult = await Sales.aggregate([
      { $match: { category: 'Electronics' } },
      {
        $group: {
          _id: '$category',
          productCount: { $sum: 1 },
          totalRevenue: { $sum: { $multiply: ['$price', '$quantity'] } },
          averagePrice: { $avg: '$price' },
        },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          productCount: 1,
          totalRevenue: 1,
          averagePrice: { $round: ['$averagePrice', 2] },
        },
      },
      { $sort: { totalRevenue: -1 } },
    ]);
    console.log(
      '\nCombined pipeline result ($match -> $group -> $project -> $sort):',
    );
    console.table(fullPipelineResult);
  } catch (error) {
    console.error('Aggregation demo failed:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
}

runAggregationDemo();
