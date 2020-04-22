import {GameEntity} from "../../libraries/yuka-master/src/yuka.js";
import {sleep, degToRad } from "../Global.js";

class Entity extends GameEntity {
    constructor(position, name){
        super();
        //Set position of entity
        this.position = position;
        //TODO: Enforce uniqueness of entity ID
        this.name = name;
        //Represents Action points (AP)
        this.ap = 0;
        //AP remaining for turn.
        this.remainingAP = 0;
        //Build mesh from provided geometry and material, can add to scene in rest of code
        //this.mesh = THREE.Mesh(model, texture);
        /*
        this.mesh = new THREE.Mesh(model,
                    new THREE.MeshBasicMaterial({ map: texture }));
        */
    }

    //Function moves player to a given position. Only call after validation.
    //TODO: Play animations to move along path rather than jumping to set location.
    moveEntity(x, y, z) {
        this.position[0] = x;
        this.position[1] = y;
        this.position[2] = z;
        this.model.position.set(x,y,z);
    }

    //Helper method to rotate the entity slowly over time (WIP)
    async rotateEntity(rotationGoal) {
        console.log("ROTATING TO: " + rotationGoal);
        //Set currentRotation and rotationGoal such that they are 360 degrees instead of 0
        let currentRotation = this.model.rotation.y;
        if(this.model.rotation.y == 0) {
            currentRotation = degToRad(360);
        }
        if(rotationGoal == 0) {
            rotationGoal = 360;
        }
        //calculate rotation and slowly rotate model
        let rotationTotal = degToRad(rotationGoal) - currentRotation;
        if(Math.abs(rotationTotal) > 3.1415926535) {
            rotationTotal *= -1;
            rotationTotal = 2*3.1415926535 - rotationTotal;
        }
        console.log("APPLYING TOTAL ROTATION: " + rotationTotal);

        let rotationIncrement = rotationTotal / 10.0;
        for(let j = 0; j < 10 && this.model.rotation.y != degToRad(rotationGoal); j++) {
            if(Math.abs(rotationTotal) >= 3.1415926535) {
                this.model.rotation.y -= rotationIncrement;
            }
            else {
                this.model.rotation.y += rotationIncrement;
            }
            await sleep(1);
        }
        this.model.rotation.y = degToRad(rotationGoal);
    }

    //A method to check an entity's AP and decrement it with each move or action the entity takes
    decrementAP() {
        if(this.remainingAP > 0) {
            let reportAP = this.remainingAP;
            this.remainingAP--;
            return reportAP;
        }
        else {
            return null;
        }
    }

    //Resets entity's AP to default at start of turn
    resetAP() {
        this.remainingAP = this.ap;
    }
}

export {Entity};