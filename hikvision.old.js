#!/usr/bin/nodejs
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var ipcamera = require('node-hikvision-api');
const download = require('image-downloader');
var delayMillis = 3000; //2 seconds
// Download to a directory and save with the original filename
const path = '/Users/cfinnegan/Documents/dev/test06/';
var imgOptions = {
    url : 'http://admin:Iri$h001@192.168.0.101/Streaming/Channels/101/picture',
    dest: path + getDateTime() + '_startupPhoto.jpg',
};

var fs = require('fs');
var gcs = require('@google-cloud/storage')(gcsconfig);

var gcsconfig = {
    projectId: 'Vision-test-01-9bbd739b0829' ,
    keyFilename:    'Vision-test-01-9bbd739b0829.json'
};

// Reference an existing bucket.
var bucket = gcs.bucket('cctv001');

// Options:
var options = {
    host	: '192.168.0.101',
    port 	: '80',
    user 	: 'admin',
    pass 	: 'Iri$h001',
    log 	: false,
};

const cameraName = 'Glasson_Front';

// Save an image on startup
download.image(imgOptions)
    .then(({ filename, image }) => {
    console.log(getDateTime() + '  File saved to', filename);
    storeImage(filename);
    })
    .catch((err) => {
    throw err
    })

var hikvision 	= new ipcamera.hikvision(options);

// Switch to Day Profile
// hikvision.nightProfile()

// PTZ Go to preset 10
// hikvision.ptzPreset(10)

// Callback on connect
hikvision.on('connect', function(){
    console.log(getDateTime() + ' Connected to ' + options.host);
});

// Callback on error
hikvision.on('error', function(error){
    console.log(getDateTime() + ' Error ' + error);
});

// Monitor Camera Alarms
hikvision.on('alarm', function(code,action,index) {
    if (code === 'VideoMotion' && action === 'Start') {
        console.log(getDateTime() + ' Channel ' + index + ': Video Motion Detected');
        // Captures 5 sequential images from camera
        getImage();
    }

    if (code === 'VideoMotion'   && action === 'Stop')   console.log(getDateTime() + ' Channel ' + index + ': Video Motion Ended')
    if (code === 'LineDetection' && action === 'Start')  console.log(getDateTime() + ' Channel ' + index + ': Line Cross Detected')
    if (code === 'LineDetection' && action === 'Stop')   console.log(getDateTime() + ' Channel ' + index + ': Line Cross Ended')
    if (code === 'AlarmLocal'    && action === 'Start')  console.log(getDateTime() + ' Channel ' + index + ': Local Alarm Triggered: ' + index)
    if (code === 'AlarmLocal'    && action === 'Stop')   console.log(getDateTime() + ' Channel ' + index + ': Local Alarm Ended: ' + index)
    if (code === 'VideoLoss'     && action === 'Start')  console.log(getDateTime() + ' Channel ' + index + ': Video Lost!')
    if (code === 'VideoLoss'     && action === 'Stop')   console.log(getDateTime() + ' Channel ' + index + ': Video Found!')
    if (code === 'VideoBlind'    && action === 'Start')  console.log(getDateTime() + ' Channel ' + index + ': Video Blind!')
    if (code === 'VideoBlind'    && action === 'Stop')   console.log(getDateTime() + ' Channel ' + index + ': Video Unblind!')
});

function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var ms  = date.getMilliseconds();
    ms = (ms < 10 ? "0" : "") + ms;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec + ":" + ms;
}

function getImage() {
    console.log(getDateTime() + ' Starting getImage function');
// Captures 3 sequential images from camera
    imgOptions.dest = path + getDateTime() + '_Channel ' + '_Seq_1.jpg';
            download.image(imgOptions)
                .then(({ filename, image }) => {
                console.log(getDateTime() + ' File saved to', filename);
                storeImage(filename);
                }).catch((err) => {
                throw err;
                storeImage(filename);
                })
        .then (imgOptions.dest = path + getDateTime() + '_Channel ' + '_Seq_2.jpg')
        .then(
            download.image(imgOptions)
                .then(({ filename, image }) => {
                console.log(getDateTime() + ' File saved to', filename);
                storeImage(filename);
                }).catch((err) => {
                throw err;
                storeImage(filename);
                })
        .then (imgOptions.dest = path + getDateTime() + '_Channel ' + '_Seq_3.jpg')
        .then(
            download.image(imgOptions)
                .then(({ filename, image }) => {
                console.log(getDateTime() + ' File saved to', filename);
                storeImage(filename);
                }).catch((err) => {
                throw err;
                storeImage(filename);
                })
        .then (imgOptions.dest = path + getDateTime() + '_Channel ' + '_Seq_4.jpg')
        .then(
            download.image(imgOptions)
                .then(({ filename, image }) => {
                console.log(getDateTime() + ' File saved to', filename);
                storeImage(filename);
                }).catch((err) => {
                throw err;
                storeImage(filename);
                })
        .then (imgOptions.dest = path + getDateTime() + '_Channel ' + '_Seq_5.jpg')
        .then(
            download.image(imgOptions)
                .then(({ filename, image }) => {
                console.log(getDateTime() + ' File saved to', filename);
                storeImage(filename);
                }).catch((err) => {
                throw err;
                storeImage(filename);
                })
        ))))
}

function storeImage(filename) {
    bucket.upload(filename, function (err, file) {
        if (!err) {
            console.log(`File: ` + file.name + ` uploaded successfully`);
        }
        if (err) {
            console.log('File upload failed: ' + err);
        }
    });
}

