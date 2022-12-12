import { render } from '@testing-library/react';

import { TestWrapper } from 'utils';

import { Main } from '.';

describe('<Main/>', () => {
  test('should render Component', () => {
    const { container } = render(
      <TestWrapper>
        <Main>Hello React Testing Library</Main>
      </TestWrapper>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
