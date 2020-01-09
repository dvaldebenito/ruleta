import React, { useRef, useEffect } from 'react';

import './ruleta.css'

const Ruleta = ({ items }) => {

    let startAngle = 0;
    let arc = Math.PI / (items.length / 2);
    let spinTimeout = null;

    let spinTime = 0;
    let spinTimeTotal = 0;

    let ctx;

    const byte2Hex = (n) => {
        const nybHexString = "0123456789ABCDEF";
        return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
    }

    const RGB2Color = (r, g, b) => {
        return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
    }

    const getColor = (item, maxitem) => {
        const phase = 0;
        const center = 128;
        const width = 127;
        const frequency = Math.PI * 2 / maxitem;

        const red = Math.sin(frequency * item + 2 + phase) * width + center;
        const green = Math.sin(frequency * item + 0 + phase) * width + center;
        const blue = Math.sin(frequency * item + 4 + phase) * width + center;

        return RGB2Color(red, green, blue);
    }

    const drawRouletteWheel = () => {
        const canvas = canvasref.current
        if (canvas.getContext) {
            const outsideRadius = 200;
            const textRadius = 160;
            const insideRadius = 125;

            ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, 500, 500);

            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;

            for (let i = 0; i < items.length; i++) {
                const angle = startAngle + i * arc;
                drawRoulette(ctx, outsideRadius, insideRadius, angle, arc, i, items.length)
                putText(ctx, items[i].name, angle, arc, textRadius)
                
            }

            //Arrow
            drawArrow(ctx, outsideRadius)
        }
    }

    const drawRoulette = (element, outsideRadius, insideRadius, angle, arc, i, length) => {
        element.fillStyle = getColor(i, length);
        element.beginPath();
        element.arc(250, 250, outsideRadius, angle, angle + arc, false);
        element.arc(250, 250, insideRadius, angle + arc, angle, true);
        element.stroke();
        element.fill();
        element.save();
    }

    const putText = (element, text, angle, arc, textRadius) => {
        element.shadowOffsetX = -1;
        element.shadowOffsetY = -1;
        element.shadowBlur = 0;
        element.fillStyle = "#000000";
        element.font = "bold 16px Lato,Helvetica,Arial,Verdana,Tahoma,sans-serif"
        element.translate(250 + Math.cos(angle + arc / 2) * textRadius,
            250 + Math.sin(angle + arc / 2) * textRadius);
        element.rotate(angle + arc / 2 + Math.PI / 2);
        
        element.fillText(text, -ctx.measureText(text).width / 2, 0);
        element.restore();
    }

    const drawArrow = (element, outsideRadius) => {
        element.fillStyle = "#F42534";
        element.beginPath();
        element.moveTo(250 - 8, 220 - (outsideRadius + 10));
        element.lineTo(250 + 8, 220 - (outsideRadius + 10));
        element.lineTo(250 + 8, 220 - (outsideRadius - 10));
        element.lineTo(250 + 18, 220 - (outsideRadius - 10));
        element.lineTo(250 + 0, 220 - (outsideRadius - 26));
        element.lineTo(250 - 18, 220 - (outsideRadius - 10));
        element.lineTo(250 - 8, 220 - (outsideRadius - 10));
        element.lineTo(250 - 8, 220 - (outsideRadius + 10));
        element.fill();
    }

    const spin = () => {
        const spinAngleStart = Math.random() * 10 + 10;
        spinTime = 0;
        spinTimeTotal = Math.random() * 3 + 10 * 1000;
        rotateWheel(spinAngleStart);
    }

    const rotateWheel = (spinAngleStart) => {
        spinTime += 30;
        if (spinTime >= spinTimeTotal) {
            stopRotateWheel();
            return;
        }
        const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
        startAngle += (spinAngle * Math.PI / 180);
        drawRouletteWheel();
        spinTimeout = setTimeout(() => rotateWheel(spinAngleStart), 30);
    }

    const stopRotateWheel = () => {
        clearTimeout(spinTimeout);
        const degrees = startAngle * 180 / Math.PI + 90;
        const arcd = arc * 180 / Math.PI;
        const index = Math.floor((360 - degrees % 360) / arcd);
        ctx.save();        
        ctx.font = "24px Arial"
        const base_image = new Image();
        base_image.src = items[index].image;
        base_image.onload = () => {
            ctx.width=180;
            ctx.height=180;
            const w = base_image.width;
            const h = base_image.height;
            const sizer = scalePreserveAspectRatio(w,h,ctx.width,ctx.height);
            ctx.drawImage(base_image,0,0,w,h,160,160,w*sizer,h*sizer);
        }
        //ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
        ctx.restore();
    }

    const scalePreserveAspectRatio = (imgW,imgH,maxW,maxH) => (Math.min((maxW/imgW),(maxH/imgH)));

    const easeOut = (t, b, c, d) => {
        const ts = (t /= d) * t;
        const tc = ts * t;
        return b + c * (tc + -3 * ts + 3 * t);
    }


    const canvasref = useRef();

    useEffect(() => {
        drawRouletteWheel()
    });

    return (
        <div className="ruleta">
            <canvas
                ref={canvasref}
                className=""
                width="500"
                height="500"
            ></canvas>
            <button
                className={"button--primary"}
                onClick={() => spin()}
            >Girar</button>
        </div>
    )
}

export default Ruleta