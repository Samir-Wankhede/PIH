import "./style.css";
import * as THREE from "three";
import gsap from 'gsap'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { DirectionalLight } from "three";

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
  console.log(glb);
})


const cursor={
    x:0,y:0
  }
window.addEventListener('mousemove',(event)=>{
    cursor.x=event.clientX/window.innerWidth -0.5;
    cursor.y=event.clientY/window.innerHeight -0.5;
})

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
      mesh3.rotation.y+=0.002
    }
  
  
    orbitcontrols.update();

    //Renderer
    renderer.render(scene, camera); //draw what the camera inside the scene captured
  
    //RequestAnimationFrame
    window.requestAnimationFrame(animate);
  };
  animate();
  