import { MongoClient } from 'mongodb'
import * as assert from 'assert'
import * as config from 'config'
import * as MongoOplog from 'mongo-oplog'

const mongoAdmin = config.get('database.mongodb.admin')
const mongoOplog = config.get('database.mongodb.op_log')
console.log('adminUrl:', mongoAdmin.url)
console.log('dbName:', mongoAdmin.dbName)
console.log('options:', mongoAdmin.options)
console.log('opLogUrl:', mongoOplog.url)

const oplog = MongoOplog(mongoAdmin.url, mongoAdmin.options)

const skipCollections = [
  'agendaJobs'
]

// localhost mongo
MongoClient.connect(mongoOplog.url, function (err, client) {
  assert.equal(null, err)
  console.log('Connected correctly to op_log db')
  const db = client.db(mongoOplog.dbName)
  oplog.tail()
  // 监听到`update`事件
  oplog.on('update', doc => {
    if (doc && doc.ns) {
      for (const collection of skipCollections) {
        if (doc.ns.includes(collection)) return
      }
    }
    if (doc && doc.o && doc.o['$set'] && doc.o['$set'].updatedAt) return
    console.log(doc)
   // Insert a document to blockchain use set
    db.collection('non_update_ops').insertOne(doc).catch(console.error)
  })
  // 监听到`insert`事件
  oplog.on('insert', doc => {
    if (doc && doc.ns) {
      for (const collection of skipCollections) {
        if (doc.ns.includes(collection)) return
      }
    }
    if (doc && doc.o && doc.o['$set'] && doc.o['$set'].updatedAt) return
    console.log(doc)
    // Insert a document to blockchain use set
    db.collection('non_update_ops').insertOne(doc).catch(console.error)
  })
})
