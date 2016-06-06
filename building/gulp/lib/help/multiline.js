export default function multilineHelp(lines) {

    const alignment = " ".repeat(10);

    return lines.join("\n" + alignment);
}
