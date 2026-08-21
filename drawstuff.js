/* classes */ 

// Color constructor
class Color {
    constructor(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end try
        
        catch (e) {
            console.log(e);
        }
    } // end Color constructor

        // Color change method
    change(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end throw
        
        catch (e) {
            console.log(e);
        }
    } // end Color change method
} // end color class

class Box {
  constructor(xPos, yPos, xVel, yVel, w, h, color) {
    this.xPos = xPos; this.yPos = yPos;
    this.xVel = xVel; this.yVel = yVel;
    this.w = w; this.h = h;
    this.color = color;
  }
}

/* utility functions */

// draw a pixel at x,y using color
function drawPixel(imagedata,x,y,color) {
    try {
        if ((typeof(x) !== "number") || (typeof(y) !== "number"))
            throw "drawpixel location not a number";
        else if ((x<0) || (y<0) || (x>=imagedata.width) || (y>=imagedata.height))
            throw "drawpixel location outside of image";
        else if (color instanceof Color) {
            var pixelindex = (y*imagedata.width + x) * 4;
            imagedata.data[pixelindex] = color.r;
            imagedata.data[pixelindex+1] = color.g;
            imagedata.data[pixelindex+2] = color.b;
            imagedata.data[pixelindex+3] = color.a;
        } else 
            throw "drawpixel color is not a Color";
    } // end try
    
    catch(e) {
        console.log(e);
    }
} // end drawPixel
    

/* main -- here is where execution begins after window load */

function main() {

    // Get the canvas, context, and image data
    var canvas = document.getElementById("viewport"); 
    var context = canvas.getContext("2d");
    var w = context.canvas.width; // as set in html
    var h = context.canvas.height;  // as set in html
    var imagedata = context.createImageData(w,h);
 
    // Draw a rectangle with pixels
    var r = 91;
    var g = 206;
    var b = 250;

    var c = new Color(r,g,b,255); // the color at the pixel: black opaque
    var box = new Box(150, 200, 3, 3, 50, 50, c);
    setInterval(() => {
      dvdBounce(box, canvas, context, imagedata)
    }, 16);
}

function dvdBounce(b, canvas, context, imagedata) {
  imagedata.data.fill(0); // clear every pixel from previous frame

  for (var x=b.xPos; x<(b.xPos + b.w); x++) {
    for (var y=b.yPos; y<(b.yPos + b.h); y++) {
      drawPixel(imagedata,x,y,b.color);
      // console.log("draw at " +x+ " " +y);
     }
  }

  var red = Math.floor(Math.random() * 255);
  var gre = Math.floor(Math.random() * 255);
  var blu = Math.floor(Math.random() * 255);
  if (b.xPos <= 0) { // left
    b.xPos = 0;
    b.xVel = Math.floor(Math.random() * 5) + 3;
    b.color.r = red; b.color.gre = gre; b.color.b = blu;
  } else if (b.xPos + b.w >= canvas.width) { // right
    b.xPos = canvas.width - b.w;
    b.xVel = -(Math.floor(Math.random() * 5) + 3);
    b.color.r = red; b.color.gre = gre; b.color.b = blu;
  }

  if (b.yPos <= 0) { // top
    b.yPos = 0;
    b.yVel = Math.floor(Math.random() * 5) + 3;
    b.color.r = red; b.color.gre = gre; b.color.b = blu;
  } else if (b.yPos + b.h >= canvas.height) { // bottom
    b.yPos = canvas.height - b.h;
    b.yVel = -(Math.floor(Math.random() * 5) + 3);
    b.color.r = red; b.color.gre = gre; b.color.b = blu;
  }

  b.xPos += b.xVel;
  b.yPos += b.yVel;

  context.putImageData(imagedata, 0, 0); // display the image in the context
}
