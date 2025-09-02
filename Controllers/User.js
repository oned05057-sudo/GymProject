import { PrismaClient, Prisma  } from "@prisma/client";
import iconv from "iconv-lite";
import fs, { existsSync } from "fs";

const prisma = new PrismaClient();
import Papa from "papaparse";

//  ================================================== Create New User ==================================================//

const fieldMapping = {
  Timestamp: "date",
  "Name of the Applicant": "name",
  "Father's Name / Mother's Name": "guardianName",
  "Are you curently invloved in any physical activity or Sports":
    "involvedInSports",
  "As any disciplinary action taken or pending against you": "disciplineStatus",
  "Biceps (Inch)": "biceps",
  "Calf (Inch)": "calf",
  "Chest (Inch)": "chest",
  "Class: Student | Category: Staff": "category",
  "Date of Birth": "DOB",
  "Diet Preference": "dietPreference",
  "Do you have any Diseases or Medical Conditions": "medicalConditions",
  "Email ID": "email",
  "Enrolment No. / University ID No / PPO No": "enrollmentId",
  "Experience Level": "experienceLevel",
  "Height (Inch)": "height",
  "Purpose of Joining": "purpose",
  "Recent Photograph": "photoUrl",
  'Student: "Hall" | Staff: "Department" | Rest: "Address"': "address",
  "Thigh (Inch)": "thigh",
  "Upload - University ID Card / Bonafide Certificate / Continution Slip (2025-2026)":
    "idCardUrl",
  "Waist (Inch)": "waist",
  "Weight (Kgs)": "weight",
  "Whatsapp / Mobile Number": "whatsAppNumber",
};

// Function to transform data of frontend to fieldMapping
const transformData = (frontendData, fieldMapping) => {
  let transformedData = {};

  for (let key in frontendData) {
    if (fieldMapping[key]) {
      transformedData[fieldMapping[key]] = frontendData[key];
    }
  }

  return transformedData;
};

function parseCSV(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true, // ✅ Get JSON objects instead of arrays
      skipEmptyLines: true, // ✅ Ignore empty rows
      delimiter: ",", // ✅ Use comma, since your file is comma-separated
      complete: (result) => {
        console.log("File successfully converted");
        resolve(result);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

async function createUser(req, res) {

  try {
    const file = req.files.file;
    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    const csv = fs.readFileSync(req.files.file.tempFilePath, "utf8");
    let data;
    try {
      const parsedData = await parseCSV(csv);
      data = parsedData.data;
    } catch (err) {
      console.log("There is some error in converting data");
      console.log(err.message);
    }
    // console.log("data is",data)
    for (let i = 0; i < data.length; i++) {
      let frontendData = data[i];
      let {
        name,
        email,
        guardianName,
        date,
        purpose,
        category,
        enrollmentId,
        DOB,
        whatsAppNumber,
        dietPreference,
        address,
        experienceLevel,
        height,
        weight,
        medicalConditions,
        chest,
        biceps,
        thigh,
        waist,
        calf,
        disciplineStatus,
        photoUrl,
        idCardUrl,
        involvedInSports,
      } = transformData(frontendData, fieldMapping);
      if (i == 8) { //6 
        break;
      }
      try{
        const newUser = await prisma.user.create({
          data: {
            name,
            email,
            guardianName,
            date,
            purpose,
            category,
            enrollmentId,
            DOB,
            whatsAppNumber,
            dietPreference,
            address,
            experienceLevel,
            height,
            weight,
            medicalConditions,
            chest,
            biceps,
            thigh,
            waist,
            calf,
            disciplineStatus,
            photoUrl,
            idCardUrl,
            involvedInSports,
          },
        });
      }
      catch(error){
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
          console.log(`Skipping duplicate entry`);
          continue;
        }
        else{
          return res.status(402).json({
            success:false,
            message:error.message
          })
        }
      }
      console.log("User is Inserted");
    }
    res.status(200).json({
      success: true,
      message: "User created successfully",
      //   data: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// ==================================================== Delete User ===================================================//
async function deleteUser(req, res) {
  const { enrollmentId } = req.body;


    try{

        const user = await prisma.user.findUnique({
            where:{
                enrollmentId
            }
        })

        if(!user){
            res.status(200).json({
                success: false,
                message: "User does not exists"
            })
        }

        const deleteSet = await prisma.set.deleteMany({
            where: {
                userId: enrollmentId
            }
        })

        const deleteWorkout = await prisma.workout.deleteMany({
            where: {
                userId: enrollmentId
            }
        })

        const deleteSplit = await prisma.workoutSplit.delete({
            where: {
                userId: enrollmentId
            }
        })

        const deleteuser = await prisma.user.delete({
            where: {
                enrollmentId: enrollmentId
            }
        })

    console.log(deleteUser);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server error deleting user",
    });
  }
}

// ==================================================== Get All Users ===================================================//
async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany({});

        if(!users){
            res.status(400).json({
                success: true,
                message: "No users to display"
            })
        }

    res.status(200).json({
      success: true,
      message: "Users fecthed successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error while fecthing the users",
    });
  }
}


//===================================================== Get Single User ================================================//

async function getUser(req,res){

    const { userId } = req.body;

    if(!userId){
        res.status(500).json({
            success: false,
            message:"All fields are required"
        })
    }

    try{

        const user = await prisma.user.findUnique({
            where:{
                enrollmentId : userId
            }
        })

        if(!user){
            res.status(400).json({
                success: true,
                message: "No user exists with this User Id"
            })
        }

        console.log(user);

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        })


    }catch(error){
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch the user"
        })
    }
}


// ==================================================== Update User ===================================================//
async function updateMeasurements(req, res) {
  const {
    enrollmentId,
    height,
    weight,
    chest,
    biceps,
    thigh,
    waist,
    medicalConditions,
  } = req.body;

  try {
    const updateUser = await prisma.user.update({
      where: {
        enrollmentId: enrollmentId,
      },
      data: {
        height,
        weight,
        chest,
        biceps,
        thigh,
        waist,
        medicalConditions,
      },
    });

    console.log(updateUser);

    res.status(200).json({
      success: true,
      mesaage: "User measurements updated successfully",
      data: updateUser,
    });
  } catch (error) {
    console.error("Error updating user measurements:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error while updating the user measurements",
    });
  }
}

async function getAllWorkOut(req, res) {
  try {
    const { userId } = req.userId;
    const data = await prisma.workout.findMany({ userId: userId });
    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    console.log(err.message);
  }
}

async function getAllWorkOut2222(req, res) {
  try {
    const { userId } = req.userId;
    const data = await prisma.workout.findMany({ userId: userId });
    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    console.log(err.message);
  }
}

export {
  createUser,
  deleteUser,
  getAllUsers,
  updateMeasurements,
  getAllWorkOut,
  getUser,

};
