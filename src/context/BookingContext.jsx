import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { bookingManager, BOOKING_STATUS } from '../data/bookings';

// Create booking context
const BookingContext = createContext();

// Custom hook to use booking context
export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};

// Booking provider component
export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load bookings on mount
  useEffect(() => {
    loadBookings();
  }, []);

  // Load bookings from booking manager
  const loadBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Now using MongoDB Atlas Data API - this is async
      const allBookings = await bookingManager.getAllBookings();
      setBookings(allBookings);
    } catch (err) {
      setError(err.message);
      console.error('Error loading bookings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new booking
  const createBooking = useCallback(async (bookingData) => {
    try {
      setError(null);
      const newBooking = await bookingManager.createBooking(bookingData);
      setBookings(prev => [...prev, newBooking]);
      return newBooking;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Update existing booking
  const updateBooking = useCallback(async (id, updates) => {
    try {
      setError(null);
      const updatedBooking = await bookingManager.updateBooking(id, updates);
      setBookings(prev => prev.map(booking => 
        booking.id === id ? updatedBooking : booking
      ));
      return updatedBooking;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Delete booking
  const deleteBooking = useCallback(async (id) => {
    try {
      setError(null);
      await bookingManager.deleteBooking(id);
      setBookings(prev => prev.filter(booking => booking.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Get bookings for a specific room
  const getBookingsByRoom = useCallback(async (roomId) => {
    try {
      const roomBookings = await bookingManager.getBookingsByRoom(roomId);
      return roomBookings;
    } catch (err) {
      console.error('Error getting bookings by room:', err);
      throw err;
    }
  }, []);

  // Get bookings for a specific date range
  const getBookingsByDateRange = useCallback(async (startDate, endDate) => {
    try {
      const dateRangeBookings = await bookingManager.getBookingsByDateRange(startDate, endDate);
      return dateRangeBookings;
    } catch (err) {
      console.error('Error getting bookings by date range:', err);
      throw err;
    }
  }, []);

  // Check if a date is available for a room
  const isDateAvailable = useCallback(async (roomId, date) => {
    try {
      const available = await bookingManager.isDateAvailable(roomId, date);
      return available;
    } catch (err) {
      console.error('Error checking date availability:', err);
      throw err;
    }
  }, []);

  // Get available dates for a room in a month
  const getAvailableDates = useCallback(async (roomId, year, month) => {
    try {
      const availableDates = await bookingManager.getAvailableDates(roomId, year, month);
      return availableDates;
    } catch (err) {
      console.error('Error getting available dates:', err);
      throw err;
    }
  }, []);

  // Get booked dates for a room in a month
  const getBookedDates = useCallback(async (roomId, year, month) => {
    try {
      const bookedDates = await bookingManager.getBookedDates(roomId, year, month);
      return bookedDates;
    } catch (err) {
      console.error('Error getting booked dates:', err);
      throw err;
    }
  }, []);

  // Check for booking conflicts
  const hasConflict = useCallback(async (bookingData, excludeId = null) => {
    try {
      const conflict = await bookingManager.hasConflict(bookingData, excludeId);
      return conflict;
    } catch (err) {
      console.error('Error checking conflicts:', err);
      throw err;
    }
  }, []);

  // Clear all bookings (for admin)
  const clearAllBookings = useCallback(async () => {
    try {
      setError(null);
      await bookingManager.clearAllBookings();
      setBookings([]);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Context value
  const value = {
    // State
    bookings,
    loading,
    error,
    
    // Actions
    loadBookings,
    createBooking,
    updateBooking,
    deleteBooking,
    
    // Queries (now all async)
    getBookingsByRoom,
    getBookingsByDateRange,
    isDateAvailable,
    getAvailableDates,
    getBookedDates,
    hasConflict,
    
    // Admin functions
    clearAllBookings,
    
    // Constants
    BOOKING_STATUS
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider; 