song = "";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
leftWristScore=0;
rightWristScore=0;





function preload(){
song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(500,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}

function draw(){
    image(video,0,0,500,500);
    
        fill("#FF0000");
        stroke("#FF0000");
        if(leftWristScore >= 0.2){
            circle(leftWristX-120,leftWristY-70,20); 
            InNumberleftWristY = Number(leftWristY);
            remove_decimals = floor(InNumberleftWristY);
            volume = remove_decimals/500;
            document.getElementById("h_3vol").innerHTML = "Volume = " + volume;
            
            song.setVolume(volume);
        }

        if(rightWristScore >= 0.2){
            circle(rightWristX-120,rightWristY-70,20); 
            
            if(rightWristY > 0 && rightwristY <= 100){
            document.getElementById("h_3speed").innerHTML = "Speed = 0.5X  ";
            song.rate(0.5);

            }else if(rightWristY > 100 && rightWristY <= 200){
                document.getElementById("h_3speed").innerHTML = "Speed = 1X  ";
                song.rate(1);
            

              
        }else if(rightWristY > 200 && rightWristY <= 300){
            document.getElementById("h_3speed").innerHTML = "Speed = 1.5X  ";
            song.rate(1.5);
        

                  
    }else if(rightWristY > 300 && rightWristY <= 400){
        document.getElementById("h_3speed").innerHTML = "Speed = 2X  ";
        song.rate(2);

                  
    }else {
        document.getElementById("h_3speed").innerHTML = "Speed = 2.5X  ";
        song.rate(2.5);
    }
    
}}

function playSong(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
console.log("PoseNet Is  Initailised")
}

function gotPoses(result){
    if(result.length > 0){
        console.log(result);
 

    leftWristX = result[0].pose.leftWrist.x;
    leftWristY = result[0].pose.leftWrist.y;
    console.log("leftWristX - " + leftWristX + "leftWristY - " + leftWristY);


    rightWristX = result[0].pose.rightWrist.X;
    rightWristY = result[0].pose.rightWrist.y;
    console.log("rightWristX - " + rightWristX + "rightWristY - " + rightWristY);

    leftWristScore = result[0].pose.keypoints[9].score;
    console.log(leftWristScore);

    rightWristScore = result[0].pose.keypoints[10].score;
    console.log(leftWristScore);
    }
}