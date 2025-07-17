'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { WebSocketClient } from '@/lib/Websocket';
import WaveAnimation from '@/components/WaveAnimation';
import UserAvatar from '@/components/UserAvatar';
import SessionControls from '../SessionControl';
import { getUserId } from '@/lib/ClerkUserId';
import axios from 'axios';

interface serverData {
  topic: string;
  duration: string;
}

const DebateSession = () => {
  const router = useRouter();
  const params = useParams();
  const companionId = typeof params.id === 'string' ? params.id : '';
  const [data, setData] = useState<serverData>();
  const [isActive, setIsActive] = useState(false);
  const [response, setResponse] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const wsRef = useRef<WebSocketClient | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = await getUserId();
      if (!companionId || !userId) {
        router.push('/create-companion');
        return;
      }

      // Initialize WebSocket
      wsRef.current = new WebSocketClient(
        companionId,
        userId,
        (data) => {
          setResponse(data.data.companionResponse);
          if (data.audio) {
            const audioBlob = new Blob([Buffer.from(data.audio, 'hex')], {
              type: 'audio/wav',
            });
            setAudioUrl(URL.createObjectURL(audioBlob));
          }
        },
        (error) => console.error(error)
      );
    };

    fetchData();

    return () => wsRef.current?.close();
  }, []);

  useEffect(() => {
    if (isActive) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
              event.data.arrayBuffer().then((buffer) => {
                 console.log('Audio MIME type:', event.data.type, 'Size:', event.data.size);
              wsRef.current?.sendAudio(buffer);
            });
          }
        };
        mediaRecorderRef.current.start(1000);
      });
    } else {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current = null;
      }
    }
  }, [isActive]);

  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
      return () => URL.revokeObjectURL(audioUrl);
    }
  }, [audioUrl]);

  useEffect(() => {
    const getcompanionId = async () => {
      const userId = await getUserId();
        const userdata = {
          "companion_id": companionId,
          "userId": userId
      }
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/get_companion`, userdata
        );
        if (response.status === 200) {
          setData(response.data.data);
        }
      } catch (error) {
        console.log('error in getting companion', error);
      }
    };

    getcompanionId();
  }, []);

  const handleStart = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-blue-900 text-white overflow-hidden">
      {/* Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500 rounded-full opacity-30"
            style={{
              width: Math.random() * 5 + 2,
              height: Math.random() * 5 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -1000],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-16">
        {/* Header: Topic and Duration */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            {data?.topic || 'Debate Session'}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mt-2">
            Duration: {data?.duration || 'N/A'}
          </p>
        </motion.div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wave Animation Box */}
          <div className="lg:col-span-2">
            <WaveAnimation isActive={isActive} />
            {response && (
              <motion.div
                className="mt-4 p-4 bg-gray-800/50 backdrop-blur-md rounded-lg border border-blue-500/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-300">{response}</p>
              </motion.div>
            )}
          </div>

          {/* User Avatar and Controls */}
          <div className="flex flex-col items-center gap-4">
            <UserAvatar avatarUrl="/images/avatar-placeholder.png" />
            <SessionControls isActive={isActive} onStart={handleStart} />
          </div>
        </div>
      </div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-0 left-0 w-48 h-48 bg-purple-500 rounded-full opacity-20 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default DebateSession;
