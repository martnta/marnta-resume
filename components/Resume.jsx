'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import {
  SiJavascript,
  SiDart,
  SiCsharp,
  SiReact,
  SiNextdotjs,
  SiFlutter,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiMicrosoftsqlserver,
  SiGit,
  SiDocker,
  SiApachekafka,
} from 'react-icons/si';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Resume = () => {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('summary');

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await fetch('/api/resume');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        setResumeData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!resumeData) return <NoDataMessage />;

  const { name, email, workExperience, education, skills, contacts, projects } = resumeData;

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-10 rounded-xl shadow-2xl max-w-4xl w-full backdrop-blur-sm bg-opacity-80"
      >
        <Header name={name} email={email} />
        <NavTabs activeSection={activeSection} setActiveSection={setActiveSection} />
        <AnimatePresence mode="wait">
          {activeSection === 'summary' && <Summary key="summary" />}
          {activeSection === 'skills' && <Skills  skills={skills} />}
          {activeSection === 'experience' && <Experience  workExperience={workExperience} />}
          {activeSection === 'education' && <Education  education={education} />}
          {activeSection === 'projects' && <Projects  projects={projects} />}
          {activeSection === 'contacts' && <Contacts  contacts={contacts} />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const NavTabs = ({ activeSection, setActiveSection }) => {
  const tabs = ['summary', 'skills', 'experience', 'education', 'projects', 'contacts'];
  return (
    <div className="flex justify-center mb-8 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveSection(tab)}
          className={`px-4 py-2 m-1 rounded-full text-sm font-medium transition-colors duration-300 ${
            activeSection === tab
              ? 'bg-indigo-600 text-white font-bold border-b-4 border-indigo-800'
              : 'bg-gray-200 text-gray-700 hover:bg-indigo-100'
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};


const Header = ({ name, email }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="mb-8 text-center"
  >
    <h1 className="text-6xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600">
      {name}
    </h1>
    <p className="text-gray-600 text-xl">{email}</p>
  </motion.div>
);

const Summary = () => (
  <motion.div
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    transition={{ duration: 0.5 }}
    className="mb-8"
  >
    <h2 className="text-3xl font-bold mb-4 text-indigo-700">Summary</h2>
    <p className="text-gray-700 leading-relaxed text-lg">
      Experienced freelance full-stack engineer with a strong background in developing web and mobile applications
      using a variety of technologies. Proficient in front-end and back-end development, databases, and DevOps
      practices. Adept at collaborating with clients and delivering high-quality solutions.
    </p>
  </motion.div>
);

const Skills = ({ skills }) => (
  <motion.div
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    transition={{ duration: 0.5 }}
    className="mb-8"
  >
    <h2 className="text-3xl font-bold mb-4 text-indigo-700">Technical Skills</h2>
    <div className="flex flex-wrap items-center justify-center">
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="flex items-center m-2 text-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full px-4 py-2 shadow-md"
        >
          {getSkillIcon(skill.name)}
          <span className="ml-2 font-semibold">{skill.name}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const Experience = ({ workExperience }) => (
  <motion.div
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    transition={{ duration: 0.5 }}
    className="mb-8"
  >
    <h2 className="text-3xl font-bold mb-4 text-indigo-700">Professional Experience</h2>
    {workExperience.map((exp, index) => (
      <ExperienceItem exp={exp} index={index} key={index} />
    ))}
  </motion.div>
);

const ExperienceItem = ({ exp, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
      className="mb-6 bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-2xl font-bold text-indigo-600">{exp.position} at {exp.company}</h3>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      <p className="text-gray-600 mb-2">{exp.startDate} - {exp.endDate || 'Present'}</p>
      <AnimatePresence>
        {isOpen && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-700 mt-2"
          >
            {exp.description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


const Education = ({ education }) => (
  <motion.div
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    transition={{ duration: 0.5 }}
    className="mb-8"
  >
    <h2 className="text-3xl font-bold mb-4 text-indigo-700">Education</h2>
    {education.map((edu, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * index, duration: 0.5 }}
        className="mb-4 bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <h3 className="text-2xl font-bold text-indigo-600">{edu.qualification}</h3>
        <p className="text-xl text-gray-700">{edu.institution}</p>
        <p className="text-gray-600">{edu.startDate} - {edu.endDate || 'Present'}</p>
        <p className="text-gray-700 mt-2">{edu.fieldOfStudy}</p>
      </motion.div>
    ))}
  </motion.div>
);

const Projects = ({ projects }) => (
  <motion.div
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    transition={{ duration: 0.5 }}
    className="mb-8"
  >
    <h2 className="text-3xl font-bold mb-4 text-indigo-700">Projects</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index, duration: 0.5 }}
          className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h3 className="text-xl font-bold text-indigo-600 mb-2">{project.name}</h3>
          <p className="text-gray-700">{project.description}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const Contacts = ({ contacts }) => (
  <motion.div
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    transition={{ duration: 0.5 }}
    className="mb-8"
  >
    <h2 className="text-3xl font-bold mb-4 text-indigo-700">Contacts</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {contacts.map((contact, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index, duration: 0.5 }}
          className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <span className="font-semibold text-indigo-600">{contact.type}:</span> {contact.value}
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-500"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="text-center mt-12 text-2xl text-red-500 font-bold">Error: {message}</div>
);

const NoDataMessage = () => (
  <div className="text-center mt-12 text-2xl text-gray-500 font-bold">No resume data found</div>
);

const getSkillIcon = (skillName) => {
  switch (skillName.toLowerCase()) {
    case 'javascript':
      return <div className="text-yellow-300"><SiJavascript size={24} /></div>;
    case 'dart':
      return <div className="text-blue-500"><SiDart size={24} /></div>;
    case 'c#':
      return <div className="text-purple-500"><SiCsharp size={24} /></div>;
    case 'react.js':
      return <div className="text-blue-500"><SiReact size={24} /></div>;
    case 'next.js':
      return <div className="text-black"><SiNextdotjs size={24} /></div>;
    case 'flutter':
      return <div className="text-blue-500"><SiFlutter size={24} /></div>;
    case 'node.js':
      return <div className="text-green-500"><SiNodedotjs size={24} /></div>;
    case 'postgresql':
      return <div className="text-blue-500"><SiPostgresql size={24} /></div>;
    case 'mongodb':
      return <div className="text-green-500"><SiMongodb size={24} /></div>;
    case 'mysql':
      return <div className="text-blue-500"><SiMysql size={24} /></div>;
    case 'sql server':
      return <div className="text-red-500"><SiMicrosoftsqlserver size={24} /></div>;
    case 'git':
      return <div className="text-orange-500"><SiGit size={24} /></div>;
    case 'docker':
      return <div className="text-blue-500"><SiDocker size={24} /></div>;
    case 'kafka':
      return <div className="text-black"><SiApachekafka size={24} /></div>;
    default:
      return null;
  }
};

export default Resume;
