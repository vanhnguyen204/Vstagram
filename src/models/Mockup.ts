import {Story} from './Story.ts';
import {Reel} from './Reel.ts';
import {Post, PostType} from './Post.ts';

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

export const mockReels: Reel[] = [
  {
    _id: '1',
    userId: '1',
    isFollowed: true,
    music: '',
    avatar:
      'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,',
    videoURL:
      'https://nodejs-vstagram-aws-s3.s3.ap-southeast-2.amazonaws.com/reels/turkey_playingfootball.MP4',
    comment: [
      {
        _id: '1',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '2',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '3',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '4',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '5',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '6',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '7',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '8',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '9',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '10',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '11',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '12',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '13',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
    ],
    like: 99999,
    name: 'vanh204.nguyen',
    isLike: true,
  },
  {
    _id: '2',
    userId: '1',
    isFollowed: false,
    music: '',
    avatar:
      'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
    description: 'Description',
    videoURL:
      'https://nodejs-vstagram-aws-s3.s3.ap-southeast-2.amazonaws.com/reels/marvel_test1.mp4',
    comment: [
      {
        _id: '4',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '5',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '6',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
    ],
    like: 999,
    name: 'vanh204',
    isLike: false,
  },

  {
    _id: '3',
    userId: '1',
    isFollowed: false,
    music: '',
    avatar:
      'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
    description: 'Description',
    videoURL:
      'https://nodejs-vstagram-aws-s3.s3.ap-southeast-2.amazonaws.com/reels/rogri_on_fire.mp4',
    comment: [
      {
        _id: '7',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '8',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '9',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
    ],
    like: 999,
    name: 'vanh204',
    isLike: true,
  },
  {
    _id: '4',
    userId: '1',
    isFollowed: true,
    music: '',
    avatar:
      'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
    description: 'Description',
    videoURL:
      'https://nodejs-vstagram-aws-s3.s3.ap-southeast-2.amazonaws.com/reels/avenger_2.mp4',
    comment: [
      {
        _id: '10',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '11',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '12',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
    ],
    like: 999,
    name: 'vanh204',
    isLike: false,
  },
];

export const mockPost: Post[] = [
  {
    _id: '1',
    userId: '1',
    isFollowed: true,
    avatar:
      'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
    description: 'Description',
    comment: [
      {
        _id: '10',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '11',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '12',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
    ],
    like: 999,
    name: 'vanh204',
    isLike: false,
    music: '',
    postType: {
      type: PostType.PHOTO,
      images: [
        'https://s2.dmcdn.net/v/TEiDz1XDEBPm6gXPG/x480',
        'https://free4kwallpapers.com/uploads/originals/2019/03/09/colors-of-chameleon-wallpaper.jpg',
        'https://img.freepik.com/premium-photo/red-deer-animal-hd-8k-wallpaper-stock-photographic-image_949228-11302.jpg',
      ],
    },
    timeCreated: '2024-06-28 9:00:00',
  },
  {
    _id: '2',
    userId: '1',
    isFollowed: true,
    avatar:
      'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
    description: 'Description',
    comment: [
      {
        _id: '10',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '11',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '12',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
    ],
    like: 999,
    name: 'vanh204',
    isLike: false,
    music: '',
    postType: {
      type: PostType.PHOTO,
      images: ['https://s2.dmcdn.net/v/TEiDz1XDEBPm6gXPG/x480'],
    },
    timeCreated: '2024-06-10 9:00:00',
  },
  {
    _id: '3',
    userId: '1',
    isFollowed: true,
    avatar:
      'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
    description: 'Description',
    comment: [
      {
        _id: '10',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '11',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '12',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
    ],
    like: 999,
    name: 'vanh204',
    isLike: false,
    music: '',

    postType: {
      type: PostType.VIDEO,
      videoURL:
        'https://nodejs-vstagram-aws-s3.s3.ap-southeast-2.amazonaws.com/posts/post_vstagram_test1.mp4',
    },
    timeCreated: '2024-06-26 9:00:00',
  },
  {
    _id: '4',
    userId: '1',
    isFollowed: true,
    avatar:
      'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
    description: 'Description',
    comment: [
      {
        _id: '10',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '11',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '12',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
    ],
    like: 999,
    name: 'vanh204',
    isLike: false,
    music: '',
    postType: {
      type: PostType.PHOTO,
      images: [
        'https://images.unsplash.com/photo-1621615578530-cbf3c443165f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VwZXIlMjBjYXJ8ZW58MHx8MHx8fDA%3D',
      ],
    },
    timeCreated: '2024-06-27 9:00:00',
  },
  {
    _id: '5',
    userId: '1',
    isFollowed: true,
    avatar:
      'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
    description: 'Description',
    comment: [
      {
        _id: '10',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '11',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
      {
        _id: '12',
        userId: '1999',
        comment: 'omg',
        like: 22,
        name: 'username',
        timeCreated: '2024-06-18 14:56:45',
        userAvatar:
          'https://img.freepik.com/premium-photo/animal-icon-hd-8k-wallpaper-stock-photographic-image_915071-38615.jpg',
      },
    ],
    like: 999,
    name: 'vanh204',
    isLike: false,
    music: '',
    postType: {
      type: PostType.VIDEO,
      videoURL:
        'https://nodejs-vstagram-aws-s3.s3.ap-southeast-2.amazonaws.com/reels/rogri_on_fire.mp4',
    },
    timeCreated: '2024-06-28 9:00:00',
  },
];

//
