// Simple booking status
export const BOOKING_STATUS = {
  BOOKED: 'booked',
  BLOCKED: 'blocked' // For maintenance or admin blocks
};

// Storage key for localStorage
const BOOKINGS_STORAGE_KEY = 'lacasa_bookings';

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

// Booking management class
export class BookingManager {
  constructor() {
    this.bookings = [];
    this.loadFromStorage();
  }

  // Load bookings from localStorage
  loadFromStorage() {
    try {
      const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      if (stored) {
        const bookingsData = JSON.parse(stored);
        this.bookings = bookingsData.map(data => Booking.fromJSON(data));
      }
    } catch (error) {
      console.error('Error loading bookings from storage:', error);
      this.bookings = [];
    }
  }

  // Save bookings to localStorage
  saveToStorage() {
    try {
      const bookingsData = this.bookings.map(booking => booking.toJSON());
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookingsData));
    } catch (error) {
      console.error('Error saving bookings to storage:', error);
    }
  }

  // Create new booking
  createBooking(bookingData) {
    const booking = new Booking(bookingData);
    
    // Check for conflicts
    if (this.hasConflict(booking)) {
      throw new Error('Booking conflicts with existing reservation');
    }
    
    this.bookings.push(booking);
    this.saveToStorage();
    return booking;
  }

  // Update existing booking
  updateBooking(id, updates) {
    const booking = this.getBookingById(id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    
    // Create temporary booking with updates to check for conflicts
    const tempBooking = new Booking({ ...booking.toJSON(), ...updates });
    
    // Check for conflicts (exclude current booking)
    if (this.hasConflict(tempBooking, id)) {
      throw new Error('Updated booking conflicts with existing reservation');
    }
    
    booking.update(updates);
    this.saveToStorage();
    return booking;
  }

  // Delete booking
  deleteBooking(id) {
    const index = this.bookings.findIndex(booking => booking.id === id);
    if (index === -1) {
      throw new Error('Booking not found');
    }
    
    this.bookings.splice(index, 1);
    this.saveToStorage();
  }

  // Get booking by ID
  getBookingById(id) {
    return this.bookings.find(booking => booking.id === id);
  }

  // Get all bookings
  getAllBookings() {
    return this.bookings;
  }

  // Get bookings for a specific room
  getBookingsByRoom(roomId) {
    return this.bookings.filter(booking => booking.roomId === roomId);
  }

  // Get bookings for a specific date range
  getBookingsByDateRange(startDate, endDate) {
    return this.bookings.filter(booking => 
      isDateInRange(booking.checkIn, startDate, endDate) ||
      isDateInRange(booking.checkOut, startDate, endDate) ||
      (booking.checkIn <= startDate && booking.checkOut >= endDate)
    );
  }

  // Check if a booking conflicts with existing bookings
  hasConflict(newBooking, excludeId = null) {
    return this.bookings.some(existing => {
      // Skip the booking we're updating
      if (excludeId && existing.id === excludeId) {
        return false;
      }
      
      // Only check bookings for the same room
      if (existing.roomId !== newBooking.roomId) {
        return false;
      }
      
      // Check for date overlap
      return (
        isDateInRange(newBooking.checkIn, existing.checkIn, existing.checkOut) ||
        isDateInRange(newBooking.checkOut, existing.checkIn, existing.checkOut) ||
        (newBooking.checkIn <= existing.checkIn && newBooking.checkOut >= existing.checkOut)
      );
    });
  }

  // Check if a specific date is available for a room
  isDateAvailable(roomId, date) {
    return !this.bookings.some(booking => 
      booking.roomId === roomId &&
      booking.coversDate(date)
    );
  }

  // Get available dates for a room in a given month
  getAvailableDates(roomId, year, month) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const dates = getDateRange(startDate, endDate);
    
    return dates.filter(date => this.isDateAvailable(roomId, date));
  }

  // Get booked dates for a room in a given month
  getBookedDates(roomId, year, month) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const dates = getDateRange(startDate, endDate);
    
    return dates.filter(date => !this.isDateAvailable(roomId, date));
  }

  // Clear all bookings (for admin)
  clearAllBookings() {
    this.bookings = [];
    this.saveToStorage();
  }
}

// Create singleton instance
export const bookingManager = new BookingManager();

// Utility functions for React components
export const useBookingManager = () => {
  return bookingManager;
};

export default bookingManager; 