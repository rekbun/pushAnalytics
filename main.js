/**
 * Created with JetBrains WebStorm.
 * User: Win8
 * Date: 3/21/13
 * Time: 8:36 PM
 * To change this template use File | Settings | File Templates.
 */
var express = require('express');
var querystring = require('querystring');
var app = express();
var http = require('http');
var util = require('util');
var Sequelize = require("sequelize")
var schema = require("./schema.js")




var listOfLogs= [];
var SaveToDB= function()
              {
                  while(listOfLogs.length>0)
                  {
                      entry=listOfLogs.pop();
                      schema.AddLog(entry.Time, entry.Phone_Id,entry.Rsid,entry.MetaHandle,entry.EventName,entry.CurrentPushUri,entry.OldPushUri,entry.StatusCode,entry.NotificationState,entry.SubscriptionState,entry.DeviceConnectionStatus,entry.PayLoad,entry.Message);
                  }
              }

var cnt=0;
var BulkSaveCount=50;

setInterval(SaveToDB,9000);

var AddOrSaveToDB= function(phone_Id,rsid,metaHandle,eventName,currentPushUri,oldPushUri,statusCode,notificationState,subscriptionState,deviceConnectionStatus,payLoad,message)
                    {
                         var newEntry={
                             Time : new Date(),
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
                         }

                        listOfLogs.push(newEntry);

                        cnt++


                        if(cnt==BulkSaveCount)
                        {
                          while(listOfLogs.length>0)
                          {
                              entry=listOfLogs.pop();
                              schema.AddLog(entry.Time,entry.Phone_id,entry.Rsid,entry.MetaHandle,entry.EventName,entry.CurrentPushUri,entry.OldPushUri,entry.StatusCode,entry.NotificationState,entry.SubscriptionState,entry.DeviceConnectionStatus,entry.PayLoad,entry.Message);
                          }
                            //    chainer.run().success(function() {});
                        }

                    }


var  PushToTileResponse= function(phone_Id,rsid,metaHandle,eventName,statusCode,notificationState,subscriptionState,deviceConnectionStatus,pushUri)
                           {
                                AddOrSaveToDB(phone_Id,rsid,metaHandle,eventName,pushUri,null,statusCode,notificationState,subscriptionState,deviceConnectionStatus,payLoad,null);
                           }






var PushRegistration=function(phone_Id,rsid,metaHandle,eventName,deviceStatus,pushUri)
                     {
                        AddOrSaveToDB(phone_Id,rsid,metaHandle,eventName,pushUri,null,null,null,null,deviceStatus,payLoad,null);
                     }


var CallbackRegstrationResponse=function(phone_Id,rsid,metaHandle,eventName,statusCode,deviceConnectionStatus,subscriptionStatus)
                                 {
                                     AddOrSaveToDB(phone_Id,rsid,metaHandle,eventName,null,null,statusCode,null,subscriptionStatus,deviceConnectionStatus,null,null);
                                 }



var SendPushToUri= function(phone_Id,rsid,metaHandle,eventName,pushUri,payLoad)
                   {
                           AddOrSaveToDB(phone_Id,rsid,metaHandle,eventName,pushUri,null,null,null,null,null,payLoad,null);
                   }



var AppForeground = function(phone_Id,rsid,metaHandle,eventName,message){

                        AddOrSaveToDB(phone_Id,rsid,metaHandle,eventName,null,null,null,null,null,null,null,message);

                    }


var AppBackground = function(phone_Id,rsid,metaHandle,eventName,message){

                        AddOrSaveToDB(phone_Id,rsid,metaHandle,eventName,null,null,null,null,null,null,null,message);

                    }




exports.PushRegistration = PushRegistration;
exports.PushToTileResponse= PushToTileResponse;
exports.CallbackRegistrationResponse=CallbackRegstrationResponse;
exports.SendPushToUri=SendPushToUri;
exports.AppForeground =AppForeground;
exports.AppBackground =AppBackground;


