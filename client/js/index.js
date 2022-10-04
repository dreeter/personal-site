import * as THREE from './three.module.js';

let camera, scene, renderer;
let geometry, material, mesh;

canvasInit();
animateCanvas();
document.getElementById('messageForm').addEventListener('submit', submitEmailMessage);

async function submitEmailMessage(event) {

    event.preventDefault();

    const name = document.getElementById('nameInput');
    const email = document.getElementById('emailInput');
    const subject = document.getElementById('subjectInput');
    const message = document.getElementById('messageTextArea');
    
    const submission = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    }

    fetch('/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission)
    }).then((response)=> {

        if(response.status === 200){
            document.getElementById('submissionMessage').textContent = 'Thanks. Message Sent!'
        } else {
            document.getElementById('submissionMessage').textContent = 'Message Failed. How embarassing!'
        }

    }).catch((error)=>{})

    name.value = '';
    email.value = '';
    subject.value = '';
    message.value = '';
}

function canvasInit() {

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
    container.appendChild( renderer.domElement );
}

function animateCanvas() {
    requestAnimationFrame( animateCanvas );
    mesh.rotation.x += 0.00015;
    mesh.rotation.y += 0.00015;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render( scene, camera)
}


  