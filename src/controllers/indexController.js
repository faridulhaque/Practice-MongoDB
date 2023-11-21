const { getDb } = require("../utilities/connectToServer")

const indexing = async (req, res, next) => {
    try {

        const db  = getDb()
        const collection = db.collection("members")

        const myIndex = collection.createIndex({email: 1})
        
    } catch (error) {
        
    }
}