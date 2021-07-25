randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

gen_key = (p) => {
    var key = this.randomInt(Math.pow(10, 20), p);
    while(this.gcd(p, key) != 1)
        key = this.randomInt(Math.pow(10, 20), p);
    return key
}

gcd = (a, b) => {
    if(a < b)
        return this.gcd(b, a);
    else{
        if(a % b == 0)
            return b;
        return this.gcb(b, a % b);
    }
}

power = (a, b, c) => {
    var x = 1;
    var y = a;
    while(b > 0){
        if(b % 2 == 0)
            x = (x * y) % c;
        y = (y*y) % c;
        b = Math.round(b/2);
        return x%c
    }
}