const PENDING = 'pending'; //等待状态
const FULFILLED = 'fulfilled'; //完成状态
const REJECTED = 'rejected'; //拒绝状态

function Promise(executor) {
    var _this = this;
    this.state = PENDING; //初始化状态
    this.value = undefined; //初始化成功结果
    this.reason = undefined; //初始化失败原因
    this.onFulfilled = []; //成功的回调数组（使用数组可以避免被覆盖）
    this.onRejected = []; //失败的回调数组

    function resolve(value) {
        if (_this.state === PENDING) { // pending状态下才能更改状态
            _this.state = FULFILLED; //修改状态为成功
            _this.value = value; // 保存成功结果
            _this.onFulfilled.forEach(fn => fn(value))
        }
    }
    function reject(reason) { // pending状态下才能更改状态
        if (_this.state === PENDING) {
            _this.state = REJECTED; //修改状态为失败
            _this.reason = reason; // 保存失败结果
            _this.onRejected.forEach(fn => fn(reason))
        }
    }

    try { //可能存在异常，因此通过try/catch来捕获一下异常情况
        executor(resolve, reject); //promise实例化时立马执行
    } catch (e) {
        reject(e); //抛出失败
    }
}

//当Promise的状态改变之后，不管成功还是失败，都会触发then回调函数
//链式调用，then 方法必须返回一个 新的promise 对象
//新返回的promise2 = 上一个promise1.then(onFulfilled, onRejected)
Promise.prototype.then = function (onFulfilled, onRejected) {
    var _this = this; //_this是promise1的实例对象

    //onFulfilled 和 onRejected 都是可选参数，但类型都得是函数，否则忽略
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
        throw reason;
    }

    var promise2 = new Promise((resolve, reject) => {
        //在then中，根据状态的不同，来调用不同处理终值的函数
        //onFulfilled或onRejected不能同步被调用，必须异步调用。我们就用setTimeout解决异步问题
        if (_this.state === FULFILLED) {
            setTimeout(() => {
                try {
                    let x = onFulfilled(_this.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            })
        } else if (_this.state === REJECTED) {
            setTimeout(() => {
                try {
                    let x = onRejected(_this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            })
        } else if (_this.state === PENDING) { //异步执行,在pending状态不马上去执行回调函数，而是将其存储起来
            _this.onFulfilled.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(_this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                })
            })
            _this.onRejected.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(_this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                })
            })
        }
    })
    return promise2;
}

//对新的promise2和上一个执行结果 x 的处理
//promise2：新的Promise对象
//x：上一个promise的then的返回值
//resolve：promise2的resolve
//reject：promise2的reject
function resolvePromise(promise2, x, resolve, reject) {
    //x和promise2相等，相当于返回自己
    if(promise2 === x){
        reject(new TypeError('Chaining cycle'))
    }
    //当x 为对象或者函数
    if(x && typeof x === 'object' || typeof x === 'function'){
        let used;//不重复调用
        try {
            let then = x.then
            if(typeof then === 'function'){
                then.call(x, (y)=>{
                    if (used) return;
                    used = true
                    resolvePromise(promise2, y, resolve, reject)
                }, (r) =>{
                    if (used) return;
                    used = true
                    reject(r)
                })
            } else {
                if (used) return;
                used = true
                resolve(x)
            }
        } catch(e){
            if (used) return;
            used = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}