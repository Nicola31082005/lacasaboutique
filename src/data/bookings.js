import { mongoAPI } from './mongoConfig.js';

// Simple booking status
export const BOOKING_STATUS = {
  BOOKED: 'booked',
  BLOCKED: 'blocked' // For maintenance or admin blocks
};

// Utility functions for date handling
export const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

export const parseDate = (dateString) => {
  return new Date(dateString);
};

export const getDateRange = (startDate, endDate) => {
  const dates = [];
  const current = new Date(startDate);
  const end = new Date(endDate);
  
  while (current <= end) {
    dates.push(formatDate(current));
    current.setDate(current.getDate() + 1);
  }
  
  return dates;
};

export const isDateInRange = (date, startDate, endDate) => {
  const checkDate = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return checkDate >= start && checkDate <= end;
};

// Simplified booking data structure
export class Booking {
  constructor({
    id = null,
    roomId,
    roomName,
    guestName = '',
    checkIn,
    checkOut,
    status = BOOKING_STATUS.BOOKED,
    notes = ''
  }) {
    this.id = id || this.generateId();
    this.roomId = roomId;
    this.roomName = roomName;
    this.guestName = guestName;
    this.checkIn = formatDate(checkIn);
    this.checkOut = formatDate(checkOut);
    this.status = status;
    this.notes = notes;
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Get all dates covered by this booking
  getDatesRange() {
    return getDateRange(this.checkIn, this.checkOut);
  }

  // Check if booking covers a specific date
  coversDate(date) {
    return isDateInRange(date, this.checkIn, this.checkOut);
  }

  // Get number of nights
  getNumberOfNights() {
    const start = new Date(this.checkIn);
    const end = new Date(this.checkOut);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Update booking
  update(updates) {
    Object.assign(this, updates);
  }

  // Convert to JSON for storage
  toJSON() {
    return {
      id: this.id,
      roomId: this.roomId,
      roomName: this.roomName,
      guestName: this.guestName,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      status: this.status,
      notes: this.notes
    };
  }

  // Create from JSON
  static fromJSON(data) {
    return new Booking(data);
  }
}

// Booking management class with MongoDB Atlas Data API
export class BookingManager {
  constructor() {
    this.mongoAPI = mongoAPI;
  }

  // Create new booking
  async createBooking(bookingData) {
    try {
      const booking = new Booking(bookingData);
      
      // Check for conflicts
      const hasConflict = await this.mongoAPI.checkConflicts(booking.toJSON());
      if (hasConflict) {
        throw new Error('Booking conflicts with existing reservation');
      }
      
      const result = await this.mongoAPI.createBooking(booking.toJSON());
      return booking;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }

  // Update existing booking
  async updateBooking(id, updates) {
    try {
      const existingBooking = await this.mongoAPI.getBookingById(id);
      if (!existingBooking) {
        throw new Error('Booking not found');
      }
      
      // Create temporary booking with updates to check for conflicts
      const tempBookingData = { ...existingBooking, ...updates };
      const tempBooking = new Booking(tempBookingData);
      
      // Check for conflicts (exclude current booking)
      const hasConflict = await this.mongoAPI.checkConflicts(tempBooking.toJSON(), id);
      if (hasConflict) {
        throw new Error('Updated booking conflicts with existing reservation');
      }
      
      const result = await this.mongoAPI.updateBooking(id, updates);
      return Booking.fromJSON({ ...existingBooking, ...updates });
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  }

  // Delete booking
  async deleteBooking(id) {
    try {
      const result = await this.mongoAPI.deleteBooking(id);
      if (result.deletedCount === 0) {
        throw new Error('Booking not found');
      }
      return result;
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  }

  // Get booking by ID
  async getBookingById(id) {
    try {
      const bookingData = await this.mongoAPI.getBookingById(id);
      return bookingData ? Booking.fromJSON(bookingData) : null;
    } catch (error) {
      console.error('Error getting booking by ID:', error);
      throw error;
    }
  }

  // Get all bookings
  async getAllBookings() {
    try {
      const bookingsData = await this.mongoAPI.getAllBookings();
      return bookingsData.map(data => Booking.fromJSON(data));
    } catch (error) {
      console.error('Error getting all bookings:', error);
      throw error;
    }
  }

  // Get bookings for a specific room
  async getBookingsByRoom(roomId) {
    try {
      const bookingsData = await this.mongoAPI.getBookingsByRoom(roomId);
      return bookingsData.map(data => Booking.fromJSON(data));
    } catch (error) {
      console.error('Error getting bookings by room:', error);
      throw error;
    }
  }

  // Get bookings for a specific date range
  async getBookingsByDateRange(startDate, endDate) {
    try {
      const bookingsData = await this.mongoAPI.getBookingsByDateRange(startDate, endDate);
      return bookingsData.map(data => Booking.fromJSON(data));
    } catch (error) {
      console.error('Error getting bookings by date range:', error);
      throw error;
    }
  }

  // Check if booking conflicts with existing bookings
  async hasConflict(newBooking, excludeId = null) {
    try {
      return await this.mongoAPI.checkConflicts(newBooking, excludeId);
    } catch (error) {
      console.error('Error checking conflicts:', error);
      throw error;
    }
  }

  // Check if a specific date is available for a room
  async isDateAvailable(roomId, date) {
    try {
      const bookingsData = await this.mongoAPI.getBookingsByRoom(roomId);
      const bookings = bookingsData.map(data => Booking.fromJSON(data));
      
      return !bookings.some(booking => booking.coversDate(date));
    } catch (error) {
      console.error('Error checking date availability:', error);
      throw error;
    }
  }

  // Get available dates for a room in a given month
  async getAvailableDates(roomId, year, month) {
    try {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      const dates = getDateRange(startDate, endDate);
      
      const bookedBookings = await this.mongoAPI.getBookedDatesForRoom(roomId, year, month);
      const bookedDates = new Set();
      
      bookedBookings.forEach(booking => {
        const bookingObj = Booking.fromJSON(booking);
        const bookingDates = bookingObj.getDatesRange();
        bookingDates.forEach(date => bookedDates.add(date));
      });
      
      return dates.filter(date => !bookedDates.has(date));
    } catch (error) {
      console.error('Error getting available dates:', error);
      throw error;
    }
  }

  // Get booked dates for a room in a given month
  async getBookedDates(roomId, year, month) {
    try {
      const bookedBookings = await this.mongoAPI.getBookedDatesForRoom(roomId, year, month);
      const bookedDates = new Set();
      
      bookedBookings.forEach(booking => {
        const bookingObj = Booking.fromJSON(booking);
        const bookingDates = bookingObj.getDatesRange();
        bookingDates.forEach(date => bookedDates.add(date));
      });
      
      return Array.from(bookedDates);
    } catch (error) {
      console.error('Error getting booked dates:', error);
      throw error;
    }
  }

  // Clear all bookings (for admin)
  async clearAllBookings() {
    try {
      const result = await this.mongoAPI.clearAllBookings();
      return result;
    } catch (error) {
      console.error('Error clearing all bookings:', error);
      throw error;
    }
  }
}

// Create singleton instance
export const bookingManager = new BookingManager();

// Utility functions for React components
export const useBookingManager = () => {
  return bookingManager;
};

export default bookingManager; 