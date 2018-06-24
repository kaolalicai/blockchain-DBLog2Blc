module.exports = {
  database: {
    mongodb: {
      op_log: {
        url: process.env.MONGODB,
        dbName: process.env.MONGODB_NAME || 'oplog'
      },
      admin: {
        url: process.env.MONGODB_ADMIN,
        options: {
          ns: 'p2p|bear|new_bear|koala|new_koala\.*'
        }
      }
    }
  }
}
