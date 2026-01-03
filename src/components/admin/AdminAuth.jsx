import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  validateToken,
  storeToken,
  getUserRepos,
  storeRepo,
  getStoredRepo
} from '../../utils/github';

const AdminAuth = ({ onAuthenticated }) => {
  const [step, setStep] = useState('token'); // 'token' | 'repo'
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tokenValue, setTokenValue] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onTokenSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      const result = await validateToken(data.token);

      if (!result.valid) {
        setError(result.error || 'Invalid token');
        setLoading(false);
        return;
      }

      // Token is valid, store it and fetch repos
      storeToken(data.token);
      setTokenValue(data.token);

      const userRepos = await getUserRepos(data.token);
      setRepos(userRepos);

      // Check if we have a stored repo
      const storedRepo = getStoredRepo();
      if (storedRepo) {
        const repoExists = userRepos.find(
          r => r.owner.login === storedRepo.owner && r.name === storedRepo.repo
        );
        if (repoExists) {
          onAuthenticated(data.token, storedRepo.owner, storedRepo.repo);
          return;
        }
      }

      setStep('repo');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onRepoSelect = (repo) => {
    storeRepo(repo.owner.login, repo.name);
    onAuthenticated(tokenValue, repo.owner.login, repo.name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-slate-400 text-sm">
              {step === 'token'
                ? 'Enter your GitHub Personal Access Token to continue'
                : 'Select your repository'
              }
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6"
            >
              <p className="text-red-400 text-sm text-center">{error}</p>
            </motion.div>
          )}

          {step === 'token' ? (
            <form onSubmit={handleSubmit(onTokenSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  GitHub Personal Access Token
                </label>
                <input
                  type="password"
                  {...register('token', {
                    required: 'Token is required',
                    minLength: { value: 10, message: 'Token seems too short' }
                  })}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  placeholder="ghp_xxxxxxxxxxxx"
                />
                {errors.token && (
                  <p className="mt-2 text-sm text-red-400">{errors.token.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Validating...
                  </>
                ) : (
                  'Continue'
                )}
              </button>

              <div className="mt-6 p-4 bg-slate-900/30 rounded-xl">
                <h3 className="text-sm font-medium text-slate-300 mb-2">How to get a token:</h3>
                <ol className="text-xs text-slate-400 space-y-1 list-decimal list-inside">
                  <li>Go to GitHub → Settings → Developer settings</li>
                  <li>Click "Personal access tokens" → "Tokens (classic)"</li>
                  <li>Generate new token with "repo" scope</li>
                  <li>Copy and paste the token above</li>
                </ol>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="max-h-80 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {repos.map((repo) => (
                  <motion.button
                    key={repo.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onRepoSelect(repo)}
                    className="w-full p-4 bg-slate-900/50 hover:bg-slate-700/50 border border-slate-600 hover:border-amber-500/50 rounded-xl text-left transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                        <svg className="w-5 h-5 text-slate-400 group-hover:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{repo.name}</p>
                        <p className="text-xs text-slate-400 truncate">{repo.owner.login}</p>
                      </div>
                      {repo.private && (
                        <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-md">
                          Private
                        </span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => setStep('token')}
                className="w-full py-2 text-slate-400 hover:text-white text-sm transition-colors"
              >
                ← Back to token input
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          Your token is stored locally in your browser and never sent to our servers.
        </p>
      </motion.div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </div>
  );
};

export default AdminAuth;

