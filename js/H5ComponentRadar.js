/**
 * 雷达图组件对象
 */
var H5ComponentRadar = function(name, cfg) {
    var component = new H5ComponentBase(name, cfg);

    // 绘制网格线
    var width = cfg.width;
    var height = cfg.height;

    // 加入一个画布（网格线背景）-背景层
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = context.width = width;
    canvas.height = context.height = height;
    component.append(canvas);

    var r = width/2;
    var step = cfg.data.length;

    // 计算一个圆周上的坐标（计算多边形的点坐标）
    // 已知： 圆心坐标（a，b），半径 r， 角度 deg
    // rad = (2*Math.PI / 360) * (360 / step) * i
    // x = a + Math.sin(rad) * r
    // y = b + Math.cos(rad) * r

    // 绘制网格背景（分面绘制，分为10份）
    var isBlue = false;
    for(var s=10; s>0; s--) {
        context.beginPath();
        for(var i=0; i<step; i++) {
            var rad = (2*Math.PI / 360) * (360 / step) * i;
            var x = r + Math.sin(rad) * r * (s/10);
            var y= r + Math.cos(rad) * r * (s/10);
            context.lineTo(x,y);
        }
        context.closePath();
        context.fillStyle = (isBlue = !isBlue) ? '#99c0ff' : '#f1f9ff';
        context.fill();
    }

    // 绘制伞骨
    for(var i = 0; i<step; i++) {
        var rad = (2*Math.PI / 360) * (360 / step) * i;
        var x = r + Math.sin(rad) * r;
        var y= r + Math.cos(rad) * r;
        context.moveTo(r,r);
        context.lineTo(x,y);

        // 输出项目文字
        var text = $("<div class='text'></div>");
        text.text(cfg.data[i][0]);
        text.css({
            'opacity': 0,
            'transition': 'all .5s '+ i*.2 + 's'
        });

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
        if(cfg.data[i][2]) text.css('color', cfg.data[i][2]);

        component.append(text);
    }
    context.strokeStyle = '#e0e0e0';
    context.stroke();


    // 加入一个画布-数据层
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = context.width = width;
    canvas.height = context.height = height;
    component.append(canvas);
    /**
     * 绘制折线以及对应的数据和阴影
     * @param per  0-1之间的数据，会根据这个值绘制最终数据对应的中间状态
     * @return DOM  component元素
     */
   var draw = function (per) {
        var text = component.find('.text');
        if(per >= 1) {
            text.css('opacity', 1);
        }else {
            text.css('opacity', 0);
        }

        context.clearRect(0,0,width,height);
        // 输出数据的折线
        context.strokeStyle = '#f00';
        for(var i=0; i<cfg.data.length; i++) {
            var rad = (2*Math.PI / 360) * (360 / step) * i;
            var rate = cfg.data[i][1] * per;
            var x = r + Math.sin(rad) * r * rate;
            var y= r + Math.cos(rad) * r * rate;

            context.lineTo(x,y);
        }
        context.closePath();
        context.stroke();

        // 输出数据的点
        context.fillStyle = '#ff7676';
        for(var i=0; i<cfg.data.length; i++) {
            var rad = (2*Math.PI / 360) * (360 / step) * i;
            var rate = cfg.data[i][1] * per;
            var x = r + Math.sin(rad) * r * rate;
            var y= r + Math.cos(rad) * r * rate;

            context.beginPath();
            context.arc(x,y,5,0,2*Math.PI);
            context.closePath();
            context.fill();
        }

   };
    draw(0);

    component.on('onLoad', function() {
        // 雷达图入场动画
        var s = 0;
        for(var i=0; i<100; i++) {
            setTimeout(function() {  // 闭包的写法，去执行一个函数，而不是去定义一个函数
                s += 0.01;
                draw(s);
            }, i*10 + 500);
        }
    });
    component.on('onLeave', function() {
        // 雷达图出场动画
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