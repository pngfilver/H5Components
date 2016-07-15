/**
 * 基本图文组件对象
 */
var H5ComponentPoint = function(name, cfg) {
    var component = new H5ComponentBase(name, cfg);

    var base = cfg.data[0][1];   // 以第一个数据的比例，大小为100%

    // 输入每个point
    $.each( cfg.data, function(idx, item) {

        var point = $("<div class='point point_" + idx + "'>");

        var name = $("<div class='name'>" + item[0] +"</div>");
        var rate = $("<div class='rate'>"+ item[1]*100 +"%</div>");
        name.append(rate);
        point.append(name);

        var per = item[1] / base *100 + '%';
        point.width(per).height(per);

        item[2] && point.css('backgroundColor', item[2]);

        point.css({
            left: (1 - item[1] / base) *50 + '%',
            top: (1 - item[1] / base) *50 + '%',
            zIndex: cfg.data.length - idx
        });
        point.on('onLoad', function() {
            if(item[3] !== undefined && item[4] !== undefined) {
                point.animate({
                    left: item[3],
                    top: item[4]
                }, 1500);
            }
        }).on('onLeave', function() {
            point.animate({
                left: (1 - item[1] / base) *50 + '%',
                top: (1 - item[1] / base) *50 + '%'
            }, 800);
        });



        component.append(point);
    } );


    return component;
};