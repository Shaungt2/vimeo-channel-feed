import chalk from "chalk";

export default function helpEnvVar(name, value = undefined) {

    return value === undefined ?
        chalk.yellow.bold(name) :
        (chalk.yellow.bold(name) + "=" + value);
}
