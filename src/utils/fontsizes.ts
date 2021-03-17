export const getFontSize = (size: number, scale: number = 1) => {
    let fontSize
    if (scale == 1)
        fontSize = `${size}px`;
    else
        fontSize = `${size * (1 + (scale / 10))}px`;

    return fontSize;
}