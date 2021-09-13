var Harmonizer = require('color-harmony').Harmonizer;
var onecolor = require('onecolor');
var fs = require('fs')
var Svg2png = require('svg-png-converter')

function splitComplementary(color) {
    var harmonizer = new Harmonizer();
    const h = harmonizer.harmonize(color, 'splitComplementary')

    let s1 = new onecolor(h[1]).hsl()
    let s2 = new onecolor.HSL(s1._hue, s1._saturation, (s1._lightness + diffL) % 1, s1._alpha)
    let s3 = new onecolor(h[2]).hsl()
    let s4 = new onecolor.HSL(s3._hue, s3._saturation, (s3._lightness + diffL) % 1, s3._alpha)
    return [s1, s2, s3, s4]
}

module.exports = async function main (callback) {
    try {
        
        const accounts = await web3.eth.getAccounts();
        console.log(accounts)
        console.log(await web3.eth.getTransactionCount(accounts[0]));
        console.log(await web3.eth.getTransactionCount(accounts[1]));

        const Loot = artifacts.require('CoLoot');
        // const loot = await Loot.deployed();
        // const loot = await Loot.at("0x8a490cbc499cfd8d955ea4bc5bf9c9aff1a02040");
        // console.log('loot', loot)
        
        // const value = await loot.retrieve();
        // const value = await loot.claim(1);

        // let value3 = Math.floor(Math.random() * 10);

        // console.log("");
        // console.log(rgbToHsl(100, 66, 36));
        // console.log("");
        // console.log(rgbToHsl2(100, 66, 36));
        // console.log("");

        const tokenId = 1
        // console.log('claiming token', tokenId)
        // await loot.ownerClaim(tokenId)
        // console.log('claim DONE', tokenId)


        // for (let index = 7; index <= 20; index++) {
        //     await loot.ownerClaim(index)
        //     const tokenURI = await loot.tokenURI(index)
        //     console.log(tokenURI);
        //     // fs.writeFile(`svg/${index}.svg`, tokenURI, function (err) {

        //     // });
        //     // const hex = await loot.getThirdColor(index)
        //     // const hex = await loot.toColorRGB()
        //     // console.log(hex);
        //     // console.log(hex.toString());
            
        // }

        for (let index = 1; index <= 999; index++) {
            let outputBuffer = await Svg2png.svg2png({ 
            input: fs.readFileSync(`svg/${index}.svg`), 
            encoding: 'buffer', 
            format: 'png',
            })
            fs.writeFileSync(`png/${index}.png`, outputBuffer)
            console.log(index);
        }

        
        
        // const colorHex = `#${await loot.getPrimaryColor(tokenId)}`
        // const colorHSL = onecolor(colorHex).hsl()
        // console.log(`Primary Color: ${colorHex}`);
        // console.log(`HSL Color: ${colorHSL}`)
        
        // console.log("");
        // console.log("");
        // console.log(hslToRgb(32/360, 47/100, 73/100));
        // console.log("");
        // console.log(hslToRgb2(32/360*10000, 47/100*10000, 73/100*10000));
        // const [s1, s2, s3, s4] = splitComplementary(colorHSL)
        
        
        
        callback(0);
    } catch (error) {
        console.error(error);
        callback(1);
    }
};

function hslToRgb(h, s, l){
    var r, g, b;
    console.log(h, s, l);
    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            console.log(`p q t is ${p} ${q} ${t}`);
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) {
                console.log("p + (q - p) * 6 * t", p + (q - p) * 6 * t);
                return p + (q - p) * 6 * t;
            }
            if(t < 1/2) return q;
            if(t < 2/3) {
                // console.log("t < 2/3 should be", p + (q - p) * (2/3 - t) * 6);
                // console.log("p + (q - p) should be", p + (q - p));
                // console.log("(2/3 - t)", (2/3 - t));
                return p + (q - p) * (2/3 - t) * 6;
            } 
            return p;
        }
        // console.log(`l= ${l}  s= ${s}`);
        console.log("l * (1 + s) should be", l * (1 + s));
        console.log("l + s - l * s", l + s - l * s);
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        // console.log(`l= ${l}  q= ${q}`);
        console.log(`2 * l - q`, 2 * l - q);
        var p = 2 * l - q;
        console.log("(p, q, h + 1/3)", (p, q, h + 1/3));
        r = hue2rgb(p, q, h + 1/3);
        // console.log(`r = ${r}`);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    console.log([Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]);
    

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function hslToRgb2(h, s, l){
    var r, g, b;
    console.log(h, s, l);
    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            console.log(`p q t is ${p} ${q} ${t}`);
            if(t < 0) t += 10000;
            if(t > 10000) t -= 10000;
            if(t < 1666) {
                console.log("p + (q - p) * 6 * t", p + (q - p) * 6 * t / 10000);
                return p + (q - p) * 6 * t / 10000;
            }
            if(t < 5000) return q;
            if(t < 6666) {
                // console.log("t < 2/3 is", p + ((q - p) * (6666 - t) / 10000) * 6);
                // console.log("p + (q - p) is", p + (q - p));
                // console.log("(2/3 - t)", (6666 - t));
                return p + ((q - p) * (6666 - t) / 10000) * 6;
            }
                
            return p;
        }
        // console.log(`l= ${l}  s= ${s}`);
        console.log("l * (1 + s) is", l * (10000 + s) / 10000);
        console.log("l + s - l * s", l + s - ((l*s)/10000));
        var q = l < 5000 ? l * (10000 + s) / 10000 : l + s - ((l*s)/10000);
        console.log(`2 * l - q`, 2 * l - q);
        var p = 2 * l - q;
        console.log("(p, q, h + 3333)", (p, q, h + 3333));
        r = hue2rgb(p, q, h + 3333);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 3333);
    }
    console.log(`r = ${r}`);
    console.log(`g = ${g}`);
    console.log(`b = ${b}`);
    // console.log(r, g, b);

    return [r/10000 * 255, g/10000 * 255, b/10000 * 255];
}

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    console.log(max, min, h, s, l);
    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        console.log("s", s);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h*360, s*100, l*100];
}


function rgbToHsl2(r, g, b){
    r = r /255*10000
    g = g /255*10000
    b = b /255*10000
    console.log(r, g, b);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h;
    var s;
    var l = (max + min) / 2;

    console.log(max, min, h, s, l);
    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 5000 ? 10000 * d / (20000 - max - min) : d / (max + min) * 10000;
        console.log("s", s);
        console.log("d / (20000 - max - min) * 10000", 10000 * d / (20000 - max - min));
        console.log("(b - r)", (b - r));
        switch(max){
            case r: h = (g - b) / d * 10000 + (g < b ? 60000 : 0); break;
            case g: h = (b - r) / d * 10000 + 20000; break;z
            case b: h = (r - g) / d * 10000 + 40000; break;
        }
        h = h/ 6;
        console.log("d", d);
        console.log("h", 10000 * (b - r) / d);

    }
    // console.log("h", h);
    
    return [h/1000*36, s/100, l/100];
}