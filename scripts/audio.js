function buildAudioGraph() {
    var sourceNode = audioContext.createMediaElementSource(Player);

    // Create an analyser node
    analyser = audioContext.createAnalyser();

    // Try changing for lower values: 512, 256, 128, 64...
    analyser.fftSize = 512;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    bqf = audioContext.createBiquadFilter();
    bqf.frequency.value=100;
    //bqf.type = "lowpass";
    stereo = audioContext.createStereoPanner();
    stereo.pan.value = 0;
    sourceNode.connect(bqf);
    bqf.connect(stereo);
    stereo.connect(analyser);
    analyser.connect(audioContext.destination);

}

function updateAudioEffects(){
    var distRelX = (me.x - badboy.x), distRelY = (me.y - badboy.y);
    var distanceBADBOY =Math.sqrt(Math.abs(parseInt(distRelX*distRelX-distRelY*distRelY)));
    bqf.frequency.value = 200 + distanceBADBOY*8;
    stereo.pan.value = (badboy.x-canvas.width/2)/(canvas.width/2)*2;
}

function drawVolumeMeter() {
    ctx.save();

    analyser.getByteFrequencyData(dataArray);
    var average = getAverageVolume(dataArray);

    ctx.fillStyle = "white";
    // draw the center circle meter
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 4, 16 + average / 2, 0, 2 * Math.PI);
    ctx.fill();
    //draw the 2 inversed volume meter
    ctx.beginPath();
    ctx.arc(canvas.width / 4, canvas.height / 4, 16 + average / 2, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(canvas.width / 4 * 3, canvas.height / 4, 16 + average / 2, 0, 2 * Math.PI, true);
    ctx.fill();

    ctx.fillStyle = "lightblue";
    ctx.beginPath();
    ctx.arc(canvas.width / 4, canvas.height / 4, average / 2, 0, 2 * Math.PI, true);
    ctx.fill();

    ctx.fillStyle = "pink";
    ctx.beginPath();
    ctx.arc(canvas.width / 4 * 3, canvas.height / 4, average / 2, 0, 2 * Math.PI, true);
    ctx.fill();

    ctx.restore();
}


function getAverageVolume(array) {
    var values = 0;
    var length = array.length;

    // get all the frequency amplitudes
    for (var i = 0; i < length; i++) {
        values += array[i];
    }

    return values / length;
}

function visualize() {
    // Get the analyser data
    analyser.getByteTimeDomainData(dataArray);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'pink';

    // all the waveform is in one single path, first let's
    // clear any previous path that could be in the buffer
    ctx.beginPath();

    var centerX = canvas.width / 2;
    var centerY = canvas.height / 4;
    var angleWidth = Math.PI / bufferLength;

    for (var i = 0; i < bufferLength; i++) {
        var angle = i * angleWidth;
        var v = (255+dataArray[i])/4;
        // We draw from y=0 to height
        var x = Math.sin(angle) * v;
        var y = Math.cos(angle) * v;

        if (i === 0) {
            //ctx.moveTo(centerX, centerY+rayon/2);
        } else {
            ctx.lineTo(centerX + x, centerY + y);
        }
    }

    //ctx.lineTo(centerX, centerY+rayon/2);

    // draw the path at once
    ctx.stroke();

    ctx.strokeStyle = 'lightblue';
    ctx.beginPath();

    for (var i = 0; i < bufferLength; i++) {
        var angle = (i * angleWidth) + Math.PI;
        var v = (255+dataArray[i])/4;
        // We draw from y=0 to height
        var x =  Math.sin(angle) * v;
        var y = Math.cos(angle) * v;

        if (i === 0) {
            //ctx.moveTo(centerX, centerY+rayon/2);
        } else {
            ctx.lineTo(centerX + x, centerY + y);
        }
    }
    //ctx.lineTo(centerX, centerY+rayon/2);
    // draw the path at once
    ctx.stroke();

    // call again the visualize function at 60 frames/s

}
