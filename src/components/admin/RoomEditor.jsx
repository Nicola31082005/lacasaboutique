import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getFileContent,
  updateFile,
  generateRoomsFileContent
} from '../../utils/github';

const RoomEditor = ({ rooms, setRooms, roomTypes, roomAmenities, authData }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const { register, handleSubmit, reset, watch, setValue } = useForm();

  const openEditor = (room) => {
    setSelectedRoom(room);
    reset({
      name: room.name,
      nameEn: room.nameEn,
      type: room.type,
      description: room.description,
      descriptionEn: room.descriptionEn,
      longDescription: room.longDescription,
      longDescriptionEn: room.longDescriptionEn,
      capacityAdults: room.capacity.adults,
      capacityChildren: room.capacity.children,
      bedConfiguration: room.bedConfiguration,
      bedConfigurationEn: room.bedConfigurationEn,
      basePrice: room.pricing.basePrice,
      currency: room.pricing.currency,
      discountWeekly: room.pricing.discounts.weekly * 100,
      discountMonthly: room.pricing.discounts.monthly * 100,
      discountEarlyBird: room.pricing.discounts.earlyBird * 100,
      images: room.images.join('\n'),
      amenities: room.amenities.map(a => a.id),
      smokingAllowed: room.features.smokingAllowed,
      petFriendly: room.features.petFriendly,
      accessible: room.features.accessible,
      soundproof: room.features.soundproof,
    });
  };

  const closeEditor = () => {
    setSelectedRoom(null);
    setSaveStatus(null);
  };

  const onSubmit = async (data) => {
    // Update room in local state
    const updatedRoom = {
      ...selectedRoom,
      name: data.name,
      nameEn: data.nameEn,
      type: data.type,
      description: data.description,
      descriptionEn: data.descriptionEn,
      longDescription: data.longDescription,
      longDescriptionEn: data.longDescriptionEn,
      capacity: {
        adults: parseInt(data.capacityAdults),
        children: parseInt(data.capacityChildren),
      },
      bedConfiguration: data.bedConfiguration,
      bedConfigurationEn: data.bedConfigurationEn,
      pricing: {
        basePrice: parseFloat(data.basePrice),
        currency: data.currency,
        period: selectedRoom.pricing.period,
        discounts: {
          weekly: parseFloat(data.discountWeekly) / 100,
          monthly: parseFloat(data.discountMonthly) / 100,
          earlyBird: parseFloat(data.discountEarlyBird) / 100,
        },
      },
      images: data.images.split('\n').map(img => img.trim()).filter(Boolean),
      amenities: data.amenities.map(id =>
        Object.values(roomAmenities).find(a => a.id === id)
      ).filter(Boolean),
      features: {
        smokingAllowed: data.smokingAllowed,
        petFriendly: data.petFriendly,
        accessible: data.accessible,
        soundproof: data.soundproof,
      },
    };

    const updatedRooms = rooms.map(r =>
      r.id === selectedRoom.id ? updatedRoom : r
    );

    setRooms(updatedRooms);
    setSelectedRoom(updatedRoom);
    setSaveStatus({ type: 'success', message: 'Room updated locally. Click "Deploy to GitHub" to save permanently.' });
  };

  const deployToGitHub = async () => {
    setSaving(true);
    setSaveStatus(null);

    try {
      const { token, owner, repo } = authData;
      const filePath = 'src/data/rooms.js';

      // Get current file to obtain SHA
      const { sha } = await getFileContent(token, owner, repo, filePath);

      // Generate new file content
      const content = generateRoomsFileContent(rooms, roomTypes, roomAmenities);

      // Commit to GitHub
      await updateFile(
        token,
        owner,
        repo,
        filePath,
        content,
        `Update rooms data via admin panel`,
        sha
      );

      setSaveStatus({
        type: 'deployed',
        message: 'Successfully deployed! Vercel will redeploy automatically (usually takes ~30 seconds).'
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

  const amenityOptions = Object.values(roomAmenities);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Rooms Management</h2>
          <p className="text-slate-400 text-sm mt-1">Edit room details, pricing, and amenities</p>
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
      {saveStatus && !selectedRoom && (
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

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <motion.div
            key={room.id}
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => openEditor(room)}
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={room.images[0]}
                alt={room.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-semibold">{room.name}</h3>
                <p className="text-amber-400 text-sm">{room.pricing.basePrice}{room.pricing.currency}/night</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span>👥 {room.capacity.adults} adults</span>
                <span>•</span>
                <span>{room.amenities.length} amenities</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto py-8 px-4"
            onClick={(e) => e.target === e.currentTarget && closeEditor()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-4xl shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700">
                <div>
                  <h3 className="text-xl font-bold text-white">Edit Room: {selectedRoom.name}</h3>
                  <p className="text-sm text-slate-400 mt-1">Make changes and save to update locally</p>
                </div>
                <button
                  onClick={closeEditor}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Status Message */}
                {saveStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl border ${
                      saveStatus.type === 'success'
                        ? 'bg-green-500/10 border-green-500/20 text-green-400'
                        : saveStatus.type === 'error'
                        ? 'bg-red-500/10 border-red-500/20 text-red-400'
                        : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                    }`}
                  >
                    {saveStatus.message}
                  </motion.div>
                )}

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Room Name (BG)</label>
                    <input
                      {...register('name')}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Room Name (EN)</label>
                    <input
                      {...register('nameEn')}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Room Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Room Type</label>
                  <select
                    {...register('type')}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {Object.entries(roomTypes).map(([key, value]) => (
                      <option key={key} value={value}>{key}</option>
                    ))}
                  </select>
                </div>

                {/* Descriptions */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Short Description (BG)</label>
                    <textarea
                      {...register('description')}
                      rows={3}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Short Description (EN)</label>
                    <textarea
                      {...register('descriptionEn')}
                      rows={3}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Long Description (BG)</label>
                    <textarea
                      {...register('longDescription')}
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Long Description (EN)</label>
                    <textarea
                      {...register('longDescriptionEn')}
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    />
                  </div>
                </div>

                {/* Capacity & Bed */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Adults</label>
                    <input
                      type="number"
                      {...register('capacityAdults')}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Children</label>
                    <input
                      type="number"
                      {...register('capacityChildren')}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Bed Config (BG)</label>
                    <input
                      {...register('bedConfiguration')}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Bed Config (EN)</label>
                    <input
                      {...register('bedConfigurationEn')}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-slate-900/30 rounded-xl p-4">
                  <h4 className="text-white font-medium mb-4">Pricing</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Base Price</label>
                      <input
                        type="number"
                        step="0.01"
                        {...register('basePrice')}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Currency</label>
                      <select
                        {...register('currency')}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="€">€ (EUR)</option>
                        <option value="$">$ (USD)</option>
                        <option value="лв">лв (BGN)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Weekly Discount %</label>
                      <input
                        type="number"
                        step="1"
                        {...register('discountWeekly')}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Monthly Discount %</label>
                      <input
                        type="number"
                        step="1"
                        {...register('discountMonthly')}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Early Bird %</label>
                      <input
                        type="number"
                        step="1"
                        {...register('discountEarlyBird')}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Image URLs (one per line)
                  </label>
                  <textarea
                    {...register('images')}
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    placeholder="/The Royal suite/IMG_7670.HEIC_converted.jpg"
                  />
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Amenities</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {amenityOptions.map((amenity) => (
                      <label
                        key={amenity.id}
                        className="flex items-center gap-2 p-3 bg-slate-900/30 rounded-lg cursor-pointer hover:bg-slate-700/30 transition-colors"
                      >
                        <input
                          type="checkbox"
                          value={amenity.id}
                          {...register('amenities')}
                          className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500"
                        />
                        <span className="text-sm text-slate-300">
                          {amenity.icon} {amenity.nameEn}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="bg-slate-900/30 rounded-xl p-4">
                  <h4 className="text-white font-medium mb-4">Room Features</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { key: 'smokingAllowed', label: 'Smoking Allowed' },
                      { key: 'petFriendly', label: 'Pet Friendly' },
                      { key: 'accessible', label: 'Accessible' },
                      { key: 'soundproof', label: 'Soundproof' },
                    ].map((feature) => (
                      <label
                        key={feature.key}
                        className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          {...register(feature.key)}
                          className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500"
                        />
                        <span className="text-sm text-slate-300">{feature.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </form>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-700">
                <button
                  type="button"
                  onClick={closeEditor}
                  className="px-6 py-3 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold rounded-xl transition-all"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoomEditor;

