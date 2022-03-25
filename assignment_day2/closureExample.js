function closureExample(choice){
    let sum = 0;
    return{
        add:function(a){
            sum += a;
        },
        sub:function(a){
            sum -= a;
        },
        inc:function(){
            sum += 1;
        },
        dec:function(){
            sum -= 1;
        },
        print:function(){
            console.log(sum);
        }
    }
};

let instance = closureExample();
instance.inc();
instance.print();
instance.inc();
instance.print();
instance.add(2);
instance.print();
instance.add(10);
instance.print();