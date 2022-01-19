const dbService = require("../../services/db.service");
const ObjectId = require("mongodb").ObjectId;
const logger = require("../../services/logger.service");
const asyncLocalStorage = require("../../services/als.service");

async function query(filterBy = null) {
  try {
    const criteria = _buildCriteria(filterBy);
    const sortCriteria = _buildSortCriteria(filterBy);
    const collection = await dbService.getCollection("board");
    var boards = await collection.find(criteria).sort(sortCriteria).toArray();
    return boards;
  } catch (err) {
    logger.error("cannot find boards", err);
    throw err;
  }
}

async function remove(boardId) {
  try {
    const collection = await dbService.getCollection("board");
    const criteria = { _id: ObjectId(boardId) };
    await collection.deleteOne(criteria);
  } catch (err) {
    logger.error(`cannot remove board ${boardId}`, err);
    throw err;
  }
}

async function add(board) {
  try {
    const collection = await dbService.getCollection("board");
    var currBoard = await collection.insertOne(board);
    return board;
  } catch (err) {
    logger.error("cannot insert board", err);
    throw err;
  }
}

async function update(board) {
  try {
    var id = ObjectId(board._id);
    delete board._id;
    const collection = await dbService.getCollection("board");
    await collection.updateOne({ _id: id }, { $set: { ...board } });
    board._id = id;
    return board;
  } catch (err) {
    logger.error(`cannot update board ${board}`, err);
    throw err;
  }
}

async function getById(boardId) {
  try {
    const collection = await dbService.getCollection("board");
    const board = collection.findOne({ _id: ObjectId(boardId) });
    return board;
  } catch (err) {
    logger.error(`while finding board ${boardId}`, err);
    throw err;
  }
}

function _buildCriteria(filterBy) {
  console.log(filterBy)
  const criteria = {};
  if (filterBy.searchKey) {
    const regex = new RegExp(filterBy.searchKey, "i");
    criteria.name = { $regex: regex };
  }
  return criteria;
}

function _buildSortCriteria(filterBy) {
  const sortCriteria = {};
  if (filterBy.sort === "Name") sortCriteria.name = 1;
  else if (filterBy.sort === "Price") sortCriteria.price = -1;
  else sortCriteria.createAt = 1;

  return sortCriteria;
}

// createBoard()
async function createBoard() {
  const collection = await dbService.getCollection("board");
  const id = ObjectId("61ae5ac3ac14464cd8b38e5b");
  // var currBoard = await collection.updateOne({ _id: id },{$set:{
  var currBoard = await collection.insertOne({
    "title" : "Sprint 4",
    "createdAt" : 1589983468418.0,
    "description" : "Track your action items and improve for next sprint",
    "createdBy" : {
        "_id" : "u103",
        "fullname" : "Ishay Nitzan",
        "imgUrl" : "ishay-img.jpeg"
    },
    "style" : {},
    "labels" : [ 
        {
            "id" : "l101",
            "title" : "Done",
            "color" : "#61bd4f"
        }
    ],
    "members" : [ 
        {
            "username" : "Sundos",
            "_id" : "61b246112e8f89202bd83308",
            "password" : 12345,
            "fullname" : "Sundos Gutty",
            "email" : "sundos@gmail.com",
            "imgUrl" : "sundos-img.jpg"
        }, 
        {
            "username" : "Ishay",
            "_id" : "61b245d82e8f89202bd83307",
            "password" : 12345,
            "fullname" : "Ishay Nitzan",
            "email" : "sundos@gmail.com",
            "imgUrl" : "ishay-img.jpeg"
        }
    ],
    "groups" : [ 
        {
            "id" : "ag101",
            "title" : "Fullstack Team",
            "tasks" : [ 
                {
                    "id" : "bt102",
                    "title" : "Make test data",
                    "status" : "Done",
                    "members" : [ 
                        {
                            "username" : "Sundos",
                            "password" : 12345,
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }
                    ],
                    "priority" : "High",
                    "timeline" : [ 
                        "2021-11-28T22:00:00.000Z", 
                        "2021-12-02T22:00:00.000Z"
                    ],
                    "seenBy" : [ 
                        {
                            "username" : "Sundos",
                            "password" : 12345,
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }, 
                        {
                            "_id" : "u103",
                            "username" : "Ishay",
                            "fullname" : "Ishay Nitzan",
                            "imgUrl" : "ishay-img.jpeg"
                        }
                    ]
                }, 
                {
                    "id" : "ct101",
                    "title" : "Send the prototype project",
                    "status" : "Work",
                    "description" : "description",
                    "comments" : [],
                    "priority" : "Medium",
                    "members" : [ 
                        {
                            "username" : "Sundos",
                            "password" : 12345,
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }
                    ],
                    "timeline" : [ 
                        "2021-12-12T22:00:00.000Z", 
                        "2021-12-20T22:00:00.000Z"
                    ],
                    "seenBy" : [ 
                        {
                            "username" : "Sundos",
                            "password" : 12345,
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }, 
                        {
                            "_id" : "u103",
                            "username" : "Ishay",
                            "fullname" : "Ishay Nitzan",
                            "imgUrl" : "ishay-img.jpeg"
                        }
                    ]
                }, 
                {
                    "id" : "dt10123",
                    "title" : "Improve connectable",
                    "status" : "Done",
                    "members" : [ 
                        {
                            "_id" : "u103",
                            "username" : "Ishay",
                            "fullname" : "Ishay Nitzan",
                            "imgUrl" : "ishay-img.jpeg"
                        }
                    ],
                    "priority" : "Low",
                    "timeline" : [ 
                        "2021-12-10T22:00:00.000Z", 
                        "2021-12-14T22:00:00.000Z"
                    ],
                    "seenBy" : [ 
                        {
                            "username" : "Sundos",
                            "password" : 12345,
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }, 
                        {
                            "_id" : "u103",
                            "username" : "Ishay",
                            "fullname" : "Ishay Nitzan",
                            "imgUrl" : "ishay-img.jpeg"
                        }
                    ]
                }, 
                {
                    "id" : "e8NeM9",
                    "title" : "add the new cover",
                    "prioraty" : null,
                    "status" : "Work",
                    "timeline" : [ 
                        "2021-12-12T22:00:00.000Z", 
                        "2021-12-16T22:00:00.000Z"
                    ],
                    "members" : [ 
                        {
                            "username" : "Ishay",
                            "_id" : "61b245d82e8f89202bd83307",
                            "password" : 12345,
                            "fullname" : "Ishay Nitzan",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "ishay-img.jpeg"
                        }, 
                        {
                            "username" : "Sundos",
                            "_id" : "61b246112e8f89202bd83308",
                            "password" : 12345,
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }
                    ],
                    "priority" : "High",
                    "seenBy" : [ 
                        {
                            "username" : "Sundos",
                            "password" : 12345,
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }, 
                        {
                            "_id" : "u103",
                            "username" : "Ishay",
                            "fullname" : "Ishay Nitzan",
                            "imgUrl" : "ishay-img.jpeg"
                        }, 
                        {
                            "_id" : "61b246112e8f89202bd83308",
                            "username" : "Sundos",
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }, 
                        {
                            "_id" : "61b245d82e8f89202bd83307",
                            "username" : "Ishay",
                            "fullname" : "Ishay Nitzan",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "ishay-img.jpeg"
                        }
                    ]
                }
            ],
            "style" : {
                "color" : "#bb3354"
            },
            "activityLog" : [ 
                {
                    "id" : "LK35o",
                    "type" : "title",
                    "newVal" : "Make test data",
                    "oldVal" : "Make test data",
                    "createdAt" : 1639475795266.0,
                    "task" : {
                        "id" : "bt102",
                        "title" : "Make test data"
                    }
                }, 
                {
                    "id" : "IJOb3",
                    "type" : "title",
                    "newVal" : "Send the prototype project",
                    "oldVal" : "Send the prototype project",
                    "createdAt" : 1639475795287.0,
                    "task" : {
                        "id" : "ct101",
                        "title" : "Send the prototype project"
                    }
                }, 
                {
                    "id" : "33Xez",
                    "type" : "title",
                    "newVal" : "Improve connectable",
                    "oldVal" : "Improve connectable",
                    "createdAt" : 1639475795358.0,
                    "task" : {
                        "id" : "dt10123",
                        "title" : "Improve connectable"
                    }
                }, 
                {
                    "id" : "WHxYT",
                    "type" : "title",
                    "newVal" : "add the new cover",
                    "oldVal" : "add the new cover",
                    "createdAt" : 1639475795409.0,
                    "task" : {
                        "id" : "e8NeM9",
                        "title" : "add the new cover"
                    }
                }, 
                {
                    "id" : "VLP79",
                    "type" : "title",
                    "newVal" : "Make test data",
                    "oldVal" : "Make test data",
                    "createdAt" : 1639475800782.0,
                    "task" : {
                        "id" : "bt102",
                        "title" : "Make test data"
                    }
                }, 
                {
                    "id" : "179vK",
                    "type" : "title",
                    "newVal" : "Send the prototype project",
                    "oldVal" : "Send the prototype project",
                    "createdAt" : 1639475800822.0,
                    "task" : {
                        "id" : "ct101",
                        "title" : "Send the prototype project"
                    }
                }, 
                {
                    "id" : "doxeH",
                    "type" : "title",
                    "newVal" : "Improve connectable",
                    "oldVal" : "Improve connectable",
                    "createdAt" : 1639475800861.0,
                    "task" : {
                        "id" : "dt10123",
                        "title" : "Improve connectable"
                    }
                }, 
                {
                    "id" : "MnjOb",
                    "type" : "title",
                    "newVal" : "add the new cover",
                    "oldVal" : "add the new cover",
                    "createdAt" : 1639475800882.0,
                    "task" : {
                        "id" : "e8NeM9",
                        "title" : "add the new cover"
                    }
                }, 
                {
                    "id" : "Dz1Yi",
                    "type" : "timeline",
                    "newVal" : "Dec 13 - Dec 21",
                    "oldVal" : "Dec 11 - 14",
                    "createdAt" : 1639475833143.0,
                    "task" : {
                        "id" : "ct101",
                        "title" : "Send the prototype project"
                    }
                }, 
                {
                    "id" : "h0t3n",
                    "type" : "timeline",
                    "newVal" : "Nov 29 - Dec 3",
                    "oldVal" : "Dec 6 - 9",
                    "createdAt" : 1639475856876.0,
                    "task" : {
                        "id" : "bt102",
                        "title" : "Make test data"
                    }
                }, 
                {
                    "id" : "Uxgtu",
                    "type" : "title",
                    "newVal" : "Make test data",
                    "oldVal" : "Make test data",
                    "createdAt" : 1639477137683.0,
                    "task" : {
                        "id" : "bt102",
                        "title" : "Make test data"
                    }
                }, 
                {
                    "id" : "NhcKz",
                    "type" : "title",
                    "newVal" : "Send the prototype project",
                    "oldVal" : "Send the prototype project",
                    "createdAt" : 1639477137700.0,
                    "task" : {
                        "id" : "ct101",
                        "title" : "Send the prototype project"
                    }
                }, 
                {
                    "id" : "Lu1NG",
                    "type" : "title",
                    "newVal" : "Improve connectable",
                    "oldVal" : "Improve connectable",
                    "createdAt" : 1639477137716.0,
                    "task" : {
                        "id" : "dt10123",
                        "title" : "Improve connectable"
                    }
                }, 
                {
                    "id" : "6C5lU",
                    "type" : "title",
                    "newVal" : "add the new cover",
                    "oldVal" : "add the new cover",
                    "createdAt" : 1639477137729.0,
                    "task" : {
                        "id" : "e8NeM9",
                        "title" : "add the new cover"
                    }
                }, 
                {
                    "id" : "JsnSN",
                    "type" : "title",
                    "newVal" : "Make test data",
                    "oldVal" : "Make test data",
                    "createdAt" : 1639477146373.0,
                    "task" : {
                        "id" : "bt102",
                        "title" : "Make test data"
                    }
                }, 
                {
                    "id" : "GrQOK",
                    "type" : "title",
                    "newVal" : "Send the prototype project",
                    "oldVal" : "Send the prototype project",
                    "createdAt" : 1639477146428.0,
                    "task" : {
                        "id" : "ct101",
                        "title" : "Send the prototype project"
                    }
                }, 
                {
                    "id" : "Wh5CD",
                    "type" : "title",
                    "newVal" : "Improve connectable",
                    "oldVal" : "Improve connectable",
                    "createdAt" : 1639477146443.0,
                    "task" : {
                        "id" : "dt10123",
                        "title" : "Improve connectable"
                    }
                }, 
                {
                    "id" : "8UekC",
                    "type" : "title",
                    "newVal" : "add the new cover",
                    "oldVal" : "add the new cover",
                    "createdAt" : 1639477146465.0,
                    "task" : {
                        "id" : "e8NeM9",
                        "title" : "add the new cover"
                    }
                }, 
                {
                    "id" : "TbpkP",
                    "type" : "title",
                    "newVal" : "Make test data",
                    "oldVal" : "Make test data",
                    "createdAt" : 1639477149183.0,
                    "task" : {
                        "id" : "bt102",
                        "title" : "Make test data"
                    }
                }, 
                {
                    "id" : "wReWd",
                    "type" : "title",
                    "newVal" : "Send the prototype project",
                    "oldVal" : "Send the prototype project",
                    "createdAt" : 1639477149239.0,
                    "task" : {
                        "id" : "ct101",
                        "title" : "Send the prototype project"
                    }
                }, 
                {
                    "id" : "6vCii",
                    "type" : "title",
                    "newVal" : "Improve connectable",
                    "oldVal" : "Improve connectable",
                    "createdAt" : 1639477149266.0,
                    "task" : {
                        "id" : "dt10123",
                        "title" : "Improve connectable"
                    }
                }, 
                {
                    "id" : "A4dNT",
                    "type" : "title",
                    "newVal" : "add the new cover",
                    "oldVal" : "add the new cover",
                    "createdAt" : 1639477149303.0,
                    "task" : {
                        "id" : "e8NeM9",
                        "title" : "add the new cover"
                    }
                }, 
                {
                    "id" : "zE3VV",
                    "type" : "title",
                    "newVal" : "Make test data",
                    "oldVal" : "Make test data",
                    "createdAt" : 1639477637061.0,
                    "task" : {
                        "id" : "bt102",
                        "title" : "Make test data"
                    }
                }, 
                {
                    "id" : "wUk5F",
                    "type" : "title",
                    "newVal" : "Send the prototype project",
                    "oldVal" : "Send the prototype project",
                    "createdAt" : 1639477637074.0,
                    "task" : {
                        "id" : "ct101",
                        "title" : "Send the prototype project"
                    }
                }, 
                {
                    "id" : "J6MAx",
                    "type" : "title",
                    "newVal" : "Improve connectable",
                    "oldVal" : "Improve connectable",
                    "createdAt" : 1639477637084.0,
                    "task" : {
                        "id" : "dt10123",
                        "title" : "Improve connectable"
                    }
                }, 
                {
                    "id" : "ApOpx",
                    "type" : "title",
                    "newVal" : "add the new cover",
                    "oldVal" : "add the new cover",
                    "createdAt" : 1639477637112.0,
                    "task" : {
                        "id" : "e8NeM9",
                        "title" : "add the new cover"
                    }
                }, 
                {
                    "id" : "cmPTj",
                    "type" : null,
                    "newVal" : null,
                    "oldVal" : null,
                    "createdAt" : 1639477647268.0,
                    "task" : {
                        "id" : "e8NeM9",
                        "title" : "add the new cover"
                    }
                }, 
                {
                    "id" : "fJeU4",
                    "type" : "title",
                    "newVal" : "add the new cover",
                    "oldVal" : "add the new cover",
                    "createdAt" : 1639477647576.0,
                    "task" : {
                        "id" : "e8NeM9",
                        "title" : "add the new cover"
                    }
                }, 
                {
                    "id" : "Glx6D",
                    "type" : "members",
                    "newVal" : [ 
                        {
                            "username" : "Ishay",
                            "_id" : "61b245d82e8f89202bd83307",
                            "password" : 12345,
                            "fullname" : "Ishay Nitzan",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "ishay-img.jpeg"
                        }, 
                        {
                            "username" : "Sundos",
                            "_id" : "61b246112e8f89202bd83308",
                            "password" : 12345,
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }
                    ],
                    "oldVal" : [ 
                        {
                            "username" : "Ishay",
                            "_id" : "61b245d82e8f89202bd83307",
                            "password" : 12345,
                            "fullname" : "Ishay Nitzan",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "ishay-img.jpeg"
                        }
                    ],
                    "createdAt" : 1639477649082.0,
                    "task" : {
                        "id" : "e8NeM9",
                        "title" : "add the new cover"
                    }
                }, 
                {
                    "id" : "MZwZ5",
                    "type" : "title",
                    "newVal" : "add the new cover",
                    "oldVal" : "add the new cover",
                    "createdAt" : 1639477649094.0,
                    "task" : {
                        "id" : "e8NeM9",
                        "title" : "add the new cover"
                    }
                }, 
                {
                    "id" : "r16kI",
                    "type" : "title",
                    "newVal" : "add the new cover",
                    "oldVal" : "add the new cover",
                    "createdAt" : 1639477680320.0,
                    "task" : {
                        "id" : "e8NeM9",
                        "title" : "add the new cover"
                    }
                }, 
                {
                    "id" : "5IoDq",
                    "type" : "title",
                    "newVal" : "Make test data",
                    "oldVal" : "Make test data",
                    "createdAt" : 1639478542386.0,
                    "task" : {
                        "id" : "bt102",
                        "title" : "Make test data"
                    }
                }, 
                {
                    "id" : "e0YD2",
                    "type" : "title",
                    "newVal" : "Send the prototype project",
                    "oldVal" : "Send the prototype project",
                    "createdAt" : 1639478542443.0,
                    "task" : {
                        "id" : "ct101",
                        "title" : "Send the prototype project"
                    }
                }, 
                {
                    "id" : "mdMVH",
                    "type" : "title",
                    "newVal" : "Improve connectable",
                    "oldVal" : "Improve connectable",
                    "createdAt" : 1639478542597.0,
                    "task" : {
                        "id" : "dt10123",
                        "title" : "Improve connectable"
                    }
                }, 
                {
                    "id" : "YD0jM",
                    "type" : "title",
                    "newVal" : "add the new cover",
                    "oldVal" : "add the new cover",
                    "createdAt" : 1639478542679.0,
                    "task" : {
                        "id" : "e8NeM9",
                        "title" : "add the new cover"
                    }
                }, 
                {
                    "id" : "sBhxr",
                    "type" : "title",
                    "newVal" : "Make test data",
                    "oldVal" : "Make test data",
                    "createdAt" : 1639478546015.0,
                    "task" : {
                        "id" : "bt102",
                        "title" : "Make test data"
                    }
                }, 
                {
                    "id" : "VY3tH",
                    "type" : "title",
                    "newVal" : "Send the prototype project",
                    "oldVal" : "Send the prototype project",
                    "createdAt" : 1639478546165.0,
                    "task" : {
                        "id" : "ct101",
                        "title" : "Send the prototype project"
                    }
                }, 
                {
                    "id" : "yCyJs",
                    "type" : "title",
                    "newVal" : "Improve connectable",
                    "oldVal" : "Improve connectable",
                    "createdAt" : 1639478546267.0,
                    "task" : {
                        "id" : "dt10123",
                        "title" : "Improve connectable"
                    }
                }, 
                {
                    "id" : "RDxNK",
                    "type" : "title",
                    "newVal" : "add the new cover",
                    "oldVal" : "add the new cover",
                    "createdAt" : 1639478546382.0,
                    "task" : {
                        "id" : "e8NeM9",
                        "title" : "add the new cover"
                    }
                }, 
                {
                    "id" : "xe03I",
                    "type" : "title",
                    "newVal" : "Make test data",
                    "oldVal" : "Make test data",
                    "createdAt" : 1639478568521.0,
                    "task" : {
                        "id" : "bt102",
                        "title" : "Make test data"
                    }
                }, 
                {
                    "id" : "pvLET",
                    "type" : "title",
                    "newVal" : "Send the prototype project",
                    "oldVal" : "Send the prototype project",
                    "createdAt" : 1639478568541.0,
                    "task" : {
                        "id" : "ct101",
                        "title" : "Send the prototype project"
                    }
                }, 
                {
                    "id" : "9wpVc",
                    "type" : "title",
                    "newVal" : "Improve connectable",
                    "oldVal" : "Improve connectable",
                    "createdAt" : 1639478568560.0,
                    "task" : {
                        "id" : "dt10123",
                        "title" : "Improve connectable"
                    }
                }, 
                {
                    "id" : "dDRrL",
                    "type" : "title",
                    "newVal" : "add the new cover",
                    "oldVal" : "add the new cover",
                    "createdAt" : 1639478568581.0,
                    "task" : {
                        "id" : "e8NeM9",
                        "title" : "add the new cover"
                    }
                }, 
                {
                    "id" : "hsziM",
                    "type" : "title",
                    "newVal" : "Make test data",
                    "oldVal" : "Make test data",
                    "createdAt" : 1639478622635.0,
                    "task" : {
                        "id" : "bt102",
                        "title" : "Make test data"
                    }
                }, 
                {
                    "id" : "2xctS",
                    "type" : "title",
                    "newVal" : "Send the prototype project",
                    "oldVal" : "Send the prototype project",
                    "createdAt" : 1639478622663.0,
                    "task" : {
                        "id" : "ct101",
                        "title" : "Send the prototype project"
                    }
                }, 
                {
                    "id" : "DKKlJ",
                    "type" : "title",
                    "newVal" : "Improve connectable",
                    "oldVal" : "Improve connectable",
                    "createdAt" : 1639478622688.0,
                    "task" : {
                        "id" : "dt10123",
                        "title" : "Improve connectable"
                    }
                }, 
                {
                    "id" : "zpC9T",
                    "type" : "title",
                    "newVal" : "add the new cover",
                    "oldVal" : "add the new cover",
                    "createdAt" : 1639478622725.0,
                    "task" : {
                        "id" : "e8NeM9",
                        "title" : "add the new cover"
                    }
                }, 
                {
                    "id" : "kUwS2",
                    "type" : "title",
                    "newVal" : "add the new cover",
                    "oldVal" : "add the new cover",
                    "createdAt" : 1639479160734.0,
                    "task" : {
                        "id" : "e8NeM9",
                        "title" : "add the new cover"
                    }
                }
            ]
        }, 
        {
            "id" : "fg102",
            "title" : "Design Team",
            "tasks" : [ 
                {
                    "id" : "gt104",
                    "title" : "Finalize project",
                    "status" : "Done",
                    "members" : [ 
                        {
                            "_id" : "u103",
                            "username" : "Ishay",
                            "fullname" : "Ishay Nitzan",
                            "imgUrl" : "ishay-img.jpeg"
                        }
                    ],
                    "priority" : "Low",
                    "timeline" : [ 
                        "2021-11-30T22:00:00.000Z", 
                        "2021-12-06T22:00:00.000Z"
                    ],
                    "seenBy" : [ 
                        {
                            "username" : "Sundos",
                            "password" : 12345,
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }, 
                        {
                            "_id" : "u103",
                            "username" : "Ishay",
                            "fullname" : "Ishay Nitzan",
                            "imgUrl" : "ishay-img.jpeg"
                        }
                    ]
                }, 
                {
                    "id" : "ht201",
                    "title" : "Change color plate for logo",
                    "status" : "Stuck",
                    "priority" : "Medium",
                    "timeline" : [ 
                        "2021-12-12T22:00:00.000Z", 
                        "2021-12-22T22:00:00.000Z"
                    ],
                    "seenBy" : [ 
                        {
                            "username" : "Sundos",
                            "password" : 12345,
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }, 
                        {
                            "_id" : "u103",
                            "username" : "Ishay",
                            "fullname" : "Ishay Nitzan",
                            "imgUrl" : "ishay-img.jpeg"
                        }, 
                        {
                            "_id" : "61b246112e8f89202bd83308",
                            "username" : "Sundos",
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }, 
                        {
                            "_id" : "61b245d82e8f89202bd83307",
                            "username" : "Ishay",
                            "fullname" : "Ishay Nitzan",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "ishay-img.jpeg"
                        }
                    ],
                    "members" : [ 
                        {
                            "username" : "Sundos",
                            "_id" : "61b246112e8f89202bd83308",
                            "password" : 12345,
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }, 
                        {
                            "username" : "Ishay",
                            "_id" : "61b245d82e8f89202bd83307",
                            "password" : 12345,
                            "fullname" : "Ishay Nitzan",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "ishay-img.jpeg"
                        }
                    ]
                }, 
                {
                    "id" : "it202",
                    "title" : "Recruit new members",
                    "status" : "Work",
                    "priority" : "High",
                    "timeline" : [ 
                        "2021-12-11T22:00:00.000Z", 
                        "2021-12-16T22:00:00.000Z"
                    ],
                    "seenBy" : [ 
                        {
                            "username" : "Sundos",
                            "password" : 12345,
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }, 
                        {
                            "_id" : "u103",
                            "username" : "Ishay",
                            "fullname" : "Ishay Nitzan",
                            "imgUrl" : "ishay-img.jpeg"
                        }, 
                        {
                            "_id" : "61b245d82e8f89202bd83307",
                            "username" : "Ishay",
                            "fullname" : "Ishay Nitzan",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "ishay-img.jpeg"
                        }
                    ],
                    "members" : [ 
                        {
                            "username" : "Ishay",
                            "_id" : "61b245d82e8f89202bd83307",
                            "password" : 12345,
                            "fullname" : "Ishay Nitzan",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "ishay-img.jpeg"
                        }
                    ]
                }
            ],
            "style" : {
                "color" : "#579bfc"
            },
            "activityLog" : [ 
                {
                    "id" : "T8Oxz",
                    "type" : "title",
                    "newVal" : "Finalize project",
                    "oldVal" : "Finalize project",
                    "createdAt" : 1639475795444.0,
                    "task" : {
                        "id" : "gt104",
                        "title" : "Finalize project"
                    }
                }, 
                {
                    "id" : "qiI91",
                    "type" : "title",
                    "newVal" : "Change color plate for logo",
                    "oldVal" : "Change color plate for logo",
                    "createdAt" : 1639475795460.0,
                    "task" : {
                        "id" : "ht201",
                        "title" : "Change color plate for logo"
                    }
                }, 
                {
                    "id" : "jqtpF",
                    "type" : "title",
                    "newVal" : "Recruit new members",
                    "oldVal" : "Recruit new members",
                    "createdAt" : 1639475795473.0,
                    "task" : {
                        "id" : "it202",
                        "title" : "Recruit new members"
                    }
                }, 
                {
                    "id" : "uHqcq",
                    "type" : "title",
                    "newVal" : "Finalize project",
                    "oldVal" : "Finalize project",
                    "createdAt" : 1639475801012.0,
                    "task" : {
                        "id" : "gt104",
                        "title" : "Finalize project"
                    }
                }, 
                {
                    "id" : "o1SwQ",
                    "type" : "title",
                    "newVal" : "Change color plate for logo",
                    "oldVal" : "Change color plate for logo",
                    "createdAt" : 1639475801091.0,
                    "task" : {
                        "id" : "ht201",
                        "title" : "Change color plate for logo"
                    }
                }, 
                {
                    "id" : "yLMei",
                    "type" : "title",
                    "newVal" : "Recruit new members",
                    "oldVal" : "Recruit new members",
                    "createdAt" : 1639475801194.0,
                    "task" : {
                        "id" : "it202",
                        "title" : "Recruit new members"
                    }
                }, 
                {
                    "id" : "bZICh",
                    "type" : "timeline",
                    "newVal" : "Dec 14 - Dec 27",
                    "oldVal" : "Dec 8 - 11",
                    "createdAt" : 1639475865656.0,
                    "task" : {
                        "id" : "ht201",
                        "title" : "Change color plate for logo"
                    }
                }, 
                {
                    "id" : "Ny7kJ",
                    "type" : "timeline",
                    "newVal" : "Dec 13 - Dec 23",
                    "oldVal" : "Dec 14 - 27",
                    "createdAt" : 1639475871960.0,
                    "task" : {
                        "id" : "ht201",
                        "title" : "Change color plate for logo"
                    }
                }, 
                {
                    "id" : "BKXXv",
                    "type" : "timeline",
                    "newVal" : "Dec 12 - Dec 21",
                    "oldVal" : "Dec 11 - 14",
                    "createdAt" : 1639475879864.0,
                    "task" : {
                        "id" : "it202",
                        "title" : "Recruit new members"
                    }
                }, 
                {
                    "id" : "BHTim",
                    "type" : "timeline",
                    "newVal" : "Dec 12 - Dec 17",
                    "oldVal" : "Dec 12 - 21",
                    "createdAt" : 1639475884790.0,
                    "task" : {
                        "id" : "it202",
                        "title" : "Recruit new members"
                    }
                }, 
                {
                    "id" : "Bc16W",
                    "type" : "title",
                    "newVal" : "Finalize project",
                    "oldVal" : "Finalize project",
                    "createdAt" : 1639477137748.0,
                    "task" : {
                        "id" : "gt104",
                        "title" : "Finalize project"
                    }
                }, 
                {
                    "id" : "EUX2T",
                    "type" : "title",
                    "newVal" : "Change color plate for logo",
                    "oldVal" : "Change color plate for logo",
                    "createdAt" : 1639477137767.0,
                    "task" : {
                        "id" : "ht201",
                        "title" : "Change color plate for logo"
                    }
                }, 
                {
                    "id" : "J5Mfo",
                    "type" : "title",
                    "newVal" : "Recruit new members",
                    "oldVal" : "Recruit new members",
                    "createdAt" : 1639477137781.0,
                    "task" : {
                        "id" : "it202",
                        "title" : "Recruit new members"
                    }
                }, 
                {
                    "id" : "s9kfG",
                    "type" : "title",
                    "newVal" : "Finalize project",
                    "oldVal" : "Finalize project",
                    "createdAt" : 1639477146489.0,
                    "task" : {
                        "id" : "gt104",
                        "title" : "Finalize project"
                    }
                }, 
                {
                    "id" : "ckOWZ",
                    "type" : "title",
                    "newVal" : "Change color plate for logo",
                    "oldVal" : "Change color plate for logo",
                    "createdAt" : 1639477146513.0,
                    "task" : {
                        "id" : "ht201",
                        "title" : "Change color plate for logo"
                    }
                }, 
                {
                    "id" : "hczkK",
                    "type" : "title",
                    "newVal" : "Recruit new members",
                    "oldVal" : "Recruit new members",
                    "createdAt" : 1639477146547.0,
                    "task" : {
                        "id" : "it202",
                        "title" : "Recruit new members"
                    }
                }, 
                {
                    "id" : "PEI01",
                    "type" : "title",
                    "newVal" : "Finalize project",
                    "oldVal" : "Finalize project",
                    "createdAt" : 1639477149348.0,
                    "task" : {
                        "id" : "gt104",
                        "title" : "Finalize project"
                    }
                }, 
                {
                    "id" : "bIaiz",
                    "type" : "title",
                    "newVal" : "Change color plate for logo",
                    "oldVal" : "Change color plate for logo",
                    "createdAt" : 1639477149378.0,
                    "task" : {
                        "id" : "ht201",
                        "title" : "Change color plate for logo"
                    }
                }, 
                {
                    "id" : "W9jGf",
                    "type" : "title",
                    "newVal" : "Recruit new members",
                    "oldVal" : "Recruit new members",
                    "createdAt" : 1639477149398.0,
                    "task" : {
                        "id" : "it202",
                        "title" : "Recruit new members"
                    }
                }, 
                {
                    "id" : "4MNs7",
                    "type" : "title",
                    "newVal" : "Finalize project",
                    "oldVal" : "Finalize project",
                    "createdAt" : 1639477637131.0,
                    "task" : {
                        "id" : "gt104",
                        "title" : "Finalize project"
                    }
                }, 
                {
                    "id" : "sZo2v",
                    "type" : "title",
                    "newVal" : "Change color plate for logo",
                    "oldVal" : "Change color plate for logo",
                    "createdAt" : 1639477637153.0,
                    "task" : {
                        "id" : "ht201",
                        "title" : "Change color plate for logo"
                    }
                }, 
                {
                    "id" : "12caE",
                    "type" : "title",
                    "newVal" : "Recruit new members",
                    "oldVal" : "Recruit new members",
                    "createdAt" : 1639477637176.0,
                    "task" : {
                        "id" : "it202",
                        "title" : "Recruit new members"
                    }
                }, 
                {
                    "id" : "UiVpQ",
                    "type" : null,
                    "newVal" : null,
                    "oldVal" : null,
                    "createdAt" : 1639477640194.0,
                    "task" : {
                        "id" : "ht201",
                        "title" : "Change color plate for logo"
                    }
                }, 
                {
                    "id" : "iAFW6",
                    "type" : "title",
                    "newVal" : "Change color plate for logo",
                    "oldVal" : "Change color plate for logo",
                    "createdAt" : 1639477640207.0,
                    "task" : {
                        "id" : "ht201",
                        "title" : "Change color plate for logo"
                    }
                }, 
                {
                    "id" : "FuaL4",
                    "type" : "members",
                    "newVal" : [ 
                        {
                            "username" : "Sundos",
                            "_id" : "61b246112e8f89202bd83308",
                            "password" : 12345,
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }, 
                        {
                            "username" : "Ishay",
                            "_id" : "61b245d82e8f89202bd83307",
                            "password" : 12345,
                            "fullname" : "Ishay Nitzan",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "ishay-img.jpeg"
                        }
                    ],
                    "oldVal" : [ 
                        {
                            "username" : "Sundos",
                            "_id" : "61b246112e8f89202bd83308",
                            "password" : 12345,
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }
                    ],
                    "createdAt" : 1639477642347.0,
                    "task" : {
                        "id" : "ht201",
                        "title" : "Change color plate for logo"
                    }
                }, 
                {
                    "id" : "R1sHu",
                    "type" : "title",
                    "newVal" : "Change color plate for logo",
                    "oldVal" : "Change color plate for logo",
                    "createdAt" : 1639477642663.0,
                    "task" : {
                        "id" : "ht201",
                        "title" : "Change color plate for logo"
                    }
                }, 
                {
                    "id" : "d5rUw",
                    "type" : null,
                    "newVal" : null,
                    "oldVal" : null,
                    "createdAt" : 1639477644068.0,
                    "task" : {
                        "id" : "it202",
                        "title" : "Recruit new members"
                    }
                }, 
                {
                    "id" : "UZcX2",
                    "type" : "title",
                    "newVal" : "Recruit new members",
                    "oldVal" : "Recruit new members",
                    "createdAt" : 1639477644382.0,
                    "task" : {
                        "id" : "it202",
                        "title" : "Recruit new members"
                    }
                }, 
                {
                    "id" : "3EtbL",
                    "type" : "title",
                    "newVal" : "Change color plate for logo",
                    "oldVal" : "Change color plate for logo",
                    "createdAt" : 1639477683441.0,
                    "task" : {
                        "id" : "ht201",
                        "title" : "Change color plate for logo"
                    }
                }, 
                {
                    "id" : "GiJFX",
                    "type" : "title",
                    "newVal" : "Finalize project",
                    "oldVal" : "Finalize project",
                    "createdAt" : 1639478542731.0,
                    "task" : {
                        "id" : "gt104",
                        "title" : "Finalize project"
                    }
                }, 
                {
                    "id" : "jGozw",
                    "type" : "title",
                    "newVal" : "Change color plate for logo",
                    "oldVal" : "Change color plate for logo",
                    "createdAt" : 1639478542822.0,
                    "task" : {
                        "id" : "ht201",
                        "title" : "Change color plate for logo"
                    }
                }, 
                {
                    "id" : "2py7Z",
                    "type" : "title",
                    "newVal" : "Recruit new members",
                    "oldVal" : "Recruit new members",
                    "createdAt" : 1639478542877.0,
                    "task" : {
                        "id" : "it202",
                        "title" : "Recruit new members"
                    }
                }, 
                {
                    "id" : "SDPnj",
                    "type" : "title",
                    "newVal" : "Finalize project",
                    "oldVal" : "Finalize project",
                    "createdAt" : 1639478546538.0,
                    "task" : {
                        "id" : "gt104",
                        "title" : "Finalize project"
                    }
                }, 
                {
                    "id" : "jV6yI",
                    "type" : "title",
                    "newVal" : "Change color plate for logo",
                    "oldVal" : "Change color plate for logo",
                    "createdAt" : 1639478546745.0,
                    "task" : {
                        "id" : "ht201",
                        "title" : "Change color plate for logo"
                    }
                }, 
                {
                    "id" : "73ib7",
                    "type" : "title",
                    "newVal" : "Recruit new members",
                    "oldVal" : "Recruit new members",
                    "createdAt" : 1639478546978.0,
                    "task" : {
                        "id" : "it202",
                        "title" : "Recruit new members"
                    }
                }, 
                {
                    "id" : "CqEaC",
                    "type" : "title",
                    "newVal" : "Finalize project",
                    "oldVal" : "Finalize project",
                    "createdAt" : 1639478568599.0,
                    "task" : {
                        "id" : "gt104",
                        "title" : "Finalize project"
                    }
                }, 
                {
                    "id" : "QHPvJ",
                    "type" : "title",
                    "newVal" : "Change color plate for logo",
                    "oldVal" : "Change color plate for logo",
                    "createdAt" : 1639478568619.0,
                    "task" : {
                        "id" : "ht201",
                        "title" : "Change color plate for logo"
                    }
                }, 
                {
                    "id" : "Li0E7",
                    "type" : "title",
                    "newVal" : "Recruit new members",
                    "oldVal" : "Recruit new members",
                    "createdAt" : 1639478568635.0,
                    "task" : {
                        "id" : "it202",
                        "title" : "Recruit new members"
                    }
                }, 
                {
                    "id" : "xLURO",
                    "type" : "title",
                    "newVal" : "Finalize project",
                    "oldVal" : "Finalize project",
                    "createdAt" : 1639478622761.0,
                    "task" : {
                        "id" : "gt104",
                        "title" : "Finalize project"
                    }
                }, 
                {
                    "id" : "YBhtW",
                    "type" : "title",
                    "newVal" : "Change color plate for logo",
                    "oldVal" : "Change color plate for logo",
                    "createdAt" : 1639478622788.0,
                    "task" : {
                        "id" : "ht201",
                        "title" : "Change color plate for logo"
                    }
                }, 
                {
                    "id" : "DaRF9",
                    "type" : "title",
                    "newVal" : "Recruit new members",
                    "oldVal" : "Recruit new members",
                    "createdAt" : 1639478622809.0,
                    "task" : {
                        "id" : "it202",
                        "title" : "Recruit new members"
                    }
                }, 
                {
                    "id" : "sslJw",
                    "type" : "title",
                    "newVal" : "Change color plate for logo",
                    "oldVal" : "Change color plate for logo",
                    "createdAt" : 1639479164271.0,
                    "task" : {
                        "id" : "ht201",
                        "title" : "Change color plate for logo"
                    }
                }, 
                {
                    "id" : "z0uBH",
                    "type" : "title",
                    "newVal" : "Recruit new members",
                    "oldVal" : "Recruit new members",
                    "createdAt" : 1639479167284.0,
                    "task" : {
                        "id" : "it202",
                        "title" : "Recruit new members"
                    }
                }
            ]
        }, 
        {
            "id" : "jg103",
            "title" : "Marketing Team",
            "tasks" : [ 
                {
                    "id" : "kt301",
                    "title" : "make new spreadsheet",
                    "status" : "Done",
                    "members" : [ 
                        {
                            "_id" : "u102",
                            "username" : "Sundos",
                            "fullname" : "Sundos Gutty",
                            "imgUrl" : "sundos-img.jpg"
                        }, 
                        {
                            "_id" : "u103",
                            "username" : "Ishay",
                            "fullname" : "Ishay Nitzan",
                            "imgUrl" : "ishay-img.jpeg"
                        }
                    ],
                    "timeline" : [ 
                        "2021-12-11T22:00:00.000Z", 
                        "2021-12-14T22:00:00.000Z"
                    ],
                    "priority" : "High",
                    "seenBy" : [ 
                        {
                            "username" : "Sundos",
                            "password" : 12345,
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }, 
                        {
                            "_id" : "u103",
                            "username" : "Ishay",
                            "fullname" : "Ishay Nitzan",
                            "imgUrl" : "ishay-img.jpeg"
                        }
                    ]
                }, 
                {
                    "id" : "lt402",
                    "title" : "Contact NY base for leads",
                    "description" : "description",
                    "comments" : [],
                    "members" : [ 
                        {
                            "username" : "Sundos",
                            "_id" : "61b246112e8f89202bd83308",
                            "password" : 12345,
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }
                    ],
                    "status" : "Work",
                    "createdAt" : 1590999730348.0,
                    "dueDate" : 16156215211.0,
                    "byMember" : {
                        "_id" : "u103",
                        "username" : "Ishay",
                        "fullname" : "Ishay Nitzan",
                        "imgUrl" : "ishay-img.jpeg"
                    },
                    "style" : {},
                    "timeline" : [ 
                        "2021-12-12T22:00:00.000Z", 
                        "2021-12-17T22:00:00.000Z"
                    ],
                    "priority" : "Medium",
                    "seenBy" : [ 
                        {
                            "username" : "Sundos",
                            "password" : 12345,
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }, 
                        {
                            "_id" : "u103",
                            "username" : "Ishay",
                            "fullname" : "Ishay Nitzan",
                            "imgUrl" : "ishay-img.jpeg"
                        }, 
                        {
                            "_id" : "61b246112e8f89202bd83308",
                            "username" : "Sundos",
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }
                    ]
                }
            ],
            "style" : {
                "color" : "#359970"
            },
            "activityLog" : [ 
                {
                    "id" : "YJT2B",
                    "type" : "title",
                    "newVal" : "make new spreadsheet",
                    "oldVal" : "make new spreadsheet",
                    "createdAt" : 1639475795489.0,
                    "task" : {
                        "id" : "kt301",
                        "title" : "make new spreadsheet"
                    }
                }, 
                {
                    "id" : "Wgb5H",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639475795508.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "lqkqe",
                    "type" : "title",
                    "newVal" : "make new spreadsheet",
                    "oldVal" : "make new spreadsheet",
                    "createdAt" : 1639475801331.0,
                    "task" : {
                        "id" : "kt301",
                        "title" : "make new spreadsheet"
                    }
                }, 
                {
                    "id" : "NtkzQ",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639475801444.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "SbdYS",
                    "type" : "title",
                    "newVal" : "make new spreadsheet",
                    "oldVal" : "make new spreadsheet",
                    "createdAt" : 1639477137798.0,
                    "task" : {
                        "id" : "kt301",
                        "title" : "make new spreadsheet"
                    }
                }, 
                {
                    "id" : "23qUM",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639477137819.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "HBXgz",
                    "type" : "title",
                    "newVal" : "make new spreadsheet",
                    "oldVal" : "make new spreadsheet",
                    "createdAt" : 1639477146575.0,
                    "task" : {
                        "id" : "kt301",
                        "title" : "make new spreadsheet"
                    }
                }, 
                {
                    "id" : "clclD",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639477146600.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "18LOI",
                    "type" : "title",
                    "newVal" : "make new spreadsheet",
                    "oldVal" : "make new spreadsheet",
                    "createdAt" : 1639477149452.0,
                    "task" : {
                        "id" : "kt301",
                        "title" : "make new spreadsheet"
                    }
                }, 
                {
                    "id" : "5U3OR",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639477149488.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "iTrbK",
                    "type" : "title",
                    "newVal" : "make new spreadsheet",
                    "oldVal" : "make new spreadsheet",
                    "createdAt" : 1639477637200.0,
                    "task" : {
                        "id" : "kt301",
                        "title" : "make new spreadsheet"
                    }
                }, 
                {
                    "id" : "1smcY",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639477637218.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "6qvAx",
                    "type" : null,
                    "newVal" : null,
                    "oldVal" : null,
                    "createdAt" : 1639477652032.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "emh4L",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639477652052.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "vX948",
                    "type" : "title",
                    "newVal" : "make new spreadsheet",
                    "oldVal" : "make new spreadsheet",
                    "createdAt" : 1639478542954.0,
                    "task" : {
                        "id" : "kt301",
                        "title" : "make new spreadsheet"
                    }
                }, 
                {
                    "id" : "7L70B",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478543000.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "1o5pI",
                    "type" : "title",
                    "newVal" : "make new spreadsheet",
                    "oldVal" : "make new spreadsheet",
                    "createdAt" : 1639478547131.0,
                    "task" : {
                        "id" : "kt301",
                        "title" : "make new spreadsheet"
                    }
                }, 
                {
                    "id" : "Pw4Ts",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478549492.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "7BZSD",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478550099.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "4r9SL",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478550515.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "QcHsU",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478550799.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "uSPyD",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478551263.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "Sijuj",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478551522.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "2gXWZ",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478551756.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "ZL8Yg",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478552178.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "6Z7gU",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478552356.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "dX9wh",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478552609.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "yhX7T",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478552849.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "J9KMR",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478553032.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "CId35",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478553303.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "EieHx",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478553526.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "32S9X",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478553750.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "XJJl2",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478553983.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "ACRSE",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478554248.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "aBUHQ",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478554462.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "jwq64",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478554680.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "knNa0",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478554962.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "FlV2y",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478555182.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "fzpRi",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478555457.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "iJvx4",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478555685.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "gTE62",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478555905.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "OW15d",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478556190.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "uizAj",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478556656.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "NVrzb",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478556923.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "mwUtK",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478557164.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "1RtkD",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478557413.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "Ud1qn",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478557679.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "dw9ds",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478558239.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "nVBSQ",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478558533.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "UwALh",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478558865.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "G6aFA",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478559047.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "mpcZP",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478559174.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "Jtjzp",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478559462.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "Gcr2L",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478559747.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "ek5Q8",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478560064.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "Sp9ux",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478560273.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "WpJXe",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478560569.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "pxcPr",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478560810.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "8TT4J",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478561008.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "8MED8",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478561340.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "KZC8i",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478561523.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "0NfiR",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478561834.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "PRW6G",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478562042.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "MsIC6",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478562248.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "S6N5h",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478562565.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "rYzP8",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478562850.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "aR8gX",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478563067.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "4goyC",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478563385.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "5fnMZ",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478563577.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "5hYUR",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478563805.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "gcXMX",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478564124.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "pxjCU",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478564383.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "HRx8m",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478564686.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "u5IbS",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478565013.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "XHRZJ",
                    "type" : "title",
                    "newVal" : "make new spreadsheet",
                    "oldVal" : "make new spreadsheet",
                    "createdAt" : 1639478568657.0,
                    "task" : {
                        "id" : "kt301",
                        "title" : "make new spreadsheet"
                    }
                }, 
                {
                    "id" : "oKaPu",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478568684.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }, 
                {
                    "id" : "Qv2WV",
                    "type" : "title",
                    "newVal" : "make new spreadsheet",
                    "oldVal" : "make new spreadsheet",
                    "createdAt" : 1639478622838.0,
                    "task" : {
                        "id" : "kt301",
                        "title" : "make new spreadsheet"
                    }
                }, 
                {
                    "id" : "jXdCx",
                    "type" : "title",
                    "newVal" : "Contact NY base for leads",
                    "oldVal" : "Contact NY base for leads",
                    "createdAt" : 1639478622859.0,
                    "task" : {
                        "id" : "lt402",
                        "title" : "Contact NY base for leads"
                    }
                }
            ]
        }, 
        {
            "id" : "mg104",
            "title" : "Office General",
            "tasks" : [ 
                {
                    "id" : "n501",
                    "title" : "The coffee machine is great!",
                    "status" : "Done",
                    "members" : [ 
                        {
                            "_id" : "u102",
                            "username" : "Sundos",
                            "fullname" : "Sundos Gutty",
                            "imgUrl" : "sundos-img.jpg"
                        }, 
                        {
                            "_id" : "u103",
                            "username" : "Ishay",
                            "fullname" : "Ishay Nitzan",
                            "imgUrl" : "ishay-img.jpeg"
                        }
                    ],
                    "timeline" : [ 
                        "2021-12-06T22:00:00.000Z", 
                        "2021-12-09T22:00:00.000Z"
                    ],
                    "priority" : "Medium",
                    "seenBy" : [ 
                        {
                            "username" : "Sundos",
                            "password" : 12345,
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }, 
                        {
                            "_id" : "u103",
                            "username" : "Ishay",
                            "fullname" : "Ishay Nitzan",
                            "imgUrl" : "ishay-img.jpeg"
                        }
                    ]
                }, 
                {
                    "id" : "ot502",
                    "title" : "Water the plants",
                    "description" : "description",
                    "comments" : [],
                    "checklists" : [ 
                        {
                            "id" : "YEhmF",
                            "title" : "Checklist",
                            "todos" : [ 
                                {
                                    "id" : "212jX",
                                    "title" : "To Do 1",
                                    "isDone" : false
                                }
                            ]
                        }
                    ],
                    "members" : [ 
                        {
                            "username" : "Ishay",
                            "password" : 12345,
                            "fullname" : "Ishay Nitzan",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "ishay-img.jpeg"
                        }
                    ],
                    "status" : "Done",
                    "createdAt" : 1590999730348.0,
                    "dueDate" : 16156215211.0,
                    "byMember" : {
                        "_id" : "u103",
                        "username" : "Ishay",
                        "fullname" : "Ishay Nitzan",
                        "imgUrl" : "ishay-img.jpeg"
                    },
                    "style" : {},
                    "timeline" : [ 
                        "2021-12-08T22:00:00.000Z", 
                        "2021-12-11T22:00:00.000Z"
                    ],
                    "seenBy" : [ 
                        {
                            "username" : "Sundos",
                            "password" : 12345,
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }, 
                        {
                            "_id" : "u103",
                            "username" : "Ishay",
                            "fullname" : "Ishay Nitzan",
                            "imgUrl" : "ishay-img.jpeg"
                        }
                    ],
                    "priority" : "High"
                }
            ],
            "style" : {
                "color" : "#579bfc"
            },
            "activityLog" : [ 
                {
                    "id" : "ICDqM",
                    "type" : "title",
                    "newVal" : "The coffee machine is great!",
                    "oldVal" : "The coffee machine is great!",
                    "createdAt" : 1639475795525.0,
                    "task" : {
                        "id" : "n501",
                        "title" : "The coffee machine is great!"
                    }
                }, 
                {
                    "id" : "TZ9rg",
                    "type" : "title",
                    "newVal" : "Water the plants",
                    "oldVal" : "Water the plants",
                    "createdAt" : 1639475795549.0,
                    "task" : {
                        "id" : "ot502",
                        "title" : "Water the plants"
                    }
                }, 
                {
                    "id" : "hQldE",
                    "type" : "title",
                    "newVal" : "The coffee machine is great!",
                    "oldVal" : "The coffee machine is great!",
                    "createdAt" : 1639475801494.0,
                    "task" : {
                        "id" : "n501",
                        "title" : "The coffee machine is great!"
                    }
                }, 
                {
                    "id" : "W5iot",
                    "type" : "title",
                    "newVal" : "Water the plants",
                    "oldVal" : "Water the plants",
                    "createdAt" : 1639475801544.0,
                    "task" : {
                        "id" : "ot502",
                        "title" : "Water the plants"
                    }
                }, 
                {
                    "id" : "ztonw",
                    "type" : "priority",
                    "newVal" : "High",
                    "createdAt" : 1639475929154.0,
                    "task" : {
                        "id" : "ot502",
                        "title" : "Water the plants"
                    }
                }, 
                {
                    "id" : "BwJUC",
                    "type" : "priority",
                    "newVal" : "High",
                    "createdAt" : 1639475929489.0,
                    "task" : {
                        "id" : "ot502",
                        "title" : "Water the plants"
                    }
                }, 
                {
                    "id" : "aBIw4",
                    "type" : "title",
                    "newVal" : "The coffee machine is great!",
                    "oldVal" : "The coffee machine is great!",
                    "createdAt" : 1639477137837.0,
                    "task" : {
                        "id" : "n501",
                        "title" : "The coffee machine is great!"
                    }
                }, 
                {
                    "id" : "79pB3",
                    "type" : "title",
                    "newVal" : "Water the plants",
                    "oldVal" : "Water the plants",
                    "createdAt" : 1639477137855.0,
                    "task" : {
                        "id" : "ot502",
                        "title" : "Water the plants"
                    }
                }, 
                {
                    "id" : "cFxHt",
                    "type" : "title",
                    "newVal" : "The coffee machine is great!",
                    "oldVal" : "The coffee machine is great!",
                    "createdAt" : 1639477146642.0,
                    "task" : {
                        "id" : "n501",
                        "title" : "The coffee machine is great!"
                    }
                }, 
                {
                    "id" : "bRWAh",
                    "type" : "title",
                    "newVal" : "Water the plants",
                    "oldVal" : "Water the plants",
                    "createdAt" : 1639477146670.0,
                    "task" : {
                        "id" : "ot502",
                        "title" : "Water the plants"
                    }
                }, 
                {
                    "id" : "ziTM3",
                    "type" : "title",
                    "newVal" : "The coffee machine is great!",
                    "oldVal" : "The coffee machine is great!",
                    "createdAt" : 1639477149514.0,
                    "task" : {
                        "id" : "n501",
                        "title" : "The coffee machine is great!"
                    }
                }, 
                {
                    "id" : "ZBQbm",
                    "type" : "title",
                    "newVal" : "Water the plants",
                    "oldVal" : "Water the plants",
                    "createdAt" : 1639477149542.0,
                    "task" : {
                        "id" : "ot502",
                        "title" : "Water the plants"
                    }
                }, 
                {
                    "id" : "5RlQu",
                    "type" : "title",
                    "newVal" : "The coffee machine is great!",
                    "oldVal" : "The coffee machine is great!",
                    "createdAt" : 1639477637239.0,
                    "task" : {
                        "id" : "n501",
                        "title" : "The coffee machine is great!"
                    }
                }, 
                {
                    "id" : "aQ7wP",
                    "type" : "title",
                    "newVal" : "Water the plants",
                    "oldVal" : "Water the plants",
                    "createdAt" : 1639477637258.0,
                    "task" : {
                        "id" : "ot502",
                        "title" : "Water the plants"
                    }
                }, 
                {
                    "id" : "z8ezj",
                    "type" : "title",
                    "newVal" : "The coffee machine is great!",
                    "oldVal" : "The coffee machine is great!",
                    "createdAt" : 1639478543111.0,
                    "task" : {
                        "id" : "n501",
                        "title" : "The coffee machine is great!"
                    }
                }, 
                {
                    "id" : "zZmgv",
                    "type" : "title",
                    "newVal" : "The coffee machine is great!",
                    "oldVal" : "The coffee machine is great!",
                    "createdAt" : 1639478568707.0,
                    "task" : {
                        "id" : "n501",
                        "title" : "The coffee machine is great!"
                    }
                }, 
                {
                    "id" : "ahXcI",
                    "type" : "title",
                    "newVal" : "Water the plants",
                    "oldVal" : "Water the plants",
                    "createdAt" : 1639478568736.0,
                    "task" : {
                        "id" : "ot502",
                        "title" : "Water the plants"
                    }
                }, 
                {
                    "id" : "R7KWj",
                    "type" : "title",
                    "newVal" : "The coffee machine is great!",
                    "oldVal" : "The coffee machine is great!",
                    "createdAt" : 1639478622885.0,
                    "task" : {
                        "id" : "n501",
                        "title" : "The coffee machine is great!"
                    }
                }, 
                {
                    "id" : "4IR2V",
                    "type" : "title",
                    "newVal" : "Water the plants",
                    "oldVal" : "Water the plants",
                    "createdAt" : 1639478622911.0,
                    "task" : {
                        "id" : "ot502",
                        "title" : "Water the plants"
                    }
                }
            ]
        }, 
        {
            "id" : "pg105",
            "title" : "Back Office",
            "tasks" : [ 
                {
                    "id" : "q601",
                    "title" : "Send fiscal quarter",
                    "status" : "Done",
                    "members" : [ 
                        {
                            "_id" : "u102",
                            "username" : "Sundos",
                            "fullname" : "Sundos Gutty",
                            "imgUrl" : "sundos-img.jpg"
                        }, 
                        {
                            "_id" : "u103",
                            "username" : "Ishay",
                            "fullname" : "Ishay Nitzan",
                            "imgUrl" : "ishay-img.jpeg"
                        }
                    ],
                    "priority" : "Low",
                    "seenBy" : [ 
                        {
                            "username" : "Sundos",
                            "password" : 12345,
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }, 
                        {
                            "_id" : "u103",
                            "username" : "Ishay",
                            "fullname" : "Ishay Nitzan",
                            "imgUrl" : "ishay-img.jpeg"
                        }
                    ],
                    "timeline" : [ 
                        "2021-11-23T22:00:00.000Z", 
                        "2021-11-29T22:00:00.000Z"
                    ]
                }, 
                {
                    "id" : "rt602",
                    "title" : "Get server up and running",
                    "description" : "description",
                    "comments" : [],
                    "members" : [ 
                        {
                            "username" : "Sundos",
                            "password" : 12345,
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }
                    ],
                    "status" : "Done",
                    "createdAt" : 1590999730348.0,
                    "dueDate" : 16156215211.0,
                    "byMember" : {
                        "_id" : "u102",
                        "username" : "Sundos",
                        "fullname" : "Sundos Gutty",
                        "imgUrl" : "sundos-img.jpg"
                    },
                    "style" : {},
                    "seenBy" : [ 
                        {
                            "username" : "Sundos",
                            "password" : 12345,
                            "fullname" : "Sundos Gutty",
                            "email" : "sundos@gmail.com",
                            "imgUrl" : "sundos-img.jpg"
                        }, 
                        {
                            "_id" : "u103",
                            "username" : "Ishay",
                            "fullname" : "Ishay Nitzan",
                            "imgUrl" : "ishay-img.jpeg"
                        }
                    ],
                    "timeline" : [ 
                        "2021-11-22T22:00:00.000Z", 
                        "2021-12-01T22:00:00.000Z"
                    ],
                    "priority" : "High"
                }
            ],
            "style" : {
                "color" : "#579bfc"
            },
            "activityLog" : [ 
                {
                    "id" : "rIvIq",
                    "type" : "title",
                    "newVal" : "Send fiscal quarter",
                    "oldVal" : "Send fiscal quarter",
                    "createdAt" : 1639475795570.0,
                    "task" : {
                        "id" : "q601",
                        "title" : "Send fiscal quarter"
                    }
                }, 
                {
                    "id" : "kdH6J",
                    "type" : "title",
                    "newVal" : "Get server up and running",
                    "oldVal" : "Get server up and running",
                    "createdAt" : 1639475795591.0,
                    "task" : {
                        "id" : "rt602",
                        "title" : "Get server up and running"
                    }
                }, 
                {
                    "id" : "2tbuo",
                    "type" : "title",
                    "newVal" : "Send fiscal quarter",
                    "oldVal" : "Send fiscal quarter",
                    "createdAt" : 1639475801628.0,
                    "task" : {
                        "id" : "q601",
                        "title" : "Send fiscal quarter"
                    }
                }, 
                {
                    "id" : "7m0XK",
                    "type" : "title",
                    "newVal" : "Get server up and running",
                    "oldVal" : "Get server up and running",
                    "createdAt" : 1639475801727.0,
                    "task" : {
                        "id" : "rt602",
                        "title" : "Get server up and running"
                    }
                }, 
                {
                    "id" : "oGtKK",
                    "type" : "timeline",
                    "newVal" : "Dec 13 - Dec 16",
                    "oldVal" : "-",
                    "createdAt" : 1639475896009.0,
                    "task" : {
                        "id" : "q601",
                        "title" : "Send fiscal quarter"
                    }
                }, 
                {
                    "id" : "rlzae",
                    "type" : "timeline",
                    "newVal" : "Nov 24 - Nov 30",
                    "oldVal" : "Dec 13 - 16",
                    "createdAt" : 1639475902394.0,
                    "task" : {
                        "id" : "q601",
                        "title" : "Send fiscal quarter"
                    }
                }, 
                {
                    "id" : "xgF6w",
                    "type" : "timeline",
                    "newVal" : "Nov 24 - Dec 13",
                    "oldVal" : "-",
                    "createdAt" : 1639475909164.0,
                    "task" : {
                        "id" : "rt602",
                        "title" : "Get server up and running"
                    }
                }, 
                {
                    "id" : "XeKBu",
                    "type" : "timeline",
                    "newVal" : "Nov 23 - Dec 2",
                    "oldVal" : "Nov 24 - Dec 13",
                    "createdAt" : 1639475924897.0,
                    "task" : {
                        "id" : "rt602",
                        "title" : "Get server up and running"
                    }
                }, 
                {
                    "id" : "q6uip",
                    "type" : "priority",
                    "newVal" : "High",
                    "createdAt" : 1639475927685.0,
                    "task" : {
                        "id" : "rt602",
                        "title" : "Get server up and running"
                    }
                }, 
                {
                    "id" : "tTQPw",
                    "type" : "priority",
                    "newVal" : "High",
                    "createdAt" : 1639475928041.0,
                    "task" : {
                        "id" : "rt602",
                        "title" : "Get server up and running"
                    }
                }, 
                {
                    "id" : "RoMc1",
                    "type" : "title",
                    "newVal" : "Send fiscal quarter",
                    "oldVal" : "Send fiscal quarter",
                    "createdAt" : 1639477137880.0,
                    "task" : {
                        "id" : "q601",
                        "title" : "Send fiscal quarter"
                    }
                }, 
                {
                    "id" : "x3UUG",
                    "type" : "title",
                    "newVal" : "Get server up and running",
                    "oldVal" : "Get server up and running",
                    "createdAt" : 1639477137900.0,
                    "task" : {
                        "id" : "rt602",
                        "title" : "Get server up and running"
                    }
                }, 
                {
                    "id" : "Qp4Dc",
                    "type" : "title",
                    "newVal" : "Send fiscal quarter",
                    "oldVal" : "Send fiscal quarter",
                    "createdAt" : 1639477146697.0,
                    "task" : {
                        "id" : "q601",
                        "title" : "Send fiscal quarter"
                    }
                }, 
                {
                    "id" : "7cVsp",
                    "type" : "title",
                    "newVal" : "Get server up and running",
                    "oldVal" : "Get server up and running",
                    "createdAt" : 1639477146728.0,
                    "task" : {
                        "id" : "rt602",
                        "title" : "Get server up and running"
                    }
                }, 
                {
                    "id" : "AFiH3",
                    "type" : "title",
                    "newVal" : "Send fiscal quarter",
                    "oldVal" : "Send fiscal quarter",
                    "createdAt" : 1639477149575.0,
                    "task" : {
                        "id" : "q601",
                        "title" : "Send fiscal quarter"
                    }
                }, 
                {
                    "id" : "ode82",
                    "type" : "title",
                    "newVal" : "Get server up and running",
                    "oldVal" : "Get server up and running",
                    "createdAt" : 1639477149600.0,
                    "task" : {
                        "id" : "rt602",
                        "title" : "Get server up and running"
                    }
                }, 
                {
                    "id" : "O8kca",
                    "type" : "title",
                    "newVal" : "Send fiscal quarter",
                    "oldVal" : "Send fiscal quarter",
                    "createdAt" : 1639477637279.0,
                    "task" : {
                        "id" : "q601",
                        "title" : "Send fiscal quarter"
                    }
                }, 
                {
                    "id" : "Urkj8",
                    "type" : "title",
                    "newVal" : "Get server up and running",
                    "oldVal" : "Get server up and running",
                    "createdAt" : 1639477637299.0,
                    "task" : {
                        "id" : "rt602",
                        "title" : "Get server up and running"
                    }
                }, 
                {
                    "id" : "xkaEP",
                    "type" : "title",
                    "newVal" : "Send fiscal quarter",
                    "oldVal" : "Send fiscal quarter",
                    "createdAt" : 1639478568762.0,
                    "task" : {
                        "id" : "q601",
                        "title" : "Send fiscal quarter"
                    }
                }, 
                {
                    "id" : "LfWvq",
                    "type" : "title",
                    "newVal" : "Get server up and running",
                    "oldVal" : "Get server up and running",
                    "createdAt" : 1639478568787.0,
                    "task" : {
                        "id" : "rt602",
                        "title" : "Get server up and running"
                    }
                }, 
                {
                    "id" : "xA03j",
                    "type" : "title",
                    "newVal" : "Send fiscal quarter",
                    "oldVal" : "Send fiscal quarter",
                    "createdAt" : 1639478622937.0,
                    "task" : {
                        "id" : "q601",
                        "title" : "Send fiscal quarter"
                    }
                }, 
                {
                    "id" : "at1iq",
                    "type" : "title",
                    "newVal" : "Get server up and running",
                    "oldVal" : "Get server up and running",
                    "createdAt" : 1639478622964.0,
                    "task" : {
                        "id" : "rt602",
                        "title" : "Get server up and running"
                    }
                }
            ]
        }
    ],
    "cmpsOrder" : [ 
        "title-picker", 
        "status-picker", 
        "priority-picker", 
        "member-picker", 
        "timeline-picker"
    ]
})
}

module.exports = {
  query,
  remove,
  getById,
  update,
  add,
};
