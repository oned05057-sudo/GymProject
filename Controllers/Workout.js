import { PrismaClient } from "@prisma/client"
import 'dotenv/config'


const prisma = new PrismaClient();

//============================================ Create Exercises ========================================================//

async function createExercise(req,res){

    const {name, muscleGroup,equipment,description} = req.body;
    
    if(!name || !muscleGroup || !equipment){

        return res.status(403).json({
            success: false,
            message:"All fields are required"
        })
    }


    const existingExercise = await prisma.exercise.findFirst({
        where:{
            name,
            muscleGroup
        }
    })

    if(existingExercise){

        return res.status(403).json({
            success: true,
            message:"Exercise already exists"
        })
    }

    try{

        const exrcise = await prisma.exercise.create({
            data:{
                name,
                muscleGroup,
                equipment,
                description
            }
        })

        console.log(exrcise);

        return res.status(200).json({
            success: true,
            message: "Exercise created successfully",
            data: exrcise
        })

    }catch(error){
        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


//================================================= Create User Split ======================================//

async function createUserSplit(req,res){

    const {name , userId} = req.body;

    if(!name, !userId){

        return res.status(403).json({
            success: false,
            message:"All fields are required"
        })
    }

    try{

        const existingSplit = await prisma.userSplit.findMany({
            where:{
                userId:userId
            } 
        });

        if(existingSplit){

            res.status(403).json({
                success: false,
                message: "User split already exists"
            })
        }

        const userSplit = await prisma.userSplit.create({
            data:{
                name,
                userId,
            }
        })

        console.log(userSplit);

        return res.status(200).json({
            success: true,
            message: "User split created successfully",
            data: userSplit
        })

    }catch(error){

        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Internal server error while creating split"
        })
    }

}


//========================================= Create Routine ==================================================//

async function createRoutine(req,res){

        const { Member, Name, WeekRoutine} = req.body;

        console.log(req.body);

        if(!Member || !Name || !WeekRoutine){

            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }

        try{

            const routine = await prisma.routine.create({
                data: {
                    name: Name,
                    userId: Member,
                    routine:{
                        create:{
                            name:Name,
                            day:{
                                create:WeekRoutine.map((day) => ({
                                    name: day.day,
                                    workouts:{
                                        create: day.workouts.map((workout) => ({
                                            exercise: {
                                                connectOrCreate:{
                                                    where: {name: workout.Exercise},
                                                    create: {name: workout.Exercise, muscleGroup: 'Unknown', equipment:'Unkown', description:'No description'}
                                                },
                                            },
                                            sets:{
                                                create: workout.sets.map((set) => ({
                                                setNo: parseInt(set.setNo),
                                                weight: parseFloat(set.weight),
                                                repetitions: parseInt(set.reps),
                                                }))
                                            },  
                                        }))
                                    },
                                })),
                            },
                        },
                    },
                },
                include:{
                    split:{
                        include:{
                            day:{
                                include:{
                                    workouts:{
                                        include:{
                                            exercises:true,
                                            sets: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });

            return res.status(200).json({
                success: true,
                message: "Routine created successfully",
                data: routine
            });

        }catch(error){

            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Intenal server error while creating Week Routine"
            })
        }
    }


//========================================= Create the Workout ============================================//

async function createWorkout(req,res){

    const {dayId, exerciseId, sets } = req.body;

    if(!dayId, !exerciseId, !sets){

        return res.status(403).json({
            success: false,
            message: "All fields are required"
        })
    }

    try{
        console.log(sets)
        const workout = await prisma.workout.create({

            data:{
                day: {connect: {id: dayId}},
                exercise : {connect : {id: exerciseId}},
                sets: {
                    create: sets
                }
            }
        })

        console.log(workout);

        return res.status(200).json({
            success: true,
            message: "Workout created successfully"
        })

    }catch(error){

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error while creating workout"
        })
    }
}

async function getAllExercise(req,res){
    try{
        // console.log("I am in Exercise");
        const response=await prisma.exercise.findMany({});
        // console.log("After getting exercies")
        return res.status(200).json({
            success:true,
            data:response,
            message:"These are the exercises"
        })
    }
    catch (err){
        console.log("Error is",err)
        return res.status(500).json({
            success:false,
            message:"Some error in get all exercise"
        })
    }
}


export {createExercise, createUserSplit, createRoutine, createWorkout,getAllExercise}