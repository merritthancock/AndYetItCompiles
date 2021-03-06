import {Entity} from "./Entity.js";
import { passTurn } from "../TurnManager.js";
import { currentLevel, sleep, degToRad } from "../Global.js";
import {aStar} from "../Pathing.js";
import {NormState, SpikeState} from "./PlayerAbilities.js";
import { StateMachine } from "../../libraries/yuka-master/src/yuka.js";
import {playMove, playAbsorb, playDeath} from "../Sounds.js";

//Players inherit from Entity
class Player extends Entity {
    constructor(position, id, startingMass){
        //Set up entity object part
        super(position, id);

        //Set URL
        this.url = "SlimeMain.glb";
        this.spikeUrl = "SlimePinpod.glb";

        //Set starting mass and size values
        this.mass = startingMass;
        //Set abilities to an empty set for starters
        this.ability = 'NONE';
        //Set default jump height to 1
        this.jumpHeight = 1;
        this.ap = 2;
        //Set remaining AP initialized to starting AP
        this.remainingAP = this.ap;
        this.canActivateTrigger = true;

        //state machine for player abilities
        this.stateMachine = new StateMachine(this);
        this.stateMachine.add('NORMAL', new NormState());
        this.stateMachine.add('SPIKE', new SpikeState());
        this.stateMachine.changeTo('NORMAL');
        //value for ability uses which will be set upon ability gain
        this.abilityUses = 0;
    }

    //uses current ability or does nothing if no ability (MAPPED TO SPACE)
    update(){
        this.stateMachine.update();
    }

    //Function absorbs enemy, increases mass, takes ability if available
    absorb(enemy){
        this.mass += enemy.mass;
        console.log("ABSORB");
        //play absorb animation
        let index = currentLevel.enemies.indexOf(enemy);
        //remove enemy from board
        enemy.model.visible = false;
        if(enemy.type == 'PINPODSP'){
            enemy.living = 'DEAD';
            enemy.stateMachine.changeTo('HALT');
            currentLevel.board.tileArray[enemy.position[0]][enemy.position[2]].occupant = null;
            //Move player to enemy position
            this.movePlayer(currentLevel.board.tileArray[enemy.position[0]][enemy.position[2]]);
        }
        else{
            currentLevel.enemies.splice(index,1);
            currentLevel.board.tileArray[enemy.position[0]][enemy.position[2]].occupant = null;
            //Move player to enemy position
            this.movePlayer(currentLevel.board.tileArray[enemy.position[0]][enemy.position[2]]);
        }
        
        if(enemy.type == 'PINPOD' || enemy.type == 'PINPODSP'){
            //Swap models
            this.model.visible = false;
            this.spikeModel.visible = true;
            //Add spike ability
            this.abilityUses = 3; //three spike uses
            this.stateMachine.changeTo('SPIKE');
            this.ability = 'SPIKE';
        }
        //Move enemy to "graveyard space"
        enemy.position[0] = -100;
        enemy.position[1] = 0;
        enemy.position[2] = -100;
        playAbsorb();//sounds absorption sound
    }

    async movePlayer(tile) {
        //Get route from A*
        let route = aStar(this.position[0], this.position[2], 
            tile.position[0], tile.position[2], currentLevel.board, currentLevel.player);
        //Original player animations
        let idle = THREE.AnimationClip.findByName( this.animations, 'idle' );
        let move = THREE.AnimationClip.findByName( this.animations, 'move' );
        let idleAction = this.mixer.clipAction( idle );
        let moveAction = this.mixer.clipAction( move );
        //Spike form player animations
        let idle2 = THREE.AnimationClip.findByName( this.spikeAnimations, 'idle' );
        let move2 = THREE.AnimationClip.findByName( this.spikeAnimations, 'move' );
        let idleAction2 = this.spikeMixer.clipAction( idle2 );
        let moveAction2 = this.spikeMixer.clipAction( move2 );
        //Move along route given
        for(let i = 1; i < route.length && this.decrementAP() >= 0; i++) {
            await this.rotateEntity(route[i]);
            //Move unit
            this.mixer.stopAllAction();
            this.spikeMixer.stopAllAction();
            moveAction.play();
            moveAction2.play();
            await sleep(160);
            currentLevel.board.tileArray[this.position[0]][this.position[2]].occupant = null;
            this.moveEntity(route[i].tile.position[0], route[i].tile.height + 1, route[i].tile.position[2]);
            currentLevel.board.tileArray[this.position[0]][this.position[2]].occupant = this;
            await sleep(400);
            this.mixer.stopAllAction();
            this.spikeMixer.stopAllAction();
            idleAction.play();
            idleAction2.play();
            playMove();//plays sound when player moves
            await sleep(400);//was 400
        }
        if(tile.occupant.name != "player" && tile.occupant.absorbCheck()) {
            this.absorb(tile.occupant);
        }
        passTurn(currentLevel);
    }

    //Function follows cursor
    followCursor(board){
        board.tileArray[board.player.position[0]][board.player.position[2]].occupant = null;
        board.player.position = [...board.cursor.position]
        board.player.model.position.set(board.cursor.position[0], board.cursor.position[1], board.cursor.position[2]);
        board.tileArray[board.player.position[0]][board.player.position[2]].occupant = board.player;
    }
    
    //player takes damage and loses mass
    takeDamage(damage){
        this.mass -= damage;
        console.log("Damage Taken: ", damage, "Player Health: ", this.mass);

        if(this.mass <= 0){
            console.log("PLAYER IS DEAD");
            playDeath();
            //death animation
            //death screen
            console.log("You died!");
        }
    }

    spikeAttack(damage){
        for(let i = 0; i< currentLevel.enemies.length; i++){
            let xDistance = Math.abs(currentLevel.enemies[i].position[0] - this.position[0]);
            let yDistance = Math.abs(currentLevel.enemies[i].position[2] - this.position[2]);
            if((xDistance <= 1 &&  yDistance == 0) || (yDistance <= 1 && xDistance == 0)){
               let status = currentLevel.enemies[i].takeDamage(damage);
               if (status == 'DEAD'){
                currentLevel.enemies[i].model.visible = false;
                currentLevel.board.tileArray[currentLevel.enemies[i].position[0]][currentLevel.enemies[i].position[2]].occupant = null;
                currentLevel.enemies.splice(i,1);
               }
            }
        }
    }
}

export {Player};