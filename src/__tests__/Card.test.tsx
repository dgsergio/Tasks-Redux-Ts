import { render, screen } from '@testing-library/react';
import { DUMMY_TASKS } from '../mocks/dummy-tasks';
import Card from '../components/Card';

describe('Card component', () => {
  beforeEach(() => {
    render(<Card task={DUMMY_TASKS[0]} />);
  });

  it('should render a image icon', () => {
    const imgEl = screen.getByRole('img');
    expect(imgEl).toBeInTheDocument();
  });

  it('should render a title and a description', () => {
    const headingEl = screen.getByRole('heading', { level: 3 });
    const paragraphEl = screen.getByText('Study from 5 to 8 pm', {
      exact: false,
    });
    expect(paragraphEl).toBeInTheDocument();
    expect(headingEl).toBeInTheDocument();
  });
});
