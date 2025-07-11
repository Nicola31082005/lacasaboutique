# MongoDB Atlas Data API Setup Guide

## 🚀 Quick Setup Steps

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign up for a free account
3. Create a new cluster (choose the free tier)

### 2. Enable Data API
1. In your MongoDB Atlas dashboard, go to **Data API** (left sidebar)
2. Click **Create Data API**
3. Choose your cluster
4. Enable the Data API
5. Copy the **Data API URL** and **API Key**

### 3. Set Up Environment Variables
Create a `.env.local` file in your project root:

```env
# MongoDB Atlas Data API Configuration
REACT_APP_MONGODB_DATA_API_URL=https://data.mongodb-api.com/app/YOUR_APP_ID/endpoint/data/v1/action
REACT_APP_MONGODB_API_KEY=YOUR_API_KEY_HERE
REACT_APP_MONGODB_DATABASE=lacasa_boutique
REACT_APP_MONGODB_COLLECTION=bookings
```

**Replace these values:**
- `YOUR_APP_ID`: From your MongoDB Atlas Data API URL
- `YOUR_API_KEY`: From your MongoDB Atlas Data API settings

### 4. Database Setup
Your database will be created automatically when you first add a booking. The structure will be:
- **Database**: `lacasa_boutique`
- **Collection**: `bookings`

### 5. Test the Integration
1. Start your React app: `npm start`
2. Go to the Admin page
3. Try adding a test booking
4. Check your MongoDB Atlas database to see the data

## 🔧 Configuration Details

### Database Schema
Each booking document will have this structure:
```json
{
  "_id": "ObjectId",
  "id": "unique_booking_id",
  "roomId": 1,
  "roomName": "Room Name",
  "guestName": "Guest Name",
  "checkIn": "2024-01-01",
  "checkOut": "2024-01-03",
  "status": "booked",
  "notes": "Optional notes",
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T10:00:00.000Z"
}
```

### API Endpoints Used
- `insertOne` - Create new bookings
- `find` - Get bookings (all, by room, by date range)
- `findOne` - Get specific booking
- `updateOne` - Update existing booking
- `deleteOne` - Delete booking
- `deleteMany` - Clear all bookings (admin)

### Security Notes
- Your API key is exposed in the frontend (this is normal for MongoDB Data API)
- Configure IP whitelist in MongoDB Atlas for production
- Set up proper authentication rules in Atlas

## 🎯 Next Steps

1. **Test locally** with the environment variables
2. **Deploy to Vercel** - add environment variables in Vercel dashboard
3. **Set up production database** - create separate cluster for production
4. **Configure Atlas security** - IP whitelist, authentication rules

## 🔍 Troubleshooting

### Common Issues:
1. **API Key not working**: Double-check you copied the correct API key
2. **CORS errors**: Make sure Data API is enabled in Atlas
3. **Database not created**: It creates automatically on first write
4. **Network issues**: Check if your IP is whitelisted in Atlas

### Debug Steps:
1. Check browser console for API errors
2. Verify environment variables are loaded
3. Test API directly with Postman/curl
4. Check MongoDB Atlas logs

## 📱 Production Deployment

When deploying to Vercel:
1. Add environment variables in Vercel dashboard
2. Use production MongoDB cluster
3. Configure Atlas IP whitelist (add `0.0.0.0/0` for Vercel)
4. Monitor usage and performance

---

Your booking system is now ready for production with real database persistence! 🎉 