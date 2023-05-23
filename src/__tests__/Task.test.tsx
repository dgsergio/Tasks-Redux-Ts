import { getByRole, render, screen } from '@testing-library/react';
import Task from '../components/Task';
import { DUMMY_TASKS } from '../mocks/dummy-tasks';
import { store } from '../store/index';
import { Provider } from 'react-redux';

describe('Task component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Task task={DUMMY_TASKS[0]} />
      </Provider>
    );
  });

  it('should render two icons image', () => {
    const imgEl = screen.getAllByRole('img');
    expect(imgEl).toHaveLength(2);
  });

  it('should render a title and a date paragraph', () => {
    const titleEl = screen.getByRole('heading', { level: 3 });
    const dateEl = screen.getByText('April 20, 2023');
    expect(titleEl).toBeInTheDocument();
    expect(dateEl).toBeInTheDocument();
  });

  it('should render 3 list element', () => {
    const buttonEls = screen.getByRole('button');
    expect(buttonEls).toBeInTheDocument();
  });
});
