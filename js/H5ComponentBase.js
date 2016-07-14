/**
 * 基本图文组件对象
 */
var H5ComponentBase = function(name, cfg) {
    var cfg = cfg || {};
    var id = ("h5_c_" + Math.random()).replace('.', '_');
    var cls = "h5_component_name_" + name + " h5_component_" + cfg.type;
    var component = $('<div class="h5_component ' + cls + '" id= "' + id + '">');

    cfg.text && component.text(cfg.text);
    cfg.width && component.width(cfg.width/2);
    cfg.height && component.height(cfg.height/2);
    cfg.css && component.css( cfg.css );
    cfg.bg && component.css({
        backgroundImage: 'url('+cfg.bg+')'
    });

    cfg.center && component.css({
        marginLeft: (cfg.width/4 * -1) + 'px',
        left: '50%'
    });
    // 后期还有很多自定义参数……

    component.on('onLeave', function() {
        $(this).addClass("h5_component_" + cfg.type + "_leave").removeClass("h5_component_" + cfg.type + "_load");
        cfg.animateOut && $(this).animate( cfg.animateOut );

        return false;
    });
    component.on('onLoad', function() {
        $(this).addClass("h5_component_" + cfg.type + "_load").removeClass("h5_component_" + cfg.type + "_leave");
        cfg.animateIn && $(this).animate( cfg.animateIn );

        return false;
    });

    return component;
};