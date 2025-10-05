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

    return res.status(200).json({
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

    return res.status(200).json({
        success: true,
        message:"Routine fetched successfully",
        data: routine
    })
}

//TODO
//Write a function in which this gives all the users active routine means all the users latest active routines


//================================================================ Users without routine ==========================================//

async function isRoutine(req,res){

  try{

    const usersWithoutRoutine = await prisma.userSplit.findMany({
      where:{
        routine:{
          none:{}
        }
      }
    })

    if(usersWithoutRoutine.length === 0){

      return res.status(200).json({
        success: true,
        message: "Routines of all the users are created"
      })
    }

    console.log(usersWithoutRoutine);

    return res.status(200).json({
      success:true,
      message:"Users fetched successfully",
      data: usersWithoutRoutine
    })

  }catch(error){

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching the users"
    })
  }
}



export { getLatestRoutine, getAllRoutine, isRoutine };