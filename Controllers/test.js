import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


async function createTest(req,res){

    const { userId, exerciseId, maxWeight, maxReps} = req.body;

    try{

        if(!userId, !exerciseId, !maxWeight, !maxReps){
            
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const test = await prisma.test.create({
            data:{
                userId,
                exerciseId,
                maxReps,
                maxWeight
            }
        })

        console.log(test);

        return res.status(200).json({
            success: true,
            message: "Test created successfully",
            data: test
        })

    }catch(error){

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error while creating test"
        })
    }
}

async function retest(req,res){

    const { userId, exerciseId, maxWeight, maxReps} = req.body;

    try{

        const existingTest = await prisma.test.findUnique({
            where:{
                userId
            }
        })

        if(!existingTest){

            return res.status(400).json({
                success: false,
                message: "Users test is not created"
            })
        }

        const update = await prisma.test.update({
            where:{
                userId: userId
            },
            data:{
                userId,
                exerciseId,
                maxReps,
                maxWeight
            }
        })

        return res.status(200).json({
            success: true,
            message: "Retest added successfully",
            data: update
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

        const test = await prisma.test.findUnique({
            where:{
                userId: userId
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