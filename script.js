const video = document.getElementById("video");
const canvas = document.getElementById("canvas");


const captureBtn = document.getElementById("captureBtn");
const switchBtn = document.getElementById("switchBtn");


let stream;
let facing = "environment";


async function startCamera(){


if(stream){


stream.getTracks().forEach(track=>track.stop());


}


try{


stream = await navigator.mediaDevices.getUserMedia({


video:{
facingMode:facing
},


audio:false


});


video.srcObject = stream;


}catch(e){


alert("Camera permission is required.");


}


}


switchBtn.onclick=()=>{


facing = facing==="environment"
?
"user"
:
"environment";


startCamera();


};


captureBtn.onclick=()=>{


canvas.width = video.videoWidth;
canvas.height = video.videoHeight;


const ctx = canvas.getContext("2d");


ctx.drawImage(video,0,0);


canvas.toBlob(function(blob){


const url = URL.createObjectURL(blob);


const a = document.createElement("a");


a.href = url;


a.download = "MyPic_(onetimepic.com).jpg";


document.body.appendChild(a);


a.click();


a.remove();


setTimeout(()=>{


URL.revokeObjectURL(url);


},1000);


},"image/jpeg",1);


};


startCamera();