const Resume = require('./models/Resume')
const validateResume = (req , res, next) =>{
    let errors = {};
     
    if(!req.body.first_name || req.body.first_name.length === 0){
        errors.first_name = 'Поле имя обязательное'
    }
    if(!req.body.last_name || req.body.last_name.length === 0){
        errors.last_name = 'Поле фамилия обязательное'
    }
    
    if(!req.body.phone || req.body.phone.length === 0){
        errors.phone = 'Поле телефон обязательное'
    }
    
    if(!req.body.position || req.body.position.length === 0){
        errors.position = 'Поле желаемая должность обязательное'
    }
    if(!req.body.about || req.body.about.length === 0){
        errors.about = 'Поле о себе обязательное'
    }

    if(JSON.stringify(errors) !== JSON.stringify({}) )res.status(400).send(errors)
    else next()

}
const isAuthorOfResume =async (req , res, next)=>{
    console.log(req.body);
    const id = req.params.id || req.body.id
    const resume = await Resume.findByPk(id)
    if(!resume) res.status(400).send({message : 'Resume with that is not exist'})
    else if(resume.UserId === req.user.id) next()
    else res.status(403).send({message : 'Access Forbiden'})
}

module.exports = {
    validateResume,
    isAuthorOfResume
}   