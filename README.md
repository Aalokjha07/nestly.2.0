# NESTIFY 2.0 - Property Management System

Nestify 2.0 is a streamlined property listing and verification platform designed for high-efficiency real estate transactions. It features a dual-layered architecture that separates public market discovery from administrative quality control, with a seamless seller submission flow, admin verification dashboard, and public property marketplace.

---

## 🏗 Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Database**: MongoDB Atlas (Cluster: EcoClean)
- **Styling**: Tailwind CSS (Modern Dark Mode)
- **Icons**: Lucide React
- **Authentication**: N/A (Open platform)
- **Runtime**: Node.js 18+

---

## ⚡ System Capabilities

### 1. Property Submission (Seller Portal)

- Submit property details with personal information
- Auto-assign pending status for quality control
- Real-time form validation
- Success confirmation with submission tracking
- **Route**: `/seller`

### 2. Admin Verification Portal

- View all pending property submissions
- One-click approval/rejection with status updates
- Verification status assignment (verified/rejected)
- Automatic removal from queue after decision
- **Route**: `/admin/verify`

### 3. Public Listings & Detail View

- Browse all verified properties in grid layout
- Dynamic detail pages for each property by ID
- Seller contact information display
- Real-time price and location filtering
- **Routes**: `/user/listings`, `/user/listings/[id]`

---

## 📂 Project Structure

```
nestly.2.0/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── list-property/
│   │   │       ├── route.js               # POST/GET all properties
│   │   │       ├── [id]/
│   │   │       │   └── route.js           # GET/PATCH/DELETE individual property
│   │   │       └── db-check/
│   │   │           └── route.js           # Health check endpoint
│   │   ├── seller/
│   │   │   └── page.js                    # Property submission form
│   │   ├── user/
│   │   │   └── listings/
│   │   │       ├── page.js                # Public listings grid
│   │   │       └── [id]/
│   │   │           └── page.js            # Property detail page
│   │   ├── admin/
│   │   │   └── verify/
│   │   │       └── page.js                # Admin verification dashboard
│   │   ├── globals.css                    # Global styles
│   │   └── layout.js                      # Root layout
│   ├── models/
│   │   └── property.js                    # Mongoose schema
│   └── lib/
│       └── dbConnect.js                   # MongoDB connection handler
├── public/
│   └── uploads/                           # Image upload directory
├── package.json
├── next.config.mjs
├── postcss.config.mjs
├── .env.local (required)                  # Your MongoDB URI
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (free tier available)
- npm or yarn package manager

### Step-by-Step Setup

1. **Navigate to project directory**

   ```bash
   cd nestly.2.0
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure MongoDB Connection**
   Create `.env.local` file in root directory:

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📋 Complete API Documentation

### 1. **POST /api/list-property** - Submit New Property

Submit a new property listing (moves to pending queue).

**Request Body:**

```json
{
  "personaldata": {
    "name": "John Doe",
    "contact_info": 9876543210,
    "profession": "Engineer",
    "address": "123 Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "country": "India"
  },
  "propertydetails": {
    "property_type": "Apartment",
    "property_size": 1200,
    "location": "Downtown Mumbai",
    "price": 5000000,
    "image_url": "https://..." // Optional
  }
}
```

**Response (201):**

```json
{
  "message": "Property submitted for verification !",
  "id": "507f1f77bcf86cd799439011"
}
```

---

### 2. **GET /api/list-property** - Fetch All Verified Properties

Retrieve all properties with verified status (public marketplace).

**Query Parameters:**

- `Verification_status=verified` (optional, default: all)

**Response (200):**

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "personaldata": {...},
    "propertydetails": {...},
    "Verification_status": "verified",
    "createdAt": "2026-03-26T10:30:00Z"
  }
]
```

---

### 3. **GET /api/list-property/[id]** - Fetch Single Property

Retrieve detailed information for a specific property by ID.

**Response (200):**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "personaldata": {
    "name": "John Doe",
    "contact_info": 9876543210,
    "profession": "Engineer",
    "address": "123 Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "country": "India"
  },
  "propertydetails": {
    "property_type": "Apartment",
    "property_size": 1200,
    "location": "Downtown Mumbai",
    "price": 5000000,
    "image_url": "..."
  },
  "Verification_status": "pending",
  "createdAt": "2026-03-26T10:30:00Z"
}
```

---

### 4. **PATCH /api/list-property/[id]** - Update Verification Status ⭐ (Admin Only)

Update the verification status of a property.

**Request Body:**

```json
{
  "status": "verified"
}
```

**Valid Status Values:** `"pending"`, `"verified"`, `"rejected"`

**Response (200):**

```json
{
  "message": "Success",
  "data": {
    /* updated property object */
  }
}
```

**Response (404):**

```json
{
  "message": "Property not found"
}
```

---

### 5. **DELETE /api/list-property/[id]** - Delete Property ⭐

Remove a property from the database permanently.

**Response (200):**

```json
{
  "message": "Property deleted successfully",
  "data": {
    /* deleted property object */
  }
}
```

**Response (404):**

```json
{
  "message": "Property not found"
}
```

---

### 6. **GET /api/list-property/db-check** - Database Health Check

Verify MongoDB connection and view available collections.

**Response (200):**

```json
{
  "current_database": "nestly",
  "collections_found": ["properties", "users", ...]
}
```

---

## Complete API Routes Summary

| Route                         | Method | Description                   | Status    |
| ----------------------------- | ------ | ----------------------------- | --------- |
| `/api/list-property`          | POST   | Submit new property           | ✅ Create |
| `/api/list-property`          | GET    | Fetch all verified properties | ✅ Read   |
| `/api/list-property/[id]`     | GET    | Get single property by ID     | ✅ Read   |
| `/api/list-property/[id]`     | PATCH  | Update verification status    | ✅ Update |
| `/api/list-property/[id]`     | DELETE | Delete property               | ✅ Delete |
| `/api/list-property/db-check` | GET    | Check DB connection           | ✅ Health |

---

## 🗄️ Database Schema

### Property Model

```javascript
{
  personaldata: {
    name: { type: String, required: true },
    contact_info: { type: Number, required: true }, // Phone number
    profession: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true }
  },
  propertydetails: {
    property_type: { type: String, required: true }, // e.g., "Apartment"
    property_size: { type: Number, required: true }, // in sq ft
    location: { type: String, required: true },
    price: { type: Number, required: true }, // in currency units
    image_url: {
      type: String,
      default: "https://images.unsplash.com/photo-1560518883-ce09059eeffa"
    }
  },
  Verification_status: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

---

## 🎯 User Workflows

### Seller Flow

1. Navigate to `/seller`
2. Fill property submission form
3. Submit for verification
4. Receive confirmation with property ID
5. Wait for admin verification

### Admin Flow

1. Navigate to `/admin/verify`
2. View all pending submissions
3. Click approve or reject button
4. Property moves to verified/rejected status
5. Property disappears from pending queue

### Buyer Flow

1. Navigate to `/user/listings`
2. Browse grid of verified properties
3. Click property card to view details
4. See seller contact information
5. Reach out to seller directly

---

## 🔧 Development Commands

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint

# Fix linting issues
npm run lint -- --fix
```

---

## 🌐 Environment Variables

Required for application to run:

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

**Getting your MongoDB URI:**

1. Go to MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
2. Create/select your cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Add to `.env.local`

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to vercel.com and create new project
3. Connect your repository
4. In Environment Variables, add:
   ```
   MONGODB_URI=your_connection_string
   ```
5. Click Deploy

### Deploy to Other Platforms

**Heroku, Railway, Render, etc.:**

- Add `MONGODB_URI` in platform's environment variables section
- Ensure Node.js 18+ runtime support
- Build command: `npm run build`
- Start command: `npm run start`

---

## 🐛 Troubleshooting

### "Please define the MONGODB_URI environment variable"

- Make sure `.env.local` file exists in root directory
- Check MongoDB URI is correctly formatted
- Verify no extra spaces in the URI

### Data not saving to database

- Confirm MongoDB connection via `/api/list-property/db-check`
- Check all required fields are populated in form submission
- Review browser console for error messages
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for dev)

### CORS or Network errors

- Ensure API routes are in correct folder structure
- Verify next.config.mjs has proper configuration
- Clear .next cache and restart dev server

---

## 📝 License

MIT License - Open for educational and commercial use.

---

## 🤝 Support & Contribution

For bugs, features, or questions:

- Create an issue in the repository
- Check console logs for error details
- Verify `.env.local` configuration

---

**Built with ❤️ for efficient property management**  
**Last Updated**: March 26, 2026  
**Version**: 2.0
