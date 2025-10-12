import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


async function createTest(req,res){

    const { userId, testEntries } = req.body;

    try {
    if (!userId || !Array.isArray(testEntries) || testEntries.length === 0) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    // Upsert each test entry to avoid unique constraint errors
    for (const test of testEntries) {
        await prisma.test.upsert({
            where: {
                userId_exerciseId: {
                    userId,
                    exerciseId: test.exerciseId,
                },
            },
            update: {
                maxWeight: test.maxWeight,
                maxReps: test.maxReps,
            },
            create: {
                userId,
                exerciseId: test.exerciseId,
                maxWeight: test.maxWeight,
                maxReps: test.maxReps,
            },
        });
    }

    // Update the user's testDone flag to true
    await prisma.user.update({
        where: {
            enrollmentId: userId,  // confirm this is the correct unique identifier
        },
        data: {
            testDone: true,
        },
    });

    return res.status(200).json({
        success: true,
        message: "Test created successfully",
    });

} catch (error) {
    console.error(error);
    return res.status(500).json({
        success: false,
        message: "Internal server error while creating test"
    });
}

}

async function retest(req,res){

    const { userId,testEntries } = req.body;

    try{

        if(!userId || !Array.isArray(testEntries) || testEntries.length === 0){

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        await prisma.test.deleteMany({
            where:{
                userId: userId
            }
        })

        const result = await prisma.test.createMany({
            data: testEntries.map((test) => ({
                userId,
                ...test
            }))
            
        })


        return res.status(200).json({
            success: true,
            message: "Retest added successfully",
            data: result
        })

    }catch(error){

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error during retest"
        })
    }

}

async function showTest(req,res){

    const { userId } = req.body;

    try{

        const test = await prisma.test.findMany({
            where:{
                userId: userId
            },
            include:{
                exercise:{
                    select:{
                        name: true
                    }
                }
            }
        })

        if(!test){

            return res.status(400).json({
                success: false,
                message: "No test found for the user"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Test found",
            data: test
        })

    }catch(error){
        
        console.log(error);

        return res.status(200).json({
            success:false,
            message: "Internal server error while fetching the test"
        })
    }
}


export {showTest, createTest, retest}