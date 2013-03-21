/**
 * Created with JetBrains WebStorm.
 * User: Win8
 * Date: 3/21/13
 * Time: 8:36 PM
 * To change this template use File | Settings | File Templates.
 */
var Sequelize = require("sequelize");
var util = require('util');

var sequelize = new Sequelize('wp', 'root', 'RageRocks' , { host: "127.0.0.1" , port :3306} );

var WPException = sequelize.define('WPException' , {
    Exception_Id : { type : Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    Exception_message : Sequelize.TEXT,
    Is_Background : Sequelize.TEXT,
    Custom_message : Sequelize.TEXT ,
    Stacktrace : Sequelize.TEXT ,
    Time : Sequelize.DATE ,
    Os_version : Sequelize.STRING ,
    Modelname : Sequelize.STRING,
    Appversion : Sequelize.STRING,
    Phone_id : Sequelize.STRING ,
    Network_Present : Sequelize.BOOLEAN ,
    Network_Type : Sequelize.STRING ,
    Current_Memory : Sequelize.INTEGER,
    Peak_Memory : Sequelize.INTEGER,
    Remote_IP : Sequelize.STRING
});

var NewException = function (exception_message , stacktrace  , custom_message , os_version , modelname , appversion , phone_id , time_val , network_present , network_type , current_memory , peak_memory, is_background){
    var newEx = WPException.build( {Exception_message : exception_message,
        Stacktrace : stacktrace,
        Custom_message : custom_message,
        Os_version : os_version,
        Modelname : modelname,
        Is_Background : is_background,
        Appversion : appversion,
        Time : new Date(),
        Phone_id : phone_id,
        Network_Present : Boolean(network_present),
        Network_Type : network_type ,
        Current_Memory :current_memory,
        Peak_Memory : peak_memory });
    newEx.save().error(function(error){
        console.log("Failed with error" + util.inspect(error));
    });
}

var WPLog = sequelize.define( 'WPLog', {
    Log_Id : { type : Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    Log_message : Sequelize.TEXT,
    Is_Background : Sequelize.TEXT,
    Time : Sequelize.DATE,
    Os_version : Sequelize.STRING ,
    Modelname : Sequelize.STRING,
    Appversion : Sequelize.STRING,
    Phone_id : Sequelize.STRING,
    Network_Present : Sequelize.BOOLEAN,
    Network_Type : Sequelize.STRING,
    Current_Memory : Sequelize.INTEGER,
    Peak_Memory : Sequelize.INTEGER,
    Remote_IP : Sequelize.STRING
});

var NewLog = function (log_message , os_version , modelname , appversion , phone_id , time_val , network_present , network_type , current_memory , peak_memory, is_background) {
    var newLg = WPLog.build( {  Log_message : log_message,
        Os_version : os_version,
        Modelname : modelname,
        Is_Background : is_background,
        Appversion : appversion,
        Phone_id : phone_id,
        Time : new Date(),
        Network_Present : Boolean(network_present),
        Network_Type : network_type,
        Current_Memory : current_memory,
        Peak_Memory : peak_memory});
    newLg.save().error(function(error){
        console.log('Failed to save log'+ util.inspect(error));
    });
}

var WPMetric = sequelize.define('WPMetric', {
    Metric_id : { type : Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    Metric_Name : Sequelize.TEXT,
    Is_Background : Sequelize.TEXT,
    Time : Sequelize.DATE,
    Os_version : Sequelize.STRING ,
    Modelname : Sequelize.STRING,
    Appversion : Sequelize.STRING,
    Phone_id : Sequelize.STRING,
    Network_Present : Sequelize.BOOLEAN,
    Network_Type : Sequelize.STRING,
    Current_Memory : Sequelize.INTEGER,
    Peak_Memory : Sequelize.INTEGER,
    Remote_IP : Sequelize.STRING
});

var NewMetric = function (metric_name , os_version , modelname , appversion , phone_id , time_val , network_present , network_type , current_memory , peak_memory, is_background) {
    var newMt = WPMetric.build( {  Metric_Name : metric_name,
        Os_version : os_version,
        Modelname : modelname,
        Is_Background : is_background,
        Appversion : appversion,
        Phone_id : phone_id,
        Time : new Date(),
        Network_Present : Boolean(network_present),
        Network_Type : network_type,
        Current_Memory : current_memory,
        Peak_Memory : peak_memory});
    newMt.save().error(function(error){
        console.log('Failed to save log'+ util.inspect(error));
    });
}

var SSCException = sequelize.define('SSCException' , {
    Exception_Id : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    Exception_message : Sequelize.TEXT,
    Custom_message: Sequelize.TEXT,
    Time : Sequelize.DATE,
    Ssc_Node_Id : Sequelize.STRING,
    RSID : Sequelize.STRING,
    Packet : Sequelize.STRING,
    Stacktrace : Sequelize.STRING,
    Device_ID : Sequelize.STRING,
    Client_Version : Sequelize.STRING,
    Modelname : Sequelize.STRING,
    Last_Opened : Sequelize.DATE
});

var NewSSCException = function ( params ){
    var newSSCEX = SSCException.build( {
        Exception_message : params.exception_message,
        Custom_message : params.custom_message,
        Time : new Date(),
        Ssc_Node_Id : params.ssc_id,
        RSID : params.rsid,
        Packet : params.packet,
        Stacktrace : params.stacktrace,
        Device_ID : params.device_id,
        Client_Version : params.client_version,
        Modelname : params.modelname,
        Last_Opened : new Date(Date.parse(params.last_opened))
    });
    newSSCEX.save().error(function(error){
        console.log('Failed to save ssc ex' + util.inspect(eror));
    });
}

WPException.sync();
WPLog.sync();
WPMetric.sync();
SSCException.sync();

exports.AddException = NewException;
exports.AddLog = NewLog;
exports.AddMetric = NewMetric;
exports.AddSSCEx = NewSSCException;
