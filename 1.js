const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err,data) =>{
    if(err){
        console.error(err);
        return
    }

    let result = '';
    let commands = data.split('\r\n');
    let queue = [];
    let head = 0;

    for(let i = 0; i < commands.length; i++){
        if(commands[i] === 'exit'){
            result += 'bye';
            break
        }

        switch(commands[i]){
            case `push ${commands[i].slice(5)}` :
                queue.push(commands[i].slice(5));
                result += 'ok\n';
                break
            case `pop`:
                if(queue.length-head > 0){
                    result += queue[head] +'\n';
                    head += 1;
                }else{result += 'error\n'}
                break
            case `front`:
                if(queue.length-head > 0){
                    result += queue[head]+'\n';
                }else{result += 'error\n'}
                break
            case `size`:
                result += queue.length-head+'\n';
                break
            case `clear`:
                queue = [];
                head = 0;
                result += 'ok\n';
                break                
        }
    }

    fs.writeFile('output.txt', result.toString(), err =>{
        if(err){
            console.error(err);
            return
        }
    })
})