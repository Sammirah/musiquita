sonzinho1 = "";
sonzinho2 = "";
sonzinho_status1 = "";
sonzinho_status2 = "";
leftWristX = 0;
rightWristY = 0;
leftWristY = 0;
rightWristX = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload() {
    sonzinho1 = loadSound("bom.mp3")
    sonzinho2 = loadSound("semquerer.mp3")
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.position(575, 250);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    sonzinho_status1 = sonzinho1.isPlaying();
    sonzinho_status2 = sonzinho2.isPlaying();
    if(scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        sonzinho2.stop();
        if(sonzinho_status2 == false) {
            sonzinho1.play();
            document.getElementById("bomLudmilla").innerHTML ="Atualmente reproduzindo: Bom ";
        }
    } 
    if(scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        sonzinho1.stop();
        if(sonzinho_status1 == false) {
            sonzinho2.play();
            document.getElementById("bomLudmilla").innerHTML ="Atualmente reproduzindo: Bom ";
        }
    } 
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("modelo carregado! :D")
}

function gotPoses(results) {
    if(results.length > 0)  {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX +"leftWristY ="+ leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX +"rightWristY ="+ rightWristY);
        
        scoreLeftWrist = results[0].pose.keypoints[10].score;
        scoreRightWrist = results[0].pose.keypoints[9].score;
        }
}