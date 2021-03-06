import {Level} from "../Level.js";
import { Milcap } from "../Entities/Enemies/Milcap.js";
import {Verm} from "../Entities/Enemies/Verm.js"
import {Pinpod} from "../Entities/Enemies/Pinpod.js";
import {Player} from "../Entities/Player.js";
import {Cursor} from "../Entities/Cursor.js";

function buildLevel2() {
    let tileMap = [
        [9, 9, 9, 9, 9, 9, 9, 1, 4, 4, 4, 4, 4, 4, 1, 9, 9, 9, 9, 9, 9, 9,],
        [9, 9, 9, 9, 9, 9, 1, 1, 0, 4, 4, 4, 4, 0, 1, 1, 9, 9, 9, 9, 9, 9,],
        [9, 9, 9, 9, 9, 9, 1, 0, 0, 0, 4, 4, 0, 0, 0, 1, 9, 9, 9, 9, 9, 9,],
        [9, 9, 9, 9, 9, 9, 1, 0, 0, 0, 8, 8, 0, 0, 0, 1, 9, 9, 9, 9, 9, 9,],
        [9, 9, 9, 9, 9, 9, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 9, 9, 9, 9, 9, 9,],
        [9, 9, 9, 9, 9, 9, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 9, 9, 9, 9, 9, 9,],
        [9, 9, 9, 9, 9, 9, 9, 1, 0, 0, 0, 0, 0, 0, 1, 9, 9, 9, 9, 9, 9, 9,],
        [9, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 9,],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
        [1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,],
        [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1,],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,],//mid 16
        [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
        [1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1,],
        [9, 9, 9, 9, 9, 9, 1, 0, 0, 0, 0, 0, 0, 1, 9, 1, 1, 0, 0, 1, 9, 9,],
        [9, 9, 9, 9, 9, 1, 1, 0, 0, 0, 0, 0, 0, 1, 9, 9, 1, 1, 0, 1, 9, 9,],//q3 23
        [9, 9, 9, 9, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 9, 9, 9, 1, 1, 1, 9, 9,],
        [9, 9, 9, 9, 1, 1, 1, 1, 1, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,]
    ];

    let heightMap = [
        [0, 0, 0, 0, 0, 0, 0, 3, 4, 4, 4, 4, 4, 4, 3, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 3, 3, 0, 4, 4, 4, 4, 0, 3, 3, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 4, 4, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0,],
        [0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0,],
        [3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3,],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,],
        [3, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3,],
        [3, 0, 3, 3, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,],
        [3, 0, 3, 3, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3,],
        [3, 0, 3, 3, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3,],//mid 16
        [3, 0, 3, 3, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,],
        [3, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3,],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,],
        [3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 3, 3, 3,],
        [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 3, 3, 0, 0, 3, 0, 0,],
        [0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 3, 0, 3, 0, 0,],//q3 23
        [0, 0, 0, 0, 3, 3, 0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 3, 3, 3, 0, 0,],
        [0, 0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0,]
    ];

    //Create Player
    let pPos = [20, 1, 12];
    let player = new Player(pPos, "player", 1);

    //Create Cursor
    let cPos = [20, 1.6, 12];
    let cursor = new Cursor(cPos, "cursor");


    let enemyPos = [12, 4, 3];
    let pinpod1 = new Pinpod(enemyPos, "pinpod1", 1, 2);
    
    let enemies = [pinpod1];

    enemyPos = [15,1,10];
    let verm1 = new Verm(enemyPos, "verm1", 1, 1);
    verm1.path.add([12, 1, 14]);
    verm1.path.add([18, 1, 15]);
    verm1.path.add([17, 1, 12]);
    verm1.path.add([15, 1, 10]);
    verm1.nestLocation = [21,1,6];
    verm1.path.loop = true;
    
    enemies.push(verm1);

    enemyPos = [16,1,16];
    let verm2 = new Verm(enemyPos, "verm2", 1, 1);
    verm2.path.add([15, 1, 19]);
    verm2.path.add([12, 1, 16]);
    verm2.path.add([9, 2, 17]);
    verm2.path.add([16, 1, 16]);
    verm2.nestLocation = [20,1,18];
    verm2.path.loop = true;
    
    enemies.push(verm2);

    enemyPos = [10, 1, 8];
    let milcap1 = new Milcap(enemyPos, "milcap1", 2, 3);
    milcap1.path.add([9, 1, 1]);
    milcap1.path.add([14, 1, 1]);
    milcap1.path.add([17, 1, 6]);
    milcap1.path.add([14, 1, 1]);
    milcap1.path.add([9, 1, 1]);
    milcap1.path.loop = true;

    enemies.push(milcap1);

    enemyPos = [6, 1, 11];
    let milcap2 = new Milcap(enemyPos, "milcap2", 7, 3);
    milcap2.path.add([5, 1, 13]);
    milcap2.path.add([5, 1, 8]);
    milcap2.path.add([6,1,11]);
    milcap2.path.loop = true;

    enemies.push(milcap2);
    let level1 = new Level(heightMap, tileMap, enemies, player, cursor);
    return level1;
}

export {buildLevel2};