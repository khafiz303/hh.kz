const Apply = require('../applies/Apply')
const Resume = require('../resume/models/Resume')
const validateApply = (req , res, next) =>{
    let errors = {};
     
    if(!req.body.resumeId || req.body.resumeId.length === 0){
        errors.resumeId = 'Поле resume обязательное'
    }
    if(!req.body.vacancyId || req.body.vacancyId.length === 0){
        errors.vacancyId = 'Поле vacancy обязательное'
    }
     

    if(JSON.stringify(errors) !== JSON.stringify({}) )res.status(400).send(errors)
    else next()

}

const isAuthorOfApply =async (req , res, next)=>{
    const id = req.params.id 

    const apply = await Apply.findByPk(id)
    const applyResumeId = apply.resumeId 
    if(!apply) res.status(400).send({message : 'Apply with that is not exist'})
    else{
        const resumes = await Resume.findAll({  
            where:{
                UserId : req.user.id
            }
        })
        const ids = resumes.map(item => item.id)
        console.log(ids , applyResumeId , ids.includes(applyResumeId*1) );
        if(ids.includes(applyResumeId*1)){
            next()
        }else{
            res.status(403).send({message : 'Access Forbiden'})

        }
}
}


const isApplyExists = async (req, res, next) => {
    try {
        const apply = await Apply.findByPk(req.body.applyId);

        if (!apply) {
            console.log('Apply not found with id:', req.body.applyId);
            return res.status(404).send({ message: 'Apply with that ID does not exist' });
        }

    
        req.body.id =apply.vacancyId
        next();
    } catch (error) {
        console.error('Error fetching apply:', error);
        res.status(500).send({ message: 'Server Error' });
    }
};

module.exports = {
    isAuthorOfApply,
    validateApply,
    isApplyExists
}