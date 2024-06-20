import {Story} from '../models/Story.ts';
import {create} from 'zustand';

interface StoryStoreType {
  stories: Story[];
}

interface StoryStoreActions extends StoryStoreType {
  addStories: (story: Story) => void;
  setListStory: (story: Story[]) => void;
}
export const useStoryStore = create<StoryStoreActions>(set => ({
  stories: [],
  setListStory: (story: Story[]) =>
    set(state => ({
      stories: state.stories.concat(...story),
    })),
  addStories: (story: Story) =>
    set(state => ({
      stories: state.stories.concat(story),
    })),
}));
