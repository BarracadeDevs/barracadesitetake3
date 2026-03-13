// Prisma configuration for SQLite
module.exports = {
  migrate: {
    adapter: 'sqlite',
    url: 'file:./dev.db',
  },
};
