'use client';
import React, { useEffect } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import download from 'downloadjs';

const ResumePDF = () => {
  useEffect(() => {
    const createPDF = async () => {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([500, 700]);

      page.drawText('Martin Ntalika', {
        x: 50,
        y: 650,
        size: 24,
        color: rgb(0, 0, 0),
      });

      page.drawText('Freelance Full-Stack Engineer', {
        x: 50,
        y: 620,
        size: 14,
        color: rgb(0, 0, 0),
      });

      page.drawText('Summary', {
        x: 50,
        y: 580,
        size: 18,
        color: rgb(0, 0, 0),
      });

      page.drawText(
        'Experienced freelance full-stack engineer with a strong background in developing web and mobile applications using a variety of technologies. Proficient in front-end and back-end development, databases, and DevOps practices. Adept at collaborating with clients and delivering high-quality solutions.',
        {
          x: 50,
          y: 550,
          size: 12,
          color: rgb(0, 0, 0),
        }
      );

      const pdfBytes = await pdfDoc.save();
      download(pdfBytes, 'resume.pdf', 'application/pdf');
    };

    createPDF();
  }, []);

  return <div>Generating PDF...</div>;
};

export default ResumePDF;