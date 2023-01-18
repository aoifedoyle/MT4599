var canvas;
var ctx;
var h = 400;
var w = 500;
var xorigin =15;
var offsetB = 10;
var yorigin = h-offsetB;
var df = 5; // t-dist indexed by df
var xMin = -4;
var xMax = 4;
var xScale = w/(xMax-xMin);
var yScale = h;
var tickSpacing = 1;

window.onload = function(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.height = h+2*xorigin;
    canvas.width = w+2*xorigin;
    drawScatterplot();
}

    function drawScatterplot(){
        //Clearing the canvas
        ctx.clearRect(0,0,canvas.width,canvas.height);
        //Drawing x axis
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, yorigin);
        ctx.lineTo(w, yorigin);
        ctx.stroke();

        //Drawing the t-distribution curve
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (var x = xMin; x <= xMax; x+0.01){
            console.log("df"); //Log the value of df
            var y = jStat.studentt.pdf(x,df)*1.5;
            var xp = (x - xMin) * xScale ;
            var yp = (1-y) * (yScale - offsetB);
            if(x === xMin){
                ctx.moveTo(xp, yp);
            } else {
                ctx.lineTo(xp, yp);
            }
        }
        ctx.stroke();

        // Adding values on the x axis
        ctx.font = "14px Arial";
        ctx.strokeStyle = "black";
        for (var x = xMin; x <= xMax; x++){
            var xp = (x - xMin) * xScale;
            ctx.beginPath();
            ctx.moveTo(xp, yorigin - 5);
            ctx.lineTo(xp, yorigin + 5);
            ctx.stroke();
        }

        // Drawing the labels for the tick marks on the x-axis
        ctx.fillStyle = "black";
        ctx.font = "14px Arial";
        for(var x = xMin; x <= xMax; x++){
            var xp = (x - xMin) * xScale;
            ctx.fillText(x.toString(), xp - 5, yorigin + 20);
        }

        //Partial Curve
        /*start = Math.round((((startx - (mean - (4*sd)))/(8*sd)) * w));
        end = Math.round((((endx - (mean - (4*sd)))/(8*sd)) * w));

        ctx.strokeStyle= "black";
        ctx.fillStyle= "black";
        ctx.beginPath();
        ctx.moveTo(xorigin + xvals[start], yorigin);
        ctx.lineTo(xorigin + xvals[start], yorigin - (yvals[start]/yvals[w/2]*(h*0.75)));
        for(var i = start; i < end; i++){
            ctx.lineTo(xorigin + xvals[i], yorigin - (yvals[i]/yvals[w/2]*(h*0.75)));
        }
        ctx.lineTo(xorigin + xvals[end], yorigin);
        ctx.moveTo(xorigin + xvals[end], yorigin);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();*/
    }


// Adding event listeners for user interactions
document.getElementById("dfInput").addEventListener("input", function(){
    df = this.value;
    drawScatterplot();
});