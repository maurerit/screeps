export class RoomEnergyHauler {
    public static run(creep: Creep) {
        if ( creep.carry.energy === 0 ) {
            creep.memory.transferring = false;
        }

        if(creep.carry.energy < creep.carryCapacity && !creep.memory.transferring) {
            // let droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            // if ( droppedEnergy ) {
            //     if ( creep.pickup(droppedEnergy) === ERR_NOT_IN_RANGE ) {
            //         creep.moveTo(droppedEnergy, {visualizePathStype: {stroke: '#ffffff'}});
            //     }
            // }
            // else {
            let availableContainers = _.filter(Memory.storage, (obj: StorageMemory) => obj.storageType === RESOURCE_ENERGY);
            let possibleTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    for ( let containerIdx in availableContainers ) {
                        if ( availableContainers[containerIdx].id === structure.id ) {
                            return true;
                        }
                    }
                    return false;
                }
            });

            let closest = creep.pos.findClosestByPath(possibleTargets, {filter: (structure: AnyContainer) => structure.store && structure.store[RESOURCE_ENERGY] > 0})
            if(creep.withdraw(closest!, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(closest!, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            // }
        }
        else {
            creep.memory.transferring = true;
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION ||
                        structure.structureType === STRUCTURE_SPAWN ||
                        structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                let closest = creep.pos.findClosestByPath(targets, {filter: (structure: EnergyStructure) => structure.energy < structure.energyCapacity})
                if(creep.transfer(closest!, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closest!, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                creep.memory.transferring = false;
            }
        }
    }
}
