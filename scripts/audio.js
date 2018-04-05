function buildAudioGraph() {
    var mediaElement = document.getElementById('player');
    var sourceNode = audioContext.createMediaElementSource(mediaElement);

    // Create an analyser node
    analyser = audioContext.createAnalyser();

    // Try changing for lower values: 512, 256, 128, 64...
    analyser.fftSize = 512;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    sourceNode.connect(analyser);
    analyser.connect(audioContext.destination);
}

function drawVolumeMeter() {
    // create a vertical gradient of the height of the canvas
    gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0.75, 'pink');
    gradient.addColorStop(0.5, 'white');
    gradient.addColorStop(0.25, 'lightBlue');

    ctx.save();

    // set the fill style to a nice gradient
    ctx.fillStyle = gradient;

    analyser.getByteFrequencyData(dataArray);
    var average = getAverageVolume(dataArray);
    ctx.beginPath();
    // draw the center circle meter
    ctx.arc(canvas.width / 2, canvas.height / 4, 25 + (average / 4), 0, 2 * Math.PI);
    ctx.fill();

    //draw the 2 inversed volume meter
    ctx.beginPath();
    ctx.arc(canvas.width / 4, canvas.height / 4, 10 + ((255 - average) / 8), 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(canvas.width / 4 * 3, canvas.height / 4, 10 + ((255 - average) / 8), 0, 2 * Math.PI, true);
    ctx.fill();

    ctx.globalCompositeOperation = 'destination-out';

    ctx.beginPath();
    ctx.arc(canvas.width / 4, canvas.height / 4, (255 - average) / 8, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(canvas.width / 4 * 3, canvas.height / 4, (255 - average) / 8, 0, 2 * Math.PI, true);
    ctx.fill();

    ctx.restore();
}


function getAverageVolume(array) {
    var values = 0;
    var average;

    var length = array.length;

    // get all the frequency amplitudes
    for (var i = 0; i < length; i++) {
        values += array[i];
    }

    average = values / length;
    return average;
}