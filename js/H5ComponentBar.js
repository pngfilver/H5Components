/**
 * 柱图组件对象
 */
var H5ComponentBar = function(name, cfg) {
    var component = new H5ComponentBase(name, cfg);

    $.each(cfg.data, function(idx, item) {
        var line = $("<div class='line'></div>");
        var name = $("<div class='name'></div>");
        var rate = $("<div class='rate'></div>");
        var per = $("<div class='per'></div>");

        var width = (item[1]*100 >> 0) + '%';
        var bgStyle = '';
        if(item[2]) {
            bgStyle = 'style="background-color:' + item[2] + '"';
            per.css('color', item[2]);
        }

        rate.width(width).html("<div class='bg' "+ bgStyle +"></div>");
        per.text(width);

        name.text(item[0]);
        line.append(name).append(rate).append(per);

        component.append(line);

    });


    return component;
};