import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { FileDown, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';

export function ExportPDFButton({ elementId, filename = 'resume.pdf', onSuccess, className = 'w-full h-11' }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    const element = document.getElementById(elementId);
    if (!element) {
      alert('Resume preview container not found.');
      return;
    }

    try {
      setIsExporting(true);
      
      // Render canvas snapshot of the resume container element
      const canvas = await html2canvas(element, {
        scale: 2, // 2x density for clear printing resolution
        useCORS: true,
        backgroundColor: '#0F172A', // match canvas backdrop with application theme background
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Standardize PDF output to A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Scale coordinates to fit image on page width
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(filename);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      alert('Could not compile PDF document. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      variant="primary"
      className={`${className} shadow-premium-glow text-xs font-semibold gap-2 transition-all duration-300`}
    >
      {isExporting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Compiling PDF...
        </>
      ) : (
        <>
          <FileDown className="h-4 w-4" />
          Export PDF
        </>
      )}
    </Button>
  );
}
