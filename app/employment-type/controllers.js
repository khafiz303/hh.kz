const EmploymentType =require('./EmploymentType')
const getEmploymentTypes =async(req , res)=>{
    const employmentTypes = await EmploymentType.findAll()
    console.log(employmentTypes);
    res.status(200).send(employmentTypes)
}   


module.exports={
    getEmploymentTypes
}