import {Spawner} from "modules/Spawner";
import {Builder} from "roles/Builder";
import {ContainerFiller} from "roles/ContainerFiller";
import {Harvester} from "roles/Harvester";
import {Upgrader} from "roles/Upgrader";
import {ErrorMapper} from "utils/ErrorMapper";
import {RoomEnergyHauler} from "./roles/RoomEnergyHauler";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
    console.log(`Current game tick is ${Game.time}`);

    // Automatically delete memory of missing creeps
    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
        }
    }

    let towers = Game.rooms['E46N68'].find(FIND_MY_STRUCTURES, {filter: (structure) => structure.structureType === STRUCTURE_TOWER})
    if(towers.length) {
        for ( let towerIdx in towers ) {
            let tower = towers[towerIdx] as StructureTower;

            // let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            // if(closestHostile) {
            //     tower.attack(closestHostile);
            // }
            // else {
            let structures = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.hits < 250000
            });
            if(structures) {
                structures.sort((s1, s2) => s1.hits - s2.hits)
                tower.repair(structures[0]);
            }
            // }
        }
    }

    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if(creep.memory.role.includes('harvester')) {
            Harvester.run(creep);
        }

        if ( creep.ticksToLive! < 2 ) {
            creep.drop(RESOURCE_ENERGY);
        }

        /*if(creep.memory.role === 'upgrader' && Game.spawns['Spawn1'].room.energyAvailable < Game.spawns['Spawn1'].room.energyCapacityAvailable) {
            roleHarvester.run(creep);
        }
        else */if ( creep.memory.role === 'upgrader') {
            Upgrader.run(creep);
        }

        if(creep.memory.role === 'builder') {
            Builder.run(creep);
        }

        if ( creep.memory.role === 'roomEnergyHauler' ) {
            RoomEnergyHauler.run(creep);
        }

        if ( creep.memory.role === 'containerFiller' ) {
            ContainerFiller.run(creep);
        }
    }
    
    Spawner.run(Game.spawns.Spawn1);
});
