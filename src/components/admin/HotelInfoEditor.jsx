import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  getFileContent,
  updateFile,
  generateHotelInfoFileContent
} from '../../utils/github';

const HotelInfoEditor = ({ hotelInfo, setHotelInfo, authData }) => {
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: hotelInfo.name,
      shortName: hotelInfo.shortName,
      tagline: hotelInfo.tagline,
      description: hotelInfo.description,
      // Contact
      address: hotelInfo.contact.address,
      phone: hotelInfo.contact.phone,
      phoneSecondary: hotelInfo.contact.phoneSecondary,
      phoneThird: hotelInfo.contact.phoneThird,
      email: hotelInfo.contact.email,
      website: hotelInfo.contact.website,
      // Location
      lat: hotelInfo.contact.location.lat,
      lng: hotelInfo.contact.location.lng,
      city: hotelInfo.contact.location.city,
      country: hotelInfo.contact.location.country,
      zipCode: hotelInfo.contact.location.zipCode,
      // Hours
      reception: hotelInfo.hours.reception,
      checkIn: hotelInfo.hours.checkIn,
      checkOut: hotelInfo.hours.checkOut,
      restaurantBreakfast: hotelInfo.hours.restaurant.breakfast,
      restaurantLunch: hotelInfo.hours.restaurant.lunch,
      restaurantDinner: hotelInfo.hours.restaurant.dinner,
      // Social
      facebook: hotelInfo.social.facebook,
      instagram: hotelInfo.social.instagram,
      twitter: hotelInfo.social.twitter,
      linkedin: hotelInfo.social.linkedin,
      // Features
      totalRooms: hotelInfo.features.totalRooms,
      totalSuites: hotelInfo.features.totalSuites,
      floors: hotelInfo.features.floors,
      established: hotelInfo.features.established,
      rating: hotelInfo.features.rating,
      // Transportation
      airportDistance: hotelInfo.transportation.airport.distance,
      airportTime: hotelInfo.transportation.airport.time,
      airportTransferAvailable: hotelInfo.transportation.airport.transferService.available,
      airportBookingRequired: hotelInfo.transportation.airport.transferService.bookingRequired,
      airportTransferDescription: hotelInfo.transportation.airport.transferService.description,
      parkingAvailable: hotelInfo.transportation.parking.available,
      parkingType: hotelInfo.transportation.parking.type,
      parkingSpaces: hotelInfo.transportation.parking.spaces,
      // Policies
      petPolicy: hotelInfo.policies.petPolicy,
      smokingPolicy: hotelInfo.policies.smokingPolicy,
      cancellation: hotelInfo.policies.cancellation,
      childPolicy: hotelInfo.policies.childPolicy,
    }
  });

  const onSubmit = (data) => {
    const updatedHotelInfo = {
      name: data.name,
      shortName: data.shortName,
      tagline: data.tagline,
      description: data.description,
      contact: {
        address: data.address,
        phone: data.phone,
        phoneSecondary: data.phoneSecondary,
        phoneThird: data.phoneThird,
        email: data.email,
        website: data.website,
        location: {
          lat: parseFloat(data.lat),
          lng: parseFloat(data.lng),
          city: data.city,
          country: data.country,
          zipCode: data.zipCode,
        },
      },
      hours: {
        reception: data.reception,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        restaurant: {
          breakfast: data.restaurantBreakfast,
          lunch: data.restaurantLunch,
          dinner: data.restaurantDinner,
        },
      },
      social: {
        facebook: data.facebook,
        instagram: data.instagram,
        twitter: data.twitter,
        linkedin: data.linkedin,
      },
      features: {
        totalRooms: parseInt(data.totalRooms),
        totalSuites: parseInt(data.totalSuites),
        floors: parseInt(data.floors),
        established: parseInt(data.established),
        rating: parseInt(data.rating),
      },
      transportation: {
        airport: {
          distance: data.airportDistance,
          time: data.airportTime,
          methods: hotelInfo.transportation.airport.methods,
          transferService: {
            available: data.airportTransferAvailable,
            bookingRequired: data.airportBookingRequired,
            description: data.airportTransferDescription,
          },
        },
        parking: {
          available: data.parkingAvailable,
          type: data.parkingType,
          spaces: parseInt(data.parkingSpaces),
        },
      },
      policies: {
        petPolicy: data.petPolicy,
        smokingPolicy: data.smokingPolicy,
        cancellation: data.cancellation,
        childPolicy: data.childPolicy,
      },
    };

    setHotelInfo(updatedHotelInfo);
    setSaveStatus({ type: 'success', message: 'Hotel info updated locally. Click "Deploy to GitHub" to save permanently.' });
  };

  const deployToGitHub = async () => {
    setSaving(true);
    setSaveStatus(null);

    try {
      const { token, owner, repo } = authData;
      const filePath = 'src/data/hotelInfo.js';

      const { sha } = await getFileContent(token, owner, repo, filePath);
      const content = generateHotelInfoFileContent(hotelInfo);

      await updateFile(
        token,
        owner,
        repo,
        filePath,
        content,
        `Update hotel info via admin panel`,
        sha
      );

      setSaveStatus({
        type: 'deployed',
        message: 'Successfully deployed! Vercel will redeploy automatically.'
      });
    } catch (error) {
      setSaveStatus({
        type: 'error',
        message: `Failed to deploy: ${error.message}`
      });
    } finally {
      setSaving(false);
    }
  };

  const Section = ({ title, children }) => (
    <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        {title}
      </h3>
      {children}
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Hotel Information</h2>
          <p className="text-slate-400 text-sm mt-1">Edit hotel details, contact info, and policies</p>
        </div>

        <button
          onClick={deployToGitHub}
          disabled={saving}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
        >
          {saving ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Deploying...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Deploy to GitHub
            </>
          )}
        </button>
      </div>

      {/* Status Message */}
      {saveStatus && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-xl border ${
            saveStatus.type === 'deployed'
              ? 'bg-green-500/10 border-green-500/20 text-green-400'
              : saveStatus.type === 'error'
              ? 'bg-red-500/10 border-red-500/20 text-red-400'
              : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
          }`}
        >
          {saveStatus.message}
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <Section title="🏨 Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Hotel Name</label>
              <input
                {...register('name')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Short Name</label>
              <input
                {...register('shortName')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Tagline</label>
              <input
                {...register('tagline')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />
          </div>
        </Section>

        {/* Contact Info */}
        <Section title="📞 Contact Information">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Address</label>
              <input
                {...register('address')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
              <input
                {...register('phone')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Phone Secondary</label>
              <input
                {...register('phoneSecondary')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Phone Third</label>
              <input
                {...register('phoneThird')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Website</label>
              <input
                {...register('website')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </Section>

        {/* Location */}
        <Section title="📍 Location">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Latitude</label>
              <input
                type="number"
                step="any"
                {...register('lat')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Longitude</label>
              <input
                type="number"
                step="any"
                {...register('lng')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">City</label>
              <input
                {...register('city')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Country</label>
              <input
                {...register('country')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Zip Code</label>
              <input
                {...register('zipCode')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </Section>

        {/* Hours */}
        <Section title="🕐 Business Hours">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Reception</label>
              <input
                {...register('reception')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Check-In</label>
              <input
                {...register('checkIn')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Check-Out</label>
              <input
                {...register('checkOut')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Breakfast</label>
              <input
                {...register('restaurantBreakfast')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Lunch</label>
              <input
                {...register('restaurantLunch')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Dinner</label>
              <input
                {...register('restaurantDinner')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </Section>

        {/* Social Media */}
        <Section title="📱 Social Media">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Facebook</label>
              <input
                {...register('facebook')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Instagram</label>
              <input
                {...register('instagram')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Twitter</label>
              <input
                {...register('twitter')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">LinkedIn</label>
              <input
                {...register('linkedin')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </Section>

        {/* Hotel Features */}
        <Section title="⭐ Hotel Features">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Total Rooms</label>
              <input
                type="number"
                {...register('totalRooms')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Total Suites</label>
              <input
                type="number"
                {...register('totalSuites')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Floors</label>
              <input
                type="number"
                {...register('floors')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Established</label>
              <input
                type="number"
                {...register('established')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Rating (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                {...register('rating')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </Section>

        {/* Transportation */}
        <Section title="🚗 Transportation">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Airport Distance</label>
              <input
                {...register('airportDistance')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Airport Time</label>
              <input
                {...register('airportTime')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Parking Type</label>
              <input
                {...register('parkingType')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Parking Spaces</label>
              <input
                type="number"
                {...register('parkingSpaces')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-3 p-3 bg-slate-900/30 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                {...register('airportTransferAvailable')}
                className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500"
              />
              <span className="text-sm text-slate-300">Airport Transfer Available</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-slate-900/30 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                {...register('airportBookingRequired')}
                className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500"
              />
              <span className="text-sm text-slate-300">Booking Required</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-slate-900/30 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                {...register('parkingAvailable')}
                className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500"
              />
              <span className="text-sm text-slate-300">Parking Available</span>
            </label>
          </div>
        </Section>

        {/* Policies */}
        <Section title="📋 Policies">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Pet Policy</label>
              <input
                {...register('petPolicy')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Smoking Policy</label>
              <input
                {...register('smokingPolicy')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Cancellation Policy</label>
              <input
                {...register('cancellation')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Child Policy</label>
              <input
                {...register('childPolicy')}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </Section>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold rounded-xl transition-all"
          >
            Save Changes Locally
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelInfoEditor;

