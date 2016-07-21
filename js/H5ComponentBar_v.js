/**
 * 垂直柱图组件对象
 */
var H5ComponentBar_v = function(name, cfg) {
    var component = new H5ComponentBase(name, cfg);

    $.each(cfg.data, function(idx, item) {
        var line = $("<div class='line'></div>");
        var name = $("<div class='name'></div>");
        var rate = $("<div class='rate'></div>");
        var per = $("<div class='per'></div>");

        var height = item[1]*100 + '%';
        var bgStyle = '';
        if(item[2]) {
            bgStyle = 'style="background-color:' + item[2] + '"';
        }

        rate.height(height).html("<div class='bg' "+ bgStyle +"></div>");
        per.text(height).css('bottom', height);

        name.text(item[0]);
        line.append(name).append(rate).append(per);

        component.append(line);

    });


    return component;
};