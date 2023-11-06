import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import * as dat from "dat.gui";

//Scene
const scene = new THREE.Scene();
// const objLoader=new OBJLoader()

const ambiLight=new THREE.AmbientLight(0xffffff,1)
const dirLight=new THREE.DirectionalLight(0xffffff,1)
dirLight.position.z=2
scene.add(ambiLight,dirLight)

let mesh3=null
// let animationMixer=null
const gltfloader=new GLTFLoader().load ("/models/candy_shop.glb",(glb)=>{
  // animationMixer=new THREE.AnimationMixer(glb.scene)
  // const clipAction=animationMixer.clipAction(glb.animations[0])
  // clipAction.play()
  // glb.scene.rotation.y=Math.PI*0.5
  // glb.scene.position.x=-40
  mesh3=glb.scene
  glb.scene.position.set(0,-1.5,0)
  scene.add(glb.scene)
  console.log(glb)
})

const axisHelper=new THREE.AxesHelper()
scene.add(axisHelper)


//Resizing
window.addEventListener("resize", () => {
  //Update Size
  aspect.width =window.innerWidth;
  aspect.height=window.innerHeight;
  // mesh.scale.y=(0.33*aspect.height)/2
  // mesh.scale.x=(0.33*aspect.width)/2
  //New Aspect Ratio
  camera.aspect =aspect.width / aspect.height;
  camera.updateProjectionMatrix();

  //New RendererSize
  if(window.innerWidth<=756){
    renderer.setSize(aspect.width, 0.75*aspect.height);
  }
  else{
    renderer.setSize(0.33*aspect.width, aspect.height);
  }
  
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z =7;
camera.position.y=0.5
scene.add(camera);

//Renderer
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas:canvas,alpha:true});
renderer.setSize(0.33*aspect.width, aspect.height);

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;
orbitControls.enableZoom=false;
orbitControls.maxPolarAngle=Math.PI/2

//Clock Class
const clock = new THREE.Clock();

let prev=0

const animate = () => {
  //GetElapsedTime
  const elapsedTime = clock.getElapsedTime();
  // let frameTime=elapsedTime-prev
  // prev=elapsedTime
  // if(animationMixer){
  //   animationMixer.update(frameTime)
  // }
  // if(mesh3){
  //   mesh3.position.x+=elapsedTime*0.52
  //   mesh3.position.y+=elapsedTime*0.055
  //   mesh3.rotation.y=0.25*Math.PI
  // }
  //Update Controls
  orbitControls.update();
  // mesh.rotation.y=elapsedTime

  //Renderer
  renderer.render(scene, camera);

  //RequestAnimationFrame
  window.requestAnimationFrame(animate);
};
animate();
