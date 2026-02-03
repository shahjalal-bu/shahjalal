"use client"

import { useLiveShare } from '@/context/live-share-context';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Copy, Users, Link2, LogOut, Check } from 'lucide-react';

function LiveShareContent() {
  const {
    state,
    createRoom,
    joinRoom,
    leaveRoom,
    updateCode,
    updateLanguage,
    copyRoomLink,
    getRoomLink,
  } = useLiveShare();

  const searchParams = useSearchParams();
  const roomIdFromUrl = searchParams?.get('room');

  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomIdToJoin, setRoomIdToJoin] = useState(roomIdFromUrl || '');
  const [showJoinForm, setShowJoinForm] = useState(!!roomIdFromUrl);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (roomIdFromUrl && !state.isConnected) {
      setRoomIdToJoin(roomIdFromUrl);
      setShowJoinForm(true);
    }
  }, [roomIdFromUrl, state.isConnected]);

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !roomName.trim()) return;
    
    createRoom(roomName, userName);
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !roomIdToJoin.trim()) return;
    
    const success = joinRoom(roomIdToJoin, userName);
    if (!success) {
      alert('Room not found or is locked');
    }
  };

  const handleCopyLink = async () => {
    const success = await copyRoomLink();
    if (success) {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  if (!state.isConnected) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Live Code Share
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Collaborate in real-time. Share code instantly.
              </p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setShowJoinForm(false)}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                  !showJoinForm
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Create Room
              </button>
              <button
                onClick={() => setShowJoinForm(true)}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                  showJoinForm
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Join Room
              </button>
            </div>

            {/* Forms */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
              {!showJoinForm ? (
                <form onSubmit={handleCreateRoom} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Room Name
                    </label>
                    <input
                      type="text"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="My Coding Session"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold transition-all shadow-sm"
                  >
                    Create Room & Get Link
                  </button>
                </form>
              ) : (
                <form onSubmit={handleJoinRoom} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Room ID or Link
                    </label>
                    <input
                      type="text"
                      value={roomIdToJoin}
                      onChange={(e) => setRoomIdToJoin(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="room-xxx or paste full link"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold transition-all shadow-sm"
                  >
                    Join Room
                  </button>
                </form>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: '⚡', title: 'Real-time', desc: 'See changes instantly' },
                { icon: '🔗', title: 'Easy Sharing', desc: 'Share link to collaborate' },
                { icon: '🎨', title: 'Multi-language', desc: 'Support for all languages' },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {state.currentRoom?.name}
              </h1>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{state.participants.length}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm"
              >
                {linkCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Share Link</span>
                  </>
                )}
              </button>

              <button
                onClick={leaveRoom}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Leave</span>
              </button>
            </div>
          </div>

          {/* Participants */}
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            {state.participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border"
                style={{ 
                  backgroundColor: `${participant.color}15`,
                  borderColor: `${participant.color}40`,
                  color: participant.color 
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: participant.color }}
                />
                <span className="font-medium">{participant.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
          {/* Language Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
            <select
              value={state.language}
              onChange={(e) => updateLanguage(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="php">PHP</option>
            </select>
          </div>

          {/* Code Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Code</label>
            <textarea
              value={state.code}
              onChange={(e) => updateCode(e.target.value)}
              className="w-full h-[500px] px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Start typing your code here... Everyone in the room will see it live!"
              spellCheck={false}
            />
          </div>

          {/* Info */}
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              💡 <strong>Tip:</strong> All changes are synced in real-time across all participants. Share the room link to invite others!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LiveSharePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <LiveShareContent />
    </Suspense>
  );
}
