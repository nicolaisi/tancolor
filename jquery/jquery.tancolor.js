(function ($) {  
    $.fn.tancolor = function(options) {
        var settings = $.extend({
            mode: 'grayscale',
            r_weight: 0.34,
            g_weight: 0.5,
            b_weight: 0.16,
            r_intensity: 1,
            g_intensity: 1,
            b_intensity: 1,
            load: null
        }, options );

        var r_weight;
        var g_weight;
        var b_weight;
        var r_intensity;
        var g_intensity;
        var b_intensity;
        
        // settings value
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

        // convert image to canvas
        var img = document.getElementById($(this).attr("id"));
        if(settings.load){
            img.src = settings.load;
            return;
        }
        var canvas = convertImageToCanvas(img);
        var ctx = canvas.getContext("2d");
        var imageData = ctx.getImageData(0, 0, img.width, img.height)
        $(this).replaceWith(canvas);

        // Processing image data
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
        ctx.putImageData(imageData, 0, 0);

        $('#'+$(this).attr("id")).each(function(i,e){ 
             var img = e.toDataURL("image/png"); 
             $(e).replaceWith( $('<img src="' + img + '"/>').attr({width: $(e).attr("width"), height: $(e).attr("height"), style: $(e).attr("style") }) ) });

        // Converts image to canvas; returns new canvas element
        function convertImageToCanvas(image) {
	    var canvas = document.createElement("canvas");
	    canvas.width = image.width;
	    canvas.height = image.height;
            if(image.id) {
                canvas.id = image.id;
            }
            if(image.className) {
                canvas.className = image.className;
            }
	    canvas.getContext("2d").drawImage(image, 0, 0);

	    return canvas;
        }

        // Converts canvas to an image
        function convertCanvasToImage(canvas) {
	    var image = new Image();
	    image.src = canvas.toDataURL("image/png");
	    return image;
        }
    };
}(jQuery));
