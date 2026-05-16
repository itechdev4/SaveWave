import { Upload, Trash2, Download } from 'lucide-react';
import { useState } from 'react';

interface ImageFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

export function ImageTools() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [quality, setQuality] = useState(85);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [format, setFormat] = useState('jpeg');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const newImage: ImageFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
        };
        setImages((prev) => [...prev, newImage]);
      });
    }
  };

  const removeImage = (id: string) => {
    setImages(images.filter((img) => img.id !== id));
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
          <h1 className="text-4xl font-bold text-white mb-2">Image Tools</h1>
          <p className="text-slate-300">Compress, resize, and convert your images instantly</p>
        </div>

        {/* Upload Section */}
        <div className="bg-slate-800/50 backdrop-blur border border-dashed border-slate-600 rounded-xl p-12 text-center hover:border-purple-500 transition-colors cursor-pointer">
          <label className="cursor-pointer">
            <Upload className="mx-auto mb-4 text-slate-400" size={48} />
            <p className="text-white font-semibold mb-1">Drag and drop your images here</p>
            <p className="text-slate-400 text-sm mb-4">or click to select files</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
            <label className="block text-white font-semibold mb-3">Quality ({quality}%)</label>
            <input
              type="range"
              min="1"
              max="100"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
            <label className="block text-white font-semibold mb-3">Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
            >
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="webp">WebP</option>
              <option value="gif">GIF</option>
              <option value="bmp">BMP</option>
            </select>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
            <label className="block text-white font-semibold mb-3">Width (px)</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="Leave empty for original"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400"
            />
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
            <label className="block text-white font-semibold mb-3">Height (px)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Leave empty for original"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400"
            />
          </div>
        </div>

        {/* Images List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            {images.length > 0 ? `Selected Images (${images.length})` : 'No images selected'}
          </h2>

          {images.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 text-center">
              <p className="text-slate-300">Upload images to get started</p>
            </div>
          ) : (
            <div className="space-y-2">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-4 flex items-center justify-between hover:border-purple-500 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold truncate">{img.name}</p>
                    <p className="text-slate-400 text-sm">{formatSize(img.size)}</p>
                  </div>
                  <button
                    onClick={() => removeImage(img.id)}
                    className="ml-4 p-2 text-red-400 hover:bg-red-600/20 rounded transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {images.length > 0 && (
          <div className="flex gap-4 justify-end">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
              <Download size={20} /> Download All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}