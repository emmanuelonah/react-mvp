import { render, screen } from '@testing-library/react';

import { Header } from '..';
import { TestWrapper } from 'utils';

describe.skip('<Header/>', () => {
  test('should render Component', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Welcome to React MVP Experiment 🧪');
  });
});
