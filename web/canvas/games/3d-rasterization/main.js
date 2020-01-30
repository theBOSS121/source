import {square, doubleSquare, cube, pyramid} from './models.js';
import {Camera} from './camera.js';
import {toMesh} from './mesh.js';
import {createRenderer} from './renderer.js';


const canvas = document.querySelector('canvas');
const renderer = createRenderer(canvas);

const scene = [toMesh(cube), toMesh(pyramid)];
scene[0].color = 'red';
scene[1].color = 'green';

// const mesh = toMesh(cube);

const camera = new Camera();
camera.pos.z = 200;
camera.zoom = 12;

function animate(time) {
    // camera.pos.z += 0.1;

    {
        const mesh = scene[0];
        // mesh.rotation.x += 0.01;
        // mesh.rotation.y -= 0.01;
        mesh.rotation.x = Math.PI / 4;
        mesh.rotation.z += 0.02;
        // mesh.position.x = Math.sin(time / 300) * 80;
        // mesh.position.y = Math.sin(time / 1000) * 50;
    }
    {
        // const mesh = scene[1];
        // mesh.rotation.x += 0.01;
        // mesh.rotation.y -= 0.01;
        // mesh.position.x = Math.sin(time / 500) * 80;
        // mesh.position.y = Math.sin(time / 600) * 50;
        // mesh.position.z = Math.cos(time / 1000) * 100;
    
    }
    renderer(scene, camera);
    requestAnimationFrame(animate);
}

animate(0);