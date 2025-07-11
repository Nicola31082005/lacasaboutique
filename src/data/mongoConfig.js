// MongoDB Atlas Data API Configuration
export const MONGODB_CONFIG = {
  dataApiUrl: process.env.REACT_APP_MONGODB_DATA_API_URL || 'https://data.mongodb-api.com/app/YOUR_APP_ID/endpoint/data/v1/action',
  apiKey: process.env.REACT_APP_MONGODB_API_KEY || 'YOUR_API_KEY_HERE',
  database: process.env.REACT_APP_MONGODB_DATABASE || 'lacasa_boutique',
  collection: process.env.REACT_APP_MONGODB_COLLECTION || 'bookings'
};

// MongoDB Atlas Data API utility functions
export class MongoDBAPI {
  constructor() {
    this.baseURL = MONGODB_CONFIG.dataApiUrl;
    this.apiKey = MONGODB_CONFIG.apiKey;
    this.database = MONGODB_CONFIG.database;
    this.collection = MONGODB_CONFIG.collection;
  }

  // Generic API call method
  async makeAPICall(action, data = {}) {
    const url = `${this.baseURL}/${action}`;
    
    const payload = {
      dataSource: 'Cluster0', // Default cluster name
      database: this.database,
      collection: this.collection,
      ...data
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'api-key': this.apiKey
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`MongoDB API Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('MongoDB API Call Error:', error);
      throw error;
    }
  }

  // Create a new booking
  async createBooking(bookingData) {
    const result = await this.makeAPICall('insertOne', {
      document: {
        ...bookingData,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
    return result;
  }

  // Get all bookings
  async getAllBookings() {
    const result = await this.makeAPICall('find', {
      filter: {}
    });
    return result.documents || [];
  }

  // Get booking by ID
  async getBookingById(id) {
    const result = await this.makeAPICall('findOne', {
      filter: { id: id }
    });
    return result.document;
  }

  // Get bookings by room ID
  async getBookingsByRoom(roomId) {
    const result = await this.makeAPICall('find', {
      filter: { roomId: roomId }
    });
    return result.documents || [];
  }

  // Get bookings by date range
  async getBookingsByDateRange(startDate, endDate) {
    const result = await this.makeAPICall('find', {
      filter: {
        $or: [
          {
            checkIn: {
              $gte: startDate,
              $lte: endDate
            }
          },
          {
            checkOut: {
              $gte: startDate,
              $lte: endDate
            }
          },
          {
            $and: [
              { checkIn: { $lte: startDate } },
              { checkOut: { $gte: endDate } }
            ]
          }
        ]
      }
    });
    return result.documents || [];
  }

  // Update a booking
  async updateBooking(id, updates) {
    const result = await this.makeAPICall('updateOne', {
      filter: { id: id },
      update: {
        $set: {
          ...updates,
          updatedAt: new Date()
        }
      }
    });
    return result;
  }

  // Delete a booking
  async deleteBooking(id) {
    const result = await this.makeAPICall('deleteOne', {
      filter: { id: id }
    });
    return result;
  }

  // Check for booking conflicts
  async checkConflicts(newBooking, excludeId = null) {
    const filter = {
      roomId: newBooking.roomId,
      $or: [
        {
          checkIn: {
            $lte: newBooking.checkOut,
            $gte: newBooking.checkIn
          }
        },
        {
          checkOut: {
            $lte: newBooking.checkOut,
            $gte: newBooking.checkIn
          }
        },
        {
          $and: [
            { checkIn: { $lte: newBooking.checkIn } },
            { checkOut: { $gte: newBooking.checkOut } }
          ]
        }
      ]
    };

    if (excludeId) {
      filter.id = { $ne: excludeId };
    }

    const result = await this.makeAPICall('find', {
      filter: filter
    });
    
    return (result.documents || []).length > 0;
  }

  // Get available dates for a room
  async getBookedDatesForRoom(roomId, year, month) {
    const startDate = new Date(year, month - 1, 1).toISOString().split('T')[0];
    const endDate = new Date(year, month, 0).toISOString().split('T')[0];
    
    const result = await this.makeAPICall('find', {
      filter: {
        roomId: roomId,
        $or: [
          {
            checkIn: {
              $lte: endDate,
              $gte: startDate
            }
          },
          {
            checkOut: {
              $lte: endDate,
              $gte: startDate
            }
          },
          {
            $and: [
              { checkIn: { $lte: startDate } },
              { checkOut: { $gte: endDate } }
            ]
          }
        ]
      }
    });
    
    return result.documents || [];
  }

  // Clear all bookings (admin function)
  async clearAllBookings() {
    const result = await this.makeAPICall('deleteMany', {
      filter: {}
    });
    return result;
  }
}

// Create singleton instance
export const mongoAPI = new MongoDBAPI();
export default mongoAPI; 