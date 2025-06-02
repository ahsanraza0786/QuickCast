'use client';
import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2, ChevronLeft, ChevronRight } from 'lucide-react';

const PresentationViewer = ({ 
  presentationUrl, 
  currentSlide = 0, 
  totalSlides = 1,
  onNextSlide,
  onPrevSlide,
  className = "",
  isAdmin = false
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleLoad = () => {
    console.log('Presentation loaded successfully');
    setIsLoading(false);
    setIframeError(false);
  };

  const handleError = () => {
    console.error('Failed to load presentation:', presentationUrl);
    setIsLoading(false);
    setIframeError(true);
  };

  // Reset loading state when URL changes
  useEffect(() => {
    if (presentationUrl) {
      console.log('Presentation URL changed, resetting loading state:', presentationUrl);
      setIsLoading(true);
      setIframeError(false);
    }
  }, [presentationUrl]);
  const handlePrevSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!(isAdmin)) {
      showSlideControlError();
      return;
    }
    onPrevSlide?.();
  };

  const handleNextSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!(isAdmin)) {
      showSlideControlError();
      return;
    }
    onNextSlide?.();
  };

  // Helper function to show error toast when non-admin tries to control slides
  const showSlideControlError = () => {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-out';
    toast.textContent = 'Only presenters can control slides';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  return (
    <div className={`relative bg-white rounded-lg flex flex-col h-full ${className}`}>
      <div className="flex flex-col p-2 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevSlide}
            disabled={!(isAdmin) || currentSlide === 0}
            className={`p-1 rounded ${!(isAdmin) ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'} disabled:opacity-30`}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className={currentSlide === 0 ? 'text-gray-300' : 'text-gray-700'} />
          </button>
          
          <span className="text-sm font-medium text-gray-600">
            Slide {currentSlide + 1} of {totalSlides}
          </span>
          
          <button
            onClick={handleNextSlide}
            disabled={!(isAdmin) || currentSlide === totalSlides - 1}
            className={`p-1 rounded ${!(isAdmin) ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'} disabled:opacity-30`}
            aria-label="Next slide"
          >
            <ChevronRight size={20} className={currentSlide === totalSlides - 1 ? 'text-gray-300' : 'text-gray-700'} />
          </button>
          
          <button
            onClick={toggleFullscreen}
            className="p-1 rounded hover:bg-gray-100"
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
        {/* <div className="text-xs text-center mt-1 text-amber-600">
          {!(isAdmin) && "Only the presenter or admin can control the slides"}
        </div> */}
      </div>
      
      <div className="flex-1 relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          </div>
        )}
        
        {presentationUrl ? (
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(presentationUrl)}&embedded=true#page=${currentSlide + 1}`}
            className="w-full h-full"
            style={{ height: 'calc(100vh - 13rem)' }}
            onLoad={handleLoad}
            onError={handleError}
            allow="autoplay; encrypted-media"
            allowFullScreen
            key={`${presentationUrl}-${currentSlide}`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">No presentation uploaded yet</p>
          </div>
        )}
        
        {iframeError && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 gap-2">
            <p className="text-red-600">Failed to load presentation</p>
            <button 
              onClick={() => window.open(presentationUrl, '_blank')} 
              className="text-blue-600 hover:underline text-sm bg-white px-3 py-1 rounded-full shadow-sm"
            >
              Open in new tab
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PresentationViewer;