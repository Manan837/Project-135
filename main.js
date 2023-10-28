status1 = "";
input_text = "";

function setup(){
    canvas = createCanvas(390,330);
    canvas.position(570,390);
    video = createCapture(VIDEO);
    video.size(300,290);
    video.hide();
}
function start(){
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input_text = document.getElementById("input_id").value;
}
function modelLoaded(){
    console.log("Model Loaded");
    status1 = true;
}
function draw(){
    image(video,0,0,390,330);
}