/**
 * 饼图组件对象
 */
var H5ComponentPie = function(name, cfg) {
    var component = new H5ComponentBase(name, cfg);

    // 绘制网格线
    var width = cfg.width;
    var height = cfg.height;

    // 加入一个画布--底图层
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    $(canvas).css('zIndex', 1);
    canvas.width = context.width = width;
    canvas.height = context.height = height;
    component.append(canvas);

    var r = width/2;

    context.beginPath();
    context.fillStyle = '#eee';
    context.strokeStyle = '#eee';
    context.arc(r,r,r,0,2*Math.PI);
    context.fill();
    context.stroke();
    

    // 加入一个画布--数据层
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    $(canvas).css('zIndex', 2);
    canvas.width = context.width = width;
    canvas.height = context.height = height;
    component.append(canvas);

    var colors = ['#5256e8', '#ff7676', '#29bd28', '#e4b11b', '#ff7676','#da29cb']; // 备用颜色
    var sAngel = 1.5 * Math.PI;  // 设置开始的角度在12点的位置
    var eAngel = 0;  // 结束角度
    var aAngel = 2 * Math.PI;  // 100%的圆的角度

    var step = cfg.data.length;
    for(var i=0; i<step; i++) {
        var item = cfg.data[i];
        var color = item[2] ? item[2] : (colors.pop());

        eAngel = sAngel + aAngel * item[1];
        context.beginPath();
        context.fillStyle = color;
        context.strokeStyle = color;
        context.moveTo(r,r);
        context.arc(r,r,r,sAngel,eAngel);
        context.fill();
        context.stroke();
        sAngel = eAngel;

        // 加入所有的项目文本以及百分比
        var text = $('<div class="text"></div>');
        text.text(item[0]).css('opacity',0);
        var per = $('<div class="per"></div>');
        per.text(item[1]*100 + '%');
        text.append(per);

        var x = r + Math.sin(.5 * Math.PI-sAngel) * r;
        var y= r + Math.cos(.5 * Math.PI-sAngel) * r;
        if(x>width/2) {
            text.css('left', x/2 + 2);
        }else {
            text.css('right', (width-x)/2 + 2);
        }
        if(y>height/2) {
            text.css('top', y/2 + 2);
        }else {
            text.css('bottom', (height-y)/2 + 2);
        }
        component.append(text);
    }

    // 加入一个画布--蒙版层
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    $(canvas).css('zIndex', 3);
    canvas.width = context.width = width;
    canvas.height = context.height = height;
    component.append(canvas);

   var draw = function (per) {
       context.clearRect(0,0,width,height); // 记得清空画布
       context.beginPath();
       context.fillStyle = '#eee';
       context.moveTo(r,r);
       if(per <= 0) {
           context.arc(r, r, r, sAngel, sAngel+2*Math.PI);
           context.strokeStyle = '#eee';
           component.find('.text').css('opacity',0);
       }else {
           context.arc(r, r, r, sAngel, sAngel+2*Math.PI*per, true);
           context.strokeStyle = 'transparent';
       }
       context.fill();
       context.stroke();
       if(per >= 1) {
           component.find('.text').css('opacity',1);
       }
   };
   draw(0);

    component.on('onLoad', function() {
        // 饼图入场动画
        var s = 0;
        for(var i=0; i<100; i++) {
            setTimeout(function() {  // 闭包的写法，去执行一个函数，而不是去定义一个函数
                s += 0.01;
                draw(s);
            }, i*10 + 500);
        }
    });
    component.on('onLeave', function() {
        // 饼图出场动画
        var s = 1;
        for(var i=0; i<100; i++) {
            setTimeout(function() {
               s -= 0.01;
               draw(s);
            }, i*10);
        }
    });

    return component;
};