// components/Header.tsx

import { useState } from 'react';
import { Box, Button, Popover, List, Text, Group, ActionIcon } from '@mantine/core';
import { IconChevronDown, IconLayoutSidebar } from '@tabler/icons-react';

interface HeaderProps {
  onToggleNavbar: () => void;
}

export function Header({ onToggleNavbar }: HeaderProps) {
  const [modelOpen, setModelOpen] = useState(false);

  return (
    <Box
      style={{
        padding: '16px',
        backgroundColor: '#25262B',
        borderBottom: '1px solid #373A40',
      }}
    >
      <Group gap="apart">
        <ActionIcon
          size="lg"
          variant="transparent"          
          onClick={onToggleNavbar}
        >
          <IconLayoutSidebar/>
        </ActionIcon>

        <Popover opened={modelOpen} onChange={setModelOpen} position="bottom" width="target" withinPortal={false}>
          <Popover.Target>
            <Button 
              variant="subtle" 
              rightSection={<IconChevronDown size={16} />} 
              onClick={() => setModelOpen((o) => !o)}
              styles={{
                root: {
                  color: '#C1C2C5',
                  '&:hover': {
                    backgroundColor: '#2C2E33'
                  }
                }
              }}
            >
              Select Model
            </Button>
          </Popover.Target>
          <Popover.Dropdown style={{ backgroundColor: '#25262B', borderColor: '#373A40' }}>
            <List>
              <List.Item onClick={() => setModelOpen(false)}>
                <Text color="#C1C2C5">Model 1</Text>
              </List.Item>
              <List.Item onClick={() => setModelOpen(false)}>
                <Text color="#C1C2C5">Model 2</Text>
              </List.Item>
              <List.Item onClick={() => setModelOpen(false)}>
                <Text color="#C1C2C5">Model 3</Text>
              </List.Item>
            </List>
          </Popover.Dropdown>
        </Popover>
      </Group>
    </Box>
  );
}