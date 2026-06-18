import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { FileDown, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';

// Helper: Convert Oklab to RGB
function oklabToRgb(L, a, b, alpha = 1) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const r_lin = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g_lin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const b_lin = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

  const linearToSrgb = (c) => {
    if (c <= 0.0031308) {
      return 12.92 * c;
    } else {
      return 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    }
  };

  const r = Math.round(Math.max(0, Math.min(1, linearToSrgb(r_lin))) * 255);
  const g = Math.round(Math.max(0, Math.min(1, linearToSrgb(g_lin))) * 255);
  const b_val = Math.round(Math.max(0, Math.min(1, linearToSrgb(b_lin))) * 255);

  if (alpha === 1) {
    return `rgb(${r}, ${g}, ${b_val})`;
  } else {
    return `rgba(${r}, ${g}, ${b_val}, ${alpha})`;
  }
}

// Helper: Convert OKLCh to RGB
function oklchToRgb(L, C, H, alpha = 1) {
  const hRad = (H * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);
  return oklabToRgb(L, a, b, alpha);
}

// Helper: Replace oklab/oklch occurrences in CSS strings
function replaceColorsInString(str) {
  if (typeof str !== 'string') return str;
  if (!str.includes('oklab') && !str.includes('oklch')) return str;

  const colorRegex = /(oklab|oklch)\(([^)]+)\)/g;
  return str.replace(colorRegex, (match, type, inner) => {
    const parts = inner.trim().split(/[\s,+/]+/);
    const numbers = parts
      .map(p => parseFloat(p))
      .filter(n => !isNaN(n));
    if (numbers.length < 3) return match;
    
    const n1 = numbers[0];
    const n2 = numbers[1];
    const n3 = numbers[2];
    const alpha = numbers.length >= 4 ? numbers[3] : 1;

    if (type === 'oklab') {
      return oklabToRgb(n1, n2, n3, alpha);
    } else {
      return oklchToRgb(n1, n2, n3, alpha);
    }
  });
}

export function ExportPDFButton({ elementId, filename = 'resume.pdf', onSuccess, onError, disabled, className = 'w-full h-11' }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    console.log('[PDF Export] Checking if element exists...');
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('[PDF Export] Failed: resume-print-content not found in DOM.');
      if (onError) onError('Resume preview container not found.');
      return;
    }

    // Protect against exporting empty/blank resumes
    const isEmpty = element.querySelector('[data-empty-preview="true"]');
    if (isEmpty) {
      console.warn('[PDF Export] Verification failed: Resume is empty.');
      if (onError) onError('Load or create a resume first');
      return;
    }

    // Capture original values for restoration
    const originalBg = element.style.backgroundColor;
    const originalColor = element.style.color;
    const originalBorder = element.style.border;
    const originalBorderRadius = element.style.borderRadius;
    const originalBoxShadow = element.style.boxShadow;
    const originalWidth = element.style.width;
    const originalMaxWidth = element.style.maxWidth;

    // Intercept window.getComputedStyle to translate oklab/oklch colors to standard sRGB rgb/rgba
    const originalGetComputedStyle = window.getComputedStyle;
    
    window.getComputedStyle = function(el, pseudoElt) {
      const style = originalGetComputedStyle(el, pseudoElt);
      return new Proxy(style, {
        get(target, prop) {
          const val = target[prop];
          if (typeof val === 'string' && (val.includes('oklab') || val.includes('oklch'))) {
            return replaceColorsInString(val);
          }
          if (typeof val === 'function') {
            if (prop === 'getPropertyValue') {
              return function(name) {
                const res = target.getPropertyValue(name);
                if (typeof res === 'string' && (res.includes('oklab') || res.includes('oklch'))) {
                  return replaceColorsInString(res);
                }
                return res;
              };
            }
            return val.bind(target);
          }
          return val;
        }
      });
    };

    try {
      setIsExporting(true);

      // Temporarily override styles for PDF printing (light mode layout with exact A4 dimensions)
      element.style.setProperty('width', '794px', 'important');
      element.style.setProperty('max-width', '794px', 'important');
      element.style.setProperty('background-color', '#ffffff', 'important');
      element.style.setProperty('color', '#111111', 'important');
      element.style.setProperty('border', 'none', 'important');
      element.style.setProperty('border-radius', '0px', 'important');
      element.style.setProperty('box-shadow', 'none', 'important');

      await new Promise((r) => setTimeout(r, 150)); // allow layout reflow

      const canvas = await html2canvas(element, {
        scale: 3, // scale: 3 for high-DPI crispness
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 0,
        removeContainer: true,
      });

      if (!canvas) {
        throw new Error('html2canvas returned an empty canvas.');
      }

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      if (!imgData || imgData === 'data:,') {
        throw new Error('Canvas toDataURL returned empty image data.');
      }

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
        pdf.addImage(imgData, 'JPEG', 0, 0, pageW, imgH);
      } else {
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
      console.error('[PDF Export] Failed during PDF export process:', err);
      if (onError) {
        onError(`PDF Export Failed: ${err.message || 'Check browser console for details.'}`);
      }
    } finally {
      // Restore original styles
      element.style.backgroundColor = originalBg;
      element.style.color = originalColor;
      element.style.border = originalBorder;
      element.style.borderRadius = originalBorderRadius;
      element.style.boxShadow = originalBoxShadow;
      element.style.width = originalWidth;
      element.style.maxWidth = originalMaxWidth;

      // Restore window.getComputedStyle
      window.getComputedStyle = originalGetComputedStyle;
      setIsExporting(false);
    }
  };

  const handleClick = (e) => {
    if (disabled) {
      if (onError) onError('Load or create a resume first');
      return;
    }
    handleExport();
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isExporting}
      variant="primary"
      className={`${className} shadow-premium-glow text-xs font-semibold gap-2 transition-all duration-300 ${disabled ? 'opacity-50 bg-slate-700 hover:bg-slate-700 border-slate-700 shadow-none cursor-not-allowed text-slate-400' : ''}`}
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
