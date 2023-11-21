const { ObjectId } = require("mongodb");
const { getDb } = require("../utilities/connectToServer");

const testSomething = async (req, res, next) => {
    try {
        const db = getDb();
        const collection = db.collection("members");


        // inserting with one and many

        const insert_many_res = await collection.insertMany([
            { name: "farid", email: "farid@gmail.com" },
            { name: "Harid", email: "fariad@gmail.com" }
        ])

        const insert_one_res = await collection.insert({ name: "farid", email: "farid@gmail.com" },
            { name: "Harid", email: "fariad@gmail.com" })


        // finding operation


        const find_one_res = await collection.findOne({ name: "farid" })
        const find_many_res = await collection.find({ gender: "male" }).toArray()
        const find_many_res_key = await collection.find({ gender: "male" }, { gender: 1 }).toArray()
        const find_many_res_project = await collection.find({ gender: "male" }, { gender: 1 }).project({ name: 1, email: 1 }).toArray()


        // comparison operators

        const find_equal = await collection.find({ gender: { $eq: "male" } }).toArray()
        const find_n_equal = await collection.find({ gender: { $ne: "male" } }).toArray()
        const find_gt = await collection.find({ age: { $gt: 10 } }).toArray()
        const find_gte = await collection.find({ age: { $gte: 10 } }).sort({ age: 1 }).toArray()
        const find_lte = await collection.find({ age: { $lte: 10 } }).toArray()
        const find_le = await collection.find({ age: { $le: 10 } }).toArray()


        const find_in = await collection.find({ gender: "male", age: { $gt: 20, $lt: 10 } }, { age: 1 })

        const find_and = await collection.find({
            $and: [
                { $gender: { $eq: "male" } },
                { $domain: { $eq: "it" } },
                { $available: { $eq: false } },
            ]
        })
        const find_or = await collection.find({
            $or: [
                { $gender: { $eq: "male" } },
                { $domain: { $eq: "it" } },
                { $available: { $eq: false } },
            ]
        })

        const exist = await collection.find({ age: { $exists: true } })
        const type = await collection.find({ gender: { $type: "string" } })

        // find from an array
        const array_index = await collection.find({ "interests.2": "cooking" }).projection({ interests: 1 })

        const array_exact = await collection.find({ interests: ["writing", "cooking"] }).projection({ interests: 1 })

        const array_all = await collection.find({ interests: ["writing", "cooking", "anything"] }).projection({ interests: 1 })


        const object_all = await collection.find({
            skill: {
                $elemMatch: {
                    name: "js",
                    age: 30
                }
            }
        })


        const update_one = await collection.updateOne({
            _id: ObjectId("09090909090909090909")
        }, { $set: { age: 10 } })

        const update_array = await collection.updateOne({
            _id: ObjectId("09090909090909090909")
        }, { $addToSet: { interests: "writing" } })


        const update_array_multiple_each = await collection.updateOne({
            _id: ObjectId("09090909090909090909")
        }, { $addToSet: { interests: {$each: ["cooking, writing"]} } })

        const update_array_multiple_push = await collection.updateOne({
            _id: ObjectId("09090909090909090909")
        }, { $addToSet: { interests: {$push: ["cooking, writing"]} } })


        // unset, pull, pullAll

        const unset_one = await collection.updateOne({
            _id: ObjectId("09090909090909090909")
        }, { $unset: { age: 1 } })


        const pull_one = await collection.updateOne({
            _id: ObjectId("09090909090909090909")
        }, { $pull: { interests: "cooking" } })



        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("something wrong")
    }
}

module.exports = { testSomething }