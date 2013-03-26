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


var chainer = new Sequelize.Utils.QueryChainer;



var SaveToDB= function(){

                            chainer.runSerially().success(function() {

                        })

                       }

var cnt=0;
var BulkSaveCount=50;

setInterval(SaveToDB,9000);

var AddOrSaveToDB= function(time,phone_Id,rsid,metaHandle,eventName,currentPushUri,oldPushUri,statusCode,notificationState,subscriptionState,deviceConnectionStatus,payLoad,headers,body,message)
                    {

                        chainer.add(schema.AddLog(time,phone_Id,rsid,metaHandle,eventName,currentPushUri,oldPushUri,statusCode,notificationState,subscriptionState,deviceConnectionStatus,payLoad,headers,body,message));

                        cnt++


                        if(cnt==BulkSaveCount)
                        {

                            chainer.runSerially().on('success', function() {});
                        }

                    }


/*
 Tile Push Response Success : status code 200 Notification State : Received Subscription State : Active Device Connection Status : Connected for request { TileCount: 0,
 pushtype: 1,
 devicetoken: 'talk.tov1JPMl0yCMrv7I7CjHxvh++gtps=Windows',
 clientVersion: '0.0.4.7',
 TileBackgroundImage: 'assets/tiles/medium/front/BackgroundImage_0.png',
 TileSmallBackgroundImage: 'assets/tiles/small/SmallBackgroundImage_0.png',
 TileWideBackgroundImage: 'assets/tiles/large/front/WideBackgroundImage_0.png',
 TileTitle: 'Talk.to',
 TileTemplate: 1,
 devicetype: 'windows' } sent to URI https://db3.notify.live.net/unthrottledthirdparty/01.00/AAG5OsqiRLMCQ72PItGD98zIAgAAAAADEAAAAAQUZm52OkJCMjg1QTg1QkZDMkUxREQ
 */

var  PushToTileResponse= function(time,phone_Id,rsid,metaHandle,eventName,statusCode,notificationState,subscriptionState,deviceConnectionStatus,payLoad)
                           {
                                AddOrSaveToDB(time,phone_Id,rsid,metaHandle,eventName,null,null,statusCode,notificationState,subscriptionState,deviceConnectionStatus,payLoad,null,null,null);
                           }






var PushRegistration=function(time,phone_Id,rsid,metaHandle,evenetName,deviceStatus,pushUri)
                     {
                        AddOrSaveToDB(time,phone_Id,rsid,metaHandle,eventName,pushUri,null,null,null,null,deviceStatus,payLoad,null,null,null);
                     }


var CallbackRegsitrationresponse=function()
                                 {

                                 }


     /*Inside SendPush to pushURI https://db3.notify.live.net/unthrottledthirdparty/01.00/AAG5OsqiRLMCQ72PItGD98zIAgAAAAADEAAAAAQUZm52OkJCMjg1QTg1QkZDMkUxREQ
    [2013-03-25 15:16:22.994] [DEBUG] [MOBILE PUSH] - { pushId: 2,
    payload:
    { TileCount: 0,
        pushtype: 1,
        devicetoken: 'talk.tov1JPMl0yCMrv7I7CjHxvh++gtps=Windows',
        clientVersion: '0.0.4.7',
        TileBackgroundImage: 'assets/tiles/medium/front/BackgroundImage_0.png',
        TileSmallBackgroundImage: 'assets/tiles/small/SmallBackgroundImage_0.png',
        TileWideBackgroundImage: 'assets/tiles/large/front/WideBackgroundImage_0.png',
        TileTitle: 'Talk.to',
        TileTemplate: 1,
        devicetype: 'windows',
        TileId: '/InermediatePage.xaml' },

       */

var SendPushToUri= function(time,phone_Id,rsid,metaHandle,eventName,pushUri,payLoad)
                   {
                           AddOrSaveToDB(time,phone_Id,rsid,metaHandle,eventName,pushUri,null,null,null,null,null,payLoad,null,null,null);
                   }



/*[2013-03-25 15:16:39.581] [DEBUG] [MOBILE PUSH] - [PUSH DEVICE] DeviceId talk.tov1JPMl0yCMrv7I7CjHxvh++gtps=
Windows SessionId c2beee7f-567d-4884-8512-7601864fda83 metaHandle gxsaurav : Client connected to ssc, app in foreground true
*/
var AppForeground = function(time,phone_Id,rsid,metaHandle,eventName,message){

                        AddOrSaveToDB(time,phone_Id,rsid,metaHandle,eventName,null,null,null,null,null,null,null,null,null,message);

                    }


var AppBackground = function(time,phone_Id,rsid,metaHandle,eventName,message){

                        AddOrSaveToDB(time,phone_Id,rsid,metaHandle,eventName,null,null,null,null,null,null,null,null,null,message);

                    }





AppBackground(Date.getDate(),"aa","sddd","asdd","qweqwe","this is a test");
