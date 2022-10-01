export const theme = {
  fonts: {
    primary: '"Poppins", sans-serif',
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
  },
  lineHeight: {
    xs: '1.5',
    sm: '1.75',
    md: '2',
    lg: '2.25',
    xl: '2.5',
    xxl: '2.75',
  },
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '6rem',
  },
  pageWidth: {
    minWidth: '100%',
    maxWidth: '1022px',
  },
  colors: {
    primary: ' #481EBD',
    secondary: 'rgba(0, 0, 0, 0.3);',
    background: '#fff',
    border: '#C4C4C4',
    black: '#000',
    white: '#fff',
    danger: '#842029',
    success: {
      dark: '#1E721C',
      light: '#C3E6CB',
    },
    warning: {
      dark: '#856404',
      light: '#FFEEBA',
    },
    error: {
      dark: '#721C24',
      light: '#F5C6CB',
    },
  },
  borderRadius: {
    sm: '5px',
    md: '10px',
  },
  breakpionts: ['40em', '52em', '64em', '80em'],
  zIndexes: {
    modal: 2,
  },
} as const;
