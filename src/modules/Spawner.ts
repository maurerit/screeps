/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('module.spawner');
 * mod.thing == 'a thing'; // true
 */
import {spawnConfiguration} from "./configuration/ManualConfiguration";

export class Spawner {
    public static run(spawn: StructureSpawn) {
        const roomConfiguration = spawnConfiguration(spawn);
        for ( const workerType in roomConfiguration!.workers ) {
            const workerConfig = roomConfiguration!.workers[workerType];// .get(workerType);
            const workerMemory = workerConfig!.memory;
            const theseWorkers = spawn.room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.role === workerMemory.role});

            if ( theseWorkers && theseWorkers.length < workerConfig.number ) {
                for ( let idx = 0; idx < workerConfig.number; idx++ ) {
                    spawn.spawnCreep(workerConfig.body as BodyPartConstant[], workerConfig.nameTemplate.replace('{number}', idx.toString()), { memory: workerMemory });
                }
            }
        }
    }
}
