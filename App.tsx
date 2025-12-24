
import React, { useState } from 'react';
import Header from './components/Header';
import { AppState } from './types';
import { generatePodcast, uploadToWordPress } from './services/geminiService';

const App: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [state, setState] = useState<AppState>({
    isProcessing: false,
    error: null,
    result: null,
    progressMessage: ''
  });
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleGenerate = async () => {
    if (!htmlContent.trim()) {
      setState(prev => ({ ...prev, error: 'Pega el código HTML para comenzar.' }));
      return;
    }

    setState({
      isProcessing: true,
      error: null,
      result: null,
      progressMessage: 'Carlos y Elena están analizando tu landing...'
    });

    try {
      const result = await generatePodcast(htmlContent);
      setState({ isProcessing: false, error: null, result, progressMessage: '' });
    } catch (err: any) {
      setState({ isProcessing: false, error: err.message, result: null, progressMessage: '' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="hero">
          <div className="container mx-auto px-4 max-w-5xl text-center py-12">
            <h2 className="section-title">De Landing Page a <span className="academy-gold">Podcast Carlos & Elena</span></h2>
            <p className="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto font-light">
              Transforma el contenido de tus cursos en una experiencia auditiva premium para tus alumnos. 
              Ideal para quienes prefieren aprender mientras se desplazan.
            </p>

            <div className="bg-[#151515] border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-50"></div>
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                    Input HTML Landing Page
                  </label>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                  </div>
                </div>
                <textarea
                  className="w-full h-80 bg-black/40 border border-zinc-800 rounded-2xl p-6 text-zinc-300 font-mono text-sm focus:border-[var(--color-primary)] outline-none transition-all resize-none shadow-inner"
                  placeholder="Pega el código fuente aquí..."
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6 p-4 bg-black/30 rounded-2xl border border-zinc-800/50">
                  <div className="flex -space-x-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[var(--color-primary)] overflow-hidden bg-zinc-800">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos&backgroundColor=FFD700" alt="Carlos" />
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-[var(--color-primary)] overflow-hidden bg-zinc-800">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena&backgroundColor=DAA520" alt="Elena" />
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-white font-bold text-xs uppercase tracking-widest">Dúo de Expertos</p>
                    <p className="text-[var(--color-primary)] text-[10px] font-medium">Castellano (España)</p>
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={state.isProcessing}
                  className="cta cta-primary px-12 py-4 text-sm scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.isProcessing ? 'Procesando IA...' : 'Generar Podcast Oficial'}
                </button>
              </div>

              {state.error && (
                <div className="mt-8 p-4 bg-red-900/20 border border-red-800 rounded-xl text-red-400 text-xs text-center">
                  {state.error}
                </div>
              )}

              {state.isProcessing && (
                <div className="mt-12 flex flex-col items-center">
                  <div className="relative">
                    <div className="w-20 h-20 border-2 border-zinc-800 border-t-[var(--color-primary)] rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <p className="mt-6 text-[var(--color-primary)] font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">
                    {state.progressMessage}
                  </p>
                </div>
              )}

              {state.result && (
                <div className="mt-12 p-8 bg-black/60 border border-[var(--color-primary)]/20 rounded-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-[var(--color-primary)] rounded-xl">
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6V11.114A4.369 4.369 0 0015 11c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"></path></svg>
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Podcast MasterHair Ready</h3>
                      <p className="text-[10px] text-zinc-500 font-mono">{state.result.fileName}</p>
                    </div>
                  </div>

                  <audio controls className="w-full mb-8 custom-audio-player">
                    <source src={state.result.audioUrl} type="audio/wav" />
                  </audio>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                      href={state.result.audioUrl}
                      download={state.result.fileName}
                      className="cta border border-zinc-800 hover:bg-zinc-800 text-white flex items-center justify-center gap-3 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      Descargar WAV
                    </a>
                    
                    <button
                      onClick={() => uploadToWordPress(state.result!.audioUrl, state.result!.fileName).then(() => setUploadStatus('success'))}
                      className={`cta ${uploadStatus === 'success' ? 'bg-green-600' : 'cta-primary'} flex items-center justify-center gap-3 transition-all`}
                    >
                      {uploadStatus === 'success' ? 'Publicado en WP' : 'Subir a Media WP'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-8 border-t border-zinc-900 bg-black text-center">
        <div className="max-w-xs mx-auto mb-6 opacity-30 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 border border-[var(--color-primary)] rounded-full"></div>
            <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Master Hair</span>
          </div>
        </div>
        <p className="text-zinc-600 text-[9px] font-bold uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} MASTER HAIR ACADEMY — DIGITAL ASSET GENERATOR
        </p>
      </footer>
    </div>
  );
};

export default App;
