status1 = "";
input_text = "";
objects = [];

function setup(){
    canvas = createCanvas(390,330);
    canvas.position(570,390);
    video = createCapture(VIDEO);
    video.size(390, 330);
    video.hide();
}
function start(){
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("input_id").value;
}
function modelLoaded(){
    console.log("Model Loaded");
    status1 = true;
}

function draw(){
    image(video,0,0,390,330);
    if(status1 != ""){
        object_Detector.detect(video, gotResults);
        for(i = 0;i < objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            console.log(objects.length);
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == object_name){
                video.stop();
                object_Detector.detect(gotResults);
                document.getElementById("object_found").innerHTML = object_name+" Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_found").innerHTML = object_name + " Not Found";
            }
        }
    }
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}