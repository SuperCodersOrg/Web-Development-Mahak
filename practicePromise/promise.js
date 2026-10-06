console.log('start');

async function a() {
    console.log('a');
    await b();
    console.log('a end');
}
console.log('end');
a();

const data= async function print(){
    console.log("a");

    await console.log("b");
    await console.log("c");
    console.log("endFunction");

}
data();
console.log("after");