import { useState, useRef, useEffect } from 'react';
import { Textarea, Button, Group, Stack, Popover, List, Text, ActionIcon, Box, Transition } from '@mantine/core';
import { IconArrowUp, IconChevronDown, IconPaperclip } from '@tabler/icons-react';

export function ChatInput() {
  const [modelOpen, setModelOpen] = useState(false);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (textareaRef.current) {
        const isOverflowing = textareaRef.current.scrollHeight > textareaRef.current.clientHeight;
        setShowScrollbar(isOverflowing);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      const isOverflowing = textareaRef.current.scrollHeight > textareaRef.current.clientHeight;
      setShowScrollbar(isOverflowing);
      setHasContent(event.target.value.trim().length > 0);
    }
  };

  return (
    <Box
      style={{ 
        border: '1px solid #373A40', 
        borderRadius: '4px', 
        padding: '16px',
        backgroundColor: '#25262B',
        width: '100%'
      }}
    >
      <Stack gap="xs">
        <Box style={{ display: 'flex', alignItems: 'flex-start' }}>
          <Textarea
            placeholder="Type your message here..."
            minRows={2}
            maxRows={10}
            autosize
            ref={textareaRef}
            onChange={handleInput}
            style={{ flex: 1, marginRight: '10px' }}
            styles={{
              input: {
                border: 'none',
                backgroundColor: '#25262B',
                color: '#C1C2C5',
                padding: '8px',
                overflow: showScrollbar ? 'auto' : 'hidden',
                '&::placeholder': {
                  color: '#5C5F66'
                }
              },
            }}
          />
          <Box style={{ display: 'flex', alignItems: 'center', height: '36px', width: '80px', justifyContent: 'flex-end', position: 'relative' }}>
            <Transition mounted={true} transition="slide-right" duration={200} timingFunction="ease">
              {(styles) => (
                <ActionIcon
                  variant="filled"
                  color="gray"
                  size="lg"
                  style={{
                    ...styles,
                    position: 'absolute',
                    right: hasContent ? '44px' : '0',
                    transition: 'right 200ms ease',
                  }}
                >
                  <IconPaperclip size={18} />
                </ActionIcon>
              )}
            </Transition>
            <Transition 
              mounted={hasContent} 
              transition="pop"
              duration={200}
              timingFunction="ease"
              enterDelay={100}
              exitDelay={0}
            >
              {(styles) => (
                <ActionIcon
                  variant="filled"
                  color="blue"
                  size="lg"
                  style={{
                    ...styles,
                    position: 'absolute',
                    right: '0',
                  }}
                >
                  <IconArrowUp size={18} />
                </ActionIcon>
              )}
            </Transition>
          </Box>
        </Box>

        <Group>
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
      </Stack>
    </Box>
  );
}