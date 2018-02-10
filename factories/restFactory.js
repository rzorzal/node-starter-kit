var express = require('express');
var middlewares = require("../middlewares")

var generateRoutes = function(model, modelName, sequelize, models){
    var router = express.Router();
    router.use(middlewares.authorization.allowCrossOrigin());
    router.get("/", async function(req, res){
        try{
            var query = {
                where: {}
            }

            for(var key in req.query){
                if(model.attributes.hasOwnProperty(key)){
                    var expression = req.query[key];
                    try{
                        expression = JSON.parse(req.query[key]);
                    } catch(err){

                    }
                    query.where[key] = expression;
                    continue;
                } else if( key == "or" || key == "and" ){
                    expression = JSON.parse(req.query[key]);
                    query.where[key] = expression;
                    continue;
                }
                query[key] = req.query[key];
            }

            var result = await model.findAndCountAll(query);
            res.json({success: true, result: result});
        } catch(err){
            res.json({success: false, result: result});
        }

    });

    router.get("/:ModelId(\\d+)", async function(req, res){
        var result = await model.findById(req.params.ModelId);

        if(!result){
            res.json({success: false, msg: "Model with id " + req.params.ModelId + " not found!"});
            return;
        }

        res.json({success: true, result: result});
    });

    router.get("/:ModelId(\\d+)/:ModelName", async function(req, res){
        var instance = await model.findById(req.params.ModelId);

        if(!instance){
            res.json({success: false, msg: "Model with id " + req.params.ModelId + " not found!"});
            return;
        }

        if(typeof instance["get" + req.params.ModelName] === "function"){
            var result = await instance["get" + req.params.ModelName]();
            res.json({success: true, result: result});
            return;
        }

        if(typeof instance["get" + req.params.ModelName + "s"]  === "function"){
            var result = await instance["get" + req.params.ModelName + "s"]();
            res.json({success: true, result: result});
            return;
        }

        res.json({success: false, msg: "The " + req.params.ModelName + " models is not associated with " + modelName});
    });

    //Creating new Model and Persisting it
    router.post("/", async function(req, res){
        var instance = await model.create(req.body);
        res.json({success: true, result: instance});
    });

    router.put("/:ModelId(\\d+)", async function(req, res){
        var instance = await model.findById(req.params.ModelId);

        if(!instance){
            res.json({success: false, msg: "Model with id " + req.params.ModelId + " not found!"});
            return;
        }

        instance = await instance.update(req.body);
        res.json({success: true, result: instance});
    });

    router.delete("/:ModelId(\\d+)", async function(req, res){
        var instance = await model.findById(req.params.ModelId);

        if(!instance){
            res.json({success: false, msg: "Model with id " + req.params.ModelId + " not found!"});
            return;
        }

        if(req.query.hasOwnProperty('force')){
            await instance.destroy({force: true});
        } else {
            await instance.destroy({force: false});
        }
        res.json({success: true, result: { id: req.params.ModelsId }});

    });

    return router;
}

module.exports = function RestFactory(dependencies){
    if(!dependencies.sequelize) throw new Error("The RestFactory needs a Sequelize instance!");
    if(!dependencies.app) throw new Error("The RestFactory needs a Express App instance !");

    var app = dependencies.app;

    var sequelize = dependencies.sequelize;

    var models = sequelize.models;

    return function RestService(secureCallback){
        if(secureCallback && typeof secureCallback === "function"){
            app.use("/rest", secureCallback);
        }

        for(var modelName in models){
            var model = models[modelName];
            var router = generateRoutes(model, modelName, sequelize, models);
            app.use("/rest/" + modelName, router);
        }
    }
}
