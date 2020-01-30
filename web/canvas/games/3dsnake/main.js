import {square, doubleSquare, cube, pyramid} from './models.js';
import {Camera} from './camera.js';
import {toMesh} from './mesh.js';
import {createRenderer} from './renderer.js';
import {startListeners, left, right, up, down} from './input.js'


const canvas = document.querySelector('canvas');
const renderer = createRenderer(canvas);

startListeners();

const scene = [toMesh(cube)];
scene[0].color = 'red';
// scene[1].color = 'green';

// const mesh = toMesh(cube);

const camera = new Camera();
camera.pos.z = 51;
camera.pos.z = 201;
camera.zoom = 12;

let rotating = false;
let whichDir = 0;
let checkNum = 0;
let rotatingSpeed = 0.1;

function closeTo(num1, num2, howClose) {
    if((num1 + howClose >= num2 && num1 - howClose <= num2) || (num2 + howClose >= num1 && num2 - howClose <= num1)) {
        return true;
    }else {
        return false;
    }
}

function animate(time) {
    // camera.pos.z += 0.1;

    if(left || right || up || down) {
        if(!rotating) {
            rotating = true;
            if(left) whichDir = 0;
            if(right) whichDir = 1;
            if(up) whichDir = 2;
            if(down) whichDir = 3;
        }
    }
    
    {
        const mesh = scene[0];
        let xx, yy, zz;
        mesh.rotation.x  = Math.PI / 2 * 3;
        mesh.rotation.y  = Math.PI / 2;
        // mesh.rotation.x += 0.01;
        // mesh.rotation.y += 0.005;
        mesh.rotation.z += 0.01;

        if(rotating) {
            if(whichDir == 0) {

            }else if(whichDir == 1) {

            }else if(whichDir == 2) {
                // if(mesh.rotation.y == 0 && mesh.rotation.z == 0) {
                //     mesh.rotation.x += rotatingSpeed;
                //     if(mesh.rotation.x > 2 * Math.PI) mesh.rotation.x -= 2 * Math.PI;
                //     if(mesh.rotation.x < 0) mesh.rotation.x += Math.PI * 2;
                //     if(mesh.rotation.x < Math.PI / 2){
                //         checkNum = Math.PI / 2;
                //     }else if(mesh.rotation.x < Math.PI) {
                //         checkNum = Math.PI;                        
                //     }else if(mesh.rotation.x < 3 * Math.PI / 2) {
                //         checkNum = 3 * Math.PI / 2;                        
                //     }else if(mesh.rotation.x < 2 * Math.PI) {
                //         checkNum = 2 * Math.PI;                        
                //     }
                //     if(closeTo(mesh.rotation.x, checkNum, rotatingSpeed)) {
                //         rotating = false;
                //     }
                // }
                // if(mesh.rotation.y == Math.PI && mesh.rotation.z == 0) {
                //     mesh.rotation.x -= rotatingSpeed;
                //     if(mesh.rotation.x > 2 * Math.PI) mesh.rotation.x -= 2 * Math.PI;
                //     if(mesh.rotation.x < 0) mesh.rotation.x += Math.PI * 2;
                //     if(mesh.rotation.x < Math.PI / 2){
                //         checkNum = Math.PI / 2;
                //     }else if(mesh.rotation.x < Math.PI) {
                //         checkNum = Math.PI;                        
                //     }else if(mesh.rotation.x < 3 * Math.PI / 2) {
                //         checkNum = 3 * Math.PI / 2;                        
                //     }else if(mesh.rotation.x < 2 * Math.PI) {
                //         checkNum = 2 * Math.PI;                        
                //     }
                //     if(closeTo(mesh.rotation.x, checkNum, rotatingSpeed)) {
                //         rotating = false;
                //     }
                // }                
                // if(mesh.rotation.y == 0 && mesh.rotation.z == Math.PI) {
                //     mesh.rotation.x -= rotatingSpeed;
                //     if(mesh.rotation.x > 2 * Math.PI) mesh.rotation.x -= 2 * Math.PI;
                //     if(mesh.rotation.x < 0) mesh.rotation.x += Math.PI * 2;
                //     if(mesh.rotation.x < Math.PI / 2){
                //         checkNum = Math.PI / 2;
                //     }else if(mesh.rotation.x < Math.PI) {
                //         checkNum = Math.PI;                        
                //     }else if(mesh.rotation.x < 3 * Math.PI / 2) {
                //         checkNum = 3 * Math.PI / 2;                        
                //     }else if(mesh.rotation.x < 2 * Math.PI) {
                //         checkNum = 2 * Math.PI;                        
                //     }
                //     if(closeTo(mesh.rotation.x, checkNum, rotatingSpeed)) {
                //         rotating = false;
                //     }
                // }
                // if(mesh.rotation.y == Math.PI && mesh.rotation.z == Math.PI) {
                //     mesh.rotation.x += rotatingSpeed;
                //     if(mesh.rotation.x > 2 * Math.PI) mesh.rotation.x -= 2 * Math.PI;
                //     if(mesh.rotation.x < 0) mesh.rotation.x += Math.PI * 2;
                //     if(mesh.rotation.x < Math.PI / 2){
                //         checkNum = Math.PI / 2;
                //     }else if(mesh.rotation.x < Math.PI) {
                //         checkNum = Math.PI;                        
                //     }else if(mesh.rotation.x < 3 * Math.PI / 2) {
                //         checkNum = 3 * Math.PI / 2;                        
                //     }else if(mesh.rotation.x < 2 * Math.PI) {
                //         checkNum = 2 * Math.PI;                        
                //     }
                //     if(closeTo(mesh.rotation.x, checkNum, rotatingSpeed)) {
                //         rotating = false;
                //     }
                // }                
                // if(mesh.rotation.x == 0 && mesh.rotation.z == Math.PI / 2) {
                //     mesh.rotation.y -= rotatingSpeed;
                //     if(mesh.rotation.y > 2 * Math.PI) mesh.rotation.y -= 2 * Math.PI;
                //     if(mesh.rotation.y < 0) mesh.rotation.y += Math.PI * 2;
                //     if(mesh.rotation.y < Math.PI / 2){
                //         checkNum = Math.PI / 2;
                //     }else if(mesh.rotation.y < Math.PI) {
                //         checkNum = Math.PI;                        
                //     }else if(mesh.rotation.y < 3 * Math.PI / 2) {
                //         checkNum = 3 * Math.PI / 2;                        
                //     }else if(mesh.rotation.y < 2 * Math.PI) {
                //         checkNum = 2 * Math.PI;                        
                //     }
                //     if(closeTo(mesh.rotation.y, checkNum, rotatingSpeed)) {
                //         rotating = false;
                //     }
                // }
                // if(mesh.rotation.x == Math.PI && mesh.rotation.z == Math.PI / 2) {
                //     mesh.rotation.y -= rotatingSpeed;
                //     if(mesh.rotation.y > 2 * Math.PI) mesh.rotation.y -= 2 * Math.PI;
                //     if(mesh.rotation.y < 0) mesh.rotation.y += Math.PI * 2;
                //     if(mesh.rotation.y < Math.PI / 2){
                //         checkNum = Math.PI / 2;
                //     }else if(mesh.rotation.y < Math.PI) {
                //         checkNum = Math.PI;                        
                //     }else if(mesh.rotation.y < 3 * Math.PI / 2) {
                //         checkNum = 3 * Math.PI / 2;                        
                //     }else if(mesh.rotation.y < 2 * Math.PI) {
                //         checkNum = 2 * Math.PI;                        
                //     }
                //     if(closeTo(mesh.rotation.y, checkNum, rotatingSpeed)) {
                //         rotating = false;
                //     }
                // }
                // if(mesh.rotation.x == 0 && mesh.rotation.z == 3 * Math.PI / 2) {
                //     mesh.rotation.y += rotatingSpeed;
                //     if(mesh.rotation.y > 2 * Math.PI) mesh.rotation.y -= 2 * Math.PI;
                //     if(mesh.rotation.y < 0) mesh.rotation.y += Math.PI * 2;
                //     if(mesh.rotation.y < Math.PI / 2){
                //         checkNum = Math.PI / 2;
                //     }else if(mesh.rotation.y < Math.PI) {
                //         checkNum = Math.PI;                        
                //     }else if(mesh.rotation.y < 3 * Math.PI / 2) {
                //         checkNum = 3 * Math.PI / 2;                        
                //     }else if(mesh.rotation.y < 2 * Math.PI) {
                //         checkNum = 2 * Math.PI;                        
                //     }
                //     if(closeTo(mesh.rotation.y, checkNum, rotatingSpeed)) {
                //         rotating = false;
                //     }
                // }
                // if(mesh.rotation.x == Math.PI && mesh.rotation.z == 3 * Math.PI / 2) {
                //     mesh.rotation.y += rotatingSpeed;
                //     if(mesh.rotation.y > 2 * Math.PI) mesh.rotation.y -= 2 * Math.PI;
                //     if(mesh.rotation.y < 0) mesh.rotation.y += Math.PI * 2;
                //     if(mesh.rotation.y < Math.PI / 2){
                //         checkNum = Math.PI / 2;
                //     }else if(mesh.rotation.y < Math.PI) {
                //         checkNum = Math.PI;                        
                //     }else if(mesh.rotation.y < 3 * Math.PI / 2) {
                //         checkNum = 3 * Math.PI / 2;                        
                //     }else if(mesh.rotation.y < 2 * Math.PI) {
                //         checkNum = 2 * Math.PI;                        
                //     }
                //     if(closeTo(mesh.rotation.y, checkNum, rotatingSpeed)) {
                //         rotating = false;
                //     }
                // }

                // if(mesh.rotation.x == 0 && mesh.rotation.y == Math.PI / 2) {
                //     mesh.rotation.z -= rotatingSpeed;
                //     if(mesh.rotation.z > 2 * Math.PI) mesh.rotation.z -= 2 * Math.PI;
                //     if(mesh.rotation.z < 0) mesh.rotation.z += Math.PI * 2;
                //     if(mesh.rotation.z < Math.PI / 2){
                //         checkNum = Math.PI / 2;
                //     }else if(mesh.rotation.z < Math.PI) {
                //         checkNum = Math.PI;                        
                //     }else if(mesh.rotation.z < 3 * Math.PI / 2) {
                //         checkNum = 3 * Math.PI / 2;                        
                //     }else if(mesh.rotation.z < 2 * Math.PI) {
                //         checkNum = 2 * Math.PI;                        
                //     }
                //     if(closeTo(mesh.rotation.z, checkNum, rotatingSpeed)) {
                //         rotating = false;
                //     }
                // }
                // if(mesh.rotation.x == Math.PI && mesh.rotation.y == Math.PI / 2) {
                //     mesh.rotation.z -= rotatingSpeed;
                //     if(mesh.rotation.z > 2 * Math.PI) mesh.rotation.z -= 2 * Math.PI;
                //     if(mesh.rotation.z < 0) mesh.rotation.z += Math.PI * 2;
                //     if(mesh.rotation.z < Math.PI / 2){
                //         checkNum = Math.PI / 2;
                //     }else if(mesh.rotation.z < Math.PI) {
                //         checkNum = Math.PI;                        
                //     }else if(mesh.rotation.z < 3 * Math.PI / 2) {
                //         checkNum = 3 * Math.PI / 2;                        
                //     }else if(mesh.rotation.z < 2 * Math.PI) {
                //         checkNum = 2 * Math.PI;                        
                //     }
                //     if(closeTo(mesh.rotation.z, checkNum, rotatingSpeed)) {
                //         rotating = false;
                //     }
                // }
                // if(mesh.rotation.x == 0 && mesh.rotation.y == 3 * Math.PI / 2) {
                //     mesh.rotation.z += rotatingSpeed;
                //     if(mesh.rotation.z > 2 * Math.PI) mesh.rotation.z -= 2 * Math.PI;
                //     if(mesh.rotation.z < 0) mesh.rotation.z += Math.PI * 2;
                //     if(mesh.rotation.z < Math.PI / 2){
                //         checkNum = Math.PI / 2;
                //     }else if(mesh.rotation.z < Math.PI) {
                //         checkNum = Math.PI;                        
                //     }else if(mesh.rotation.z < 3 * Math.PI / 2) {
                //         checkNum = 3 * Math.PI / 2;                        
                //     }else if(mesh.rotation.z < 2 * Math.PI) {
                //         checkNum = 2 * Math.PI;                        
                //     }
                //     if(closeTo(mesh.rotation.z, checkNum, rotatingSpeed)) {
                //         rotating = false;
                //     }
                // }
                // if(mesh.rotation.x == Math.PI && mesh.rotation.y == 3 * Math.PI / 2) {
                //     mesh.rotation.z += rotatingSpeed;
                //     if(mesh.rotation.z > 2 * Math.PI) mesh.rotation.z -= 2 * Math.PI;
                //     if(mesh.rotation.z < 0) mesh.rotation.z += Math.PI * 2;
                //     if(mesh.rotation.z < Math.PI / 2){
                //         checkNum = Math.PI / 2;
                //     }else if(mesh.rotation.z < Math.PI) {
                //         checkNum = Math.PI;                        
                //     }else if(mesh.rotation.z < 3 * Math.PI / 2) {
                //         checkNum = 3 * Math.PI / 2;                        
                //     }else if(mesh.rotation.z < 2 * Math.PI) {
                //         checkNum = 2 * Math.PI;                        
                //     }
                //     if(closeTo(mesh.rotation.z, checkNum, rotatingSpeed)) {
                //         rotating = false;
                //     }
                // }
                
            }else if(whichDir == 3) {

            }
        }
        
        // mesh.position.z = -44;
        // mesh.rotation.x += 0.01;
        // mesh.rotation.y -= 0.01;
        // mesh.position.x = Math.sin(time / 300) * 80;
        // mesh.position.y = Math.sin(time / 1000) * 50;
    }
    // {
    //     const mesh = scene[1];
    //     // mesh.rotation.x += 0.01;
    //     // mesh.rotation.y -= 0.01;
    //     // mesh.position.x = Math.sin(time / 500) * 80;
    //     mesh.position.y = Math.sin(time / 600) * 10;
    //     mesh.position.z = Math.cos(time / 1000) * 100 + 0;
    
    // }
    renderer(scene, camera);
    requestAnimationFrame(animate);
}

animate(0);