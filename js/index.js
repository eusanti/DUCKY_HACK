window.onload = () => {
    let first = true;
    document.getElementById('start').onclick = (e) => {
        e.currentTarget.disabled = true
        if (first) {
            game.init();//inicia el game.js
            first = false;
        }
        else game.reset();

    }
}