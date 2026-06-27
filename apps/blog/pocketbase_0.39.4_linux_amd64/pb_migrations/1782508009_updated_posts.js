/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1125843985")

  // add field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1219621782",
    "help": "",
    "hidden": false,
    "id": "relation1874629670",
    "maxSelect": 10,
    "minSelect": 0,
    "name": "tags",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "help": "",
    "hidden": false,
    "id": "select822707298",
    "maxSelect": 0,
    "name": "lang",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "en",
      "es"
    ]
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "help": "",
    "hidden": false,
    "id": "bool1748787223",
    "name": "published",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "help": "",
    "hidden": false,
    "id": "date3772055009",
    "max": "",
    "min": "",
    "name": "published_at",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1125843985")

  // remove field
  collection.fields.removeById("relation1874629670")

  // remove field
  collection.fields.removeById("select822707298")

  // remove field
  collection.fields.removeById("bool1748787223")

  // remove field
  collection.fields.removeById("date3772055009")

  return app.save(collection)
})
