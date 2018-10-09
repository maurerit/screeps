export class Upgrader {
    public static run(creep: Creep) {
        if(creep.memory.upgrading && creep.carry.energy === 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 fillup');
        }
        if(!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller!) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller!.pos, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            let availableContainers = _.filter(Memory.storage, (obj: StorageMemory) => obj.storageType === RESOURCE_ENERGY && obj.extractable);
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

            let closest = creep.pos.findClosestByRange(possibleTargets, {filter: (structure: AnyContainer) => structure.store && structure.store[RESOURCE_ENERGY] > 0})
            if(creep.withdraw(closest!, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(closest!, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
}
