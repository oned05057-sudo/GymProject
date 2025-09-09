import { PrismaClient, Prisma  } from "@prisma/client";
import iconv from "iconv-lite";
import fs, { existsSync } from "fs";
import 'dotenv/config'


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

async function createUser1(req, res) {

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





//================================================= Alok - Created User for postman entry ========================================//

async function createUser(req, res) {

    const {  name,date, email, gender, guardianName,age, purpose, category, enrollmentId, DOB, whatsAppNumber, dietPreference, address,
        experienceLevel, height, weight, calf, medicalConditions, chest, biceps, thigh, waist, disciplineStatus, photoUrl, idCardUrl,involvedInSports
     } = req.body;

      //Validating all inputs
        if(!name || !email || !gender || !guardianName || !age || !category || !purpose || !category || !enrollmentId || !DOB 
            || !whatsAppNumber || !dietPreference || !address || !experienceLevel || !height || !medicalConditions || !waist || !weight 
            || !chest || !biceps || !thigh || !disciplineStatus || !photoUrl || !idCardUrl || !involvedInSports
        ){
            res.status(400).json({
                success: false,
                message: "All fields required"
            })
        }

    try {

        const existingUser = await prisma.user.findUnique({
            where:{
                enrollmentId
            }
        })

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already resgistered"
            })
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                date,
                gender,
                email,
                guardianName,
                age,
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
                calf, 
                waist,  
                disciplineStatus,
                photoUrl,
                idCardUrl,
                involvedInSports

            }
        })

        const newSplit = await prisma.userSplit.create({
            data: {
                userId: enrollmentId
            }
        })

        console.log(newUser, newSplit);
        return res.status(200).json({
            success:true,
            message: "User created successfully",
            data:newUser
        })

    }catch(error){
        console.error("Error creating user:", error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}



//===================================================== Get All users =================================//

async function getAllUsers(req,res){

  try{

    const users = await prisma.user.findMany({});

    console.log(users);

    return res.status(200).json({
      success: true,
      message:"Users fetched successfully",
      data: users
    })

  }catch(error){

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error while getting the users"
    })
  }
}

export {createUser, getAllUsers}
