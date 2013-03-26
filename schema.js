/**
 * Created with JetBrains WebStorm.
 * User: Win8
 * Date: 3/21/13
 * Time: 8:36 PM
 * To change this template use File | Settings | File Templates.
 */
var Sequelize = require("sequelize");
var util = require('util');

var sequelize = new Sequelize('WP', 'talkto', 'sscwindowsphone' , { host: "sscwpdb.cyy5hdjwfoo4.us-east-1.rds.amazonaws.com" , port :3306} );

var PushLog = sequelize.define( 'PushLog', {
    Log_Id : { type : Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    Time : Sequelize.DATE,
    Phone_id : Sequelize.STRING,
    Rsid:Sequelize.STRING,
    MetaHandle:Sequelize.STRING,
    EventName:Sequelize.STRING,
    PayLoad:Sequelize.STRING,
    CurrentPushUri:Sequelize.STRING,
    OldPushUri:Sequelize.STRING,
    StatusCode:Sequelize.INTEGER,
    NotificationState:Sequelize.STRING,
    SubscriptionState:Sequelize.STRING,
    DeviceConnectionStatus:Sequelize.STRING,
    Log_Message:Sequelize.TEXT

});
           //Time,Phone_Id,Rsid,MetaHandle,StatusCode,NotificationState,SubscriptionState,DeviceConnectionStatus,PayLoad
var NewLog = function (time,phone_Id,rsid,metaHandle,eventName,currentPushUri,oldPushUri,statusCode,notificationState,subscriptionState,deviceConnectionStatus,message,payLoad) {
    var newLg = PushLog.build( {

        Time : time,
        Phone_id : phone_Id,
        Rsid:rsid,
        MetaHandle:metaHandle,
        EventName:eventName,
        PayLoad:payLoad,
        CurrentPushUri:currentPushUri,
        OldPushUri:oldPushUri,
        StatusCode:statusCode,
        NotificationState:notificationState,
        SubscriptionState:subscriptionState,
        DeviceConnectionStatus:deviceConnectionStatus,
        Message:message

       });
    newLg.save().error(function(error){
        console.log('Failed to save log'+ util.inspect(error));
    });
}

PushLog.sync();

exports.AddLog = NewLog;
