import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

// ==================================================== Update Workouts ===================================================//


async function createWorkout(req,res) {

    const {workoutId,name, bodyPart, userId } = req.body;

    if(!workoutId || !name || !bodyPart || !userId){

        res.status(500).json({
            success: false,
            message: "All fields are required"
        })
    }

    try{

        const existingWorkout = await prisma.workout.findUnique({
            where:{
                userId: userId,
                name: name
            }
        })

        if(existingWorkout){
            res.status(403).json({
                success: false,
                message: `Workout ${name} already exists`
            })
        }

        const createWorkout = await prisma.workout.create({
            data:{
                workoutId,
                name,
                bodyPart,
                split: {connect : {
                    userId: userId
                }}
            }
        })
        console.log(createWorkout);

        res.status(200).json({
            success: true,
            message: "Workout updated successfully",
            data : createWorkout
        })

    }catch(error){

        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server error in updating workout"
        })
    }
}


// ==================================================== Get workouts ===================================================//

async function getWorkouts(req,res) {

    const { userId } = req.body;

    try{

        const workouts = await prisma.workout.findMany({
            where: {
                userId: userId
            }
        })

        console.log(workouts);

        res.status(200).json({
            success: true,
            message: "Workouts fetched successfully",
            data: workouts
        })

    }catch(error){

        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server error in fetching workouts"
        })

    }
}



// ==================================================== Create sets ===================================================//

async function createSet(req,res) {

    console.log(req.body);

    const {  setNumber,weight,repetitions,workoutId, userId } =req.body;

    try{

        const createSet = await prisma.set.create({
            data:{
                repetitions,
                weight,
                setNumber,
                workout : {connect: { workoutId_userId: {workoutId, userId}}},
                user : {connect : {userId: userId}}

            }
        })

        console.log(createSet);

        res.status(200).json({
            success: true,
            message: "Set created successfully",
            data: createSet
        })

    }catch(error){

        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server error in creating set"
        })

    }
 }


 //=================================================== Get all sets ===================================================//

 async function getSets(req,res){
    const { workoutId, userId } = req.body;;

    try{
        const sets = await prisma.set.findMany({
            where: {
                workoutId: workoutId,
                userId: userId
            }
        })

        console.log(sets);

        res.status(200).json({
            success: true,
            message: "Sets fetched successfully",
            data: sets
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server error int fetching sets",
        })
    }
 }


export { createWorkout, createSet, getWorkouts,getSets };