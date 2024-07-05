import React, { useRef, useEffect } from 'react';
import { Box, ActionIcon, Transition, Skeleton } from '@mantine/core';
import { IconPinnedFilled, IconPinned } from '@tabler/icons-react';
import { NavbarProps } from './types';

export function Navbar({ isVisible, isPinned, onPinToggle, onMouseEnter, onMouseLeave }: NavbarProps) {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100px',
          height: '100vh',
          zIndex: 1000,
          pointerEvents: isVisible ? 'none' : 'auto',
        }}
        onMouseEnter={onMouseEnter}
      />

      <Transition mounted={isVisible} transition="slide-right" duration={300}>
        {(styles) => (
          <nav
            style={{
              ...styles,
              position: 'fixed',
              top: 0,
              left: 0,
              width: '300px',
              height: '100vh',
              backgroundColor: 'var(--mantine-color-body)',
              borderRight: '1px solid var(--mantine-color-gray-2)',
              display: 'flex',
              flexDirection: 'column',
              padding: '1rem',
              zIndex: 1001,
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <ActionIcon
              variant="subtle"
              onClick={onPinToggle}
              style={{ position: 'absolute', top: 10, right: 10 }}
            >
              {isPinned ? <IconPinnedFilled size={20} /> : <IconPinned size={20} />}
            </ActionIcon>

            <Box mt={40}>
              {/* Skeleton sections */}
              {Array(15)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} height={28} mt="sm" width="100%" radius="sm" />
                ))}
            </Box>
          </nav>
        )}
      </Transition>
    </>
  );
}