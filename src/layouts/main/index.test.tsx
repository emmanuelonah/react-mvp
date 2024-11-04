import { render, screen } from '@testing-library/react';

import { TestWrapper } from 'utils';

import { Main } from '.';

describe('<Main/>', () => {
  test('should render Component', () => {
    render(
      <TestWrapper>
        <Main>Hello React Testing Library</Main>
      </TestWrapper>
    );
    expect(screen.getByText('Hello React Testing Library')).toBeInTheDocument();
  });
});
