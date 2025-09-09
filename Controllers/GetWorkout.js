import 'dotenv/config'

import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


//============================================== Get the Latest Routine ==============================//

async function getLatestRoutine(req,res){

    const { userId } = req.body;

    const routine = await prisma.routine.findFirst({
        where:{
          split:{
             userId: userId
          }   
        },

         orderBy:{
          id:"desc"
        }, 
        include: {
    day: {
      include: {
        workouts: {
          include: {
            exercise:{
                select:{
                    name: true,
                    bodyPart: true,
                }
            },
            sets: true
          }
        }
      }
    }
  }
    })

    console.log(routine);

    res.status(200).json({
        success: true,
        message:"Routine fetched successfully",
        data: routine
    })
}

//========================================== Get All routines ==========================================//


async function getAllRoutine(req,res){

    const { userId }= req.body;

    const routine = await prisma.routine.findMany({
        where:{
          split:{
             userId: userId
          }   
        },
        include: {
    day: {
      include: {
        workouts: {
          include: {
            exercise:{
                select:{
                    name: true,
                    bodyPart: true,
                }
            },
            sets: true
          }
        }
      }
    }
  }
    })

    console.log(routine);

    res.status(200).json({
        success: true,
        message:"Routine fetched successfully",
        data: routine
    })
}



export { getLatestRoutine, getAllRoutine };