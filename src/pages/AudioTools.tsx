import { Upload, Play, Pause, Trash2, Download } from 'lucide-react';
import { useState } from 'react';

interface AudioFile {
  id: string;
  name: string;
  size: number;
  duration: number;
}

export function AudioTools() {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [format, setFormat] = useState('mp3');
  const [bitrate, setBitrate] = useState('192');
  const [playing, setPlaying] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const newAudio: AudioFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          size: file.size,
          duration: 0,
        };
        setAudioFiles((prev) => [...prev, newAudio]);
      });
    }
  };

  const removeAudio = (id: string) => {
    setAudioFiles(audioFiles.filter((audio) => audio.id !== id));
    if (playing === id) setPlaying(null);
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
          <h1 className="text-4xl font-bold text-white mb-2">Audio Tools</h1>
          <p className="text-slate-300">Trim, merge, and convert your audio files</p>
        </div>

        {/* Upload Section */}
        <div className="bg-slate-800/50 backdrop-blur border border-dashed border-slate-600 rounded-xl p-12 text-center hover:border-purple-500 transition-colors cursor-pointer">
          <label className="cursor-pointer">
            <Upload className="mx-auto mb-4 text-slate-400" size={48} />
            <p className="text-white font-semibold mb-1">Drag and drop your audio files here</p>
            <p className="text-slate-400 text-sm mb-4">Supports MP3, WAV, OGG, M4A, FLAC</p>
            <input
              type="file"
              multiple
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
            <label className="block text-white font-semibold mb-3">Output Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
            >
              <option value="mp3">MP3</option>
              <option value="wav">WAV</option>
              <option value="ogg">OGG</option>
              <option value="m4a">M4A</option>
              <option value="flac">FLAC</option>
            </select>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
            <label className="block text-white font-semibold mb-3">Bitrate (kbps)</label>
            <select
              value={bitrate}
              onChange={(e) => setBitrate(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
            >
              <option value="128">128 kbps</option>
              <option value="192">192 kbps</option>
              <option value="256">256 kbps</option>
              <option value="320">320 kbps</option>
            </select>
          </div>
        </div>

        {/* Audio Files List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            {audioFiles.length > 0 ? `Selected Audio Files (${audioFiles.length})` : 'No audio files selected'}
          </h2>

          {audioFiles.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 text-center">
              <p className="text-slate-300">Upload audio files to get started</p>
            </div>
          ) : (
            <div className="space-y-2">
              {audioFiles.map((audio) => (
                <div
                  key={audio.id}
                  className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-4 flex items-center justify-between hover:border-purple-500 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <button
                      onClick={() => setPlaying(playing === audio.id ? null : audio.id)}
                      className="p-2 text-purple-400 hover:bg-purple-500/20 rounded transition-colors flex-shrink-0"
                    >
                      {playing === audio.id ? (
                        <Pause size={20} />
                      ) : (
                        <Play size={20} />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold truncate">{audio.name}</p>
                      <p className="text-slate-400 text-sm">{formatSize(audio.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeAudio(audio.id)}
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
        {audioFiles.length > 0 && (
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