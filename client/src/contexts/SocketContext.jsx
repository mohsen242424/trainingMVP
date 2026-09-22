import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(new Set());

  useEffect(() => {
    let newSocket = null;
    
    if (isAuthenticated && user) {
      newSocket = io('/', {
        reconnectionDelayMax: 10000,
      });

      newSocket.on('connect', () => {
        newSocket.emit('join', { userId: user.id || user._id });
      });

      newSocket.on('user_online', (userId) => {
        setOnlineUsers((prev) => {
          const next = new Set(prev);
          next.add(userId);
          return next;
        });
      });

      newSocket.on('user_offline', (userId) => {
        setOnlineUsers((prev) => {
          const next = new Set(prev);
          next.delete(userId);
          return next;
        });
      });

      setSocket(newSocket);
    }

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [isAuthenticated, user]);

  const sendMessage = useCallback((event, data) => {
    if (socket) {
      socket.emit(event, data);
    }
  }, [socket]);

  const startTyping = useCallback((conversationId) => {
    if (socket && user) {
      socket.emit('typing', { conversationId, userId: user.id || user._id });
    }
  }, [socket, user]);

  const stopTyping = useCallback((conversationId) => {
    if (socket && user) {
      socket.emit('stop_typing', { conversationId, userId: user.id || user._id });
    }
  }, [socket, user]);

  const value = {
    socket,
    onlineUsers,
    sendMessage,
    startTyping,
    stopTyping
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
