// require('dotenv').config();
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const playerRoutes = require('./src/Routes/playerRoutes');
// const port = process.env.PORT || 3000;
// const cors = require('cors');

// // Database URL
// const DB_URL = process.env.DATABASE_URL;
// const DB_NAME = 'dream11';
// const DB_COLLECTION_NAME = 'players';

// app.use(bodyParser.json());
// app.use(cors());

// // Routes
// app.use('/api', playerRoutes);

// console.log('DB_URL', DB_URL);

// const client = new MongoClient(DB_URL, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   // useFindAndModify: false,
//   serverSelectionTimeoutMS: 30000, // 30 seconds timeout
// });

// let db;

// // Sample create document function
// async function sampleCreate() {
//   const demo_doc = {
//     demo: 'doc demo',
//     hello: 'world',
//   };

//   try {
//     const demo_create = await db
//       .collection(DB_COLLECTION_NAME)
//       .insertOne(demo_doc);
//     console.log('Added!');
//     console.log(demo_create.insertedId);
//   } catch (err) {
//     console.error('Error creating document', err);
//   }
// }

// // Endpoints

// app.get('/', async (req, res) => {
//   res.send('Hello World!');
// });

// app.get('/demo', async (req, res) => {
//   // await sampleCreate();
//   res.send({ status: 1, message: 'demo' });
// });

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });

// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Get the database
//     db = client.db(DB_NAME);
//     console.log('Connected to database:', DB_NAME);

//     // Send a ping to confirm a successful connection
//     await client.db('admin').command({ ping: 1 });
//     console.log(
//       'Pinged your deployment. You successfully connected to MongoDB!'
//     );
//   } catch (err) {
//     console.error('Failed to connect to MongoDB', err);
//   } finally {
//     // Do not close the client here if you want to keep the server running
//     // await client.close();
//   }
// }

// run().catch(console.dir);\

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import playerRoutes from './src/Routes/playerRoutes.js';
import matchRoutes from './src/Routes/matchRoutes.js';
import teamRoutes from './src/Routes/teamRoutes.js';
import resultRoutes from './src/Routes/resultsRoutes.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/api', playerRoutes);
app.use('/api', matchRoutes);
app.use('', teamRoutes);
app.use('', resultRoutes);

const CONNECTION_URL = process.env.DATABASE_URL;

console.log('CONNECTION_URL', CONNECTION_URL);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: `dream11`,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
