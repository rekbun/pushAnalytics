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

app.configure(function(){
    app.use(express.bodyParser());
});

app.get('/PostEx', function(req, res){
    if ( req.query.exception_message && req.query.stacktrace  && req.query.custom_message && req.query.os_version && req.query.modelname && req.query.appversion && req.query.phone_id && req.query.time_val && req.query.network_present && req.query.network_type && req.query.current_memory && req.query.peak_memory){
        schema.AddException(req.query.exception_message , req.query.stacktrace  , req.query.custom_message , req.query.os_version , req.query.modelname , req.query.appversion , req.query.phone_id , req.query.time_val , req.query.network_present , req.query.network_type , req.query.current_memory , req.query.peak_memory, req.query.is_background);
        res.send('{ }');
    }
    res.send('Error');
});

app.get('/PostLog', function(req, res){
    if ( req.query.log_message && req.query.os_version && req.query.modelname && req.query.appversion && req.query.phone_id && req.query.time_val && req.query.network_present && req.query.network_type && req.query.current_memory && req.query.peak_memory){
        schema.AddLog(req.query.log_message, req.query.os_version , req.query.modelname , req.query.appversion , req.query.phone_id , req.query.time_val , req.query.network_present , req.query.network_type , req.query.current_memory , req.query.peak_memory, req.query.is_background);
        res.send('{ }');
    }
    res.send('Error');
});

app.get('/PostMetric', function(req,res){
    if ( req.query.metric_name && req.query.os_version && req.query.modelname && req.query.appversion && req.query.phone_id && req.query.time_val && req.query.network_present && req.query.network_type && req.query.current_memory && req.query.peak_memory){
        schema.AddMetric(req.query.metric_name, req.query.os_version , req.query.modelname , req.query.appversion , req.query.phone_id , req.query.time_val , req.query.network_present , req.query.network_type , req.query.current_memory , req.query.peak_memory, req.query.is_background);
        PostMetric(req.query.metric_name);
        res.send('{  }');
    }
    res.send('Error');
});

app.post('/PostSSCEx', function ( req, res){
    if ( req.body.exception_message && req.body.custom_message && req.body.ssc_id && req.body.rsid && req.body.packet && req.body.stacktrace && req.body.device_id && req.body.client_version && req.body.modelname && req.body.last_opened)
    {
        schema.AddSSCEx(req.body);
        res.send('{ }');
    }
    res.send('Error');
});

function PostMetric(metric_name){

    var metric_string = "WP.MT.WP7." + metric_name + ".1m.sum";
    var epoch = new Date().getTime();
    var post_data = querystring.stringify({ 'metric' : metric_string }) + " 1 " + epoch;

    console.log("Posting " + util.inspect(post_data));

    var options = {
        hostname: 'ggw.talk.to',
        port: 80,
        path: '/v1/metrics',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length
        }
    };

    var Graphitereq = http.request(options, function(response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) { });
    });

    Graphitereq.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    Graphitereq.write(post_data);
    Graphitereq.end();
}


app.listen(80);
console.log('Listening on port 80 ');

