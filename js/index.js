import * as THREE from './three.module.js';


let camera, scene, renderer;
let geometry, material, mesh;
let changeRate = 0;
init();
animate();
function init() {
    camera = new THREE.PerspectiveCamera( 20, (window.innerWidth / window.innerHeight), 0.01, 100 );
    camera.position.z = 1.5;
    scene = new THREE.Scene();
    geometry = new THREE.DodecahedronGeometry();
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle='#452c00';
    ctx.fillRect(0, 0, 256, 256);
    let canvasTexture = new THREE.CanvasTexture( canvas);
    material = new THREE.MeshBasicMaterial({ map: canvasTexture });
    material.wireframe = true;
    mesh = new THREE.Mesh( geometry, material);
    scene.add( mesh );
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor('#111111');
    const container = document.getElementById('background-canvas');
    console.log(container);
    container.appendChild( renderer.domElement );
}

document.getElementById('about-anchor').addEventListener('click', ()=>{
    camera.position.z = 1.5;
});


function animate() {
    requestAnimationFrame( animate );
    mesh.rotation.x += 0.00015;
    mesh.rotation.y += 0.00015;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render( scene, camera)
}
  