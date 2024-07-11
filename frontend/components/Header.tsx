import { Group, Menu, Button, Avatar, Text, rem, Burger } from '@mantine/core';
import { 
  IconPlus, 
  IconChevronDown, 
  IconUser, 
  IconSettings, 
  IconLogout 
} from '@tabler/icons-react';

interface HeaderProps {
  opened: boolean;
  onToggleNavbar: () => void;
  onNewChat: () => void;
}

export function Header({ opened, onToggleNavbar, onNewChat }: HeaderProps) {
  return (
    <Group justify="space-between" h="100%" px="md">
      <Group>
        <Burger opened={opened} onClick={onToggleNavbar} size="sm" />
        <Button variant="subtle" onClick={onNewChat} leftSection={<IconPlus size={20} />}>
          New Chat
        </Button>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button
              variant="subtle"
              rightSection={<IconChevronDown size={16} />}
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
          <Avatar size={32} radius="xl" style={{ cursor: 'pointer' }} />
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
    </Group>
  );
}