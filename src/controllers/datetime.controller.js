import { DateTime } from 'luxon';

export const getDateTime = (_req, res) => {
  const now = DateTime.local();
  const date = now.toISODate();
  const time = now.toFormat('HH:mm:ss');

  res.json({ date, time });
};
