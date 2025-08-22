export default {
    title: 'Components/Button',
    component: Button,
    parameters: {
      layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['primary', 'secondary', 'danger', 'ghost', 'outline'],
      },
      size: {
        control: { type: 'select' },
        options: ['small', 'medium', 'large'],
      },
      disabled: {
        control: { type: 'boolean' },
      },
      loading: {
        control: { type: 'boolean' },
      },
    },
  };
  
  export const Primary = {
    args: {
      variant: 'primary',
      children: 'Primary Button',
    },
  };
  
  export const Secondary = {
    args: {
      variant: 'secondary',
      children: 'Secondary Button',
    },
  };
  
  export const Danger = {
    args: {
      variant: 'danger',
      children: 'Danger Button',
    },
  };
  
  export const Loading = {
    args: {
      loading: true,
      children: 'Loading...',
    },
  };
  
  export const WithIcon = {
    args: {
      icon: '🚀',
      children: 'Launch',
    },
  };
  
  export const Disabled = {
    args: {
      disabled: true,
      children: 'Disabled Button',
    },
  };