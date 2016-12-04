function Game() {
}

Game.prototype = {
    init: function (numList) {
        this.numList = numList; //要操作的DOM结构
        this.initNum();
        this.start();
    },
    Num: new Array(16),
    initNum: function () {   //数组初始化
        for (var i = 0; i < 16; i++) {
            this.Num[i] = 0;
        }
    },
    start: function () {
        $("#start").click(function () {
            $("#start").hide();
            this.numList.show();
            this.addNum(2);
        }.bind(this));
    },
    addNum: function (numLength) {
        var isNotFull = false;
        for (var i = 0; i < 16; i++) {
            if (this.Num[i] == 0) {
                isNotFull = true;
            }
        }
        if (!isNotFull) {
            alert("失败!请重新开始!");
            this.clean();
            return false;
        }
        $.each(this.randomNum(numLength), function (index, ele) {
            //console.log(ele);
            this.Num[ele] = 2;
            this.numList.eq(ele).text(this.Num[ele]);
        }.bind(this))
    },
    randomNum: function (numLength) {
        var max = 15;
        var min = 0;
        var arr = [];
        for (var i = 0; i < numLength; i++) {
            var nowNum = parseInt(Math.random() * (max - min + 1) + min, 10);
            if (this.Num[nowNum] != 0 ||  arr.indexOf(nowNum)!=-1) {
                i = i - 1;
            } else {
                arr[i] = nowNum;
            }

        }
        return arr;
    },
    clean: function () {
        this.initNum(); //重置数组
        this.numList.text("");
        $("#start").show();
        this.numList.hide();
    },
    move: function (KeyDown) {
        switch (KeyDown) {
            case 37: // 左
                var nowThisNum=[];
                for(var v=0;v<16;v++){
                    nowThisNum[v]=this.Num[v]
                }
                this.Num=(function(Num){
                    for (var m = 0; m < 4; m++) {
                        for (var i = 0; i < 4; i++) {   //把0拍到最后
                            for (var j = 0; j < 4 - i - 1; j++) {
                                if (Num[m*4+j] == 0) {
                                    var a = Num[m*4+j];
                                    Num[m*4+j] = Num[m*4+j + 1];
                                    Num[m*4+j + 1] = a;
                                }
                            }
                        }
                        for(var i=0;i<4;i++){    //相加
                            for(var j=0;j<4-i-1;j++){
                                if((Num[m*4+j]!=0) && (Num[m*4+j] == Num[m*4+j+1]) ){
                                    Num[m*4+j] = Num[m*4+j]*2;
                                    Num[m*4+j+1]=0;
                                }
                            }
                        }
                        for(var i=0;i<4;i++){   //把0拍到最后
                            for(var j=0;j<4-i-1;j++){
                                if(Num[m*4+j] == 0 ){
                                    var a =Num[m*4+j];
                                    Num[m*4+j] = Num[m*4+j+1];
                                    Num[m*4+j+1]=a;
                                }
                            }
                        }
                    }
                    return Num;
                })(this.Num);
                if(nowThisNum.toString() == this.Num.toString()){
                    return;
                }

                for(var i=0; i<16;i++){ //数字重新写入
                    if(this.Num[i]==0 ){
                        this.numList.eq(i).text("").removeClass().addClass("tile tile2")
                    }else{
                        this.numList.eq(i).text(this.Num[i]).removeClass().addClass("tile tile"+this.Num[i])
                    }
                }
                this.addNum(1);
                break;
            case 39: //右
                var nowThisNum=[];
                for(var v=0;v<16;v++){
                    nowThisNum[v]=this.Num[v]
                }
                this.Num=(function(Num,that){
                    for (var m = 0; m < 4; m++) {
                        for (var i = 0; i < 4; i++) {   //把0拍到最后
                            for (var j = 1; j < 4 - i ; j++) {
                                if (Num[m*4+j] == 0) {
                                    var a = Num[m*4+j];
                                    Num[m*4+j] = Num[m*4+j - 1];
                                    Num[m*4+j - 1] = a;

                                }
                            }
                        }
                        for(var i=0;i<4;i++){    //相加
                            for(var j=0;j<4-i-1;j++){
                                if((Num[m*4+j]!=0) && (Num[m*4+j] == Num[m*4+j+1]) ){
                                    Num[m*4+j] = Num[m*4+j]*2;
                                    Num[m*4+j+1]=0;
                                }
                            }
                        }
                        for(var i=0;i<4;i++){   //把0拍到最后
                            for(var j=1;j<4-i;j++){
                                if(Num[m*4+j] == 0 ){
                                    var a =Num[m*4+j];
                                    Num[m*4+j] = Num[m*4+j-1];
                                    Num[m*4+j-1]=a;
                                }
                            }
                        }
                    }
                    return Num;
                })(this.Num,this);
                if(nowThisNum.toString() == this.Num.toString()){
                    return;
                }
                for(var i=0; i<16;i++){ //数字重新写入
                    if(this.Num[i]==0 ){
                        this.numList.eq(i).text("").removeClass().addClass("tile tile2")
                    }else{
                        this.numList.eq(i).text(this.Num[i]).removeClass().addClass("tile tile"+this.Num[i])
                    }
                }
                this.addNum(1);
                break;
            case 38: //上
                var nowThisNum=[];
                for(var v=0;v<16;v++){
                    nowThisNum[v]=this.Num[v]
                }

                console.log(this.Num);
                this.Num=(function(Num){
                    for (var m = 0; m < 4; m++) {
                        for (var i = 0; i < 4; i++) {   //把0拍到最上
                            for (var j = 0; j < 4 - i - 1; j++) {
                                if (Num[m+j*4] == 0) {
                                    var a = Num[m+j*4];
                                    Num[m+j*4] = Num[m+(j+1) * 4];
                                    Num[m+(j+1) *  4] = a;
                                }
                            }
                        }
                        for(var i=0;i<4;i++){    //相加
                            for(var j=0;j<4-i-1;j++){
                                if((Num[m+j*4]!=0) && (Num[m+j*4] == Num[m+(j+1)*4]) ){
                                    Num[m+j*4] = Num[m+(j+1)*4]*2;
                                    Num[m+(j+1)*4]=0;
                                }
                            }
                        }
                        for (var i = 0; i < 4; i++) {   //把0拍到最上
                            for (var j = 0; j < 4 - i - 1; j++) {
                                if (Num[m+j*4] == 0) {
                                    var a = Num[m+j*4];
                                    Num[m+j*4] = Num[m+(j+1) * 4];
                                    Num[m+(j+1) *  4] = a;
                                }
                            }
                        }
                    }
                    return Num;
                })(this.Num,this);

                console.log(this.Num);
                if(nowThisNum.toString() == this.Num.toString()){
                    return;
                }
                for(var i=0; i<16;i++){ //数字重新写入
                    if(this.Num[i]==0 ){
                        this.numList.eq(i).text("").removeClass().addClass("tile tile2")
                    }else{
                        this.numList.eq(i).text(this.Num[i]).removeClass().addClass("tile tile"+this.Num[i])
                    }
                }
                this.addNum(1);
                break;
            case 40: //下
                var nowThisNum=[];
                for(var v=0;v<16;v++){
                    nowThisNum[v]=this.Num[v]
                }

                console.log(this.Num);
                this.Num=(function(Num){
                    for (var m = 0; m < 4; m++) {
                        for (var i = 0; i < 4; i++) {   //把0拍到最后
                            for (var j = 1; j < 4 - i ; j++) {
                                if (Num[m+j*4] == 0) {
                                    var a = Num[m+j*4];
                                    Num[m+j*4] = Num[m+(j - 1)*4];
                                    Num[m+(j - 1)*4] = a;

                                }
                            }
                        }
                        for(var i=0;i<4;i++){    //相加
                            for(var j=0;j<4-i-1;j++){
                                if((Num[m+j*4]!=0) && (Num[m+j*4] == Num[m+(j+1)*4]) ){
                                    Num[m+j*4] = Num[m+(j+1)*4]*2;
                                    Num[m+(j+1)*4]=0;
                                }
                            }
                        }
                        for (var i = 0; i < 4; i++) {   //把0拍到最后
                            for (var j = 1; j < 4 - i ; j++) {
                                if (Num[m+j*4] == 0) {
                                    var a = Num[m+j*4];
                                    Num[m+j*4] = Num[m+(j - 1)*4];
                                    Num[m+(j - 1)*4] = a;
                                }
                            }
                        }
                    }
                    return Num;
                })(this.Num,this);

                console.log(this.Num);
                if(nowThisNum.toString() == this.Num.toString()){
                    return;
                }
                for(var i=0; i<16;i++){ //数字重新写入
                    if(this.Num[i]==0 ){
                        this.numList.eq(i).text("").removeClass().addClass("tile tile2")
                    }else{
                        this.numList.eq(i).text(this.Num[i]).removeClass().addClass("tile tile"+this.Num[i])
                    }
                }
                this.addNum(1);
                break;
        }




    }
};

$(function () {
    var game1 = new Game();
    game1.init($("#div2048 div"));

    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];

        //keycode 37 = Left ←
        //        keycode 38 = Up ↑
        //keycode 39 = Right →
        //keycode 40 = Down ↓
        if (e && e.keyCode == 37) { // 按 Esc
            //要做的事情
        }
        if (e && e.keyCode == 113) { // 按 F2
            //要做的事情
        }
        if (e && e.keyCode == 13) { // enter 键
            //要做的事情
        }

        game1.move(e && e.keyCode)
    };


});


//构造函数 ,constructor  Game大写是否是必须的


//for(var m=0;m<4-j;m++){
//    //console.log(m);
//    //console.log(4-j);
//    //console.log((this.Num[i*4+m] != 0) && (this.Num[m] == this.Num[i*4+m+1]));
//    //console.log("this.Num[i*4+m]");
//    //console.log(this.Num[i*4+m]);
//    //console.log("    this.Num[i*4+m+1] = 0;");
//    //console.log(this.Num[i*4+m+1]);
//    //
//    if ((this.Num[i*4+m] != 0) && (this.Num[m] == this.Num[i*4+m+1])) {
//        this.Num[i*4+m] *= 2;
//        this.numList.eq(i*4+m).text(this.Num[i*4+m]);
//        this.Num[i*4+m+1] = 0;
//        this.numList.eq(i*4+m + 1).text("");
//    }
//}

////循序3次
//debugger;
//
//for(var m=0;m<4-j;m++){
//    //if(this.Num[i*4+m]<this.Num[i*4+m+1]){
//    //    var a = this.Num[i*4+m+1];
//    //    this.Num[i*4+m+1] = this.Num[i*4+m];
//    //    this.Num[i*4+m]=a;
//    //}
//    if(this.Num[i*4+m]==0){
//            var a = this.Num[i*4+m+1];
//            this.Num[i*4+m+1] = this.Num[i*4+m];
//            //this.numList.eq(i*4+m+1).text(this.Num[i*4+m]);
//            this.Num[i*4+m]=a;
//
//    }
//}
//debugger;