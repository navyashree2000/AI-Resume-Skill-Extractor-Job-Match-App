const express = require('express');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const pool = require('../db');

const router = express.Router();

const skillKeywords = ['JavaScript','Java', 'Node.js', 'React', 'PostgreSQL', 'AWS', 'Docker'];

function extractSkills(text) {
  return skillKeywords.filter(skill => text.toLowerCase().includes(skill.toLowerCase()));
}


const getJobMatches = async (resumeSkills) => {
    const jobsRes = await pool.query('SELECT * FROM jobs');
    const jobs = jobsRes.rows;
  
    const matches = jobs.map(job => {
      const matchedSkills = job.required_skills.filter(skill =>
        resumeSkills.includes(skill)
      );
      const score = (matchedSkills.length / job.required_skills.length) * 100;
      return {
        job_id: job.id,
        title: job.title,
        description: job.description,
        matchedSkills,
        score: parseFloat(score.toFixed(2)),
      };
    });
  
    // Sort by score descending
    return matches.filter(m => m.score > 0).sort((a, b) => b.score - a.score);
  };
  

router.post('/upload', async (req, res) => {
  if (!req.files || !req.files.resume) {
    return res.status(400).send('No resume uploaded.');
  }

  const file = req.files.resume;
  const dataBuffer = file.data;
  console.log("---",dataBuffer)
  const parsed = await pdfParse(dataBuffer);
  console.log("-------par",parsed)
  const skills = extractSkills(parsed.text);
  console.log("-----------skills",skills)
  // Save resume to DB
  const userId ='9a4984bb-f6e1-4b09-9387-8453bba8fa79'; // replace with actual logged-in user
  const insertRes = await pool.query(
    'INSERT INTO resumes(user_id, resume_text, skills) VALUES($1, $2, $3) RETURNING *',
    [userId, parsed.text, skills]
  );
  console.log("---------res",insertRes.rows[0])
  const matchedJobs = await getJobMatches(skills);

  res.json({
    resume: insertRes.rows[0],
    extractedSkills: skills,
    jobMatches: matchedJobs,
  });
});

module.exports = router;
