import { useState } from 'react';
import { Download, Plus, Trash2, AlertCircle, CheckCircle } from 'lucide-react';

interface DownloadItem {
  id: string;
  url: string;
  status: 'pending' | 'downloading' | 'complete' | 'error';
  progress: number;
}

export function Downloader() {
  const [url, setUrl] = useState('');
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);

  const addDownload = () => {
    if (url.trim()) {
      const newDownload: DownloadItem = {
        id: Date.now().toString(),
        url: url.trim(),
        status: 'pending',
        progress: 0,
      };
      setDownloads([...downloads, newDownload]);
      setUrl('');

      // Simulate download progress
      setTimeout(() => {
        setDownloads(prev =>
          prev.map(d =>
            d.id === newDownload.id ? { ...d, status: 'downloading', progress: 30 } : d
          )
        );
      }, 500);

      setTimeout(() => {
        setDownloads(prev =>
          prev.map(d =>
            d.id === newDownload.id ? { ...d, progress: 70 } : d
          )
        );
      }, 1500);

      setTimeout(() => {
        setDownloads(prev =>
          prev.map(d =>
            d.id === newDownload.id ? { ...d, status: 'complete', progress: 100 } : d
          )
        );
      }, 2500);
    }
  };

  const removeDownload = (id: string) => {
    setDownloads(downloads.filter(d => d.id !== id));
  };

  const retryDownload = (id: string) => {
    setDownloads(prev =>
      prev.map(d =>
        d.id === id ? { ...d, status: 'downloading', progress: 0 } : d
      )
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addDownload();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">File Downloader</h1>
          <p className="text-slate-300">Download files from URLs with ease</p>
        </div>

        {/* URL Input Section */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 space-y-4">
          <label className="block text-white font-semibold">Enter File URL</label>
          <div className="flex gap-3 flex-col sm:flex-row">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="https://example.com/file.zip"
              className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
            />
            <button
              onClick={addDownload}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Plus size={20} /> Add
            </button>
          </div>
        </div>

        {/* Downloads List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            {downloads.length > 0 ? `Downloads (${downloads.length})` : 'No downloads yet'}
          </h2>

          {downloads.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur border border-dashed border-slate-600 rounded-xl p-12 text-center">
              <Download className="mx-auto mb-4 text-slate-400" size={48} />
              <p className="text-slate-300">Add a URL above to start downloading</p>
            </div>
          ) : (
            <div className="space-y-3">
              {downloads.map((download) => (
                <div
                  key={download.id}
                  className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-4 space-y-3 hover:border-purple-500 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-300 truncate text-sm font-mono">{download.url}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {download.status === 'complete' && (
                          <span className="flex items-center gap-1 text-green-400 text-sm">
                            <CheckCircle size={16} /> Complete
                          </span>
                        )}
                        {download.status === 'downloading' && (
                          <span className="flex items-center gap-1 text-blue-400 text-sm animate-pulse">
                            <Download size={16} /> Downloading...
                          </span>
                        )}
                        {download.status === 'error' && (
                          <span className="flex items-center gap-1 text-red-400 text-sm">
                            <AlertCircle size={16} /> Error
                          </span>
                        )}
                        {download.status === 'pending' && (
                          <span className="flex items-center gap-1 text-yellow-400 text-sm">
                            <AlertCircle size={16} /> Pending
                          </span>
                        )}
                        <span className="text-slate-400 text-sm ml-auto">{download.progress}%</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {download.status === 'error' && (
                        <button
                          onClick={() => retryDownload(download.id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          Retry
                        </button>
                      )}
                      <button
                        onClick={() => removeDownload(download.id)}
                        className="px-3 py-1 bg-red-600/20 text-red-400 rounded text-sm hover:bg-red-600/40 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        download.status === 'complete'
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                          : 'bg-gradient-to-r from-blue-400 to-purple-500'
                      }`}
                      style={{ width: `${download.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 space-y-3">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">💡 Tips & Guidelines</h3>
          <ul className="text-slate-300 space-y-2 list-disc list-inside">
            <li>Support for all file types - images, videos, documents, archives, etc.</li>
            <li>Download speeds depend on the source URL and your internet connection</li>
            <li>You can download multiple files simultaneously</li>
            <li>Maximum file size: 2GB per download</li>
            <li>Direct links work best (files hosted on servers)</li>
            <li>Some URLs may require authentication or may be restricted</li>
            <li>Downloads are handled locally - no server uploads</li>
          </ul>
        </div>

        {/* Supported Formats */}
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 space-y-3">
          <h3 className="text-xl font-bold text-white">📦 Supported File Types</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              'Images (JPG, PNG, GIF)',
              'Videos (MP4, MKV, AVI)',
              'Audio (MP3, WAV, FLAC)',
              'Documents (PDF, DOCX, XLSX)',
              'Archives (ZIP, RAR, 7Z)',
              'Code (JS, HTML, CSS, Python)',
              'And many more...',
              'Direct URLs only',
            ].map((format, idx) => (
              <div key={idx} className="px-3 py-2 bg-slate-700/50 rounded text-slate-300 text-sm">
                {format}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
