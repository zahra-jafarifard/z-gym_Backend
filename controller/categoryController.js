const httpError = require('../shared/httpError');
const Category = require('../model/category');

exports.postCreate = (req , res , next) =>{
    const {categoryName} = req.body;
    if (!categoryName){
        throw(new httpError('categoryName Field Is Empty...' , 422));
    }
    return Category.findOne({where : {
        category_name : categoryName
    }})
    .then(catName => {
        if(catName){
            throw(new httpError('categoryName is already exist... ' , 500))
        }
        return Category.create({
            category_name : categoryName
        })
    })
    .then(createdCategory => {
        // console.log(createdCategory)
        return res.status(201).json({message : `new category ${createdCategory.dataValues.category_name} created...`})
    })
    .catch(e =>{
        next(new httpError('Fail in Fetching categoryName ... ' , 500))
    })
};

exports.postDelete = (req , res , next) =>{
    const {categoryId} = req.body;
    Category.destroy({where :{
        id:categoryId
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

    Category.findOne({where : {
        id:id
    }})
    .then(cat => {
        if (!cat){
            return next(new HttpError('there is not this category...' , 404));
        }
        cat.category_name = name;
        return cat.save();
    })
    .then(() => {
        res.status(200).json({message:'category name updated successfully...'})
    })
    .catch(() => {
        next (new httpError('Faild in fetching for updating' , 500));
    })

};

exports.postList = (req , res , next) =>{

    Category.findAll({
        // attributes:['category_name']
    })
    .then(categories =>{
        // console.log('caaaa' ,categories)
        res.status(200).json({categories:categories})
    })
    .catch(()=>{
        next(new httpError('Could\'nd Fetch All categoryes...' , 500))
    })
};

exports.postSearch = (req ,res , next) => {
    let {name} = req.body;
    if(!name){
        Category.findAll()
        .then(cat =>{
            res.status(200).json({categories:cat})
        })
        .catch(e => next(new httpError(e , 500)))
    }
    Category.findAll({
        attributes:['category_name'],
        where : {
            category_name:name,
          }})
    .then(cats => {
        // console.log('cats' , cats);
        res.status(200).json({categories:cats});
    })
    .catch(e => {
        next(new httpError(e , 500))
    })
}