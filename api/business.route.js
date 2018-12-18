const express = require('express');
const businessRoutes = express.Router();

let Business = require('./business.model');

businessRoutes.route('/add').post((req, res) => {
    let business = new Business(req.body);
    business.save()
        .then(business => {
            res.status(200).json({'business': 'business in added successfuly'});
        })
        .catch(err => {
            res.status(400).send("unable to save database");
        })
});

businessRoutes.route('/').get((req, res) => {
    Business.find((err, businesses) => {
        if(err){
            console.log(err)
        }else{
            res.json(businesses)
        }
    });
});

businessRoutes.route('/edit/:id').get((req,res) => {
    let id = req.params.id;
    Business.findById(id, (err, business) => {
        res.json(business);
    });
});

businessRoutes.route('/update/:id').post((req, res) => {
    Business.findById(req.params.id, (err, business) => {
        if(!business){
            res.status(400).send('Data is not found');
        }else{
            business.person_name = req.body.person_name;
            business.business_name = req.body.business_name;
            business.business_gst_number = req.body.business_gst_number;

            business.save().then(business => {
                res.json('Update Complete');
            })
            .catch(err => {
                res.status(400).send("Unable to update database");
            });
        }
    });
});

businessRoutes.route('/delete/:id').get(function (req, res) {
    Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = businessRoutes;