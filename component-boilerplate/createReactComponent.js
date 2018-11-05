var fs = require('fs');
var mkdirp = require('mkdirp');
var replace = require('replace');
var config = require('./config.json');

const name = process.argv[2];
const stateFlag = process.argv[3];
let state;

if (stateFlag !== null) {
    if (stateFlag === "state") {
        state = true;
    } else if (stateFlag === "stateless") {
        state = false;
    } else {
        throw new Error("state or stateless for this argument");
    }
}

const dir = 'src/' + name;

const tsName = name + ".tsx";

const filePath = dir + '/' + tsName;
if (!fs.existsSync(dir)){
    mkdirp(dir, err => {
        if (err) {
            throw err;
        } else {
            const template = state ? "StatefulComponent.txt" : "StatelessComponent.txt";

            fs.copyFile("component-boilerplate/" + template, filePath, err => {
                if (err) throw err;
                else {
                    const placeHolder = config.namePlaceholder;
                    console.log(placeHolder);
                    replace({
                        regex: placeHolder,
                        replacement: name,
                        paths: [filePath],
                        recursive: true,
                        silent: false,
                    });
                }
            });
        }
    });
} else {
    throw new Error("THe directory for this component already exists")
}

