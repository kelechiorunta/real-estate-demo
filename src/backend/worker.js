let i = 0;

function timer(){
    i++;
    postMessage(i);
    setTimeout(timer, 1000)
}

timer();