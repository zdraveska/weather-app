export const getDateTime = (_req, res) => {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const time = now.toTimeString().split(' ')[0];
  res.json({ date, time });
};
