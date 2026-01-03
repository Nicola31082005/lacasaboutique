import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getFileContent,
  updateFile,
  generateAmenitiesFileContent
} from '../../utils/github';

const AmenitiesEditor = ({ hotelAmenities, setHotelAmenities, amenityCategories, authData }) => {
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const { register, handleSubmit, reset, setValue } = useForm();

  const openEditor = (amenity) => {
    setSelectedAmenity(amenity);
    setIsAddingNew(false);
    reset({
      id: amenity.id,
      name: amenity.name,
      category: amenity.category,
      description: amenity.description,
      icon: amenity.icon,
      available: amenity.available,
      hours: amenity.hours,
      features: amenity.features?.join('\n') || '',
    });
  };

  const openNewEditor = () => {
    setSelectedAmenity(null);
    setIsAddingNew(true);
    reset({
      id: '',
      name: '',
      category: Object.values(amenityCategories)[0],
      description: '',
      icon: '✨',
      available: true,
      hours: '24/7',
      features: '',
    });
  };

  const closeEditor = () => {
    setSelectedAmenity(null);
    setIsAddingNew(false);
    setSaveStatus(null);
  };

  const onSubmit = (data) => {
    const amenityData = {
      id: data.id,
      name: data.name,
      category: data.category,
      description: data.description,
      icon: data.icon,
      available: data.available,
      hours: data.hours,
      features: data.features.split('\n').map(f => f.trim()).filter(Boolean),
    };

    let updatedAmenities;

    if (isAddingNew) {
      updatedAmenities = [...hotelAmenities, amenityData];
    } else {
      updatedAmenities = hotelAmenities.map(a =>
        a.id === selectedAmenity.id ? amenityData : a
      );
    }

    setHotelAmenities(updatedAmenities);

    if (isAddingNew) {
      setSelectedAmenity(amenityData);
      setIsAddingNew(false);
    } else {
      setSelectedAmenity(amenityData);
    }

    setSaveStatus({ type: 'success', message: 'Amenity updated locally. Click "Deploy to GitHub" to save permanently.' });
  };

  const deleteAmenity = (amenityId) => {
    if (confirm('Are you sure you want to delete this amenity?')) {
      const updatedAmenities = hotelAmenities.filter(a => a.id !== amenityId);
      setHotelAmenities(updatedAmenities);
      closeEditor();
      setSaveStatus({ type: 'success', message: 'Amenity deleted locally. Click "Deploy to GitHub" to save permanently.' });
    }
  };

  const deployToGitHub = async () => {
    setSaving(true);
    setSaveStatus(null);

    try {
      const { token, owner, repo } = authData;
      const filePath = 'src/data/amenities.js';

      const { sha } = await getFileContent(token, owner, repo, filePath);
      const content = generateAmenitiesFileContent(amenityCategories, hotelAmenities);

      await updateFile(
        token,
        owner,
        repo,
        filePath,
        content,
        `Update amenities via admin panel`,
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

  const getCategoryLabel = (category) => {
    return Object.keys(amenityCategories).find(key => amenityCategories[key] === category) || category;
  };

  const getCategoryColor = (category) => {
    const colors = {
      wellness: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      business: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      dining: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      recreation: 'bg-green-500/20 text-green-400 border-green-500/30',
      services: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      connectivity: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      transportation: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      family: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    };
    return colors[category] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Hotel Amenities</h2>
          <p className="text-slate-400 text-sm mt-1">Manage hotel amenities and services</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={openNewEditor}
            className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Amenity
          </button>

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
      </div>

      {/* Status Message */}
      {saveStatus && !selectedAmenity && !isAddingNew && (
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

      {/* Amenities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotelAmenities.map((amenity) => (
          <motion.div
            key={amenity.id}
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 cursor-pointer group hover:border-amber-500/30 transition-all"
            onClick={() => openEditor(amenity)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-3xl">{amenity.icon}</div>
              <span className={`px-2 py-1 text-xs rounded-md border ${getCategoryColor(amenity.category)}`}>
                {getCategoryLabel(amenity.category)}
              </span>
            </div>
            <h3 className="text-white font-semibold mb-1">{amenity.name}</h3>
            <p className="text-slate-400 text-sm line-clamp-2">{amenity.description}</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${amenity.available ? 'bg-green-400' : 'bg-red-400'}`} />
                {amenity.available ? 'Available' : 'Unavailable'}
              </span>
              <span>🕐 {amenity.hours}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {(selectedAmenity || isAddingNew) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && closeEditor()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {isAddingNew ? 'Add New Amenity' : `Edit: ${selectedAmenity?.name}`}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    {isAddingNew ? 'Create a new hotel amenity' : 'Update amenity details'}
                  </p>
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
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">ID (unique)</label>
                    <input
                      {...register('id', { required: true })}
                      disabled={!isAddingNew}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
                      placeholder="e.g., spa"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Icon (emoji)</label>
                    <input
                      {...register('icon')}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white text-2xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                    <select
                      {...register('category')}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      {Object.entries(amenityCategories).map(([key, value]) => (
                        <option key={key} value={value}>{key}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                  <input
                    {...register('name', { required: true })}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="e.g., Spa & Wellness Center"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                  <textarea
                    {...register('description')}
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    placeholder="Describe the amenity..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Operating Hours</label>
                    <input
                      {...register('hours')}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="e.g., 08:00 - 22:00"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-3 p-3 bg-slate-900/30 rounded-xl cursor-pointer w-full">
                      <input
                        type="checkbox"
                        {...register('available')}
                        className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-sm text-slate-300">Available</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Features (one per line)
                  </label>
                  <textarea
                    {...register('features')}
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    placeholder="Massage Therapy&#10;Facial Treatments&#10;Sauna"
                  />
                </div>
              </form>

              {/* Modal Footer */}
              <div className="flex items-center justify-between p-6 border-t border-slate-700">
                <div>
                  {!isAddingNew && (
                    <button
                      type="button"
                      onClick={() => deleteAmenity(selectedAmenity.id)}
                      className="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
                    >
                      Delete Amenity
                    </button>
                  )}
                </div>
                <div className="flex gap-3">
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
                    {isAddingNew ? 'Add Amenity' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AmenitiesEditor;

