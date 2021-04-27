status = " ";
objects = [ ];

var SpeechRecognition = window.webkitSpeechRecognition;
var Display_Speech = new SpeechRecognition();

function start()
{
 
    document.getElementById("textbox").innerHTML = " ";
    Display_Speech.start();
}

Display_Speech.onresult = function(event)
{
    console.log(event);
    var content = event.results[0][0].transcript;
    console.log(content);
    document.getElementById("textbox").innerHTML = content;
    console.log(content);
    if(content == "start finding objects")
    {
        speak();
        console.log("**********");
    }
}

function speak()
{
    var speak_man = window.speechSynthesis;
    speak_data = "Detecting objects around you";
    var utter_man = new SpeechSynthesisUtterance(speak_data);
    speak_man.speak(utter_man);
    setTimeout(function(){
        take_snap();
        save();
    },5000);
    Webcam.attach(camera);
}









function preload()
{
//initial_img = loadImage('dog_cat.jpg');//
}
function setup()
{
canvas = createCanvas(400,250,);
canvas.center();

video = createCapture(VIDEO);
video.hide();

object_detector = ml5.objectDetector('cocossd' , modelLoaded);
document.getElementById("status_btn").innerHTML = "Status : Detecting Objects";
}
function draw()
{
image(video ,0,0,400,250);

if (status != " ")
{ 
r = random(255);
g = random(255);
b = random(255);
object_detector.detect(video , gotResults);
    for(var i = 0;i<objects.length;i++)
    {
    document.getElementById("status_btn").innerHTML = "Status : Objects Detected";
    document.getElementById("obj_btn").innerHTML = "Number of objects : " + objects.length;
    fill(r,g,b);
    noFill();
    stroke(r,g,b);
    accuracy = floor(objects[i].confidence * 100);
    text(objects[i].label + " " + accuracy + " % " , objects[i].x,objects[i].y);
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
}
}
function modelLoaded()
{
    console.log("coco intialized");
    status = true;
    objects_detector.detect(video , gotResults);
}
function gotResults(error , results)
{ if(error)
    {
    console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
