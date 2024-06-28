'use client';
import React, { useEffect, useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import download from 'downloadjs';

const ResumePDF = () => {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    if (resumeData) {
      const createPDF = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([500, 700]);

        let yOffset = 650;

        const drawText = (text, y, size = 12) => {
          page.drawText(text, {
            x: 50,
            y: y,
            size: size,
            color: rgb(0, 0, 0),
          });
          return y - size * 1.5; // Adjust the multiplier for line spacing
        };

        yOffset = drawText(resumeData.name, yOffset, 24);
        yOffset = drawText(resumeData.email, yOffset, 14);
        yOffset = drawText('Summary', yOffset, 18);
        yOffset = drawText(resumeData.summary, yOffset);

        yOffset = drawText('Technical Skills', yOffset, 18);
        resumeData.skills.forEach(skill => {
          yOffset = drawText(skill, yOffset);
        });

        yOffset = drawText('Professional Experience', yOffset, 18);
        resumeData.workExperience.forEach(exp => {
          yOffset = drawText(`${exp.position} at ${exp.company}`, yOffset, 14);
          yOffset = drawText(`${exp.startDate} - ${exp.endDate || 'Present'}`, yOffset);
          yOffset = drawText(exp.description, yOffset);
        });

        yOffset = drawText('Education', yOffset, 18);
        resumeData.education.forEach(edu => {
          yOffset = drawText(`${edu.qualification} at ${edu.institution}`, yOffset, 14);
          yOffset = drawText(`${edu.startDate} - ${edu.endDate || 'Present'}`, yOffset);
          yOffset = drawText(edu.fieldOfStudy, yOffset);
        });

        yOffset = drawText('Projects', yOffset, 18);
        resumeData.projects.forEach(project => {
          yOffset = drawText(project.name, yOffset, 14);
          yOffset = drawText(project.description, yOffset);
        });

        yOffset = drawText('Contacts', yOffset, 18);
        resumeData.contacts.forEach(contact => {
          yOffset = drawText(`${contact.type}: ${contact.value}`, yOffset);
        });

        const pdfBytes = await pdfDoc.save();
        download(pdfBytes, 'resume.pdf', 'application/pdf');
      };

      createPDF();
    }
  }, [resumeData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Generating PDF...</div>;
};

export default ResumePDF;