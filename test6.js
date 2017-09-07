#!/usr/bin/nodejs
var ipcamera = require('node-hikvision-api');
const download = require('image-downloader');

const path = '/Users/cfinnegan/Documents/dev/test06/';

var imgOptions = {
    url : 'http://www.kanyini.io/wp-content/uploads/2015/08/keys.png',
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


getImages();

function getImages(){
imgOptions.dest = path + getDateTime() + '_Channel ' + '_SeqNo:1_MotionPhoto.jpg';
download.image(imgOptions)
    .then(({ filename }) => {
        console.log('File saved to', filename);
        storeImage(filename);
        imgOptions.dest = path + getDateTime() + '_Channel ' + '_SeqNo:2_MotionPhoto.jpg';
        download.image(imgOptions)
        .then(({ filename }) => {
            console.log('File saved to', filename);
            storeImage(filename);
            imgOptions.dest = path + getDateTime() + '_Channel ' + '_SeqNo:3_MotionPhoto.jpg';
            download.image(imgOptions)
            .then(({ filename }) => {
                console.log('File saved to', filename);
                storeImage(filename);
            }).catch((err) => {
                console.log('Error getting file ' + imgOptions.dest);
                throw err
            })
        }).catch((err) => {
            console.log('Error getting file ' + imgOptions.dest);
            throw err
        })
    }).catch((err) => {
    console.log('Error getting file ' + imgOptions.dest);
    throw err
    })
}



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