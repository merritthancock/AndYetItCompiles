import {createTestLevel} from "../assets/LevelMaps/TestLevel.js";
import {updateRender} from "../RenderTasks.js";
import {doKeyUp, doKeyDown} from "../KeyboardInput.js";
import {buildCamera} from "./Camera.js";

// declare letiables
let windowWidth;
let windowHeight;
let camera;
let cameraControls;
let renderer;
let scene;
let board;
//just for renderTask to compile
let movementUnlocked;
//Game setup tasks-----------------------------------------------
//Sets height and width for game window
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;

//Creates renderer and adds it to document body
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(windowWidth, windowHeight);
document.body.appendChild(renderer.domElement);

//set listener for window resizing. Allows resizing of game.
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
});

//Adds event listeners to document
document.addEventListener('keyup', doKeyUp, false);
document.addEventListener('keydown', doKeyDown, false);
//----------------------------------------------------------------


function setupLevel(){
    camera = new THREE.PerspectiveCamera(45, windowWidth / windowHeight, 0.1, 10000);
    cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
    camera.position.y = 20;
    camera.position.z = 20;
  
    //Construct board object
    board = createTestLevel();
    
    // create scene object
    scene = new THREE.Scene;
    loadLevel(scene, board);
  
     // add to scene and renderer
     scene.add(camera); 
     camera.lookAt(board.tileArray[0][0].position);  
     buildCamera();

     animate();
}

//loadLevel accepts a scene and board as parameters.
//It searches the board for all terrain, enemy, and player meshes and adds them to the scene.
function loadLevel(scene, board) {
    for(let i = 0; i < board.tileArray.length; i++){
        for(let j = 0; j < board.tileArray[0].length; j++){
            if(board.tileArray[i][j].terrain != null){
                scene.add(board.tileArray[i][j].terrain);
                scene.add(board.overlayMap[i][j].overlay);
            }
        }
    }

    // create lighting and add to scene 
    let light = new THREE.AmbientLight( 0xe0e0e0 ); // soft white light
    scene.add(light);

    //Set up the skybox
    let sky = new THREE.TextureLoader().load( './assets/Slimegamesky.jpg' );
    let skyboxGeometry = new THREE.CubeGeometry(100, 100, 100);
    let skyboxMaterial = new THREE.MeshBasicMaterial({  map: sky, side: THREE.BackSide });
    let skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    scene.add(skybox);

    //add player to the scene
    scene.add(board.player.mesh);
    //add cursor to the scene
    scene.add(board.cursor.mesh);
    //add enemy to the scene //TODO: Add array compatibility for board
    scene.add(board.enemies.mesh);

}

function renderLevel() {
    cameraControls.update();
    renderer.render(scene, camera);
    updateRender(board);
}

function animate() {
    requestAnimationFrame(animate);
    renderLevel();
}

setupLevel();

export {movementUnlocked};
export {scene};
export {camera};
export {cameraControls};
export {board};