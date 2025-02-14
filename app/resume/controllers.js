const Resume  = require('./models/Resume')
const WorkingHistory = require('./models/WorkingHistory')
const Education  = require('./models/Education')
const ForeignLanguage = require('./models/ForeignLanguage')
const ResumeEmploymentType = require('./models/ResumeEmploymentType')
const EmploymentType = require('../employment-type/EmploymentType')
const foreignLanguage= require('./models/ForeignLanguage')
const { Op } = require('sequelize');
const City = require('../region/City')
const Country = require('../region/Country')
const createResume = async(req , res) =>{
    const  resume = await Resume.create({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        phone : req.body.phone,
        position : req.body.position,
        citizenship : req.body.citizenship,
        about : req.body.about,
        birthday : req.body.birthday,
        salary : req.body.salary,
        salary_type : req.body.salary_type,
        main_language : req.body.main_language,
        gender: req.body.gender,
        skills : req.body.skills,
        CityId : req.body.CityId,
        citizenship: req.body.citizhenship,
        UserId : req.user.id

        
    })
    console.log('dadadadadadadadada',req.body.working_histories);
    if (req.body.working_histories && req.body.working_histories.length > 0) {
        req.body.working_histories.forEach(async history => {
            await WorkingHistory.create({
                resumeId : resume.id, 
                company_name: history.company_name,
                company_description: history.company_description,
                start_date: history.start_date,
                end_date: history.end_date,
                responsibilities: history.responsibilities // Убедитесь, что это поле заполнено в вашем запросе
            }); 
        });
    }   
    if (req.body.education && req.body.education.length > 0) {
        req.body.education.forEach(async edu => {
            await Education.create({
                resumeId : resume.id, 
                level : edu.level,
                university_name: edu.university_name,
                faculty: edu.faculty,
                major: edu.major,
                end_date: edu.end_date,
            });
        });
    } 
    if (req.body.foreignLanguages && req.body.foreignLanguages.length > 0) {
        req.body.foreignLanguages.forEach(async ls => {
            await ForeignLanguage.create({
                resumeId : resume.id, 
                level : ls.level,
                name : ls.name
            });
        });
    } 
    if (req.body.employmentTypes && req.body.employmentTypes.length > 0) {
        req.body.employmentTypes.forEach(async employmentTypeId => {
            await ResumeEmploymentType.create({
                ResumeId : resume.id, 
                EmploymentTypeId : employmentTypeId
            });
        });
        res.status(200).send(resume)
    } 
    }
const getMyResumes =async (req , res)=>{

    const resumes = await Resume.findAll({where:{UserId : req.user.id}})
    res.status(200).send(resumes)
}   

const getResume =async (req , res)=>{
    const resume = await Resume.findByPk(req.params.id,{
        include:[
            {
                model:WorkingHistory, 
                as : 'workingHistory'
            },
            {
                model : Education,
                as : 'education'
            },
            {
                model : ForeignLanguage,
                as : 'foreignLanguages'
            },
            {
                model : EmploymentType,
                as : 'employmentTypes'
            },
            {
                model : City,
                as : 'city'
            },
            {
                model : Country,
                as : 'citizhenshipObj'
            }
        ]
    })

    res.status(200).send(resume)
}


const deleteResume = async (req , res)=>{
    const data = await Resume.destroy({
        where:{
            id : req.params.id
        }
    })
    console.log(data);
    res.status(200).end()
}
const editResume = async (req , res)=>{
    await Resume.update({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        phone : req.body.phone,
        position : req.body.position,
        citizenship : req.body.citizenship,
        about : req.body.about,
        birthday : req.body.birthday,
        salary : req.body.salary,
        salary_type : req.body.salary_type,
        main_language : req.body.main_language,
        gender: req.body.gender,
        skills : req.body.skills,
        CityId : req.body.CityId,
        citizhenship: req.body.citizhenship,
        UserId : req.user.id
    },
    {
        where:{
            id : req.body.id
        }
    })

    await WorkingHistory.destroy({
        where:{
            resumeId :  req.body.id
        }
    })
    await Education.destroy({
        where:{
            resumeId :  req.body.id
        }
    })
    console.log('wkjdsa.cnejkdnc.,˜',req.body.id);
    await ResumeEmploymentType.destroy({
        where:{
            ResumeId :  req.body.id
        }
    })
    await ForeignLanguage.destroy({
        where:{
            resumeId :  req.body.id
        }
    })

    let resume={
        id : req.body.id
    }
    if (req.body.workingHistories && req.body.workingHistories.length > 0) {
        req.body.workingHistories.forEach(async history => {
            await WorkingHistory.create({
                resumeId : resume.id, 
                company_name: history.company_name,
                company_description: history.company_description,
                start_date: history.start_date,
                end_date: history.end_date,
                responsibilities: history.responsibilities // Убедитесь, что это поле заполнено в вашем запросе
            });
        });
    }   
    if (req.body.education && req.body.education.length > 0) {
        req.body.education.forEach(async edu => {
            await Education.create({
                resumeId : resume.id, 
                level : edu.level,
                university_name: edu.university_name,
                faculty: edu.faculty,
                major: edu.major,
                end_date: edu.end_date,
            });
        });
    } 
    if (req.body.foreignLanguages && req.body.foreignLanguages.length > 0) {
        req.body.foreignLanguages.forEach(async ls => {
            await ForeignLanguage.create({
                resumeId : resume.id, 
                level : ls.level,
                name : ls.name
            });
        });
    } 
    if (req.body.employmentTypes && req.body.employmentTypes.length > 0) {
        req.body.employmentTypes.forEach(async employmentTypeId => {
            await ResumeEmploymentType.create({
                ResumeId : resume.id, 
                ExmploymentTypeId : employmentTypeId
            });
        });
    } 
    res.status(200).end()

}

const searchResume = async (req ,res)=>{
    const options = {}
    const {q  , cityId , salary_from, salary_to, 
        salary_type , citizenship   } = req.query
    if(q){
        options[Op.or] = [
            {first_name : {[Op.like]: `%${q}%`}}, 
            {last_name : {[Op.like]: `%${q}%`}}, 
            {position : {[Op.like]: `%${q}%`}}, 
            {skills : {[Op.like]: `%${q}%`}},
            {about: {[Op.like]: `%${q}%`}}
        ]
    } 
    if(citizenship){
        options.citizenship = citizenship
    }
    if(cityId){
        options.cityId = cityId
    }
    if (salary_from && !salary_to) {
        options.salary = { [Op.gte]: salary_from * 1 };
    } else if (!salary_from && salary_to) {
        options.salary = { [Op.lte]: salary_to * 1 };
    } else if (salary_from && salary_to) {
        options.salary = { [Op.between]: [salary_from * 1, salary_to * 1] };
    }

    if(salary_type){
        options.salary_type = salary_type
    } 
   

    const resumes = await Resume.findAll({
        where:options
    })
    res.status(200).send(resumes)
}


module.exports = {
    createResume,
    getMyResumes,
    getResume,
    deleteResume,
    editResume,
    searchResume
}