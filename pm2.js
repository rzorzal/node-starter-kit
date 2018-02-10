var pm2 = require('pm2');

var instances = process.env.WEB_CONCURRENCY || -1;
var maxMemory = process.env.WEB_MEMORY || 512;

console.log(`Starting server with ${instances} instances and ${maxMemory}M of memory.`);
console.log(`You should see ${instances} random numbers logged.`);

var options = {
    name: 'webapp',
    script: 'bin/www',
    exec_mode: 'cluster',
    instances: instances,
    max_memory_restart : `${maxMemory}M`,
};

require(`${process.cwd()}/utils/syncDataBase.js`)().then(function(){
    pm2.connect((err) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        pm2.start(options, (err) => {
            if (err) return console.error('Error while launching applications', err.stack || err);
            console.log('PM2 and application has been succesfully started');

            // Display logs in standard output
            pm2.launchBus((err, bus) => {
                console.log('[PM2] Log streaming started');

                bus.on('log:out', function(packet) {
                    console.log('[%s] [App:%s] %s',packet.process.pm_id, packet.process.name, packet.data);
                });

                bus.on('log:err', function(packet) {
                    console.error('[%s] [App:%s][Err] %s',packet.process.pm_id, packet.process.name, packet.data);
                });
            });
        });
    });
}).catch(function(err){
    console.log(err);
    console.log("ERROR ON SYNCING A DATABASE FROM PRODUCTION ENV");
});
