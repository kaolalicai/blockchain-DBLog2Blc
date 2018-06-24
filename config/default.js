module.exports = {
  database: {
    mongodb: {
      op_log: {
        url: process.env.MONGODB || 'mongodb://joda:27017/op_log'
      },
      admin: {
        url: process.env.MONGODB_ADMIN || 'mongodb://root:Kalengo2go@39.108.16.76:3717/local?authSource=admin',
        options: {
          ns: 'new_bear|new_p2p\.*'
        }
      }
    }
  }
}
