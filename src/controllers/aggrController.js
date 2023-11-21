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

        const gData_unwind = db.aggregate([

            {

                $unwind: "$friends",
                $group: {
                    _id: "$friends",

                }
            }
        ])


        const gData_bucket = db.aggregate([
            {
                $bucket: {
                    groupBy: "$age",
                    boundaries: ["20", "40"],
                    default: "over 40",
                    output: {
                        count: { $sum: 1 },
                    }
                },
                $sort: {
                    count: -1
                }
            }
        ])


        // facet is used to get multiple pipeline

        const gData_facet = db.aggregate([
            {
                $facet: {
                    "friendsCount": [

                        {

                            $unwind: "$friends",
                            $group: {
                                _id: "$friends",
                                count: {$sum: 1}

                            }
                        }
                    ]
                }
            }
        ])

        const data_look_up = db.aggregate([
            {
                $lookup: {
                    from: "test",
                    localField: "userId",
                    foreignField: "_id",
                    as: "myDataName"
                }
            }
        ])


    } catch (error) {

    }
}