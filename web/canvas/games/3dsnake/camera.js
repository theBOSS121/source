function perspective(point, distance) {
    // if(point.z > -51) {
    //     const fov = point.z + distance;
    //     point.x /= fov;
    //     point.y /= fov;
    // }else {        
        const fov = point.z + distance;
        point.x /= fov;
        point.y /= fov;
    // }
}

function zoom(point, factor) {
    const scale = Math.pow(factor, 2);
    point.x *= scale;
    point.y *= scale;
}

export class Camera {
    constructor() {
        this.pos = {z:0};
        this.zoom = 8;
    }

    transform(point) {
        perspective(point, this.pos.z);
        zoom(point, this.zoom);
    }
}