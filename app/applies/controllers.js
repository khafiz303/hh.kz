const Apply = require('./Apply')
const {NEW , INVITATION , DECLINED} = require('./utils')
const sendMail = require('../utils/sendMail')
const Vacancy = require('../vacancy/models/Vacancy')
const Resume = require('../resume/models/Resume')
const User = require('../auth/User')
const {Op, where} = require('sequelize')
const Company = require('../auth/Company')
const createApply = async(req , res)=>{
        try{
            const apply = await Apply.create({
                resumeId : req.body.resumeId,
                vacancyId : req.body.vacancyId,
                status : NEW
            }) 
            const  vacancy = await Vacancy.findByPk(req.body.vacancyId)
            const resume = await  Resume.findByPk(req.body.resumeId)
            const user = await User.findByPk(resume.UserId)
            console.log(user);
            sendMail(user.email , `Новый отклик на вакансию ${vacancy.name}` , `
            Имя соискателя: ${resume.first_name}
            Фамлия соискателя: ${resume.last_name}
            Номер соискателя: ${resume.phone}
                `)
    
     
            res.status(200).send(apply)
        }catch(error){
            console.error('Error fetching apply:', error);
            res.status(500).send({ message: 'Server Error' });
        }
       
    
    }

const getEmloyeeApplies = async(req , res)=>{
    try{
        const resumes  = await Resume.findAll({
            where:{
                UserId : req.user.id
            }
        })

        const ids = resumes.map(item => item.id)

        const applies =  await Apply.findAll({
            where:{
                resumeId : {[Op.in]: ids} 

            },
            include:{
                model : Vacancy,
                as : 'vacancy'
            }
        })
        res.status(200).send(applies)
    }catch(error){
        console.error('Error fetching apply:', error);
        res.status(500).send({ message: 'Server Error' });
    }
}    

const deleteApply = async (req , res)=>{
    try{
        await Apply.destroy({
            where:{
                id : req.params.id
            }
        })
        res.status(200).end()
    }catch(error){
    
        res.status(500).send(error);
    }
}

const acceptEmployee = async(req , res)=>{
    await Apply.update(
        {
        status : INVITATION
    },
    {
        where:{
            id : req.body.applyId
        }
    })
    const apply = await Apply.findByPk(req.body.applyId)
    const vacancy = await Vacancy.findByPk(apply.vacancyId) 
    const resume = await Resume.findByPk(apply.resumeId)
    const user = await User.findByPk(resume.UserId)
    const company = await Company.findByPk(req.user.CompanyId)

    sendMail(user.email , `Вы были приглашены на вакансию  ${vacancy.name}`,`
    прихдите по адресу ${company.address} , или свяжитесь с Менеджером ${req.user.full_name} ,
     ${req.user.phone} , ${req.user.email}  `)


    res.status(200).end()
}

const declineEmployee = async(req , res)=>{
    await Apply.update(
        {
        status : DECLINED
    },
    {
        where:{
            id : req.body.applyId
        }
    })
    const apply = await Apply.findByPk(req.body.id)
    const vacancy = await Vacancy.findByPk(apply.vacancyId)
    const resume = await Resume.findByPk(apply.resumeId)
    const user = await User.findByPk(resume.UserId)
    const company = await Company.findByPk(req.user.CompanyId)
    sendMail(user.email , `Отказ на вакансию  ${vacancy.name}`,`
        Компания: ${company.name} ,вы не подходите на вакансию ${vacancy.name}`) 

    res.status(200).end()
}

const getVacancyApplies = async (req , res)=>{
    const options = {
        vacancyId : req.params.id
    }
    if(req.query.status && (req.query.status === NEW || req.query.status === INVITATION || req.query.status === DECLINED)){
        options.status = req.query.status
    }
    const applies = await Apply.findAll({
        where : options,
        include : {
            model : Resume,
            as : 'resume'
        }
    })
    res.status(200).send(applies)
}

module.exports ={
    createApply,
    getEmloyeeApplies,
    deleteApply,
    acceptEmployee,
    declineEmployee,
    getVacancyApplies

}