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
      
      // Since we're using localStorage, this is synchronous
      const allBookings = bookingManager.getAllBookings();
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
      const newBooking = bookingManager.createBooking(bookingData);
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
      const updatedBooking = bookingManager.updateBooking(id, updates);
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
      bookingManager.deleteBooking(id);
      setBookings(prev => prev.filter(booking => booking.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);



  // Get bookings for a specific room
  const getBookingsByRoom = useCallback((roomId) => {
    return bookings.filter(booking => booking.roomId === roomId);
  }, [bookings]);

  // Get bookings for a specific date range
  const getBookingsByDateRange = useCallback((startDate, endDate) => {
    return bookingManager.getBookingsByDateRange(startDate, endDate);
  }, []);

  // Check if a date is available for a room
  const isDateAvailable = useCallback((roomId, date) => {
    return bookingManager.isDateAvailable(roomId, date);
  }, []);

  // Get available dates for a room in a month
  const getAvailableDates = useCallback((roomId, year, month) => {
    return bookingManager.getAvailableDates(roomId, year, month);
  }, []);

  // Get booked dates for a room in a month
  const getBookedDates = useCallback((roomId, year, month) => {
    return bookingManager.getBookedDates(roomId, year, month);
  }, []);

  // Check for booking conflicts
  const hasConflict = useCallback((bookingData, excludeId = null) => {
    return bookingManager.hasConflict(bookingData, excludeId);
  }, []);

  // Clear all bookings (for admin)
  const clearAllBookings = useCallback(async () => {
    try {
      setError(null);
      bookingManager.clearAllBookings();
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
    
    // Queries
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