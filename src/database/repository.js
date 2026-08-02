class Repository {
  constructor(pool) {
    this.pool = pool;
  }

  async query(text, params) {
    return this.pool.query(text, params);
  }
}

module.exports = Repository;
