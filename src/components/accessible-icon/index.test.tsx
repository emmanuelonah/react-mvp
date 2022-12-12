import { render, screen } from '@testing-library/react';

import { AccessibleIcon } from '.';

describe('<AccessibleIcon/>', () => {
  it('should confirm that ICON is rendered visually and LABEL is rendered non-visually', () => {
    render(
      <AccessibleIcon label="ITS TEST ICON">
        <span data-testid="testIcon">🧪</span>
      </AccessibleIcon>
    );

    expect(screen.getByTestId('testIcon')).toBeInTheDocument();
    expect(screen.getByText('ITS TEST ICON')).toBeInTheDocument();
  });
});
