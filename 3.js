const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err,data)=>{
    if(err){
        console.error(err);
        return;
    }

    let commands = data.split('\r\n');
    let result = '';
    let deque = [];
    let frontArrPointer = 555;
    let backArrPointer = 555;
    let front = 0;
    let back = 0;
    let size = 0;

    for(let i = 0; i < 1111; i++){
        deque.push([]);
    }

    for(let i = 0; i < commands.length; i++){
        if(commands[i] === 'exit'){
            result += 'bye';
            break
        }
        switch(commands[i]){
            case `push_front ${commands[i].slice(11)}`:
                if(!deque[frontArrPointer][front]){
                    deque[frontArrPointer][front] = commands[i].slice(11);
                }else{
                    if(front === 0){
                        frontArrPointer--;
                        front = 99;
                        deque[frontArrPointer][front] = commands[i].slice(11);
                    }else{
                        front--;
                        deque[frontArrPointer][front] = commands[i].slice(11); 
                    }
                }
                size++;
                result += 'ok\n';
                break
            case `push_back ${commands[i].slice(10)}`:
                if(!deque[backArrPointer][back]){
                    deque[backArrPointer][back] = commands[i].slice(10);
                }else{
                    if(back === 99){
                        backArrPointer++;
                        back = 0;
                        deque[backArrPointer][back] = commands[i].slice(10);
                    }else{   
                        back++; 
                        deque[backArrPointer][back] = commands[i].slice(10);
                    }
                }
                size++;
                result += 'ok\n';
                break
            case 'pop_front':
                if(size === 0){
                    result += 'error\n';
                }else{
                    if(front === 99){
                        result += deque[frontArrPointer][front] + '\n';
                        frontArrPointer++;
                        front = 0;
                    }else{
                        result += deque[frontArrPointer][front] + '\n';
                        front++;
                    }
                    size--;
                }
                break
            case 'pop_back':
                if(size === 0){
                    result += 'error\n';
                }else{
                    if(back === 0){
                        result += deque[backArrPointer][back] + '\n';
                        backArrPointer--;
                        back = 99;
                    }else{
                        result += deque[backArrPointer][back] + '\n';
                        back--;
                    }
                    size--;
                }
                break
            case 'front':
                if(size === 0){
                    result += 'error\n';
                }else{
                    result += deque[frontArrPointer][front] + '\n';
                }
                break
            case 'back':
                if(size === 0){
                    result += 'error\n';
                }else{
                    result += deque[backArrPointer][back] + '\n';
                }
                break
            case 'size':
                result += size + '\n';
                break
            case 'clear':
                for(let j = 0; j < 1111; j++){
                    deque[j] = [];
                }
                frontArrPointer = 555;
                backArrPointer = 555;
                front = 0;
                back = 0;
                size = 0;
                result += 'ok\n'
                break
        }
    }
    fs.writeFile('output.txt', result.toString(), err=>{
        if(err){
            console.error(err);
            return;
        }
    })
})