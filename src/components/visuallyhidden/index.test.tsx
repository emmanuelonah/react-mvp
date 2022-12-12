import { render, screen } from '@testing-library/react';

import { VisuallyHidden } from '.';

describe('<VisuallyHidden/>', () => {
  it('should confirm that "HELLO WORLD" is not visible to the user but present in the DOM', () => {
    render(<VisuallyHidden>HELLO WORLD</VisuallyHidden>);

    expect(screen.queryByText('HELLO WORLD')).toBeInTheDocument();
    expect(screen.getByTestId('visuallyHidden')).toHaveStyle({
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: '1px',
      overflow: 'hidden',
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: '1px',
    });
  });
});
