import React, { useState } from 'react';
import axios from 'axios';
import { CloudUpload, CheckCircle, Briefcase } from 'lucide-react';

function Upload() {
  const [skills, setSkills] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobMatches, setJobMatches] = useState([]);

  const uploadResume = async () => {
    if (!file) return alert('Please select a file first!');
    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const res = await axios.post('http://localhost:5000/api/resume/upload', formData);
      setSkills(res.data.extractedSkills);
      setJobMatches(res.data.jobMatches);
    } catch (err) {
      alert('Upload failed. Make sure the backend is running.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-white flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-blue-800 mb-2">AI Resume Skill Extractor</h2>
          <p className="text-gray-600">Upload your resume to extract skills and find matching jobs instantly.</p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Choose Resume (PDF)</label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept=".pdf"
              onChange={e => setFile(e.target.files[0])}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            <button
              onClick={uploadResume}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
            >
              <CloudUpload size={18} />
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>

        {skills.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="text-green-500" size={20} />
              <h3 className="text-xl font-semibold text-gray-800">Extracted Skills</h3>
            </div>
            <ul className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <li
                  key={index}
                  className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium shadow-sm"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        {jobMatches.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="text-blue-600" size={20} />
              <h3 className="text-xl font-semibold text-gray-800">Top Job Matches</h3>
            </div>
            <ul className="grid gap-5">
              {jobMatches.map((job, idx) => (
                <li key={idx} className="p-5 rounded-xl border border-gray-200 bg-gray-50 shadow-sm transition hover:shadow-md">
                  <h4 className="text-lg font-bold text-blue-700">{job.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{job.description}</p>
                  <p className="mt-2 text-sm">
                    <strong>Matched Skills:</strong>{' '}
                    <span className="text-gray-800">{job.matchedSkills.join(', ')}</span>
                  </p>
                  <p className="text-sm">
                    <strong>Match Score:</strong>{' '}
                    <span className="font-semibold text-green-600">{job.score}%</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;
