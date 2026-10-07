console.log('start');

async function b(){
    console.log("Mahak");
}

async function a() {
    console.log('a');
    await b();
    console.log('b');
}
console.log('end');
a();

const data= async function print(){
    console.log("a1");

    await console.log("b1");
    await console.log("c1");
    console.log("endFunction");

}
data();
console.log("after");

// o/p :
// start
// end
// a
// Mahak
// a1
// b1
// after
// b
// c1
// endFunction