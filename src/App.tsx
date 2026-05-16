import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { LandingPage } from './pages/LandingPage';
import { ImageTools } from './pages/ImageTools';
import { AudioTools } from './pages/AudioTools';
import { PdfTools } from './pages/PdfTools';
import { Downloader } from './pages/Downloader';

type PageType = 'home' | 'image' | 'audio' | 'pdf' | 'download';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage />;
      case 'image':
        return <ImageTools />;
      case 'audio':
        return <AudioTools />;
      case 'pdf':
        return <PdfTools />;
      case 'download':
        return <Downloader />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="pt-20">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;