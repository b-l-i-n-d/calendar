export const generateRandomColor = () => {
    const allowed = "0369cf".split("");
    let s = "#";
    while (s.length < 4) {
        s += allowed.splice(Math.floor(Math.random() * allowed.length), 1);
    }
    return s;
};
