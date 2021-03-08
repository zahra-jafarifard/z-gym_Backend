const httpError = require('../shared/httpError');
const Muscle = require('../model/muscle');

exports.postCreate = (req , res , next) =>{
    const {muscleName} = req.body;
    if (!muscleName){
        throw(new httpError('muscleName Field Is Empty...' , 422));
    }
    return Muscle.findOne({where : {
        muscle_name : muscleName
    }})
    .then(mslName => {
        if(mslName){
            throw(new httpError('muscleName is already exist... ' , 500))
        }
        return Muscle.create({
            muscle_name : muscleName,
            flag:1
        })
    })
    .then(createdMuscle => {
        return res.status(201).json({message : `new muscle ${createdMuscle.dataValues.muscle_name} created...`})
    })
    .catch(() =>{
        next(new httpError('Fail in Fetching muscleName ... ' , 500))
    })
};

exports.postDelete = (req , res , next) =>{
    const {muscleId} = req.body;
    Muscle.destroy({where :{
        id:muscleId
    }})
    .then(()=>{
        res.status(200).json({message:'Deleting is done...'})
    })
    .catch(()=>{
        next(new httpError('Deleting Failed' , 500))
    })
};

exports.postUpdate = (req , res , next) =>{
    const id = +req.body.id + 1;
    const name = req.body.name;

    Muscle.findOne({where : {
        id:id
    }})
    .then(muscle => {
        if (!muscle){
            return next(new HttpError('there is not this muscle...' , 404));
        }
        muscle.muscle_name = name;
        return muscle.save();
    })
    .then(() => {
        res.status(200).json({message:'muscle name updated successfully...'})
    })
    .catch(() => {
        next (new httpError('Faild in fetching for updating' , 500));
    })

};

exports.postList = (req , res , next) =>{

    Muscle.findAll({
        attributes:['muscle_name']
    })
    .then(muscles =>{
        res.status(200).json({muscles:muscles})
    })
    .catch(()=>{
        next(new httpError('Could\'nd Fetch All muscles...' , 500))
    })
};

exports.postSearch = (req ,res , next) => {
    let {muscleName} = req.body;
    if(!muscleName){
        Muscle.findAll()
        .then(msl=>{
            res.status(200).json({muscle:msl})
        })
        .catch(e => next(new httpError(e , 500)))
    }
    Muscle.findAll({
        attributes:['muscle_name'],
        where : {
            muscle_name:muscleName,
          }})
    .then(msle => {
        // console.log('msle' , msle);
        res.status(200).json({muscle:msle});
    })
    .catch(e => {
        next(new httpError(e , 500))
    })
}