import { render, screen } from '@testing-library/react';

import { Header } from '..';

describe.skip('<Header/>', () => {
  test('should render Component', () => {
    render(<Header />);

    expect(screen.getByRole('heading')).toHaveTextContent('Welcome to React MVP Experiment 🧪');
  });
});
