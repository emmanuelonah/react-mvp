import { render, screen } from '@testing-library/react';

import { TestWrapper } from 'utils';

import { Header } from '.';

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
