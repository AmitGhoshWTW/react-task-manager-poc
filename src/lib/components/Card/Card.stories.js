import React from 'react';
import { Card } from './Card';

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'elevated'],
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large'],
    },
    shadow: {
      control: { type: 'boolean' },
    },
    hoverable: {
      control: { type: 'boolean' },
    },
  },
};

export const Default = {
  args: {
    title: 'Card Title',
    children: 'This is the card content. It can contain any React elements.',
  },
};

export const WithSubtitle = {
  args: {
    title: 'Card with Subtitle',
    subtitle: 'This is a subtitle',
    children: 'Card content goes here.',
  },
};

export const WithImage = {
  args: {
    title: 'Card with Image',
    subtitle: 'Beautiful landscape',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
    children: 'This card has an image at the top.',
  },
};

export const WithActions = {
  args: {
    title: 'Card with Actions',
    subtitle: 'Interactive card',
    children: 'This card has action buttons at the bottom.',
    actions: (
      <>
        <button style={{ marginRight: '8px', padding: '4px 8px' }}>Cancel</button>
        <button style={{ padding: '4px 8px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Confirm
        </button>
      </>
    ),
  },
};

export const Outlined = {
  args: {
    variant: 'outlined',
    title: 'Outlined Card',
    children: 'This card has an outlined variant.',
  },
};

export const Elevated = {
  args: {
    variant: 'elevated',
    title: 'Elevated Card',
    children: 'This card has an elevated variant with shadow.',
  },
};

export const Hoverable = {
  args: {
    title: 'Hoverable Card',
    subtitle: 'Hover over me!',
    children: 'This card has a hover effect.',
    hoverable: true,
  },
};

export const NoPadding = {
  args: {
    title: 'No Padding Card',
    padding: 'none',
    children: 'This card has no internal padding.',
  },
};

export const LargePadding = {
  args: {
    title: 'Large Padding Card',
    padding: 'large',
    children: 'This card has large internal padding.',
  },
};

export const CompleteExample = {
  args: {
    title: 'Complete Card Example',
    subtitle: 'All features combined',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop',
    variant: 'elevated',
    hoverable: true,
    children: (
      <div>
        <p>This is a complete card example with:</p>
        <ul>
          <li>Image</li>
          <li>Title and subtitle</li>
          <li>Rich content</li>
          <li>Action buttons</li>
          <li>Hover effects</li>
        </ul>
      </div>
    ),
    actions: (
      <>
        <button style={{ marginRight: '8px', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}>
          Learn More
        </button>
        <button style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Get Started
        </button>
      </>
    ),
  },
};