const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err,data) =>{
    if(err){
        console.error(err);
        return
    }

    let result = 'botva';
    let decks = data.split('\n');
    console.log(decks[0]);
    console.log(decks[1]);
    decks[0] = decks[0].split(' ').join('').split('');
    decks[1] = decks[1].split(' ').join('').split('');

    for(i = 0; i < 10^6; i++){
        if(decks[0].length - i === 0){
            result = `second ${i}`;
            break
        }else{
            if(decks[1].length - i === 0){
                result = `first ${i}`;
                break
            }
        }
        if(decks[0][i] > decks[1][i]){
            if(decks[0][i] === '9' && decks[1][i] === '0'){
                decks[1].push(decks[0][i],decks[1][i]);
            }else{
                decks[0].push(decks[0][i],decks[1][i]);
            }
        }else{
            if(decks[1][i] === '9' && decks[0][i] === '0'){
                decks[0].push(decks[0][i],decks[1][i]);
            }else{
                decks[1].push(decks[0][i],decks[1][i]);
            }
        }
    }


    fs.writeFile('output.txt', result.toString(), err =>{
        if(err){
            console.error(err);
            return
        }
    })
})