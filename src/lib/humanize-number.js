export default function humanizeNumber(number) {

    let humanized = number;
    let unit = "";

    const unitsInc = 1000;
    const units    = [ "K", "M" ];

    let unitIndex = 0;

    while (humanized >= unitsInc && unitIndex < units.length) {
        unit = units[unitIndex];

        humanized /= unitsInc;

        unitIndex++;
    }

    return {
        humanized,
        unit
    };
}
