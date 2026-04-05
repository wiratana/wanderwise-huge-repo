require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./wander-wise-openapi3_0.yaml');



// image upload and cloudinary storage hosting
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// connect to db
const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');


// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
const postsRouter = require('./routes/posts');
const productRouter = require('./routes/productRoutes');
const citiesRouter = require('./routes/cities');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// extra packages
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowsMs: 15 * 60 * 1000, //15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.use(express.static('./public'));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>');
});

app.get('/', (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);
app.use('/api/v1/posts', authenticateUser, postsRouter);
// app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/cities', citiesRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
