CREATE TABLE goals (
  id UUID PRIMARY KEY,
  userId UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  startDate DATE NOT NULL,
  lastCheckIn DATE,
  duration INT CHECK (duration IN (3, 6, 9, 12)),
  status TEXT CHECK (status IN ('Active', 'Completed', 'Failed'))
);
