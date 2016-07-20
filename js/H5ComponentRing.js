/**
 * 环图组件对象
 */
var H5ComponentRing = function(name, cfg) {
    var component = new H5ComponentBase(name, cfg);

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

    var sAngel = 1.5 * Math.PI;  // 设置开始的角度在12点的位置
    var item = cfg.data[0];
    var color = item[2] ? item[2] : '#ff7676';

    function draw( per ) {
        context.clearRect(0,0,width,height);

        // 画数据的环
        context.beginPath();
        context.fillStyle = color;
        context.moveTo(r,r);
        context.arc(r,r,r,sAngel, sAngel+2*Math.PI*item[1]*per);
        context.fill();

        context.beginPath();
        context.arc(r,r,r*0.8,0,2*Math.PI);
        context.fillStyle = '#ffffff';
        context.fill();

        if(per>=1) {
            text.css('opacity', 1);
        }else {
            text.css('opacity', 0);
        }
    }

    // 加入蒙版层以及数据的百分比
    var text = $('<div class="text"></div>');
    text.text(item[0]).css('opacity', 0);
    var rate = $('<div class="per"></div>');
    rate.text(item[1]*100 + ' %');
    text.append(rate);
    component.append(text);

    component.on('onLoad', function() {
        // 环图入场动画
        var s = 0;
        for(var i=0; i<100; i++) {
            setTimeout(function() {  // 闭包的写法，去执行一个函数，而不是去定义一个函数
                s += 0.01;
                draw(s);
            }, i*10 + 500);
        }
    });
    component.on('onLeave', function() {
        // 环图出场动画
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