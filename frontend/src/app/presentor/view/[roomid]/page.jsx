'use client'
import { useState, useEffect } from 'react';

import { 
  Send, 
  Users, 
  PieChart, 
  MessageSquare, 
  ChevronRight, 
  ChevronLeft, 
  UserPlus, 
  Share2, 
  Settings, 
  BarChart2, 
  Maximize2,
  Plus,
  CheckCircle2,
  Clock,
  ThumbsUp,
  X,
  Download
} from 'lucide-react';

export default function PresenterView() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activePoll, setActivePoll] = useState(null);
  const [chatTab, setChatTab] = useState('questions');
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [answer, setAnswer] = useState('');
  const [fullScreen, setFullScreen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [questions, setQuestions] = useState([
    { 
      id: 1, 
      user: "Emma Wilson", 
      question: "Can you explain more about the real-time synchronization feature?", 
      time: "12:10 PM", 
      answered: false,
      votes: 3 
    },
    { 
      id: 2, 
      user: "John Smith", 
      question: "What platforms will this system support?", 
      time: "12:12 PM", 
      answered: true,
      votes: 5 
    },
    { 
      id: 3, 
      user: "Alice Johnson", 
      question: "Is there a limit to the number of attendees per presentation?", 
      time: "12:15 PM", 
      answered: false,
      votes: 2 
    },
  ]);
  
  const [pollStats, setPollStats] = useState(null);
  const [previousPolls, setPreviousPolls] = useState([
    {
      id: 1,
      question: "What feature of QuickCast do you find most valuable?",
      options: [
        { text: "Enhanced engagement", votes: 12 },
        { text: "Real-time synchronization", votes: 5 },
        { text: "Easy accessibility", votes: 3 }
      ],
      totalVotes: 20,
      createdAt: new Date().toISOString(),
      status: 'completed',
      duration: '45 seconds',
      participationRate: 80
    },
    {
      id: 2,
      question: "How satisfied are you with the presentation flow?",
      options: [
        { text: "Very satisfied", votes: 15 },
        { text: "Satisfied", votes: 8 },
        { text: "Neutral", votes: 2 },
        { text: "Dissatisfied", votes: 0 }
      ],
      totalVotes: 25,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      status: 'completed',
      duration: '60 seconds',
      participationRate: 90
    }
  ]);

  // Mock data for slides
  const slides = [
    { 
      id: 1, 
      title: "Real-Time Presentation System", 
      subtitle: "Making presentations accessible and interactive for everyone",
      content: "Introduction to QuickCast"
    },
    { 
      id: 2, 
      title: "Problem Statement",
      content: [
        "Limited Visibility: Attendees at the back struggle to see slides",
        "Delayed Q&A: Hard to clarify doubts as presenter moves on",
        "Lack of Instant Feedback: Can't gauge audience understanding in real time"
      ]
    },
    { 
      id: 3, 
      title: "Key Features",
      content: [
        "Real-time synchronized slides",
        "Interactive Q&A functionality",
        "Live polling capabilities",
        "Cross-platform compatibility"
      ]
    },
    { 
      id: 4, 
      title: "Statistics",
      content: "80% of professionals report losing audience engagement due to static presentations"
    },
  ];
  
  // Mock data for attendees
  const attendees = [
    { id: 1, name: "John Smith", joined: "12:03 PM", questions: 2 },
    { id: 2, name: "Alice Johnson", joined: "12:00 PM", questions: 1 },
    { id: 3, name: "Robert Davis", joined: "12:05 PM", questions: 0 },
    { id: 4, name: "Emma Wilson", joined: "12:01 PM", questions: 3 },
    { id: 5, name: "Michael Brown", joined: "12:02 PM", questions: 0 },
  ];
  
  // Mock data for active poll
  const pollOptions = [
    { id: 1, text: "Enhanced engagement", votes: 12, percentage: 60 },
    { id: 2, text: "Real-time synchronization", votes: 5, percentage: 25 },
    { id: 3, text: "Easy accessibility", votes: 3, percentage: 15 },
  ];

  // Check for viewport size changes to adjust layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    const socket = {}; // Replace with actual socket initialization
    socket.on('pollUpdated', (pollData) => {
      setPollStats({
        totalVotes: pollData.totalVotes,
        options: pollData.options
      });
    });

    socket.on('pollEnded', () => {
      setPollStats(null);
    });

    return () => {
      socket.off('pollUpdated');
      socket.off('pollEnded');
    };
  }, []);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  
  const launchPoll = () => {
    setActivePoll({
      question: "What feature of QuickCast do you find most valuable?",
      options: pollOptions,
      totalVotes: 20,
      timeLeft: "45 seconds"
    });
    setShowPollCreator(false);
  };
  
  const endPoll = () => {
    setActivePoll(null);
  };

  const handleAnswerQuestion = (id) => {
    setQuestions(questions.map(q => 
      q.id === id ? {...q, answered: true} : q
    ));
  };

  const handleVoteQuestion = (id) => {
    setQuestions(questions.map(q => 
      q.id === id ? {...q, votes: q.votes + 1} : q
    ));
  };

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
    // In a real implementation, you would use the Fullscreen API here
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Presentation Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="bg-white shadow-sm border-b flex justify-between items-center px-4 md:px-6 py-3">
          <div className="flex items-center">
            {isMobileView && (
              <button 
                className="mr-2 p-1 hover:bg-gray-100 rounded-md"
                onClick={toggleSidebar}
              >
                <Users size={18} />
              </button>
            )}
            <h1 className="text-lg md:text-xl font-bold text-black">QuickCast</h1>
            <span className="mx-2 text-gray-300 hidden md:inline">|</span>
            <h2 className="hidden md:block text-lg font-medium text-black">Real-Time Presentation System Demo</h2>
          </div>
          
          <div className="flex items-center space-x-1 md:space-x-2">
            <button className="hidden md:flex items-center rounded-lg bg-blue-50 text-black px-3 py-1.5 text-sm font-medium">
              <UserPlus size={16} className="mr-1" />
              <span>Invite</span>
            </button>
            <button className="hidden md:flex items-center rounded-lg bg-blue-50 text-black px-3 py-1.5 text-sm font-medium">
              <Share2 size={16} className="mr-1" />
              <span>Share</span>
            </button>
            <button className="rounded-full p-2 hover:bg-gray-100">
              <Settings size={18} />
            </button>
          </div>
        </div>
        
        {/* Presentation Content */}
        <div className="flex-1 p-3 md:p-6 flex flex-col">
          {/* Slide Controls */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-500">Slide {currentSlide + 1} of {slides.length}</span>
            </div>
            
            <div className="flex items-center space-x-1 md:space-x-2">
              <button 
                className="p-1 md:p-2 rounded-lg border hover:bg-gray-50"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} className={currentSlide === 0 ? "text-gray-300" : "text-black"} />
              </button>
              <button 
                className="p-1 md:p-2 rounded-lg border hover:bg-gray-50"
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                aria-label="Next slide"
              >
                <ChevronRight size={20} className={currentSlide === slides.length - 1 ? "text-gray-300" : "text-black"} />
              </button>
              <button 
                className="p-1 md:p-2 rounded-lg border hover:bg-gray-50"
                onClick={toggleFullScreen}
                aria-label="Toggle fullscreen"
              >
                <Maximize2 size={18} />
              </button>
              {isMobileView && (
                <button 
                  className="p-1 md:p-2 rounded-lg border hover:bg-gray-50 md:hidden"
                  onClick={toggleSidebar}
                  aria-label="Toggle sidebar"
                >
                  {showSidebar ? <ChevronRight size={18} /> : <Users size={18} />}
                </button>
              )}
            </div>
          </div>
          
          {/* Slide Content */}
          <div className={`flex-1 bg-white shadow-lg rounded-xl flex flex-col items-center justify-center relative overflow-hidden ${fullScreen ? 'fixed inset-0 z-50' : ''}`}>
            {fullScreen && (
              <button 
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
                onClick={toggleFullScreen}
              >
                <X size={24} />
              </button>
            )}
            
            {/* Current Slide */}
            <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 tracking-tight text-black">{slides[currentSlide].title}</h3>
              {slides[currentSlide].subtitle && (
                <h4 className="text-lg md:text-xl text-black mb-6 md:mb-8 tracking-tight">{slides[currentSlide].subtitle}</h4>
              )}
              
              {typeof slides[currentSlide].content === 'string' ? (
                <p className="text-xl md:text-2xl mb-6 tracking-tight text-black">{slides[currentSlide].content}</p>
              ) : (
                <ul className="text-left space-y-3 md:space-y-4 text-lg md:text-xl text-black">
                  {slides[currentSlide].content.map((item, index) => (
                    <li key={index} className="tracking-tight">{item}</li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* Active Poll Overlay */}
            {activePoll && (
              <div className="absolute bottom-0 left-0 right-0 bg-white border-t shadow-md p-4 transition-all">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h4 className="font-medium text-black">Live Poll</h4>
                    <p className="text-gray-500 text-sm">{activePoll.question}</p>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="text-gray-500 mr-1" />
                    <span className="text-sm text-gray-500">{activePoll.timeLeft}</span>
                    <button 
                      className="ml-4 text-red-600 text-sm font-medium hover:underline"
                      onClick={endPoll}
                    >
                      End Poll
                    </button>
                  </div>
                </div>
                
                {pollStats && (
                  <div className="mt-4 space-y-3">
                    {pollStats.options.map((option, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-100 transition-all duration-500"
                             style={{ width: `${(option.votes / Math.max(pollStats.totalVotes, 1)) * 100}%` }}
                        />
                        <div className="relative z-10 flex justify-between items-center">
                          <div>
                            <span className="font-medium text-black">{option.text}</span>
                            <span className="ml-2 text-sm text-gray-500">({option.votes} votes)</span>
                          </div>
                          <span className="font-medium text-black">
                            {Math.round((option.votes / Math.max(pollStats.totalVotes, 1)) * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="text-center text-sm text-gray-500 mt-2">
                      Total Responses: {pollStats.totalVotes}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Poll Creator Modal */}
          {showPollCreator && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
              <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 w-full max-w-md max-h-[90vh] overflow-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-black">Create New Poll</h3>
                  <button 
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPollCreator(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Poll Question
                  </label>
                  <input 
                    type="text" 
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    placeholder="What feature of QuickCast do you find most valuable?"
                    defaultValue="What feature of QuickCast do you find most valuable?"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Options
                  </label>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="text" 
                        className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                        placeholder="Option 1"
                        defaultValue="Enhanced engagement"
                      />
                      <button className="ml-2 text-gray-400 hover:text-gray-600">
                        <Plus size={18} />
                      </button>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="text" 
                        className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                        placeholder="Option 2"
                        defaultValue="Real-time synchronization"
                      />
                      <button className="ml-2 text-gray-400 hover:text-gray-600">
                        <Plus size={18} />
                      </button>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="text" 
                        className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                        placeholder="Option 3"
                        defaultValue="Easy accessibility"
                      />
                      <button className="ml-2 text-gray-400 hover:text-gray-600">
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Poll Duration
                  </label>
                  <select className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black">
                    <option>30 seconds</option>
                    <option defaultValue>45 seconds</option>
                    <option>60 seconds</option>
                    <option>90 seconds</option>
                    <option>Until manually closed</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-2 mt-6">
                  <button 
                    className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowPollCreator(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    onClick={launchPoll}
                  >
                    Launch Poll
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Right Sidebar - Attendees, Chat, Poll */}
      {(showSidebar || !isMobileView) && (
        <div className={`${isMobileView ? 'fixed right-0 top-0 bottom-0 z-30 shadow-xl' : ''} w-full md:w-80 bg-white border-l flex flex-col transition-all duration-300`}>
          {isMobileView && (
            <div className="bg-white p-3 border-b flex justify-between items-center">
              <h3 className="font-medium text-black">QuickCast</h3>
              <button onClick={() => setShowSidebar(false)} className="p-1">
                <X size={20} />
              </button>
            </div>
          )}
          
          {/* Tabs */}
          <div className="flex border-b">
            <button 
              className={`flex-1 py-3 text-sm font-medium ${chatTab === 'questions' ? 'text-black border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setChatTab('questions')}
            >
              <div className="flex items-center justify-center">
                <MessageSquare size={16} className="mr-1" />
                Questions
              </div>
            </button>
            <button 
              className={`flex-1 py-3 text-sm font-medium ${chatTab === 'attendees' ? 'text-black border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setChatTab('attendees')}
            >
              <div className="flex items-center justify-center">
                <Users size={16} className="mr-1" />
                Attendees
              </div>
            </button>
            <button 
              className={`flex-1 py-3 text-sm font-medium ${chatTab === 'polls' ? 'text-black border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setChatTab('polls')}
            >
              <div className="flex items-center justify-center">
                <BarChart2 size={16} className="mr-1" />
                Polls
              </div>
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Questions Tab */}
            {chatTab === 'questions' && (
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="font-medium text-black">Questions ({questions.filter(q => !q.answered).length} unanswered)</h3>
                </div>
                
                <div className="space-y-3">
                  {questions.map(q => (
                    <div key={q.id} className={`p-3 rounded-lg ${q.answered ? 'bg-gray-50' : 'bg-blue-50'} transition-all hover:shadow-md`}>
                      <div className="flex justify-between">
                        <span className="font-medium text-black">{q.user}</span>
                        <span className="text-xs text-gray-500">{q.time}</span>
                      </div>
                      <p className="mt-1 text-black">{q.question}</p>
                      <div className="flex justify-between mt-2">
                        <div className="flex items-center text-sm">
                          <button 
                            className="flex items-center text-gray-500 hover:text-blue-600"
                            onClick={() => handleVoteQuestion(q.id)}
                          >
                            <ThumbsUp size={14} className="mr-1" />
                            <span className="text-black">{q.votes}</span>
                          </button>
                        </div>
                        {!q.answered ? (
                          <button 
                            className="text-sm text-blue-600 font-medium hover:underline"
                            onClick={() => handleAnswerQuestion(q.id)}
                          >
                            Mark as Answered
                          </button>
                        ) : (
                          <div className="flex items-center text-sm text-green-600">
                            <CheckCircle2 size={14} className="mr-1" />
                            Answered
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Attendees Tab */}
            {chatTab === 'attendees' && (
              <div className="p-4">
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="font-medium text-black">Attendees ({attendees.length})</h3>
                  <button className="text-sm text-blue-600 flex items-center hover:underline">
                    <Download size={14} className="mr-1" />
                    Export List
                  </button>
                </div>
                
                <div className="space-y-2">
                  {attendees.map(attendee => (
                    <div key={attendee.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                      <div>
                        <div className="font-medium text-black">{attendee.name}</div>
                        <div className="text-xs text-gray-500">Joined at {attendee.joined}</div>
                      </div>
                      <div className="text-sm">
                        {attendee.questions > 0 ? (
                          <span className="text-blue-600">{attendee.questions} Q</span>
                        ) : (
                          <span className="text-gray-400">No Q</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Polls Tab */}
            {chatTab === 'polls' && (
              <div className="p-4">
                <div className="mb-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-black">Polls</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {activePoll ? 'Live poll active' : 'No active polls'}
                    </p>
                  </div>
                  <button 
                    className="text-sm text-blue-600 flex items-center hover:underline"
                    onClick={() => setShowPollCreator(true)}
                  >
                    <Plus size={16} className="mr-1" />
                    New Poll
                  </button>
                </div>
                
                {activePoll && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h4 className="font-medium text-black">Live Poll</h4>
                        <p className="text-sm text-gray-600 mt-1">{activePoll.question}</p>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="text-gray-500 mr-1" />
                        <span className="text-sm text-gray-500 mr-4">{activePoll.timeLeft || 'Ongoing'}</span>
                        <button 
                          className="text-red-600 text-sm font-medium hover:underline"
                          onClick={endPoll}
                        >
                          End Poll
                        </button>
                      </div>
                    </div>

                    {pollStats && (
                      <div className="mt-4">
                        <div className="bg-white rounded-lg p-3 mb-3">
                          <div className="grid grid-cols-3 gap-3 text-center">
                            <div>
                              <div className="text-2xl font-bold text-blue-600">{pollStats.totalVotes}</div>
                              <div className="text-xs text-gray-500">Total Votes</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-green-600">
                                {Math.round((pollStats.totalVotes / attendees.length) * 100)}%
                              </div>
                              <div className="text-xs text-gray-500">Participation</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-purple-600">
                                {Math.round(pollStats.totalVotes / (Date.now() - new Date(activePoll.startTime)) * 60000)}
                              </div>
                              <div className="text-xs text-gray-500">Votes/min</div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {pollStats.options.map((option, idx) => (
                            <div key={idx} className="bg-white rounded-lg p-3 relative overflow-hidden">
                              <div className="absolute inset-0 bg-blue-100 transition-all duration-500"
                                   style={{ width: `${(option.votes / Math.max(pollStats.totalVotes, 1)) * 100}%` }}
                              />
                              <div className="relative z-10 flex justify-between items-center">
                                <div>
                                  <span className="font-medium text-black">{option.text}</span>
                                  <span className="ml-2 text-sm text-gray-500">({option.votes} votes)</span>
                                </div>
                                <span className="font-medium text-black">
                                  {Math.round((option.votes / Math.max(pollStats.totalVotes, 1)) * 100)}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Previous polls section with enhanced visualization */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-gray-500">Previous Polls</h4>
                    <div className="flex gap-2">
                      <button className="text-xs text-blue-600 hover:underline flex items-center">
                        <Download size={12} className="mr-1" />
                        Export Results
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {previousPolls.map((poll, idx) => (
                      <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h5 className="font-medium text-black">{poll.question}</h5>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(poll.createdAt).toLocaleDateString()} • {poll.duration} • 
                              {poll.participationRate}% participation
                            </p>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                            {poll.status}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {poll.options.map((option, optIdx) => (
                            <div key={optIdx} className="relative">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-black">{option.text}</span>
                                <span className="text-black font-medium">
                                  {Math.round((option.votes / Math.max(poll.totalVotes, 1)) * 100)}%
                                </span>
                              </div>
                              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                                  style={{ width: `${(option.votes / Math.max(poll.totalVotes, 1)) * 100}%` }}
                                />
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {option.votes} votes
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 text-xs text-gray-500">
                          Total votes: {poll.totalVotes}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Input Area (for Questions tab) */}
          {chatTab === 'questions' && (
            <div className="p-3 border-t">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Answer questions directly..."
                  className="w-full px-4 py-2 pr-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && answer.trim()) {
                      // Add logic to send the answer
                      console.log('Sending answer:', answer);
                      setAnswer('');
                    }
                  }}
                />
                <button 
                  className={`absolute right-2 top-2 ${answer.trim() ? 'text-blue-600' : 'text-gray-400'}`}
                  disabled={!answer.trim()}
                  onClick={() => {
                    if (answer.trim()) {
                      // Add logic to send the answer
                      console.log('Sending answer:', answer);
                      setAnswer('');
                    }
                  }}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}