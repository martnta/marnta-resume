'use client'
import { pdf } from "@react-pdf/renderer";
import Image from "next/image";
import { useCallback } from 'react'; // Import the useCallback hook from React

import Resume from '@/components/Resume'
import ResumePDF from '@/components/ResumePdf'

export default function Preview() {
  const downloadPDF = useCallback(async () => {
    e.preventDefault(); // Prevent the default button behavior
    const blob = await pdf(<ResumePDF />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'martin-ntalika-resume.pdf';
    link.click();
    URL.revokeObjectURL(url);
  }, []); // Pass an empty array as the second argument for now

  return (
    <div>
      <Resume />
      <button onClick={downloadPDF} className="bg-blue-500 text-white px-4 py-2 rounded">
        Download PDF
      </button>
    </div>
  );
}
