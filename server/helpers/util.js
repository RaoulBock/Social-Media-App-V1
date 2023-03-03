const fs = require("fs");

const utils = {};

/**
 * Get the keys associated with object literal--none sequential object reference.
 * @param {*} dataset 
 * @param {*} skips 
 * @param {*} clean 
 * @returns 
 */
utils.get_keys = (dataset, skips, clean = false) => {
    let keys = [];
    try {
        for (const [key] of Object.entries(dataset)) {
            if (skips) {
                let skipKeyVal = false;
                skips.forEach((m) => {
                    if (m === key) skipKeyVal = true;
                });
                if (skipKeyVal) continue;
            }
            keys.push(clean ? `${key.replaceAll("_", " ")}.` : key);
        }
    } catch (ex) { }
    return keys;
};

/**
 * Get truly random number with the current timestamp.
 * @returns 
 */
utils.get_pseudo_random = () => {
    const date = new Date();
    return (Math.floor(Math.random() * 100000000) + 1) + date.getTime();
}

utils.generate_file = ({ key, query }) => {
    if (query[key].includes("data:")) {
        const ext = utils.get_file_extension({ base64: query[key] });
        const fileName = `./public/images/courses/CS${utils.get_pseudo_random()}.${ext}`;

        let base64File = query[key].split(';base64,').pop();

        fs.writeFile(fileName, base64File, { encoding: 'base64' }, function (err) {
            console.log({
                uploadMessage: `Auto upload triggered for [${fileName}]`
            }, { errors: err });
        });

        const url = fileName.replace("./public/", "https://services.appsuits.org:9443/");
        query[key] = url;
    }
    return query;
}

utils.get_file_extension = ({ base64 }) => {
    const parts = base64.split(";");

    let ext = parts[0].split("/")[1];

    // Provision for zip files.
    if (ext === "x-zip-compressed") {
        return "zip";
    }

    return ext;
}

module.exports = { utils };