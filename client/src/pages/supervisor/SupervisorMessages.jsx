import React from 'react';
// Reuse student messages UI structure but change data
import MessagesPage from '../student/MessagesPage';

export default function SupervisorMessages() {
  // In a real implementation this would fetch supervisor-specific chats
  // For MVP, we can reuse the same layout component
  return <MessagesPage />;
}
