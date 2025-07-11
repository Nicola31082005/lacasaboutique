import React, { useState } from 'react';
import { useBookings } from '../context/BookingContext';
import { useLanguage } from '../context/LanguageContext';
import { rooms } from '../data/rooms';
import RoomCalendar from '../components/common/RoomCalendar';

const Admin = () => {
  const {
    createBooking,
    deleteBooking,
    BOOKING_STATUS
  } = useBookings();
  
  const { t } = useLanguage();
  
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Simple booking form state
  const [bookingForm, setBookingForm] = useState({
    guestName: '',
    checkIn: '',
    checkOut: '',
    status: BOOKING_STATUS.BOOKED,
    notes: ''
  });

  // Handle date selection from calendar
  const handleDateSelect = (dateStr, dayData) => {
    if (dayData.booking) {
      // If date has booking, offer to remove it
      if (window.confirm(`Remove booking for ${dateStr}?`)) {
        handleRemoveBooking(dayData.booking.id);
      }
    } else {
      // If date is available, offer to add booking
      setSelectedDate(dateStr);
      setBookingForm({
        ...bookingForm,
        checkIn: dateStr,
        checkOut: dateStr
      });
      setShowBookingModal(true);
    }
  };

  // Handle booking form submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (!selectedRoom) {
        alert('Please select a room first');
        return;
      }

      const bookingData = {
        roomId: selectedRoom.id,
        roomName: selectedRoom.name,
        guestName: bookingForm.guestName,
        checkIn: bookingForm.checkIn,
        checkOut: bookingForm.checkOut,
        status: bookingForm.status,
        notes: bookingForm.notes
      };

      await createBooking(bookingData);
      alert('Booking added successfully!');
      setShowBookingModal(false);
      resetBookingForm();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  // Reset booking form
  const resetBookingForm = () => {
    setBookingForm({
      guestName: '',
      checkIn: '',
      checkOut: '',
      status: BOOKING_STATUS.BOOKED,
      notes: ''
    });
  };

  // Handle remove booking
  const handleRemoveBooking = async (bookingId) => {
    try {
      await deleteBooking(bookingId);
      alert('Booking removed successfully!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">Room Calendar Management</h1>
            <p className="text-sm text-gray-600">
              Click on available dates to add bookings, or on booked dates to remove them
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Room Selection */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Room to Manage</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rooms.map(room => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={`p-4 text-left rounded-lg border-2 transition-colors ${
                    selectedRoom?.id === room.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-800">{room.name}</div>
                  <div className="text-sm text-gray-600">{room.type}</div>
                  <div className="text-sm text-gray-500">{room.size}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Calendar */}
          {selectedRoom && (
            <div className="bg-white p-6 rounded-lg shadow">
              <RoomCalendar
                roomId={selectedRoom.id}
                roomName={selectedRoom.name}
                onDateSelect={handleDateSelect}
                showBookingDetails={true}
              />
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">How to use:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Click on green (available) dates to add a booking</li>
                  <li>• Click on red (booked) dates to remove the booking</li>
                  <li>• Orange dates are blocked for maintenance</li>
                  <li>• Gray dates are in the past and cannot be modified</li>
                </ul>
              </div>
            </div>
          )}

          {!selectedRoom && (
            <div className="bg-white p-12 rounded-lg shadow text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Select a Room</h3>
              <p className="text-gray-600">Choose a room from above to manage its calendar</p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Add Booking
                </h3>
                <button
                  onClick={() => {
                    setShowBookingModal(false);
                    resetBookingForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guest Name
                  </label>
                  <input
                    type="text"
                    value={bookingForm.guestName}
                    onChange={(e) => setBookingForm({...bookingForm, guestName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter guest name or leave blank for blocked dates"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      value={bookingForm.checkIn}
                      onChange={(e) => setBookingForm({...bookingForm, checkIn: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      value={bookingForm.checkOut}
                      onChange={(e) => setBookingForm({...bookingForm, checkOut: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={bookingForm.status}
                    onChange={(e) => setBookingForm({...bookingForm, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={BOOKING_STATUS.BOOKED}>Booked</option>
                    <option value={BOOKING_STATUS.BLOCKED}>Blocked</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Optional notes..."
                  />
                </div>

                <div className="flex items-center justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowBookingModal(false);
                      resetBookingForm();
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin; 