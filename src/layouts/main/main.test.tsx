import { render } from '@testing-library/react';

import { Main } from '..';
import { TestWrapper } from 'utils';

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
