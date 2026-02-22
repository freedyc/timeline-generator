import React, { useState, useRef } from 'react';
import { Download, Image, FileText, ChevronDown } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function ExportPanel() {
  const [open, setOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const getPreviewElement = () => document.getElementById('timeline-preview-content');

  const captureCanvas = async (el: HTMLElement) => {
    // Clone the element to avoid layout issues during capture
    const clone = el.cloneNode(true) as HTMLElement;
    const isDark = document.documentElement.classList.contains('dark');

    // Copy all computed styles to the clone and its children
    const copyStyles = (source: Element, target: Element) => {
      const computed = window.getComputedStyle(source);
      const targetEl = target as HTMLElement;
      targetEl.style.cssText = computed.cssText;
      // Ensure dimensions are explicit
      targetEl.style.width = source.scrollWidth + 'px';
      targetEl.style.height = source.scrollHeight + 'px';
      targetEl.style.overflow = 'visible';
      targetEl.style.position = 'static';

      const sourceChildren = source.children;
      const targetChildren = target.children;
      for (let i = 0; i < sourceChildren.length; i++) {
        if (targetChildren[i]) {
          copyStyles(sourceChildren[i], targetChildren[i]);
        }
      }
    };

    copyStyles(el, clone);
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    document.body.appendChild(clone);

    try {
      const canvas = await html2canvas(clone, {
        backgroundColor: isDark ? '#030712' : '#f9fafb',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: el.scrollWidth,
        height: el.scrollHeight,
        windowWidth: el.scrollWidth,
        windowHeight: el.scrollHeight,
        onclone: (doc) => {
          // Ensure dark mode class is preserved
          if (isDark) {
            doc.documentElement.classList.add('dark');
          }
        },
      });
      return canvas;
    } finally {
      document.body.removeChild(clone);
    }
  };

  const exportPNG = async () => {
    const el = getPreviewElement();
    if (!el) return;
    setExporting(true);
    setOpen(false);
    try {
      const canvas = await captureCanvas(el);
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'timeline.png';
      a.click();
    } catch (err) {
      console.error('PNG export failed:', err);
    } finally {
      setExporting(false);
    }
  };

  const exportPDF = async () => {
    const el = getPreviewElement();
    if (!el) return;
    setExporting(true);
    setOpen(false);
    try {
      const canvas = await captureCanvas(el);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save('timeline.pdf');
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(p => !p)}
        disabled={exporting}
        className="btn-primary"
        aria-label="Export timeline"
      >
        {exporting ? (
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Download size={15} />
        )}
        <span className="hidden sm:inline">Export</span>
        <ChevronDown size={13} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden w-44">
            <button
              onClick={exportPNG}
              className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Image size={15} className="text-indigo-500" />
              Export as PNG
            </button>
            <button
              onClick={exportPDF}
              className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-t border-gray-100 dark:border-gray-700"
            >
              <FileText size={15} className="text-red-500" />
              Export as PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
}
