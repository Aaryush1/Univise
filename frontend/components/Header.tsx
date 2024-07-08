import { useState } from 'react';
import { Box, Group, Menu, Button, Avatar, Text, rem } from '@mantine/core';
import { 
  IconLayoutSidebar, 
  IconPlus, 
  IconChevronDown, 
  IconUser, 
  IconSettings, 
  IconLogout 
} from '@tabler/icons-react';

interface HeaderProps {
  onToggleNavbar: () => void;
  onNewChat: () => void;
}

export function Header({ onToggleNavbar, onNewChat }: HeaderProps) {
  const actionIconStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    color: 'var(--mantine-color-gray-6)',
    ':hover': {
      backgroundColor: 'var(--mantine-color-gray-1)',
    },
  };

  return (
    <Box
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        height: '60px', // Changed to match AppShell.Header height
        padding: '0 16px', // Added horizontal padding
        backgroundColor: 'var(--mantine-color-body)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontWeight: 600,
      }}
    >
      <Group>
        <div style={actionIconStyle} onClick={onToggleNavbar}>
          <IconLayoutSidebar size={24} stroke={1.5} />
        </div>
        <div style={actionIconStyle} onClick={onNewChat}>
          <IconPlus size={24} stroke={1.5} />
        </div>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button
              variant="subtle"
              rightSection={<IconChevronDown size={16} stroke={1.5} />}
              styles={{
                root: {
                  padding: '8px 12px',
                  height: 'auto',
                  color: 'var(--mantine-color-text)',
                  '&:hover': {
                    backgroundColor: 'var(--mantine-color-gray-1)',
                  },
                },
              }}
            >
              Models
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Models</Menu.Label>
            <Menu.Item>GPT-3.5</Menu.Item>
            <Menu.Item>GPT-4</Menu.Item>
            <Menu.Divider />
            <Menu.Label>Custom</Menu.Label>
            <Menu.Item>Add new model</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Menu shadow="md" width={200} position="bottom-end">
        <Menu.Target>
          <Avatar
            size={32}
            radius="xl"
            style={{ cursor: 'pointer' }}
          />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Account</Menu.Label>
          <Menu.Item leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}>
            Profile
          </Menu.Item>
          <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
            Settings
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item 
            color="red" 
            leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}