import { Upload, Trash2, Download, ArrowUp, ArrowDown } from 'lucide-react';
import { useState } from 'react';

interface PdfFile {
  id: string;
  name: string;
  size: number;
  pages: number;
}

export function PdfTools() {
  const [pdfFiles, setPdfFiles] = useState<PdfFile[]>([]);
  const [mode, setMode] = useState<'merge' | 'split'>('merge');
  const [compression, setCompression] = useState('medium');
  const [splitRange, setSplitRange] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const newPdf: PdfFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          size: file.size,
          pages: Math.floor(Math.random() * 50) + 1,
        };
        setPdfFiles((prev) => [...prev, newPdf]);
      });
    }
  };

  const removePdf = (id: string) => {
    setPdfFiles(pdfFiles.filter((pdf) => pdf.id !== id));
  };

  const movePdf = (id: string, direction: 'up' | 'down') => {
    const index = pdfFiles.findIndex((pdf) => pdf.id === id);
    if (direction === 'up' && index > 0) {
      const newFiles = [...pdfFiles];
      [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]];
      setPdfFiles(newFiles);
    } else if (direction === 'down' && index < pdfFiles.length - 1) {
      const newFiles = [...pdfFiles];
      [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
      setPdfFiles(newFiles);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">PDF Tools</h1>
          <p className="text-slate-300">Merge, split, and compress PDF files</p>
        </div>

        {/* Mode Selector */}
        <div className="flex gap-4">
          <button
            onClick={() => setMode('merge')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              mode === 'merge'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            🔗 Merge PDFs
          </button>
          <button
            onClick={() => setMode('split')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              mode === 'split'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            ✂️ Split PDF
          </button>
        </div>

        {/* Upload Section */}
        <div className="bg-slate-800/50 backdrop-blur border border-dashed border-slate-600 rounded-xl p-12 text-center hover:border-purple-500 transition-colors cursor-pointer">
          <label className="cursor-pointer">
            <Upload className="mx-auto mb-4 text-slate-400" size={48} />
            <p className="text-white font-semibold mb-1">Drag and drop your PDF files here</p>
            <p className="text-slate-400 text-sm mb-4">Select {mode === 'merge' ? 'multiple PDFs to merge' : 'a PDF to split'}</p>
            <input
              type="file"
              multiple={mode === 'merge'}
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
            <label className="block text-white font-semibold mb-3">Compression Level</label>
            <select
              value={compression}
              onChange={(e) => setCompression(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
            >
              <option value="low">Low (Better Quality)</option>
              <option value="medium">Medium (Balanced)</option>
              <option value="high">High (Smaller Size)</option>
            </select>
          </div>

          {mode === 'split' && (
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <label className="block text-white font-semibold mb-3">Page Range (e.g., 1-3, 5)</label>
              <input
                type="text"
                value={splitRange}
                onChange={(e) => setSplitRange(e.target.value)}
                placeholder="Enter page numbers"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400"
              />
            </div>
          )}
        </div>

        {/* PDF Files List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            {pdfFiles.length > 0
              ? `Selected PDFs (${pdfFiles.length})`
              : 'No PDFs selected'}
          </h2>

          {pdfFiles.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 text-center">
              <p className="text-slate-300">Upload PDF files to get started</p>
            </div>
          ) : (
            <div className="space-y-2">
              {pdfFiles.map((pdf, idx) => (
                <div
                  key={pdf.id}
                  className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-4 flex items-center justify-between hover:border-purple-500 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold truncate">{pdf.name}</p>
                    <p className="text-slate-400 text-sm">
                      {formatSize(pdf.size)} • {pdf.pages} pages
                    </p>
                  </div>

                  {mode === 'merge' && (
                    <div className="flex gap-2 mx-4">
                      <button
                        onClick={() => movePdf(pdf.id, 'up')}
                        disabled={idx === 0}
                        className="p-2 text-slate-400 hover:text-white disabled:opacity-50"
                      >
                        <ArrowUp size={20} />
                      </button>
                      <button
                        onClick={() => movePdf(pdf.id, 'down')}
                        disabled={idx === pdfFiles.length - 1}
                        className="p-2 text-slate-400 hover:text-white disabled:opacity-50"
                      >
                        <ArrowDown size={20} />
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => removePdf(pdf.id)}
                    className="p-2 text-red-400 hover:bg-red-600/20 rounded transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {pdfFiles.length > 0 && (
          <div className="flex gap-4 justify-end">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
              <Download size={20} /> {mode === 'merge' ? 'Merge & Download' : 'Split & Download'}
            </button>
          </div>
        )}

        {/* Tips */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-3">💡 Tips</h3>
          <ul className="text-slate-300 space-y-2 list-disc list-inside">
            {mode === 'merge' ? (
              <>
                <li>Use arrow buttons to reorder PDFs before merging</li>
                <li>Maximum 20 PDFs per merge operation</li>
                <li>File size limit: 100MB total</li>
              </>
            ) : (
              <>
                <li>Extract specific pages from your PDF</li>
                <li>Enter page numbers separated by commas (1,3,5) or ranges (1-5)</li>
                <li>Original file remains unchanged</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}