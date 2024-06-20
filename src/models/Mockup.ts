import {Story} from './Story.ts';
export interface SetStory {
  userId: string;
  dataStories: Story[];
}
export const mockStories: SetStory[] = [
  {
    userId: '2004',
    dataStories: [
      {
        _id: '1',
        userId: '2004',
        type: 'photo',
        video: '',
        timeCreated: '2024-06-18 14:56:45',
        image:
          'https://t3.ftcdn.net/jpg/05/73/49/60/360_F_573496040_espwS8zXDWLPlqNQNGSDjwbsFb5w0h0P.jpg',
        duration: 2,
        music: '',
      },
      {
        _id: '2',
        userId: '2004',
        type: 'photo',
        video: '',
        timeCreated: '2024-06-18 14:56:45',
        image:
          'https://nodejs-vstagram-aws-s3.s3.amazonaws.com/stories/94198823-b3ff-4685-b2d1-0dbc358df413-E1FF43DD-B6B3-4250-8A34-C3E88AC8771D.png',
        duration: 2,
        music: '',
      },
      {
        _id: '3',
        userId: '2004',
        type: 'photo',
        video: '',
        timeCreated: '2024-06-18 14:56:45',
        image:
          'https://nodejs-vstagram-aws-s3.s3.amazonaws.com/stories/94198823-b3ff-4685-b2d1-0dbc358df413-E1FF43DD-B6B3-4250-8A34-C3E88AC8771D.png',
        duration: 2,
        music: '',
      },
    ],
  },
];
