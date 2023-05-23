import { TaskType } from '../models/types';

export const DUMMY_TASKS: TaskType[] = [
  {
    id: 't1',
    title: 'Study typescript',
    description: 'Study from 5 to 8 pm and do a practice exercise.',
    date: 'April 20, 2023',
    completed: false,
    isSelected: false,
  },
  {
    id: 't2',
    title: 'Fix desktop PC',
    description:
      'Find what is the problem. The video card that puts the black screen. Something more right here',
    date: 'April 21, 2023',
    completed: true,
    isSelected: false,
  },
  {
    id: 't3',
    title: 'Make a video',
    description: 'There is no video for Monday.',
    date: 'May 3, 2023',
    completed: false,
    isSelected: false,
  },
];
