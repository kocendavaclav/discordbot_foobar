const fs = require('fs');

module.exports = (client, Discord) => {
    const button_files = fs.readdirSync('./interactions/buttons').filter(file => file.endsWith('.js'));

    for (const file of button_files) {
        const button = require(`../interactions/buttons/${file}`)
        if (button.name) {
            console.log(`Getting button ${button.name}`);
            client.buttons.set(button.name, button);
        } else {
            continue;
        }
    }

}