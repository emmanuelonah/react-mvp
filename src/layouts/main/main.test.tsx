import { render } from '@testing-library/react';

import { Main } from '..';

describe('<Main/>', () => {
  test('should render Component', () => {
    const { container } = render(<Main>Hello React Testing Library</Main>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
