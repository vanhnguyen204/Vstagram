export const MediaType = {
  post: 'post',
  postVideo: 'post_video',
  reels: 'reels',
  story: 'story',
};
export const likesFormat = (like: number): string => {
  let parseLike = like.toString();
  if (like > 9999) {
    return parseLike.substring(0, 2) + ',' + parseLike.substring(2, 3) + 'k';
  }
  return parseLike;
};
