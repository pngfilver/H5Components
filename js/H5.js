/**
 * Created by lanlan on 2016/7/12.
 */

var H5 = function() {

    this.id = ( 'h5_' + Math.random() ).replace('.', '_');
    this.ele = $("<div class='h5' id= '" + this.id +"'>").hide();
    this.page = []; // 用于存储添加进来的页
    $('body').append(this.ele);

    /**
     * 新增一个页
     * @param{string} name  组件的名称，会加入到className中
     * @param{string} text 页内的默认文本
     * @return{H5} 一个H5对象，可以重复使用H5对象支持的方法
     */
    this.addPage = function(name) {
        var page = $("<div class='h5_page section'>");
        
        if(name != undefined) {
            page.addClass("h5_page_"+name);
        }
        
        this.ele.append(page);
        this.page.push(page);
        if(typeof this.whenAddPage == 'function') {
            this.whenAddPage();
        }
        return this;
    };
    
    // 新增组件
    this.addComponent = function(name, cfg) {
        var cfg = cfg || {};
        cfg = $.extend({
            type: 'base'
        },cfg);

        var component;
        var page = this.page.slice(-1)[0];
        switch (cfg.type) {
            case 'base':
                component = new H5ComponentBase(name, cfg);
                break;
            case 'bar':
                component = new H5ComponentBar(name, cfg);
                break;
            case 'bar_v':
                component = new H5ComponentBar_v(name, cfg);
                break;
            case 'pie':
                component = new H5ComponentPie(name, cfg);
                break;
            case 'point':
                component = new H5ComponentPoint(name, cfg);
                break;
            case 'polyline':
                component = new H5ComponentPolyline(name, cfg);
                break;
            case 'radar':
                component = new H5ComponentRadar(name, cfg);
                break;
            case 'ring':
                component = new H5ComponentRing(name, cfg);
                break;
            default:
        }
        page.append(component);

        return this;
    };
    // H5对象初始化呈现
    this.loader = function(firstPage) {

        this.ele.fullpage({
            onLeave: function(index, nextIndex, direction) {
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad: function(anchorLink, index) {
                $(this).find('.h5_component').trigger('onLoad');
            }
        });
        this.page[0].find('.h5_component').trigger("onLoad");
        this.ele.show();

        if(firstPage) {
            $.fn.fullpage.moveTo(firstPage);
        }
    };
    // 初始化 this.loader
    this.loader = (typeof H5_loading == 'function') ? H5_loading : this.loader;

    return this;
};