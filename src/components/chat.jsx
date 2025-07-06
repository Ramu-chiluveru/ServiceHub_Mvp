import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, Settings, Search, Bell, Menu, X, Volume2, VolumeX, Globe, MessageCircle, User, Home } from 'lucide-react';

const VoiceChatApp = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'ai', timestamp: new Date() }
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newsPreferences, setNewsPreferences] = useState(['Technology', 'AI', 'Science']);
  const [news, setNews] = useState([
    { id: 1, title: "OpenAI Announces New GPT-5 Model", summary: "Revolutionary AI capabilities in natural language processing", source: "TechCrunch", time: "2 hours ago", category: "AI" },
    { id: 2, title: "Quantum Computing Breakthrough", summary: "Scientists achieve 99.9% fidelity in quantum operations", source: "Nature", time: "4 hours ago", category: "Science" },
    { id: 3, title: "Apple's New M4 Chip Performance", summary: "Benchmarks show 40% improvement over previous generation", source: "The Verge", time: "6 hours ago", category: "Technology" }
  ]);
  const [notifications, setNotifications] = useState(2);
  
  const messagesEndRef = useRef(null);
  const speechRecognition = useRef(null);
  const speechSynthesis = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window) {
      speechRecognition.current = new window.webkitSpeechRecognition();
      speechRecognition.current.continuous = false;
      speechRecognition.current.interimResults = false;
      speechRecognition.current.lang = 'en-US';
      
      speechRecognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleSendMessage(transcript);
      };
      
      speechRecognition.current.onend = () => {
        setIsListening(false);
      };
    }
    
    // Initialize Speech Synthesis
    speechSynthesis.current = window.speechSynthesis;
  }, []);

  const startListening = () => {
    if (speechRecognition.current) {
      setIsListening(true);
      speechRecognition.current.start();
    }
  };

  const stopListening = () => {
    if (speechRecognition.current) {
      speechRecognition.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text) => {
    if (speechSynthesis.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      speechSynthesis.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (speechSynthesis.current) {
      speechSynthesis.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = (messageText = inputText) => {
    if (!messageText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: `I understand you said: "${messageText}". This is a simulated AI response. In a real implementation, this would connect to your AI service.`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      speakText(aiResponse.text);
    }, 1000);
  };

  const NavItem = ({ icon: Icon, label, tabKey, badge }) => (
    <button
      onClick={() => setActiveTab(tabKey)}
      className={`flex items-center space-x-3 w-full p-3 rounded-xl transition-all duration-200 ${
        activeTab === tabKey 
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <div className="relative">
        <Icon className="w-5 h-5" />
        {badge && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
      <span className="font-medium">{label}</span>
    </button>
  );

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 lg:static lg:inset-0 lg:z-0 flex-shrink-0`}>
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          VoiceAI
        </h1>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <nav className="p-4 space-y-2">
        <NavItem icon={MessageCircle} label="AI Chat" tabKey="chat" />
        <NavItem icon={Globe} label="News Feed" tabKey="news" badge={notifications} />
        <NavItem icon={Search} label="AI Search" tabKey="search" />
        <NavItem icon={Settings} label="Settings" tabKey="settings" />
      </nav>
    </div>
  );

  const ChatInterface = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
              message.sender === 'user'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}>
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-6 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message or use voice input..."
              className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            />
            <button
              onClick={() => handleSendMessage()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-blue-500 hover:text-blue-600 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <button
            onClick={isListening ? stopListening : startListening}
            className={`p-3 rounded-xl transition-all duration-200 ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          
          <button
            onClick={isSpeaking ? stopSpeaking : () => {}}
            className={`p-3 rounded-xl transition-all duration-200 ${
              isSpeaking 
                ? 'bg-green-500 hover:bg-green-600 text-white animate-pulse' 
                : 'bg-gray-300 text-gray-500'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>
  );

  const NewsFeed = () => (
    <div className="h-full overflow-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">News Feed</h2>
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">
              {notifications} new articles
            </span>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Your Preferences:</h3>
          <div className="flex flex-wrap gap-2">
            {newsPreferences.map((pref) => (
              <span
                key={pref}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {pref}
              </span>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          {news.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-blue-500"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-500">{article.time}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{article.summary}</p>
                  <p className="text-sm text-blue-600 font-medium">
                    Source: {article.source}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SearchInterface = () => (
    <div className="h-full overflow-auto">
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">AI Search</h2>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search anything with AI..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="text-center text-gray-500">
            <p>Enter your search query and get AI-powered results</p>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsInterface = () => (
    <div className="h-full overflow-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">News Preferences</h3>
            <div className="space-y-3">
              {['Technology', 'AI', 'Science', 'Business', 'Health', 'Sports'].map((category) => (
                <label key={category} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={newsPreferences.includes(category)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewsPreferences([...newsPreferences, category]);
                      } else {
                        setNewsPreferences(newsPreferences.filter(p => p !== category));
                      }
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Voice Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-gray-700">Enable Voice Input</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-gray-700">Auto-speak AI Responses</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface />;
      case 'news':
        return <NewsFeed />;
      case 'search':
        return <SearchInterface />;
      case 'settings':
        return <SettingsInterface />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Ready'}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">User</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
      
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default VoiceChatApp;