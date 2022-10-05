import { render, screen } from '@testing-library/react';

import { If } from '..';

describe('<If/>', () => {
  it('should render ```do node``` when the condition is ```true```', () => {
    const textNode = 'If component testing';

    render(<If condition={!0} do={<h1>{textNode}</h1>} />);

    expect(screen.getByRole('heading')).toHaveTextContent(textNode);
  });

  it('should render ```else node``` when the condition is ```false```', () => {
    render(<If condition={!!0} do={<h1>If component testing</h1>} else="Rendered else node" />);

    expect(screen.getByText('Rendered else node')).toBeInTheDocument();
    expect(screen.queryByText('i, If component testing')).not.toBeInTheDocument();
  });
});
