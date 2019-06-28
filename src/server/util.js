function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

let roles = [0, 0, 0, 0, 1, 1, 1, 1, 2, 3, 4, 5];
let shuffled_roles = shuffle(roles);
module.exports = shuffled_roles;