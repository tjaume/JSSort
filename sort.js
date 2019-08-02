
Array.prototype.swap = function (i,j) {
    // 第 i 个元素和第 j 个元素交换位置
    var temp = this[i];
    this[i] = this[j];
    this[j] = temp;
}

/*简单插入排序*/
Array.prototype.insertSort = function () {
    var i, j, value, len = this.length;
    for (i = 1; i < len; i++) {
        value = this[i], j = i;
        while (j > 0 && value < this[j-1]) { //value < this[j-1] && j > 0 这两个条件摆放的位置不同，速度要才10倍
            this[j] = this[j-1];
            j--;
        }
        this[j] = value;
    }
}

/*折半插入排序*/
Array.prototype.bInsertSort = function () {
    var i, j, low, high, m, value, len = this.length;
    for(i = 1; i < len; i++){
        value = this[i];
        low = 0, high = i-1, j = i;
        while(low <= high){
            m =(low + high)>>1;
            if(value < this[m]) high = m - 1;
            else low = m + 1;
        }
        high++;
        while(j > high) {
            this[j] = this[j-1];
            j--;
        }
        this[j] = value;
    }
}

/*希尔排序*/
Array.prototype.shellSort = function(){
    var tempvalue,
        len = this.length;
    for(var step = len >> 1; step > 0; step >>= 1){
            for (var i =  step; i < len; i++) {
                if (this[i] < this[i - step]) {
                    tempvalue = this[i];
                    for (var j = i - step; j >= 0 && this[j] >= tempvalue; j -= step) {
                        this[j + step] = this[j];
                    }
                    this[j + step] = tempvalue;
                }
            }
    }
};

/*选择排序*/
Array.prototype.selectSort = function(){
    var i, j, min, len = this.length;
    for(i = 0; i < len-1; i++){
        min = this[i];
        for(j = i + 1; j < len; j++){
            if(this[j] < min){
                min = this[j];
                this.swap(i, j);
            }
        }
    }
};

/*冒泡排序*/
Array.prototype.bubbleSort = function () {
     var i, j, len = this.length;
     for(i = 0; i < len-1; i++){
         for(j = i + 1; j<len; j++){
             if(this[j]<this[j-1]){
                 this.swap(j,j-1);
             }
         }
     }
}

/*快速排序*/
Array.prototype.quickSort = function (low,high) {
    if(low==null) low = 0;
    if(high==null) high = this.length-1;
    if(low>=high)return;
    var h = high,l = low;
    var priKey = this[low];
    while(low<high){
        while(low<high && this[high] >= priKey) high--;
        this[low]=this[high];
        while(low<high && this[low]<=priKey) low++;
        this[high] = this[low];
    }
    this[low] = priKey;
    this.quickSort(l,low-1);
    this.quickSort(low+1,h);
};

/*堆排序*/
Array.prototype.heapSort = function () {
    //建立堆
    var i, j, k, len, key, curIndex
        len = this.length;
    for(i=(len >> 1) - 1; i >= 0; i--){
        key = this[i];
        curIndex = i;
        for(j= ((i+1)<<1)-1;j<len;j=((j+1)<<1)-1){
            if(j<len-1 && this[j]<this[j+1]) j++;
            if(key>this[j]) break;
            this[curIndex] = this[j];
            curIndex = j;
        }
        this[curIndex] = key;
    }

    for(i = len - 1; i >= 0; i--){
        this.swap(i,0);
        key = this[0];
        curIndex = 0;
        for(j=1;j<i;j= ((j+1) << 1 ) - 1){
            if(j<i-1 && this[j]<this[j+1]) j++;
            if(key>this[j]) break;
            this[curIndex] = this[j];
            curIndex = j;
        }
        this[curIndex] = key;
    }
}

/*归并排序*/
Array.prototype.mergeSort = function(s, t, e){
    if(s == null)
        s = 0;
    if(t == null)
        t = this.length - 1;
    if(e == null)
        e = new Array(this.length);
    if(s >= t)
        return;

    var m = (s + t) >> 1;
    this.mergeSort(s, m, e);
    this.mergeSort(m + 1, t, e);

    for(var i = s, k = s, j = m + 1; i <= t; i++){
        if(j > t || k <= m && this[k] < this[j])
            e[i] = this[k++];
        else
            e[i] = this[j++]
    }

    for(var i = s; i <= t; i++){
        this[i] = e[i];
    }
};

/*基数排序*/
Array.prototype.radSort = function () {
    // 选择最大数
    var maxValue = Math.max.apply(Math,this);

    var temp, tempArr,
        distributeCount = 0,
        radCount = 10,
        radArr = [];
    while(maxValue){
        distributeCount++;
        maxValue = Math.floor(maxValue / 10);
    }
    for(var i = 0; i < radCount; i++){
        radArr.push([]);
    }

    //开始分配，并收集
    for(i = 0; i < distributeCount; i++){
        /*******清空数组*******/
        for(var c = 0; c < radCount; c++){
            tempArr = radArr[c];
            tempArr.splice(0, tempArr.length);
        }
        /******一趟分配******/
        for(var j = 0; j < this.length; j++){
            temp = this[j];
            for(var k = 0; k < i && temp != 0; k++){
                temp = Math.floor(temp / 10);
            }
            radArr[temp%10].push(this[j]);
        }
        /******一趟收集*******/
        for(var j = 0, m = 0; j < radCount; j++){
            tempArr = radArr[j];
            for(var k = 0; k < tempArr.length; k++,m++){
                this[m] = tempArr[k];
            }
        }
    }
}

var arr = [],
    range = 10000,
    count = 10000;
while(count){
    arr.push(Math.floor(Math.random() * range));
    count--;
}

var start = new Date().valueOf();
arr.shellSort();
var end = new Date().valueOf();
console.log(end - start);
console.log(arr.toString());

// test

// pc test