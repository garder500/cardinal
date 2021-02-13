const { ShardingManager } = require('discord.js');
const config = require("./config");
const manager = new ShardingManager('./Cardinale.js', { token: config.token, totalShards: config.shard });

manager.spawn();
manager.on('shardCreate', shard => console.log(`Shard ${shard.id} ready !`));