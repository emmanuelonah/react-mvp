import { render } from '@testing-library/react';

import { TestWrapper } from 'utils';

import { Footer } from '.';

describe('<Footer/>', () => {
  test('should render Component', () => {
    const { container } = render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
