import './style.css'
import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const toggle=document.getElementsByClassName('toggle')[0];
const exploreswitch=document.getElementsByTagName('input')[0];
const explore=document.getElementsByClassName('explore')[0];
const bodytoggle=document.getElementsByTagName('canvas')[0];
const body=document.getElementsByTagName('body')[0];
const dropdown=document.getElementsByClassName('nav')[0];
var styl=window.getComputedStyle(document.getElementsByClassName('navbar')[0]);
var enabled=false;

toggle.addEventListener('click',()=>{
    
    dropdown.classList.toggle('active');
    toggle.classList.toggle('rotatebar');
    console.log(styl.height);
    document.getElementById("quote").style.marginTop=styl.height;
});
bodytoggle.addEventListener('click',()=>{
  document.getElementById("quote").style.marginTop=styl.height;
  dropdown.classList.remove('active');
  toggle.classList.remove('rotatebar');

});

window.onload = function() {
  document.getElementById("quote").style.marginTop=styl.height;
  typeWriter();
  //---------------------------------------Translate to start---------------------------------------
  tostart();
};


var i = 0;
var txt = 'THE PLACE WHERE FUN BEGINS';
var speed = 50;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("quote").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

//--------------------------------------------Scene--------------------------------------------
const scene = new THREE.Scene();

//--------------------------------------------Lights-------------------------------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2.8);
directionalLight.position.z = 2;
scene.add(ambientLight, directionalLight);

//--------------------------------------------OBJLoader-----------------------------------------
const objloader = new OBJLoader();

//--------------------------------------------GLTFLoader----------------------------------------
const gltfloader = new GLTFLoader();

//---------------------------------------Loading GLTF Model------------------------------------
gltfloader.load("public/untitled.glb",(glb)=>{
  scene.add(glb.scene)
  glb.scene.position.x=5;
  glb.scene.position.z=1;
  console.log(glb.scene)
})

//--------------------------------------------Resizing--------------------------------------------
window.addEventListener("resize", () => {
  //Update Size
  aspect.width = window.innerWidth;
  aspect.height = window.innerHeight;

  //New Aspect Ratio
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();

  //New RendererSize
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


//---------------------------------------------Camera---------------------------------------------
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight, 
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 17.779045621380511;
camera.position.y=1.705112823601508;
camera.position.x=-20.172799436614255;


scene.add(camera);
//-------------------------------------------startposition-----------------------------------------
const startposition={
  x:-16.172799436614255,
  y:3.705112823601508,
  z:15.779045621380511

};

//--------------------------------------------Renderer--------------------------------------------
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.physicallyCorrectLights = true;
renderer.Alp
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.setClearColor("#808080",0.5)
renderer.setSize(aspect.width, aspect.height);

//------------------------------------------OrbitControls------------------------------------------

const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;
orbitControls.enableZoom=false;
orbitControls.maxDistance=42;
orbitControls.minDistance=10;

//------------------------------------------Clock Class--------------------------------------------
const clock = new THREE.Clock();
let previousTime = 0;

const animate = () => {

  //---------------------------------------Update Controls-----------------------------------------
  orbitControls.update();
  //---------------------------------------camera stuck---------------------------------------------
  camera.position.y = Math.max(startposition.y,  camera.position.y);


  //-----------------------------------------Renderer----------------------------------------------
  renderer.render(scene, camera);

  //-----------------------------------RequestAnimationFrame---------------------------------------
  window.requestAnimationFrame(animate);
};
animate();




bodytoggle.addEventListener('mousemove',(e)=>{
 if (exploreswitch.checked){ 
  orbitControls.enabled=true;
  orbitControls.enableZoom=true;
 }
else if (!exploreswitch.checked){
    orbitControls.enableZoom=false;
    orbitControls.enabled=false;
    if (!enabled){
    camera.position.x=((e.clientX/aspect.width)-0.5)*3+startposition.x;
    camera.position.y=((e.clientY/aspect.height)*0.5)+startposition.y;
    }

} 
});

function tostart(){
  gsap.to(camera.position,{duration:2,delay:0.1,x:startposition.x,y:startposition.y,z:startposition.z});
};

exploreswitch.addEventListener('click',async()=>{
  if (!exploreswitch.checked){
    gsap.to(camera.position,{duration:2,delay:0.1,x:startposition.x,y:startposition.y,z:startposition.z});
  }
  setTimeout(()=>{
if (enabled){
    enabled=false;
  }else{
    enabled=true;
  }
  
  },2000);
  

});