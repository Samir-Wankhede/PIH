import "./style.css";
import * as THREE from "three";
import gsap from 'gsap'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { DirectionalLight, Vector3 } from "three";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const toggle=document.getElementsByClassName('toggle')[0];
const exploreswitch=document.getElementsByTagName('input')[0];
const explore=document.getElementsByClassName('explore')[0];
const bodytoggle=document.getElementsByTagName('canvas')[0];
const body=document.getElementsByTagName('body')[0];
const dropdown=document.getElementsByClassName('nav')[0];
var styl=window.getComputedStyle(document.getElementsByClassName('navbar')[0]);
var enabled=false;

const logo=document.getElementById('clown')
logo.src='icons/clown_6936211-removebg-preview.png'

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
const scene1 = new THREE.Scene();

//--------------------------------------------Lights-------------------------------------------
const ambientLight1 = new THREE.AmbientLight(0xffffff, 2.1);
const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2.8);
directionalLight1.position.z = 2;
scene1.add(ambientLight1, directionalLight1);

//--------------------------------------------OBJLoader-----------------------------------------
const objloader = new OBJLoader();

//--------------------------------------------GLTFLoader----------------------------------------
const gltfloader1 = new GLTFLoader();

//---------------------------------------Loading GLTF Model------------------------------------
gltfloader1.load("models/main.glb",(glb)=>{
  scene1.add(glb.scene)
  glb.scene.scale.set(0.95,0.95,0.95)
  glb.scene.position.x=5;
  glb.scene.position.z=1;
  console.log(glb.scene)
})

//--------------------------------------------Resizing--------------------------------------------
window.addEventListener("resize", () => {
  //Update Size
  aspect1.width = window.innerWidth;
  aspect1.height = window.innerHeight;

  //New Aspect Ratio
  camera1.aspect = aspect1.width / aspect1.height;
  camera1.updateProjectionMatrix();

  //New RendererSize
  renderer1.setSize(aspect1.width, aspect1.height);
  renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


//---------------------------------------------Camera---------------------------------------------
const aspect1 = {
  width: window.innerWidth,
  height: window.innerHeight, 
};
const camera1 = new THREE.PerspectiveCamera(75, aspect1.width / aspect1.height);
camera1.position.z = 17.779045621380511;
camera1.position.y=1.705112823601508;
camera1.position.x=-20.172799436614255;


scene1.add(camera1);
//-------------------------------------------startposition-----------------------------------------
const startposition={
  x:-16.172799436614255,
  y:3.705112823601508,
  z:15.779045621380511

};

//--------------------------------------------Renderer--------------------------------------------
const canvas1 = document.querySelector(".draw1");
const renderer1 = new THREE.WebGLRenderer({ canvas:canvas1, antialias: true, alpha: true });
renderer1.physicallyCorrectLights = true;
renderer1.Alp
renderer1.outputEncoding = THREE.sRGBEncoding;
renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.setClearColor("#808080",0.5)
renderer1.setSize(aspect1.width, aspect1.height);

//------------------------------------------OrbitControls------------------------------------------

const orbitControls1 = new OrbitControls(camera1, canvas1);
orbitControls1.enableDamping = true;
orbitControls1.enableZoom=false;
orbitControls1.maxDistance=42;
orbitControls1.minDistance=10;

//------------------------------------------Clock Class--------------------------------------------
const clock1= new THREE.Clock();
let previousTime = 0;

const animate1 = () => {

  //---------------------------------------Update Controls-----------------------------------------
  orbitControls1.update();
  //---------------------------------------camera stuck---------------------------------------------
  camera1.position.y = Math.max(startposition.y,  camera1.position.y);


  //-----------------------------------------Renderer----------------------------------------------
  renderer1.render(scene1, camera1);

  //-----------------------------------RequestAnimationFrame---------------------------------------
  window.requestAnimationFrame(animate1);
};
animate1();




bodytoggle.addEventListener('mousemove',(e)=>{
 if (exploreswitch.checked){ 
  orbitControls1.enabled=true;
  orbitControls1.enableZoom=true;
 }
else if (!exploreswitch.checked){
    orbitControls1.enableZoom=false;
    orbitControls1.enabled=false;
    if (!enabled){
    camera1.position.x=((e.clientX/aspect.width)-0.5)*3+startposition.x;
    camera1.position.y=((e.clientY/aspect.height)*0.5)+startposition.y;
    }

} 
});

function tostart(){
  gsap.to(camera1.position,{duration:2,delay:0.1,x:startposition.x,y:startposition.y,z:startposition.z});
};

exploreswitch.addEventListener('click',async()=>{
  if (!exploreswitch.checked){
    gsap.to(camera1.position,{duration:2,delay:0.1,x:startposition.x,y:startposition.y,z:startposition.z});
  }
  setTimeout(()=>{
if (enabled){
    enabled=false;
  }else{
    enabled=true;
  }
  
  },2000);
  

});


// ----------------------------------------------------------------------

//scene
const scene = new THREE.Scene();

//light
const amb=new THREE.AmbientLight(0xffffff,2.2)
const directional=new THREE.DirectionalLight(0xffffff,1.1)
const backlight=new THREE.DirectionalLight(0xffffff,1)
const toplight=new DirectionalLight(0xffffff,0.7)
// 0xf44a68
// ffb9b6
directional.position.set(0,1,1)
backlight.position.set(0,0,-1)
toplight.position.set(0,1,-1)

scene.add(amb,directional,backlight,toplight)

let mesh3=null
let animationMixer=null;
const gltfloader=new GLTFLoader().load('/models/final-10.glb',(glb)=>{
  animationMixer=new THREE.AnimationMixer(glb.scene)
  for (let i=0;i<5;i++){
    if (glb.animations[i].duration<10){
      glb.animations[i].duration=40;
    }
    const clipAction=animationMixer.clipAction(glb.animations[i])
    clipAction.play();
  }
  mesh3=glb.scene;
  mesh3.position.set(0,0.1,0)
  mesh3.scale.set(0.083,0.083,0.083)
  scene.add(glb.scene)
  // console.log(glb);
})


const cursor={
    x:0,y:0
  }
window.addEventListener('mousemove',(event)=>{
    cursor.x=event.clientX/window.innerWidth -0.5;
    cursor.y=event.clientY/window.innerHeight -0.5;
})

window.addEventListener('scroll', () => {
  // Update the scene or 3D object properties based on scroll position
  const scrollY = window.scrollY;
  if (mesh3){
    console.log(1)
  mesh3.scale.set(0.083,0.083,0.083)
  }
  renderer.render(scene,camera)
  // You can also update other properties such as camera position, rotation, or lighting here
});

const aspect = {
    width: window.innerWidth,
    height: window.innerHeight,
  };


const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
if (aspect.width<=650){
  camera.position.z=1.3;
}
else{
  camera.position.z=1
}
scene.add(camera);

//Renderer
const canvas = document.querySelector(".draw"); //Select the canvas
const renderer = new THREE.WebGLRenderer({ canvas ,alpha: true}); //add WeBGL Renderer
renderer.setSize(0.6*aspect.width,aspect.height); //Renderer size
renderer.physicallyCorrectLights=true;
renderer.Alp;


//orbit control
const orbitcontrols = new OrbitControls(camera,canvas)
orbitcontrols.enableZoom=false;

orbitcontrols.enableDamping=true;
orbitcontrols.minPolarAngle=Math.PI/2;
orbitcontrols.maxPolarAngle=Math.PI/2;

window.addEventListener('resize',()=>{
    aspect.width=window.innerWidth;
    aspect.height=window.innerHeight;
  
    //to inform the camers
    camera.aspect=aspect.width/aspect.height;
    camera.updateProjectionMatrix()

    if (aspect.width<=650){
      camera.position.z=1.3;
    }
    else{
      camera.position.z=1
    }
    //new renderer
    renderer.setSize(0.6*aspect.width,aspect.height);
    //for more resolution
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
  })

  const clock = new THREE.Clock();
  let prev=0;
  
  //Animate
  const animate = () => {
    //GetElapsedTime
    const elapsedTime = clock.getElapsedTime();
    const frametime=elapsedTime-prev;
    prev=elapsedTime;
    if (animationMixer){
      animationMixer.update(frametime)
    }

    if (mesh3){
      mesh3.rotation.y=elapsedTime*0.5
    }
  
    if (mesh3){
      mesh3.scale.set(0.083,0.083,0.083)
    }
    orbitcontrols.update();

    //Renderer
    renderer.render(scene, camera); //draw what the camera inside the scene captured
  
    //RequestAnimationFrame
    window.requestAnimationFrame(animate);
  };
  animate();


// -------------------------------------------------------------------
  
  //Scene
  const scene2 = new THREE.Scene();
  // const objLoader=new OBJLoader()
  
  const ambiLight=new THREE.AmbientLight(0xffffff,1)
  const dirLight=new THREE.DirectionalLight(0xffffff,0.5)
  dirLight.position.z=2
  scene2.add(ambiLight,dirLight)
  
  let mesh2=null
  // let animationMixer=null
  const gltfloader2=new GLTFLoader().load ("/models/icecream.glb",(glb)=>{
    // animationMixer=new THREE.AnimationMixer(glb.scene)
    // const clipAction=animationMixer.clipAction(glb.animations[0])
    // clipAction.play()
    // glb.scene.rotation.y=Math.PI*0.5
    // glb.scene.position.x=-40
    mesh2=glb.scene
    glb.scene.scale.set(1.5,1.5,1.5)
    glb.scene.position.set(0,-1.3,0)
    // glb.scene.rotation.y=200;
    scene2.add(glb.scene)
    console.log(glb)
  })
  
  
  
 
  
  //Camera
  const aspect2 = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const camera2 = new THREE.PerspectiveCamera(75, aspect2.width / aspect2.height);
  camera2.position.z =4.5;
  camera2.position.y=0.5
  scene2.add(camera2);
  
  //Renderer
  const canvas2 = document.querySelector(".draw2");
  const renderer2 = new THREE.WebGLRenderer({ canvas:canvas2,alpha:true});
  renderer2.setSize(0.5*aspect2.width, aspect2.height);
  
  //OrbitControls
  const orbitControls2 = new OrbitControls(camera2, canvas2);
  orbitControls2.enableDamping = true;
  orbitControls2.enableZoom=false;
  orbitControls2.maxPolarAngle=Math.PI/2
  
   //Resizing
   window.addEventListener("resize", () => {
    //Update Size
    aspect2.width =window.innerWidth;
    aspect2.height=window.innerHeight;
    // mesh.scale.y=(0.33*aspect.height)/2
    // mesh.scale.x=(0.33*aspect.width)/2
    //New Aspect Ratio
    camera2.aspect =aspect2.width / aspect2.height;
    camera2.updateProjectionMatrix();
  
    //New RendererSize
    if(window.innerWidth<=900){
      renderer2.setSize(aspect2.width, aspect2.height);
      if (mesh2){
        mesh2.scale.set(1.2,1.2,1.2)
        mesh2.position.set(0,-1,0)
      }
    }
    else{
      renderer2.setSize(0.5*aspect2.width, aspect2.height);
    }
    
    renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
  //Clock Class
  const clock2 = new THREE.Clock();
  
  let prev2=0
  
  const animate2 = () => {
    //GetElapsedTime
    const elapsedTime2 = clock.getElapsedTime();
    orbitControls2.update();
    // mesh.rotation.y=elapsedTime
    
    if(mesh2){
      mesh2.rotation.y=elapsedTime2
    }
    //Renderer
    renderer2.render(scene2, camera2);
  
    //RequestAnimationFrame
    window.requestAnimationFrame(animate2);
  };
  animate2();