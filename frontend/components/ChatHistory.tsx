// components/ChatHistory.tsx

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Box, Text, ActionIcon, Menu, TextInput } from '@mantine/core';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import { ChatSession } from '@/utils/firestoreUtils';

interface ChatHistoryProps {
  chatSessions: ChatSession[];
  loading: boolean;
  error: string | null;
  onEditTitle: (id: string, newTitle: string) => void;
  onDeleteChat: (id: string) => void;
}

export function ChatHistory({ chatSessions, loading, error, onEditTitle, onDeleteChat }: ChatHistoryProps) {
  const router = useRouter();
  const params = useParams();
  const currentChatId = params.chatId as string;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red">{error}</Text>;

  const handleEditClick = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditingTitle(currentTitle);
  };

  const handleSaveEdit = (id: string) => {
    onEditTitle(id, editingTitle);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    onDeleteChat(id);
    if (id === currentChatId) {
      router.push('/');
    }
  };

  return (
    <Box>
      {chatSessions.map((session) => (
        <Box
          key={session.id}
          p="sm"
          mb="xs"
          style={{ 
            cursor: 'pointer', 
            borderRadius: '4px',
            position: 'relative',
            '&:hover': {
              backgroundColor: 'var(--mantine-color-gray-0)',
            }
          }}
          onClick={() => router.push(`/chat/${session.id}`)}
        >
          {editingId === session.id ? (
            <Box>
              <TextInput
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.currentTarget.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveEdit(session.id);
                  if (e.key === 'Escape') handleCancelEdit();
                }}
                autoFocus
                onBlur={() => handleSaveEdit(session.id)}
              />
            </Box>
          ) : (
            <>
              <Text fw={500}>{session.title}</Text>
              <Text size="sm" color="dimmed">{session.lastMessage}</Text>
              <Menu
                withinPortal
                position="bottom-end"
                shadow="md"
                width={200}
              >
                <Menu.Target>
                  <ActionIcon
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '8px',
                      transform: 'translateY(-50%)',
                      opacity: 0,
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IconDots size="1.2rem" />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item 
                    leftSection={<IconEdit size="1rem" />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(session.id, session.title);
                    }}
                  >
                    Edit Title
                  </Menu.Item>
                  <Menu.Item 
                    leftSection={<IconTrash size="1rem" />}
                    color="red"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(session.id);
                    }}
                  >
                    Delete Chat
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </>
          )}
        </Box>
      ))}
    </Box>
  );
}