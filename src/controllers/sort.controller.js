export const sortStrings = (req, res, _next) => {
  const { body } = req;
  if (!Array.isArray(body)) return res.status(400).json({ error: 'Input must be an array' });

  const sorted = [...body].sort();
  res.json(sorted);
};
