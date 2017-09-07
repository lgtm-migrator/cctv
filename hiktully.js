#!/usr/bin/nodejs
var ipcamera    = require('node-hikvision-api');
var download    = require('image-downloader');
var fs          = require('fs');
var gcs         = require('@google-cloud/storage')(gcsconfig);

const path = '/Users/cfinnegan/Documents/dev/test06/';
// image-downloader options
var imgOptions = {
    url : 'http://admin:Tu11yw00d@192.168.1.101/Streaming/Channels/101/picture',
    //url : 'http://www.kanyini.io/wp-content/uploads/2015/08/keys.png',
    dest: path + getDateTime() + '_startupPhoto.jpg',
};
// @google-cloud/storage options
var gcsconfig = {
    projectId: 'Vision-test-01-9bbd739b0829' ,
    keyFilename:    'Vision-test-01-9bbd739b0829.json'
};
var bucket = gcs.bucket('cctv001');
// mode-hikvision-api options
var options = {
    host	: '192.168.1.101',
    port 	: '80',
    user 	: 'admin',
    pass 	: 'Tu11yw00d',
    log 	: false,
};
const cameraName = 'Glasson_Front';
var hikvision 	= new ipcamera.hikvision(options);

// Log each application restart
console.log(getDateTime() + ' application restarting..');
getImage();

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
        // Captures 3 sequential images from camera
        getImages();
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

function getImages(){
    // downloads 3 still images from camera to disk
    // the .then () returns a promise
    // so subsequent download.image() functions are executed synchronously
    // see http://exploringjs.com/es6/ch_promises.html
    imgOptions.dest = path + getDateTime() + '_img1.jpg';
    download.image(imgOptions)
        .then(({ filename }) => {
        console.log('File saved to', filename);
        storeImage(filename);
        imgOptions.dest = path + getDateTime() + '_img2.jpg';
        download.image(imgOptions)
            .then(({ filename }) => {
            console.log('File saved to', filename);
            storeImage(filename);
            imgOptions.dest = path + getDateTime() + '_img3.jpg';
            download.image(imgOptions)
                .then(({ filename }) => {
                console.log('File saved to', filename);
                storeImage(filename);
                })
                .catch((err) => {
                console.log('Error getting file ' + imgOptions.dest);
                throw err
                })
                })
            .catch((err) => {
            console.log('Error getting file ' + imgOptions.dest);
            throw err
            })
            })
        .catch((err) => {
        console.log('Error getting file ' + imgOptions.dest);
        throw err
        })
}

function getImage(){
    // downloads 1 still image from camera to disk

    imgOptions.dest = path + getDateTime() + ' stillImage.jpg';
    download.image(imgOptions)
        .then(({ filename }) => {
            console.log('File saved to ', filename);
            storeImage(filename);
            })
        .catch((err) => {
            console.log('Error getting file ' + imgOptions.dest);
            throw err
        })
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

