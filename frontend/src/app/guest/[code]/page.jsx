'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { io } from "socket.io-client";
import ChatApplication from '@/components/ChatApplication';
import PollCreator from '@/components/PollCreater';
import PollList from '@/components/PollList';
import PresentationViewer from '@/components/PresentationViewer';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Users, X, Loader2, Lock, Unlock } from 'lucide-react';
import { toast } from 'react-hot-toast';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);

export default function Room() {
  const [room, setRoom] = useState(null);
  const [presentationUrl, setPresentationUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [joinData, setJoinData] = useState({ username: '', password: '' });
  const [participants, setParticipants] = useState([]);
  const [showParticipants, setShowParticipants] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(1);
  const [mobileTab, setMobileTab] = useState('slides');
  const fileInputRef = useRef(null);
  const participantsRef = useRef(null);
  const router = useRouter();
  const params = useParams();
  const code = params?.code;

  // Handle slide update from presenter
  const handleSlideUpdate = useCallback((data) => {
    console.log('Received slide change:', data);
    // Only update if not the presenter (to avoid feedback loop)
    if (!isAdmin) {
      setCurrentSlide(data.slideNumber);
      toast.success('Presenter changed the slide', { 
        id: 'slide-change',
        duration: 1000
      });
    }
  }, [isAdmin]);

  // Next slide function for presenter
  const nextSlide = useCallback(() => {
    if (!isAdmin) {
      toast.error('Only presenters can control slides', { id: 'slide-control' });
      return;
    }

    if (currentSlide < totalSlides - 1) {
      const newSlide = currentSlide + 1;
      setCurrentSlide(newSlide);

      // Emit slide change to all guests
      socket.emit('slideChanged', {
        roomCode: code,
        slideNumber: newSlide
      });
      console.log('Emitted slide change to:', newSlide);
    }
  }, [isAdmin, currentSlide, totalSlides, code]);

  // Previous slide function for presenter
  const prevSlide = useCallback(() => {
    if (!isAdmin) {
      toast.error('Only presenters can control slides', { id: 'slide-control' });
      return;
    }

    if (currentSlide > 0) {
      const newSlide = currentSlide - 1;
      setCurrentSlide(newSlide);

      // Emit slide change to all guests
      socket.emit('slideChanged', {
        roomCode: code,
        slideNumber: newSlide
      });
      console.log('Emitted slide change to:', newSlide);
    }
  }, [isAdmin, currentSlide, code]);

  useEffect(() => {
    if (!code) {
      router.push('/');
      return;
    }
    checkRoomAccess();

    // Handle click outside participants panel
    const handleClickOutside = (event) => {
      if (participantsRef.current && !participantsRef.current.contains(event.target)) {
        setShowParticipants(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [code]);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/guest/${code}/check`);

        if (response.data) {
          setRoom(response.data);
          if (response.data.presentationUrl) {
            setPresentationUrl(response.data.presentationUrl);
          }
        }
      } catch (err) {
        console.error('Error fetching room:', err);
        setError('Room not found or no longer available');
      }
    };

    fetchRoomDetails();
  }, [code]);

  useEffect(() => {
    // Socket event listeners for participants and presentation
    socket.on('participantJoined', (data) => {
      setParticipants(prev => {
        // Check if participant already exists
        if (!prev.some(p => p.name === data.username)) {
          toast.success(`${data.username} joined the room`);
          return [...prev, { name: data.username }];
        }
        return prev;
      });
    });

    socket.on('participantLeft', (data) => {
      setParticipants(prev => {
        toast.error(`${data.username} left the room`);
        return prev.filter(p => p.name !== data.username);
      });
    });

    socket.on('presentationUpdated', (url) => {
      setPresentationUrl(url);
    });

    // Listen for slide changes from presenter
    socket.on('slideChanged', handleSlideUpdate);
    
    // Log connection status
    socket.on('connect', () => {
      console.log('Socket connected successfully');
    });
    
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      toast.error('Connection error. Please refresh the page.');
    });

    return () => {
      socket.off('participantJoined');
      socket.off('participantLeft');
      socket.off('presentationUpdated');
      socket.off('slideChanged');
      socket.off('connect');
      socket.off('connect_error');
    };
  }, [handleSlideUpdate]);

  const checkRoomAccess = async () => {
    try {
      // First, check room public info
      const { data: publicRoom } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/guest/${code}/check`);
      if (!publicRoom) {
        setError('Room not found');
        setLoading(false);
        return;
      }
      setRoom(publicRoom);

      // Check if presenter is logged in
      const token = localStorage.getItem('authToken');
      const presenterData = localStorage.getItem('presenter');
      const guestName = localStorage.getItem('guestName');

      if (token && presenterData) {
        try {
          const parsedPresenter = JSON.parse(presenterData);
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const { data: detailedRoom } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/guest/${code}/details`, config);

          // If this is the presenter's room, skip the join form
          if (detailedRoom.presenter === parsedPresenter.id || detailedRoom.presenter === parsedPresenter._id) {
            setIsAdmin(true);
            setRoom(detailedRoom);
            if (detailedRoom.participants) {
              setParticipants(detailedRoom.participants);
            }
            if (detailedRoom.presentationUrl) {
              setPresentationUrl(detailedRoom.presentationUrl);
            }
            // Automatically join the room as presenter
            socket.emit('joinRoom', { roomCode: code, username: parsedPresenter.name });
            toast.success(`Welcome back, ${parsedPresenter.name}!`);
          } else {
            // This is not the presenter's room, treat as guest
            setIsAdmin(false);
            setShowJoinForm(true);
          }
        } catch (authErr) {
          console.error('Presenter auth error:', authErr.response?.data);
          setIsAdmin(false);
          toast.error('Session expired. Please login again.');
          setShowJoinForm(true);
        }
      } else if (guestName) {
        // Returning guest user
        socket.emit('joinRoom', { roomCode: code, username: guestName });
        toast.success(`Welcome back, ${guestName}!`);
      } else {
        // New user: show join form
        setShowJoinForm(true);
      }
      setLoading(false);
    } catch (err) {
      console.error('Room access error:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to access room');
      setLoading(false);
      toast.error('Failed to access room');
    }
  };

  const handleJoinGuest = async (e) => {
    e.preventDefault();
    setError('');
    setIsJoining(true);

    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/guest/join/${code}`, {
        username: joinData.username,
        password: joinData.password
      });

      // Save the guest name properly
      localStorage.setItem('guestName', joinData.username.trim());
      setRoom(data);
      setShowJoinForm(false);
      setIsAdmin(false);
      socket.emit('joinRoom', { roomCode: code, username: joinData.username.trim() });
      toast.success(`Welcome to the room, ${joinData.username.trim()}!`);
    } catch (err) {
      console.error('Join room error:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to join room');
      toast.error(err.response?.data?.message || 'Failed to join room');
    } finally {
      setIsJoining(false);
    }
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    toast.success('Room code copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const leaveRoom = () => {
    const guestName = localStorage.getItem('guestName');
    if (guestName) {
      socket.emit('leaveRoom', { roomCode: code, username: guestName });
      localStorage.removeItem('guestName');
    }

    if (isAdmin) {
      // Optional: handle presenter leaving differently
      // localStorage.removeItem('token');
      // localStorage.removeItem('presenter');
    }

    toast.success('You left the room');
    router.push('/');
  };

  const upload = async (e) => {
    const file = e.target.files[0];

    // Verify presenter status again before upload
    const token = localStorage.getItem('authToken');
    const presenter = localStorage.getItem('presenter');

    if (!token || !presenter) {
      toast.error('Only presenters can upload slides');
      return;
    }

    // Validate file type
    const validTypes = ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid PowerPoint file (.ppt or .pptx)');
      return;
    }

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast.error('File size should be less than 100MB');
      return;
    }

    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'QuickCast');
    fd.append('cloud_name', 'dtnaynpkm');
    fd.append('resource_type', 'raw'); // Use raw to preserve original file format

    toast.loading('Uploading presentation...');

    try {
      // First verify presenter's room access
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/guest/${code}/details`, config);

      // Proceed with upload if authorized
      const uploadConfig = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const result = await axios.post('https://api.cloudinary.com/v1_1/dtnaynpkm/raw/upload', fd, uploadConfig);
      console.log('Upload result:', result.data);

      // Get the secure URL
      const presentationUrl = result.data.secure_url;

      // Update room with presentation URL
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/guest/${code}/presentation`, {
        presentationUrl
      }, config);

      setPresentationUrl(presentationUrl);

      toast.dismiss();
      toast.success('Presentation uploaded successfully');
      setShowUploadModal(false);

      // Emit socket event to notify other participants
      socket.emit('presentationUpdated', { roomCode: code, url: presentationUrl });

    } catch (err) {
      toast.dismiss();
      console.error('Upload error:', err);
      if (err.response?.status === 401) {
        toast.error('Unauthorized: Only the room presenter can upload slides');
      } else {
        toast.error('Failed to upload presentation. Please try again.');
      }
    }
  };

  const renderPresentation = useCallback(() => (
    <PresentationViewer
      presentationUrl={presentationUrl}
      currentSlide={currentSlide}
      totalSlides={totalSlides}
      onNextSlide={nextSlide}
      onPrevSlide={prevSlide}
      isAdmin={isAdmin}
      className="w-full h-full rounded-lg overflow-hidden"
    />
  ), [presentationUrl, currentSlide, totalSlides, nextSlide, prevSlide, isAdmin]);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-blue-600 font-medium"
        >
          Loading room...
        </motion.p>
      </div>
    );

  if (error)
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 p-4"
      >
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-md w-full">
          <div className="flex items-center mb-4 text-red-600">
            <X size={24} className="mr-2" />
            <h2 className="text-xl font-bold">Error</h2>
          </div>
          <div className="text-red-600 font-medium mb-6">{error}</div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/')}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all"
          >
            Return Home
          </motion.button>
        </div>
      </motion.div>
    );

  if (!room)
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-slate-100 p-4"
      >
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-md w-full">
          <div className="text-slate-600 font-medium mb-6">Room not found or no longer available</div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/')}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all"
          >
            Return Home
          </motion.button>
        </div>
      </motion.div>
    );

  if (showJoinForm) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="max-w-md w-full p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Join Room
            </h2>
            <div className="flex items-center gap-2">
              {room.isPrivate ? (
                <Lock size={18} className="text-amber-500" />
              ) : (
                <Unlock size={18} className="text-green-500" />
              )}
              <span className="text-sm font-medium">
                {room.isPrivate ? 'Private Room' : 'Public Room'}
              </span>
            </div>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-800 mb-1">Room Details</h3>
            <p className="text-blue-700 text-lg font-semibold">{room.name}</p>
            <div className="flex items-center mt-2 text-xs text-blue-600">
              <span>Room Code: {code}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={copyRoomCode}
                className="ml-2 p-1 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                aria-label="Copy room code"
              >
                <Copy size={14} />
              </motion.button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-red-100/80 backdrop-blur-sm text-red-700 rounded-lg flex items-start"
            >
              <X size={18} className="mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleJoinGuest} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                value={joinData.username}
                onChange={(e) => setJoinData({ ...joinData, username: e.target.value })}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your name"
                disabled={isJoining}
              />
            </div>

            {room.isPrivate && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Password</label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="password"
                  value={joinData.password}
                  onChange={(e) => setJoinData({ ...joinData, password: e.target.value })}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter room password"
                  disabled={isJoining}
                />
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isJoining}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isJoining ? (
                <>
                  <Loader2 size={20} className="mr-2 animate-spin" />
                  Joining...
                </>
              ) : (
                'Join Room'
              )}
            </motion.button>
          </form>

          <div className="mt-4 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => router.push('/')}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Return to Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate" 
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 py-4 px-2 sm:py-6 sm:px-4 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl h-[calc(100vh-2rem)]">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-3 sm:p-4 md:p-6 mb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {room.name}
              </h1>
              <div className="flex flex-wrap items-center gap-1.5 md:gap-3 mt-2">
                <div className="flex items-center text-xs sm:text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  <span>Room Code: {code}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={copyRoomCode}
                    className="ml-1.5 p-1 rounded-full bg-blue-200 hover:bg-blue-300 transition-colors"
                    aria-label="Copy room code"
                  >
                    {isCopied ? (
                      <motion.span
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="text-green-600 text-xs font-medium"
                      >
                        Copied!
                      </motion.span>
                    ) : (
                      <Copy size={12} />
                    )}
                  </motion.button>
                </div>
                <span className="text-xs sm:text-sm px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                  {isAdmin
                    ? 'Presenter: ' + JSON.parse(localStorage.getItem('presenter'))?.name
                    : 'Guest: ' + localStorage.getItem('guestName')}
                </span>
                {room.isPrivate && (
                  <span className="text-xs sm:text-sm px-2 py-1 bg-amber-100 text-amber-700 rounded-full flex items-center">
                    <Lock size={12} className="mr-1" />
                    Private Room
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto mt-2 md:mt-0">
              {isAdmin && (
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowUploadModal(true)}
                    className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" />
                    </svg>
                    <span className="hidden xs:inline">Upload</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowParticipants(prev => !prev)}
                    className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg transition-colors"
                  >
                    <Users size={16} />
                    <span className="hidden xs:inline">Participants</span>
                    <span className="rounded-full bg-indigo-200 px-1.5 py-0.5 text-xs">
                      {participants.length}
                    </span>
                  </motion.button>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={leaveRoom}
                className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
              >
                <X size={16} />
                <span className=" xs:inline">Leave</span>
              </motion.button>
            </div>
          </div>

          {/* Participants Panel */}
          <AnimatePresence>
            {showParticipants && (
              <motion.div
                ref={participantsRef}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 overflow-hidden"
              >
                <div className="bg-indigo-50 p-3 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-indigo-700">
                      Participants ({participants.length})
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowParticipants(false)}
                      className="p-1 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition-colors"
                    >
                      <X size={14} />
                    </motion.button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 max-h-24 sm:max-h-32 overflow-y-auto pr-2">
                    {participants.length > 0 ? (
                      participants.map((p, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="px-2 py-1 bg-white text-xs sm:text-sm text-indigo-600 rounded-full shadow-sm"
                        >
                          {p.name}
                        </motion.span>
                      ))
                    ) : (
                      <span className="text-xs sm:text-sm text-indigo-500">No participants yet</span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Upload Presentation</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <input
                  type="file"
                  accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                  onChange={upload}
                  ref={fileInputRef}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Choose PPT File
                </button>
                <p className="mt-2 text-sm text-gray-500">
                  Supports .ppt and .pptx files (max 100MB)
                </p>
              </div>
            </motion.div>
          </div>
        )}

        {/* Content Area */}
        <div className="block md:hidden w-full">
          {/* Mobile Tab Bar */}
          <div className="flex border-b rounded-xl overflow-hidden bg-white/80 shadow mb-2">
            <button
              onClick={() => setMobileTab('slides')}
              className={`flex-1 py-2 text-xs font-medium flex items-center justify-center transition-all duration-200 ${mobileTab === 'slides' ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700' : 'text-gray-600 hover:text-blue-700'}`}
            >
              Slides
            </button>
            <button
              onClick={() => setMobileTab('chat')}
              className={`flex-1 py-2 text-xs font-medium flex items-center justify-center transition-all duration-200 ${mobileTab === 'chat' ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700' : 'text-gray-600 hover:text-blue-700'}`}
            >
              Chat
            </button>
            <button
              onClick={() => setMobileTab('polls')}
              className={`flex-1 py-2 text-xs font-medium flex items-center justify-center transition-all duration-200 ${mobileTab === 'polls' ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700' : 'text-gray-600 hover:text-blue-700'}`}
            >
              {isAdmin ? 'Create Polls' : 'Polls'}
            </button>
          </div>
          {/* Mobile Tab Content - keep all mounted, toggle visibility */}
          <div className="w-full h-[60vh] mb-3 relative group">
            <div className={`h-full bg-white rounded-2xl shadow-xl overflow-hidden ${mobileTab === 'slides' ? '' : 'hidden'}`}>
              {renderPresentation()}
            </div>
            <div className={`h-full bg-white rounded-2xl shadow-xl overflow-hidden ${mobileTab === 'chat' ? '' : 'hidden'}`}>
              <ChatApplication roomCode={code} isAdmin={isAdmin} socket={socket} />
            </div>
            <div className={`h-full bg-white rounded-2xl shadow-xl overflow-hidden ${mobileTab === 'polls' ? '' : 'hidden'}`}>
              {isAdmin ? (
                <PollCreator roomCode={code} socket={socket} />
              ) : (
                <PollList roomCode={code} socket={socket} />
              )}
            </div>
          </div>
        </div>

        {/* Desktop layout (unchanged) */}
        <div className="hidden md:flex flex-col md:flex-row h-[calc(100vh-8rem)] md:h-[calc(100vh-9rem)] lg:h-[calc(100vh-10rem)]">
          {/* Presentation Section */}
          <div className="w-full md:w-2/3 lg:w-3/4 md:pr-3 h-1/2 md:h-full mb-3 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="h-full bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {renderPresentation()}
            </motion.div>
          </div>
          {/* Right Sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4 h-1/2 md:h-full flex flex-col bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-2 text-xs sm:text-sm font-medium ${activeTab === 'chat'
                  ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                Chat
              </button>
              <button
                onClick={() => setActiveTab('polls')}
                className={`flex-1 py-2 text-xs sm:text-sm font-medium ${activeTab === 'polls'
                  ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {isAdmin ? 'Create Polls' : 'Polls'}
              </button>
            </div>
            {/* Tab Content - keep all mounted, toggle visibility */}
            <div className="flex-1 overflow-hidden">
              <div className={`h-full ${activeTab === 'chat' ? 'block' : 'hidden'}`}> 
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="h-full"
                >
                  <ChatApplication roomCode={code} isAdmin={isAdmin} socket={socket} />
                </motion.div>
              </div>
              <div className={`h-full ${activeTab === 'polls' ? 'block' : 'hidden'}`}> 
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="h-full"
                >
                  {isAdmin ? (
                    <PollCreator roomCode={code} socket={socket} />
                  ) : (
                    <PollList roomCode={code} socket={socket} />
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}