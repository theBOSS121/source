export let left = false;
export let right = false;
export let up = false;
export let down = false;

export function startListeners() {
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
}

function keyDown(key) {
    if(key.key == 'w') {
        up = true;
        down = false;
    }else if(key.key == 's') {
        down = true;
        up = false;
    }else if(key.key == 'a') {
        left = true;
        right = false;
    }else if(key.key == 'd') {
        right = true;
        left = false;
    }
}

function keyUp(key) {
    if(key.key == 'w') {
        up = false;
    }else if(key.key == 's') {
        down = false;
    }else if(key.key == 'a') {
        left = false;
    }else if(key.key == 'd') {
        right = false;
    }
}