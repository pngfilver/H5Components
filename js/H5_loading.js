/**
 * Created by lanlan on 2016/7/22.
 */
var H5_loading = function(images, firstPage) {

    var id = this.id;  // H5对象中通过随机变量生成的id

    if(!this._images) {

        this._images = (images||[]).length;
        this.loaded = 0;

        window[id] = this; // 把当前对象存储在全局对象 window 中，用来进行某个图片加载完成之后的回调

        for(var s in images) {
            var item = images[s]; // images是一个存储了图片路径的数组
            var img = new Image; // js中创建一个图片的方法
            img.onload = function() {
                // this.loaded++;  这样是访问不到loaded的，在onload函数的定义中是访问不到this.Loaded的
                window[id].loader();
            };
            img.src = item; // 可以直接把图片载入到缓存中
        }
        $('.loading-rate').text('0%');

        return this;
    }else {

        this.loaded ++ ;
        $('.loading-rate').text( ( (this.loaded/this._images * 100) >> 0 ) + '%' );

        if( this.loaded < this._images ) {

            return this;
        }
    }
    window[id] = null;

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