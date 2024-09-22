export function mergeIdenticalActivity(activities: Array<string>): Array<string> {
  const mergedActivities: Array<string> = [];

  activities.forEach((activity) => {
    const targetIdex = mergedActivities.findIndex((mergedActivity) => mergedActivity === activity);

    if (targetIdex === -1) {
      mergedActivities.push(activity);
    }
  });
  return mergedActivities;
}
