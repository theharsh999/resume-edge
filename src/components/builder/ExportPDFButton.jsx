import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { FileDown, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';

export function ExportPDFButton({ elementId, filename = 'resume.pdf', onSuccess, onError, className = 'w-full h-11' }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    const element = document.getElementById(elementId);
    if (!element) {
      if (onError) onError('Resume preview container not found.');
      return;
    }

    // Protect against exporting empty/blank resumes
    const isEmpty = element.querySelector('[data-empty-preview="true"]');
    if (isEmpty) {
      if (onError) onError('Your resume is empty. Please enter your details before exporting.');
      return;
    }

    try {
      setIsExporting(true);

      // Save original styles for restoration
      const originalBg = element.style.backgroundColor;
      const originalColor = element.style.color;
      const originalBorder = element.style.border;
      const originalBorderRadius = element.style.borderRadius;
      const originalBoxShadow = element.style.boxShadow;

      // Temporarily override dark bg to white for PDF printing
      element.style.backgroundColor = '#ffffff';
      element.style.color = '#111111';
      element.style.border = 'none';
      element.style.borderRadius = '0';
      element.style.boxShadow = 'none';

      // Force text colour on all children for readability in white bg
      const allNodes = element.querySelectorAll('*');
      const nodeOriginals = [];
      allNodes.forEach((node) => {
        nodeOriginals.push({
          node,
          color: node.style.color,
          bg: node.style.backgroundColor,
          border: node.style.borderColor,
        });
        const computed = window.getComputedStyle(node);
        const c = computed.color;
        // If text appears very light (near white), darken for PDF
        if (c) {
          const rgb = c.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
            if (brightness > 200) {
              node.style.color = '#333333';
            }
          }
        }
      });

      await new Promise((r) => setTimeout(r, 80)); // allow reflow

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 0,
        removeContainer: true,
      });

      // Restore original styles
      element.style.backgroundColor = originalBg;
      element.style.color = originalColor;
      element.style.border = originalBorder;
      element.style.borderRadius = originalBorderRadius;
      element.style.boxShadow = originalBoxShadow;
      nodeOriginals.forEach(({ node, color, bg, border }) => {
        node.style.color = color;
        node.style.backgroundColor = bg;
        node.style.borderColor = border;
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      // Use mm units — standard A4 is 210 x 297 mm
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageW = pdf.internal.pageSize.getWidth();  // 210mm
      const pageH = pdf.internal.pageSize.getHeight(); // 297mm

      const canvasAspect = canvas.height / canvas.width;
      const imgH = pageW * canvasAspect;

      if (imgH <= pageH) {
        // Single page — fits completely
        pdf.addImage(imgData, 'JPEG', 0, 0, pageW, imgH);
      } else {
        // Multi-page slicing
        let yOffset = 0;
        while (yOffset < imgH) {
          if (yOffset > 0) pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, -yOffset, pageW, imgH);
          yOffset += pageH;
        }
      }

      pdf.save(filename);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('PDF generation failed:', err);
      if (onError) onError('Could not generate PDF. Please try again.');
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
          Generating PDF...
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
