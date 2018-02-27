module.exports = {
    "extends": "airbnb-base",
    "rules" :{
    	"new-cap" : 0,
    	"no-useless-concat" : 0,
    	"no-restricted-syntax" : 0,
    	"no-sequences" : 0,
    	"no-param-reassign": ["error", { "props": true, 
        "ignorePropertyModificationsFor": ["temp"] }]
    }
};