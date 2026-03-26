import { useState } from 'react';
import ResumeInput from '../Shared/ResumeInput';
import LoadingDots from '../Shared/LoadingDots';

export default function ScreenerForm({ onSubmit, loading }) {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ jobDescription, resumeText, resumeFile });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Job Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Job Description
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job description here..."
          rows={6}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Resume Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Your Resume
        </label>
        <ResumeInput
          onTextChange={setResumeText}
          onFileChange={setResumeFile}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg text-sm transition-colors"
      >
        {loading ? <LoadingDots text="Analysing your resume" /> : 'Analyse Resume'}
      </button>

    </form>
  );
}