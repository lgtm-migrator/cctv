var imageName = path + getDateTime() + 'Channel ' + index + '_1stMotionPhoto.jpg';
var imgOptions.dest = imageName;
// Save an image (tidy this up)
download.image(imgOptions).then(({ filename, image }) => {
    console.log('File saved to', filename)
}).catch((err) => {
    throw err
})

download.image(imgOptions)
    .then(({ filename, image }) => {
    var imageName = path + getDateTime() + 'Channel ' + index + '_1stMotionPhoto.jpg';
    var imgOptions.dest = imageName;
    console.log('File saved to', filename)
    }).catch((err) => {
    throw err
    })
.then(({ filename, image }) => {
    console.log('File saved to', filename)
    var imageName = path + getDateTime() + 'Channel ' + index + '_1stMotionPhoto.jpg';
    var imgOptions.dest = imageName;
}).catch((err) => {
    throw err
})





setTimeout(function() {
    // Save an image (tidy up this)
    var imageName = path + getDateTime() + 'Channel ' + index + '_2ndMotionPhoto.jpg';
    imgOptions.dest = imageName;
    download.image(imgOptions)
        .then(({ filename, image }) => {
        console.log('File saved to', filename)
}).catch((err) => {
        throw err
    })
}, delayMillis);
setTimeout(function() {
    // Save an image (tidy up this)
    var imageName = path + getDateTime() + 'Channel ' + index + '_3rdMotionPhoto.jpg';
    imgOptions.dest = imageName;
    download.image(imgOptions)
        .then(({ filename, image }) => {
        console.log('File saved to', filename)
}).catch((err) => {
        throw err
    })
}, delayMillis);
var imageName = path + getDateTime() + 'Channel ' + index + '_4thMotionPhoto.jpg';
imgOptions.dest = imageName;
// Save an image (tidy this up)
download.image(imgOptions).then(({ filename, image }) => {
    console.log('File saved to', filename)
}).catch((err) => {
    throw err
})
setTimeout(function() {
    // Save an image (tidy up this)
    var imageName = path + getDateTime() + 'Channel ' + index + '_5thMotionPhoto.jpg';
    imgOptions.dest = imageName;
    download.image(imgOptions)
        .then(({ filename, image }) => {
        console.log('File saved to', filename)
}).catch((err) => {
        throw err
    })
}, delayMillis);
setTimeout(function() {
    // Save an image (tidy up this)
    var imageName = path + getDateTime() + 'Channel ' + index + '_6thMotionPhoto.jpg';
    imgOptions.dest = imageName;
    download.image(imgOptions)
        .then(({ filename, image }) => {
        console.log('File saved to', filename)
}).catch((err) => {
        throw err
    })
}, delayMillis);