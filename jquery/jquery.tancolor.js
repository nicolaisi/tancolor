(function ($) {  
    $.fn.tancolor = function(options) {
        var settings = $.extend({
            mode: 'grayscale',
            r_weight: 0.34,
            g_weight: 0.5,
            b_weight: 0.16,
            r_intensity: 1,
            g_intensity: 1,
            b_intensity: 1
        }, options );

        var r_weight;
        var g_weight;
        var b_weight;
        var r_intensity;
        var g_intensity;
        var b_intensity;

        switch(settings.mode){
            case 'grayscale':
                r_weight = 0.34;
                g_weight = 0.5;
                b_weight = 0.16;
                r_intensity = 1;
                g_intensity = 1;
                b_intensity = 1;
                break;
            case 'red':
                r_weight = 0.34;
                g_weight = 0.5;
                b_weight = 0.16;
                r_intensity = 255;
                g_intensity = 1;
                b_intensity = 1;
                break;
            case 'green':
                r_weight = 0.34;
                g_weight = 0.5;
                b_weight = 0.16;
                r_intensity = 1;
                g_intensity = 255;
                b_intensity = 1;
                break;
            case 'blue':
                r_weight = 0.34;
                g_weight = 0.5;
                b_weight = 0.16;
                r_intensity = 1;
                g_intensity = 1;
                b_intensity = 255;
                break;
            default:
                r_weight = settings.r_weight;
                g_weight = settings.g_weight;
                b_weight = settings.b_weight;
                r_intensity = settings.r_intensity;
                g_intensity = settings.g_intensity;
                b_intensity = settings.b_intensity;
                break;
        }
        
        canvas = document.createElement("canvas");
        canvas.width = $(this).width();
        canvas.height = $(this).height();
        var img = document.getElementById($(this).attr("id"));
        canvas.getContext("2d").drawImage(img, 0, 0);
        var context = canvas.getContext('2d');
        context.drawImage(img, 0 , 0);
        $(this).replaceWith(canvas);

        var imageData = context.getImageData(0, 0, img.width, img.height);
        var data = imageData.data;
        for(var i = 0; i < data.length; i += 4) {
            var brightness = r_weight * data[i] + g_weight * data[i + 1] + b_weight * data[i + 2];
            // red
            data[i] = r_intensity * brightness;
            // green
            data[i + 1] = g_intensity * brightness;
            // blue
            data[i + 2] = b_intensity * brightness;
        }
        context.putImageData(imageData, 0, 0);
    };
}(jQuery));
