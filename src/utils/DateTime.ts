const calculateTimeDifference = (previousTime: string): string => {
  const previous: Date = new Date(previousTime);
  const currentTime: Date = new Date();
  const diffMs: number = currentTime.getTime() - previous.getTime();
  const diffMinutes: number = Math.floor(diffMs / 60000);
  const diffHours: number = Math.floor(diffMs / 3600000);
  const diffDays: number = Math.floor(diffMs / 86400000);
  if (diffDays < 1) {
    if (diffMinutes < 1) {
      return 'bây giờ';
    } else if (diffHours < 1) {
      return `${diffMinutes} phút trước`;
    } else {
      return `${diffHours} giờ trước`;
    }
  } else {
    return `${diffDays} ngày trước`;
  }
};

export {calculateTimeDifference};
