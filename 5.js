const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err,data) =>{
    if(err){
        console.error(err);
        return
    }

    let arrLen = data.split('\r\n')[0];
    let arrToSort = data.split('\r\n')[1].split(' '); 
    let result = '';
    let heap = [];
    let child = 0;
    let parent = 0;
    let id = 0;

    for(let i = 0; i < arrLen; i++){  
        heap.push(+arrToSort[i]);  
        child = heap.at(-1);
        id = heap.length - 1;
        parent = heap[Math.floor((id - 1)/2)];
        while(child < parent){
            heap[Math.floor((id - 1)/2)] = child;
            heap[id] = parent;
            id = Math.floor((id - 1)/2);
            child = heap[id] ;
            parent = heap[Math.floor((id - 1)/2)]
            }
    }

    for(let i = 0; i < arrLen; i++){
        result += heap[0] + ' ';
        heap[0] = heap.at(-1);
        id = 0;
        while(heap[2*id + 1]){
            if(heap[2*id + 2]){
                parent = heap[id];
                if(parent <= heap[2*id+1] && parent <= heap[2*id+2]){
                    break
                }
                if(heap[2*id + 1] > heap[2*id + 2]){
                    heap[id]  = heap[2*id+2];
                    heap[2*id + 2] = parent;
                    id = 2*id + 2;
                }else{
                    heap[id] = heap[2*id+1];
                    heap[2*id + 1] = parent;
                    id = 2*id + 1;
                }
            }else{
                if(heap[id] > heap[2*id + 1]){
                    heap[id] = heap[2*id + 1];  
                }
                break
            }
        }

        heap.pop()
    }


    fs.writeFile('output.txt', result.toString(), err =>{
        if(err){
            console.error(err);
            return
        }
    })
})