/**
 * 折线图组件对象
 */
var H5ComponentPolyline = function(name, cfg) {
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

    // 水平网格线  100分->10份
    var step = 10;
    context.beginPath();
    context.strokeStyle = '#ccc';
    context.lineWidth = 2;
    window.context = context;
    for(var i=0; i<step+1; i++) {
        var y = height / step * i;
        context.moveTo(0,y);
        context.lineTo(width, y);
    }
    // 垂直网格线
    step = cfg.data.length + 1;  // 垂直线的数量按照传入项目的数量进行绘制
    for(var i=0; i<step+1; i++) {
        var x = width / step * i;
        context.moveTo(x,0);
        context.lineTo(x, height);

        // 写入项目名称
        var text_w = width/step >> 0;
        if (cfg.data[i]) {
            var text = $("<div class='text'></div>");
            text.text( cfg.data[i][0] );
            text.css({
                'width': text_w / 2,
                'left': x / 2 - text_w/4 + text_w/2
            });
            component.append(text);
        }

    }
    context.stroke();

    // 加入一个画布（绘制折线数据）-数据层
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
       // 清空画布
        context.clearRect(0, 0, width, height);

       // 绘制折线数据
       context.beginPath();
       context.strokeStyle = '#ff8878';
       context.lineWidth = 2;

       var x = 0;
       var y = 0;
       var item_w = width / (cfg.data.length+1);

       // 画点
       for(i in cfg.data) {
           var item = cfg.data[i];
           // console.log(i + 1); // i+ 1 是一个字符串，所以不能直接用itemWidth*(i+1);
           x = item_w * i + item_w;
           y = height - height * item[1] * per;
           context.moveTo(x, y);
           context.arc(x, y, 5, 0, 2*Math.PI);
       }

       // 连线
       context.moveTo( 0, height); // 移动画笔到第一个数据的点的位置
       for(i in cfg.data) {
           var item = cfg.data[i];
           // console.log(i + 1); // i+ 1 是一个字符串，所以不能直接用itemWidth*(i+1);
           x = item_w * i + item_w;
           y = height - height * item[1] * per;
           context.lineTo(x, y);
       }
       context.lineTo(width, height); // 移动画笔到最后一个数据的点的位置

       // 绘制阴影
       context.stroke();
       context.fillStyle = 'rgba(255,118,118,.37)';
       context.fill();

       // 写入数据
       for(i in cfg.data) {
           var item = cfg.data[i];
           x = item_w * i + item_w;
           y = height - height * item[1] * per;
           context.fillStyle = item[2] ? item[2] : '#595959';
           context.font = '22px Arial';
           context.fillText( ( item[1] * 100 * per >> 0 ) + '%', x-13, y-20 );
       }

       context.stroke();
   };

    component.on('onLoad', function() {
        // 折线图入场动画
        var s = 0;
        for(var i=0; i<100; i++) {
            setTimeout(function() {  // 闭包的写法，去执行一个函数，而不是去定义一个函数
                s += 0.01;
                draw(s);
            }, i*10 + 500);
        }
    });
    component.on('onLeave', function() {
        // 折线图出场动画
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