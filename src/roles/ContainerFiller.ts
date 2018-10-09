export class ContainerFiller {
    public static run(creep: Creep) {
        if ( creep.carry.energy === 0 ) {
            creep.memory.transferring = false;
        }

        if ( !creep.memory.transferring && creep.carry.energy !== 0 ) {
            creep.memory.pickingUp = true;
            creep.memory.pickingUpTicks += 1;
        }

        if ( creep.memory.pickingUpTicks > 5 ) {
            creep.memory.pickingUp = false;
        }

        if(creep.carry.energy < creep.carryCapacity && !creep.memory.transferring && !creep.memory.pickingUp) {
            let droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            if ( droppedEnergy ) {
                if ( creep.pickup(droppedEnergy) === ERR_NOT_IN_RANGE ) {
                    creep.moveTo(droppedEnergy, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                else {
                    creep.memory.pickingUpTicks = 0;
                }
            }
        }
        else if ( creep.memory.pickingUp && !(creep.carry.energy === creep.carryCapacity)) {
            let droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            if ( droppedEnergy ) {
                if ( creep.pickup(droppedEnergy) === OK ) {
                    creep.memory.pickingUpTicks = 0;
                }
            }
        }
        else {
            creep.memory.pickingUpTicks = 0;
            creep.memory.pickingUp = false;
            let availableContainers = _.filter(Memory.storage, (obj: StorageMemory) => obj.storageType === RESOURCE_ENERGY);
            if ( availableContainers && availableContainers.length > 0 ) {
                creep.memory.transferring = true;

                let targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        for ( let containerIdx in availableContainers ) {
                            if ( availableContainers[containerIdx].id === structure.id ) {
                                return true;
                            }
                        }
                        return false;
                    }
                });

                let closest = creep.pos.findClosestByPath(targets, {filter: (structure: AnyContainer) => structure.store[RESOURCE_ENERGY] === undefined || structure.store[RESOURCE_ENERGY] < structure.storeCapacity})
                if(creep.transfer(closest!, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closest!, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
}
