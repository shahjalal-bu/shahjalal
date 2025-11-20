import { db } from './index';
import { blogPosts } from './schema';

async function addNewPost() {
    console.log('📝 Adding new blog post...');

    const newPost = {
        slug: 'building-scalable-apis-nodejs',
        title: 'Building Scalable REST APIs with Node.js and Express',
        excerpt: 'Learn how to design and build production-ready REST APIs using Node.js, Express, and best practices for scalability and maintainability.',
        author: 'Md Shahjalal',
        date: '2025-11-20',
        readTime: '15 min read',
        tags: JSON.stringify(['Node.js', 'Express', 'API Design', 'Backend']),
        published: true,
        content: `# Building Scalable REST APIs with Node.js and Express

Building robust and scalable APIs is a crucial skill for modern web developers. In this comprehensive guide, we'll explore best practices and patterns for creating production-ready REST APIs.

## Why Node.js for APIs?

Node.js has become the go-to choice for API development due to several key advantages:

- **Non-blocking I/O**: Perfect for handling multiple concurrent requests
- **JavaScript everywhere**: Use the same language on frontend and backend
- **Rich ecosystem**: NPM provides countless packages and tools
- **Performance**: V8 engine delivers excellent performance
- **Active community**: Large community means better support and resources

## Setting Up Your Express Server

Let's start with a basic Express server setup:

\`\`\`javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## RESTful API Design Principles

Follow these principles for clean API design:

### 1. Use Proper HTTP Methods

- **GET**: Retrieve resources
- **POST**: Create new resources
- **PUT/PATCH**: Update existing resources
- **DELETE**: Remove resources

### 2. Meaningful URL Structure

\`\`\`javascript
// Good ✅
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id

// Bad ❌
GET  /api/getUsers
POST /api/createNewUser
\`\`\`

### 3. Versioning Your API

Always version your APIs for backward compatibility:

\`\`\`javascript
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);
\`\`\`

## Error Handling

Implement centralized error handling:

\`\`\`javascript
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});
\`\`\`

## Request Validation

Use validation libraries like Joi or Express Validator:

\`\`\`javascript
const { body, validationResult } = require('express-validator');

app.post('/api/users',
  [
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('age').isInt({ min: 0, max: 120 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Process valid request
  }
);
\`\`\`

## Security Best Practices

### 1. Use Helmet for HTTP Headers

\`\`\`javascript
const helmet = require('helmet');
app.use(helmet());
\`\`\`

### 2. Rate Limiting

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
\`\`\`

### 3. CORS Configuration

\`\`\`javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));
\`\`\`

## Database Integration

Example with MongoDB and Mongoose:

\`\`\`javascript
const User = require('./models/User');

// Create
app.post('/api/users', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

// Read
app.get('/api/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});
\`\`\`

## Pagination

Implement pagination for large datasets:

\`\`\`javascript
app.get('/api/posts', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const posts = await Post.find()
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });

  const total = await Post.countDocuments();

  res.json({
    success: true,
    data: posts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});
\`\`\`

## API Documentation

Use Swagger/OpenAPI for documentation:

\`\`\`javascript
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API Documentation'
    }
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
\`\`\`

## Testing Your API

Example with Jest and Supertest:

\`\`\`javascript
const request = require('supertest');
const app = require('./app');

describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        age: 30
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.email).toBe('john@example.com');
  });
});
\`\`\`

## Performance Optimization

### 1. Response Compression

\`\`\`javascript
const compression = require('compression');
app.use(compression());
\`\`\`

### 2. Caching with Redis

\`\`\`javascript
const redis = require('redis');
const client = redis.createClient();

app.get('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  
  // Check cache first
  const cached = await client.get(\`post:\${id}\`);
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  // Fetch from database
  const post = await Post.findById(id);
  
  // Cache for 1 hour
  await client.setEx(\`post:\${id}\`, 3600, JSON.stringify(post));
  
  res.json(post);
});
\`\`\`

### 3. Database Indexing

\`\`\`javascript
// MongoDB example
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

// Add indexes for frequently queried fields
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });
\`\`\`

## Monitoring and Logging

Use tools like Winston for logging:

\`\`\`javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

app.use((req, res, next) => {
  logger.info(\`\${req.method} \${req.url}\`);
  next();
});
\`\`\`

## Deployment Checklist

Before deploying to production:

- [ ] Set up environment variables
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up logging and monitoring
- [ ] Implement rate limiting
- [ ] Add API documentation
- [ ] Set up automated tests
- [ ] Configure database backups
- [ ] Use process managers (PM2, Docker)
- [ ] Set up CI/CD pipeline

## Conclusion

Building scalable REST APIs requires attention to:

1. **Architecture**: Clean code structure and separation of concerns
2. **Security**: Protect against common vulnerabilities
3. **Performance**: Optimize for speed and efficiency
4. **Maintainability**: Write testable, documented code
5. **Scalability**: Design for growth from day one

Follow these best practices, and you'll build APIs that are robust, secure, and ready for production!

**Happy coding!** 🚀

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [REST API Design Best Practices](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)
`
    };

    await db.insert(blogPosts).values(newPost);

    console.log('✅ New blog post added successfully!');
    console.log(`   Title: ${newPost.title}`);
    console.log(`   Slug: ${newPost.slug}`);
    console.log(`   Tags: ${newPost.tags}`);
}

addNewPost()
    .catch((error) => {
        console.error('❌ Failed to add post:', error);
        process.exit(1);
    })
    .finally(() => {
        process.exit(0);
    });
