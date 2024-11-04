import { render, screen } from '@testing-library/react';

import { TestWrapper } from 'utils';
import { ROUTES } from 'routes';

import { Header } from '.';

describe('<Header/>', () => {
  test('should render Component', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    const homeNode = screen.getByRole('link', { name: 'Welcome to React MVP Experiment 🧪' });
    expect(homeNode).toHaveAttribute('href', ROUTES.HOME);

    const JokesNode = screen.getByRole('link', { name: 'Jokes 🎭' });
    expect(JokesNode).toHaveAttribute('href', ROUTES.JOKES);
  });
});
