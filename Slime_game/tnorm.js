function zTerrain(id){ //Zero terrain (death pitfall)
    var id = -1;
    //to be implemented
}

function nTerrain(x, z){ //Normal terrain (no restrictions)
    var id = 0;
    grassN = new THREE.Mesh(new THREE.PlaneGeometry(1,1), //a tile of normal that appears as grass
             new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('./assets/grass.jpg') })
    );
    grassN.rotation.x -= Math.PI / 2;
    grassN.position.set(x, 0, z);
    scene.add(grassN);
}

function uTerrain(x, z){ //Untraversable rocky terrain
    var id = 1;
    rocksU = new THREE.Mesh(new THREE.PlaneGeometry(1,1), //a tile of normal that appears as rocky mountains
             new THREE.MeshBasicMaterial({ color: 0xDEB887, wireframe: false})
    );
    rocksU.rotation.x -= Math.PI / 2;
    rocksU.position.set(x, 0, z);
    scene.add(rocksU);
}

function wTerrain(x, z){ //Untraversable water terrain
    var id = 2;
    waterU = new THREE.Mesh(new THREE.PlaneGeometry(1,1), //a tile of normal that appears as water
             new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('./assets/water.jpg')})
    );
    waterU.rotation.x -= Math.PI / 2;
    waterU.position.set(x, 0, z);
    scene.add(waterU);
}
