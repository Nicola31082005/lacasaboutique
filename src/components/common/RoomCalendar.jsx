import React, { useState, useEffect, useMemo } from 'react';
import { useBookings } from '../../context/BookingContext';
import { useLanguage } from '../../context/LanguageContext';

const RoomCalendar = ({ roomId, roomName, onDateSelect, selectedDates = [], showBookingDetails = false }) => {
  const { isDateAvailable, getBookingsByRoom, BOOKING_STATUS } = useBookings();
  const { t } = useLanguage();
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [hoveredDate, setHoveredDate] = useState(null);

  // Get month data
  const monthData = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const roomBookings = getBookingsByRoom(roomId);
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const dateStr = date.toISOString().split('T')[0];
      const isCurrentMonth = date.getMonth() === month;
      const isToday = dateStr === new Date().toISOString().split('T')[0];
      const isAvailable = isDateAvailable(roomId, dateStr);
      const isPast = date < new Date().setHours(0, 0, 0, 0);
      
      // Find booking for this date
      const dayBooking = roomBookings.find(booking => 
        booking.coversDate(dateStr)
      );
      
      days.push({
        date,
        dateStr,
        day: date.getDate(),
        isCurrentMonth,
        isToday,
        isAvailable: isAvailable && !isPast,
        isPast,
        booking: dayBooking,
        isSelected: selectedDates.includes(dateStr),
        isInRange: selectedRange.start && selectedRange.end && 
                   dateStr >= selectedRange.start && dateStr <= selectedRange.end
      });
    }
    
    return days;
  }, [currentMonth, roomId, getBookingsByRoom, isDateAvailable, selectedDates, selectedRange]);

  // Month navigation
  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  // Date selection
  const handleDateClick = (day) => {
    if (day.isPast || !day.isCurrentMonth) return;
    
    if (onDateSelect) {
      onDateSelect(day.dateStr, day);
    }
    
    // Range selection logic
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: day.dateStr, end: null });
    } else if (selectedRange.start && !selectedRange.end) {
      if (day.dateStr >= selectedRange.start) {
        setSelectedRange({ ...selectedRange, end: day.dateStr });
      } else {
        setSelectedRange({ start: day.dateStr, end: selectedRange.start });
      }
    }
  };

  // Get day class names
  const getDayClassName = (day) => {
    const baseClasses = "w-10 h-10 flex items-center justify-center text-sm font-medium cursor-pointer relative transition-all duration-200";
    
    let classes = [baseClasses];
    
    if (!day.isCurrentMonth) {
      classes.push("text-gray-400 cursor-not-allowed");
    } else if (day.isPast) {
      classes.push("text-gray-400 cursor-not-allowed");
    } else if (day.isToday) {
      classes.push("bg-blue-100 text-blue-800 font-bold");
    } else {
      classes.push("text-gray-900");
    }
    
    if (day.isSelected) {
      classes.push("bg-blue-500 text-white");
    } else if (day.isInRange) {
      classes.push("bg-blue-100 text-blue-800");
    }
    
    // Booking status colors
    if (day.booking && day.isCurrentMonth && !day.isPast) {
      switch (day.booking.status) {
        case BOOKING_STATUS.BOOKED:
          classes.push("bg-red-100 text-red-800 border-2 border-red-300");
          break;
        case BOOKING_STATUS.BLOCKED:
          classes.push("bg-orange-100 text-orange-800 border-2 border-orange-300");
          break;
      }
    } else if (day.isAvailable && day.isCurrentMonth && !day.isPast) {
      classes.push("bg-green-50 text-green-800 hover:bg-green-100");
    }
    
    return classes.join(" ");
  };

  // Get booking tooltip
  const getBookingTooltip = (day) => {
    if (!day.booking) return null;
    
    const { guestName, checkIn, checkOut, status, notes } = day.booking;
    
    return (
      <div className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg p-3 text-xs w-64 -top-2 left-12 transform">
        <div className="font-semibold text-gray-800 mb-2">
          {status === BOOKING_STATUS.BLOCKED ? 'Blocked' : 
           guestName || 'Guest'}
        </div>
        <div className="space-y-1 text-gray-600">
          <div>Check-in: {checkIn}</div>
          <div>Check-out: {checkOut}</div>
          <div>Status: {status}</div>
          {notes && <div>Notes: {notes}</div>}
        </div>
      </div>
    );
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {roomName} - Availability Calendar
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {/* Day headers */}
        {dayNames.map(day => (
          <div key={day} className="h-10 flex items-center justify-center text-sm font-semibold text-gray-600">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {monthData.map((day, index) => (
          <div
            key={index}
            className={getDayClassName(day)}
            onClick={() => handleDateClick(day)}
            onMouseEnter={() => setHoveredDate(day.dateStr)}
            onMouseLeave={() => setHoveredDate(null)}
          >
            {day.day}
            
            {/* Booking indicator */}
            {day.booking && day.isCurrentMonth && (
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-current rounded-full"></div>
            )}
            
            {/* Tooltip */}
            {showBookingDetails && hoveredDate === day.dateStr && day.booking && (
              getBookingTooltip(day)
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded"></div>
          <span>Booked</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-orange-100 border-2 border-orange-300 rounded"></div>
          <span>Blocked</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-100 border-2 border-gray-300 rounded"></div>
          <span>Past/Unavailable</span>
        </div>
      </div>
      
      {/* Selected range display */}
      {selectedRange.start && selectedRange.end && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            Selected range: {selectedRange.start} to {selectedRange.end}
          </p>
        </div>
      )}
    </div>
  );
};

export default RoomCalendar; 