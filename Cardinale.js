const util = require("util")
fs = require("fs")
readdir = util.promisify(fs.readdir)
fs = require("fs");

const Cardinale = require("./base/cardinale"),
    client = new Cardinale({
        partials: ["REACTION", "MESSAGE", "CHANNEL"]
    });

const init = async () => {
    let directories = await readdir("./commands/");
    directories.forEach(async (dir) => {
        let commands = await readdir("./commands/" + dir + "/");
        commands.filter((cmd) => cmd.split(".").pop() === "js").forEach((cmd) => {
            const response = client.loadCommand("./commands/" + dir, cmd);
            if (response) {
                console.log(response, "error");
            }
        });
    });

    const evtFiles = await readdir("./events/");
    evtFiles.forEach((file) => {
        const eventName = file.split(".")[0];
        const event = new (require(`./events/${file}`))(client);
        client.on(eventName, (...args) => event.run(...args));
        delete require.cache[require.resolve(`./events/${file}`)];
    });

    client.login(client.config.token);
};

init();

