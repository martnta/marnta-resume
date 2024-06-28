"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Stepper from '@/components/Stepper';
import WorkExperience from './WorkExperience';
import Education from './Education';
import Skills from './Skills';
import Projects from './Projects';
import Contacts from './Contacts';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

const ResumeForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    address: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    contacts: [],
  });

  useEffect(() => {
    const savedData = localStorage.getItem('resumeFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem('resumeFormData', JSON.stringify(formData));
  };

  const handleNext = () => {
    saveToLocalStorage();
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    saveToLocalStorage();
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Resume saved successfully',
        });
        localStorage.removeItem('resumeFormData');
      } else {
        throw new Error('Error saving resume');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while saving your resume',
      });
    }
  };

  const handleFormDataChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const formSections = [
    {
      title: 'Personal Information',
      component: (
        <div className="space-y-3">
          <Label>Fullname</Label>
          <Input
            value={formData.name}
            onChange={(e) => handleFormDataChange('name', e.target.value)}
          />
          <Label>Email</Label>
          <Input
            value={formData.email}
            onChange={(e) => handleFormDataChange('email', e.target.value)}
          />
          <Label>Date of birth</Label>
           <Input
            value={formData.dateOfBirth}
            onChange={(e) => handleFormDataChange('dateOfBirth', e.target.value)}
            type='date'
          />
          <Label>Address</Label>
           <Input
            value={formData.address}
            onChange={(e) => handleFormDataChange('address', e.target.value)}
          />
        </div>
      ),
    },
    {
      title: 'Work Experience',
      component: (
        <WorkExperience
          experience={formData.experience}
          onChange={(experience) => handleFormDataChange('experience', experience)}
        />
      ),
    },
    {
      title: 'Education',
      component: (
        <Education
          education={formData.education}
          onChange={(education) => handleFormDataChange('education', education)}
        />
      ),
    },
    {
      title: 'Skills',
      component: (
        <Skills
          skills={formData.skills}
          onChange={(skills) => handleFormDataChange('skills', skills)}
        />
      ),
    },
    {
      title: 'Projects',
      component: (
        <Projects
          projects={formData.projects}
          onChange={(projects) => handleFormDataChange('projects', projects)}
        />
      ),
    },
    {
      title: 'Contacts',
      component: (
        <Contacts
          contacts={formData.contacts}
          onChange={(contacts) => handleFormDataChange('contacts', contacts)}
        />
      ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto mb-3 p-6 bg-white rounded-lg shadow-lg">
      <Stepper steps={formSections.map((section) => section.title)} activeStep={currentStep} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold mb-4">{formSections[currentStep].title}</h2>
          {formSections[currentStep].component}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handlePrev} disabled={currentStep === 0}>
          Previous
        </Button>
        {currentStep === formSections.length - 1 ? (
          <Button onClick={handleSubmit}>Submit</Button>
        ) : (
          <Button onClick={handleNext}>Next</Button>
        )}
      </div>
    </div>
  );
};

export default ResumeForm;