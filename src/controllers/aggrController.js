const aggregation = async (req, res, next) => {
    try {

        const db = getDb();
        const collection = db.collection("members");
        const data = db.aggregate([
            { $match: { gender: "male", age: { $lt: 30 } } },
            // adding new field in present data
            { $addFields: { course: "level3" } },

            // adding new field in the document
            { $out: "" },
            { $project: { gender: 1 } },
            { $merge: "test" }


        ])

        const groupData = db.aggregate([
            // make group of something and count them
            { $group: { _id: "$age", count: { $sum: 1 }, giveMeAll: { $push: "$$ROOT" } } },
            { $project: { "giveMeAll.email": 1, "giveMeAll.name": 1 } }
        ])

        const groupData_count = db.aggregate([
            {
                $group: {
                    _id: null,
                    totalSalary: { $sum: "$salary" },
                    maxSalary: { $max: "$salary" }
                }
            }
        ]);


    } catch (error) {

    }
}