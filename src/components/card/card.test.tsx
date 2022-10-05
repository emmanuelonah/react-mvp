import { render, screen } from '@testing-library/react';

import { Card } from '..';

describe('<Card/>', () => {
  it('should ensure the component ```children``` in rendered', () => {
    const textNode = 'Card component rendered';

    render(
      <Card>
        <h1>{textNode}</h1>
      </Card>
    );

    expect(screen.getByRole('heading')).toHaveTextContent(textNode);
  });
});
