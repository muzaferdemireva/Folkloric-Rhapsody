let video, img, icon;
let video2, img2, icon2;
let video3, img3, icon3;
let video4, img4, icon4;
let video5, img5, icon5;
let video6, img6, icon6;

let video2Loaded = false, img2Loaded = false, icon2Loaded = false;
let video3Loaded = false, img3Loaded = false, icon3Loaded = false;
let video4Loaded = false, img4Loaded = false, icon4Loaded = false;
let video5Loaded = false, img5Loaded = false, icon5Loaded = false;
let video6Loaded = false, img6Loaded = false, icon6Loaded = false;

let soundAnalyzer2, soundAnalyzer3, soundAnalyzer4, soundAnalyzer5, soundAnalyzer6;

let waveOffset2 = 0, waveOffset3 = 0, waveOffset4 = 0, waveOffset5 = 0, waveOffset6 = 0;

let isPlaying2 = false, isPlaying3 = false, isPlaying4 = false, isPlaying5 = false, isPlaying6 = false;

let tintedIcons2 = {}, tintedIcons3 = {}, tintedIcons4 = {}, tintedIcons5 = {}, tintedIcons6 = {};


let screenshotCountText;
let screenshotButton;
let downloadButton;
let downloadButton2;
let finalizeButton;

let screenshotBuffer;

let videoLoaded = false, imgLoaded = false, iconLoaded = false;

let tintedIcons = {};


let soundAnalyzer;

let waveOffset1 = 0;
let waveHeight = 0;

let screenshots = [];
let finalized = false;

let scaleFactor = 0.45;
let gridOffsetY = 3100;
let gridOffsetX = 3800;

let isPlaying1 = false;



let finalCombinedImage = null;
let qrImg;
let qrImgElement;
let uploadedImageURL = "";


let sequenceImage = null;
let qrImgElement2;
let uploadedSequenceURL = "";

const imgbbApiKey = 'c769a359cf2a5ade5afed4324d005f58';

let title;


let croppedScreenshots = []; // to hold the cropped layers

let finalizeWarningText;
let finalizeWarningText2;

let sequenceWarningText;
let waitForQR;





function preload() {
  video = createVideo("severnyashkata.mp4", () => { video.hide(); videoLoaded = true; });
  img = loadImage("severnyashka-colours.png", () => imgLoaded = true);
  icon = loadImage("severnyashka-icon.png", () => iconLoaded = true);

  video2 = createVideo("dobrudzhanska.mp4", () => { video2.hide(); video2Loaded = true; });
  img2 = loadImage("dobrudzhanska-colours.png", () => img2Loaded = true);
  icon2 = loadImage("dobrudzhanska-icon.png", () => icon2Loaded = true);
  
  video3 = createVideo("shopska.mp4", () => { video3.hide(); video3Loaded = true; });
  img3 = loadImage("shopska-colours.png", () => img3Loaded = true);
  icon3 = loadImage("shopska-icon.png", () => icon3Loaded = true);
  
  video4 = createVideo("trakiyska.mp4", () => { video4.hide(); video4Loaded = true; });
  img4 = loadImage("trakiyska-colours.png", () => img4Loaded = true);
  icon4 = loadImage("trakiyska-icon.png", () => icon4Loaded = true);
  
  video5 = createVideo("pirinska.mp4", () => { video5.hide(); video5Loaded = true; });
  img5 = loadImage("pirinska-colours.png", () => img5Loaded = true);
  icon5 = loadImage("pirinska-icon.png", () => icon5Loaded = true);
  
  video6 = createVideo("rodopska.mp4", () => { video6.hide(); video6Loaded = true; });
  img6 = loadImage("rodopska-colours.png", () => img6Loaded = true);
  icon6 = loadImage("rodopska-icon.png", () => icon6Loaded = true);
  


  soundFormats("mp3", "wav");
  myFont = loadFont('Anago-Book.ttf');
  myFont2 = loadFont('Anago-Thin.ttf');
  myFont3 = loadFont('Anago-ThinItalic.ttf');
  myFont4 = loadFont('Anago-Bold.ttf');
  myFont5 = loadFont('Anago-BookItalic.ttf');
  myFont6 = loadFont('Anago-BoldItalic.otf');

  title = loadImage("title.png");
  

}






function setup() {
  background(0);



  createCanvas(12700 * scaleFactor, 9700 * scaleFactor);
  document.title = "Interactive Screen | Folkloric Rhapsody"; 

  video.size(3540, 2000);
 

  frameRate(30);

  soundAnalyzer = new p5.Amplitude(); soundAnalyzer.setInput(video);

  video2.size(3540, 2000);
  video3.size(3540, 2000);
  video4.size(3540, 2000);
  video5.size(3540, 2000);
  video6.size(3540, 2000);

  soundAnalyzer2 = new p5.Amplitude(); soundAnalyzer2.setInput(video2);
  soundAnalyzer3 = new p5.Amplitude(); soundAnalyzer3.setInput(video3);
  soundAnalyzer4 = new p5.Amplitude(); soundAnalyzer4.setInput(video4);
  soundAnalyzer5 = new p5.Amplitude(); soundAnalyzer5.setInput(video5);
  soundAnalyzer6 = new p5.Amplitude(); soundAnalyzer6.setInput(video6);


  screenshotButton = createButton("Take Screenshot");
  screenshotButton.position(2120, 3770);
  screenshotButton.size(650, 140);
  screenshotButton.style("font-size", "60px");
  screenshotButton.style("font-family", myFont2);
 
  screenshotButton.mousePressed(takeScreenshot);

  screenshotCountText = createP("SCREENSHOTS TAKEN: 0");
  screenshotCountText.position(4020, 3740);
  screenshotCountText.style("font-size", "63px");
  screenshotCountText.style("font-family", "Anago-Book");
  screenshotCountText.style("color", "#333");

  finalizeButton = createButton("Finalize");
  finalizeButton.position(3040, 3770);
  finalizeButton.size(650, 140);
  finalizeButton.style("font-size", "60px");
  finalizeButton.style("font-family", myFont2);
  finalizeButton.mousePressed(finalizeScreenshots);

  downloadButton = createButton("Download");
  downloadButton.position(3070, 1250);
  downloadButton.size(500, 140);
  downloadButton.style("font-size", "60px");
  downloadButton.style("font-family", myFont2);
  downloadButton.mousePressed(downloadScreenshot);
  downloadButton.hide();

  downloadButton2 = createButton("Download");
  downloadButton2.position(5070, 1250);
  downloadButton2.size(500, 140);
  downloadButton2.style("font-size", "60px");
  downloadButton2.style("font-family",myFont2);
  downloadButton2.mousePressed(downloadSequence);
  downloadButton2.hide();
 
  finalizeWarningText = createP("WARNING!");
  finalizeWarningText.position(4400, 2025); // Adjust Y to appear under the Finalize button
  finalizeWarningText.style("font-size", "60px");
  finalizeWarningText.style("font-family", "Anago-BoldItalic");
  finalizeWarningText.hide();  // Hidden by default

  finalizeWarningText2 = createP("Please take at least 1 screenshot before finalizing!");
  finalizeWarningText2.position(4400, 2105); // Adjust Y to appear under the Finalize button
  finalizeWarningText2.style("font-size", "60px");
  finalizeWarningText2.style("font-family", "Anago-BookItalic");
  finalizeWarningText2.hide();  // Hidden by default


  sequenceWarningText = createP("Take more screenshots to see sequence of screenshots.");
  sequenceWarningText.position(2250, 3930); // Adjust based on your layout
  sequenceWarningText.style("font-size", "65px");
  sequenceWarningText.style("font-family", "Anago-BookItalic");
  sequenceWarningText.hide();

  waitForQR = createP("Wait for QR code to appear in order to open <br>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp and save on mobile devices.");
  waitForQR.position(2400, 3710); // Adjust based on your layout
  waitForQR.style("font-size", "65px");
  waitForQR.style("font-family", "Anago-BookItalic");
  waitForQR.hide();

}






function draw() {


  if (!videoLoaded || !imgLoaded || !iconLoaded ||
    !video2Loaded || !img2Loaded || !icon2Loaded ||
    !video3Loaded || !img3Loaded || !icon3Loaded ||
    !video4Loaded || !img4Loaded || !icon4Loaded ||
    !video5Loaded || !img5Loaded || !icon5Loaded ||
    !video6Loaded || !img6Loaded || !icon6Loaded) {
    background(50);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(65);
    text("Loading...", width / 2, height / 2);
    
   
  return;
  }
  


  
  if (finalized) {
    background(255);
  
    image(title, 720,100, 4300, 670);
    fill(210);
    rect(30, 870, 7000, 5);
    fill(0);


    /*
    // Draw exactly at (0, 0)
    for (let i = 0; i < screenshots.length; i++) {
      tint(255, 255 / (i + 1));
      image(screenshots[i], 0, 0);  // ← No shifting!
    }
  */
    

    noTint();


  
  if (screenshots.length > 1 && sequenceImage) {

    if (finalCombinedImage) {
      const finalX = 80;  // change this to position horizontally
      const finalY = 1100;  // change this to position vertically
      image(finalCombinedImage, finalX, finalY);
      noTint(); // just in case
    }

    const sequenceX = 3840;
    const sequenceY = 1185;
  
    const maxDisplayHeight = 2000; // or whatever fits your layout
    const actualHeight = sequenceImage.height;
    const actualWidth = sequenceImage.width;
    
  
    // 🔧 Compute scale factor dynamically
    let scale = 1;
    if (actualHeight > maxDisplayHeight) {
      scale = maxDisplayHeight / actualHeight;
    }
  
    // Draw scaled image
    image(sequenceImage, sequenceX, sequenceY, actualWidth * scale, actualHeight * scale);
    
    fill(0);
    textFont(myFont5);
    textSize(70);
    text("Sequence Image", 3920, 1140);
  }

  fill(0);
  textFont(myFont5);
  textSize(55);
 

  if (screenshots.length > 1) {
  text("         Scan QR code", 3075, 2050);
  text("         Scan QR code", 5060, 2050);


  textSize(70);
  textFont(myFont5);
  text("Layered Image", 260, 1140);
  }

  if (screenshots.length == 1) {
    if (finalCombinedImage) {
      const finalX = 1400;  // change this to position horizontally
      const finalY = 1100;  // change this to position vertically
      image(finalCombinedImage, finalX, finalY);
      noTint(); // just in case
    }
    text("         Scan QR code", 4485, 2800);
    fill(255);
    stroke(0);
    rect(2180, 3750, 1570, 375);

    stroke(110);
    rect(2180, 3960, 1570, 1);

    fill(0);
    textSize(70);
    textFont(myFont5);
    text("Screenshot", 2700, 1140);

    //stroke(210);
    //rect(30, 4350, 7000, 3);

    }
  


  //fill(0);
  //textSize(65);
 // text("* Wait for QR codes to appear in order to open and save on mobile devices.",140, 2890);


    return;
  }
  
  




  background(255);
 
  fill(0);
  textSize(65);
  text("* Click on visualization to stop/play it.",720, 3855);
  
  
  fill(210);
  rect(30, 870, 7000, 2);
  rect(30, 4060, 7000, 2);

  

  image(title, 720,100, 4300, 670);

  
  push();
  
  scale(scaleFactor); 
   
  translate(gridOffsetX, gridOffsetY);
 




  let mX = mouseX / scaleFactor - gridOffsetX;
  let mY = mouseY / scaleFactor - gridOffsetY;

  const v1X = 0,    v1Y = 0;
  const v2X = 3000, v2Y = 0;
  const v3X = 0,    v3Y = 1750;
  const v4X = 3000, v4Y = 1750;
  const v5X = 0,    v5Y = 3500;
  const v6X = 3000, v6Y = 3500;


  video.loadPixels(); img.loadPixels();
  video2.loadPixels(); img2.loadPixels();
  video3.loadPixels(); img3.loadPixels();
  video4.loadPixels(); img4.loadPixels();
  video5.loadPixels(); img5.loadPixels();
  video6.loadPixels(); img6.loadPixels();
  
  handlePlayPause(video, isPlaying1);
  handlePlayPause(video2, isPlaying2);
  handlePlayPause(video3, isPlaying3);
  handlePlayPause(video4, isPlaying4);
  handlePlayPause(video5, isPlaying5);
  handlePlayPause(video6, isPlaying6);


  drawVisualGrid(video, img, icon, tintedIcons, { value: waveOffset1 }, { value: waveHeight }, soundAnalyzer, v1Y, v1X);
  drawVisualGrid(video2, img2, icon2, tintedIcons2, { value: waveOffset2 }, { value: waveHeight }, soundAnalyzer2, v2Y, v2X);
  drawVisualGrid(video3, img3, icon3, tintedIcons3, { value: waveOffset3 }, { value: waveHeight }, soundAnalyzer3, v3Y, v3X);
  drawVisualGrid(video4, img4, icon4, tintedIcons4, { value: waveOffset4 }, { value: waveHeight }, soundAnalyzer4, v4Y, v4X);
  drawVisualGrid(video5, img5, icon5, tintedIcons5, { value: waveOffset5 }, { value: waveHeight }, soundAnalyzer5, v5Y, v5X);
  drawVisualGrid(video6, img6, icon6, tintedIcons6, { value: waveOffset6 }, { value: waveHeight }, soundAnalyzer6, v6Y, v6X);

  pop();

  /*
  // --- Show the original video on the side (or anywhere you'd like)
  let videoDisplayX = 3000;
  let videoDisplayY = 1230;
  let videoDisplayW = video.width * 0.47;
  let videoDisplayH = video.height * 0.47;

  image(video, videoDisplayX, videoDisplayY, videoDisplayW, videoDisplayH);

  // Optional: Draw a label or border
  noFill();
  stroke(0);
  rect(videoDisplayX - 2, videoDisplayY - 2, videoDisplayW + 4, videoDisplayH + 4);
  noStroke();
  fill(0);
  textSize(70);
  text("Original Video", videoDisplayX-5, videoDisplayY - 90);
  */

  fill(0);
  textSize(70);
  textFont(myFont5);
  text("Interactive Window", 2590, 1100);
  textFont(myFont5);
}






function drawVisualGrid(video, img, icon, tintedIcons, waveOffsetRef, waveHeightRef, analyzer, offsetY, offsetX, buffer = null) {
  let gridSize = 250;
  let target = buffer || this;

  let audioLevel = analyzer.getLevel();
  waveOffsetRef.value += 5;
  waveHeightRef.value = map(audioLevel, 0, 1, -50, 50);

  let maxVizWidth = 2700;
  let vizHeight = 1700; 

  for (let y = 0; y < vizHeight; y += gridSize) {
    for (let x = -gridSize; x < maxVizWidth; x += gridSize) {
      let xOffset = x + waveOffsetRef.value;

      let videoX = constrain(floor(map(x, 0, video.width, 0, video.width)), 0, video.width - 1);
      let videoY = constrain(floor(map(y, 0, video.height, 0, video.height)), 0, video.height - 1);
      let videoIndex = (videoY * video.width + videoX) * 4;
      let brightnessValue = video.pixels[videoIndex];

      let imgX = constrain(floor(map(x, 0, video.width, 0, img.width)), 0, img.width - 1);
      let imgY = constrain(floor(map(y, 0, video.height, 0, img.height)), 0, img.height - 1);
      let imgIndex = (imgY * img.width + imgX) * 4;

      let r = img.pixels[imgIndex];
      let g = img.pixels[imgIndex + 1];
      let b = img.pixels[imgIndex + 2];

      let size = map(brightnessValue, 0, 255, gridSize / 5, gridSize * 2);

      let colorKey = `${r},${g},${b}`;
      if (!tintedIcons[colorKey]) {
        let tintedIcon = createGraphics(icon.width, icon.height);
        tintedIcon.tint(r, g, b);
        tintedIcon.image(icon, 0, 0);
        tintedIcons[colorKey] = tintedIcon;
      }

      let yOffset = y + offsetY + waveHeightRef.value * 6;
      target.image(tintedIcons[colorKey], xOffset + offsetX-size*.5, yOffset-size*.5, size, size);
    }
  }
}




function handlePlayPause(video, isPlaying) {
  if (isPlaying) {video.play();
  console.log("Playing:", video);}
  else video.pause();
}




function mousePressed() {
  let mX = mouseX / scaleFactor - gridOffsetX;
  let mY = mouseY / scaleFactor - gridOffsetY;
  if (isInBounds(mX, mY, 0, 0, video)) isPlaying1 = !isPlaying1;  
     else if (isInBounds(mX, mY, 3000, 0, video2)) isPlaying2 = !isPlaying2; 
     else if (isInBounds(mX, mY, 0, 1659, video3)) isPlaying3 = !isPlaying3; 
     else if (isInBounds(mX, mY, 3000, 1650, video4)) isPlaying4 = !isPlaying4;
     else if (isInBounds(mX, mY, 0, 3400, video5)) isPlaying5 = !isPlaying5; 
     else if (isInBounds(mX, mY, 3000, 3400, video6)) isPlaying6 = !isPlaying6; 
}

function isInBounds(x, y, vx, vy, vid) {
  return x > vx && x < vx + vid.width && y > vy && y < vy + vid.height;
}





function takeScreenshot() {
  if (!finalized) {
    const fullW = width / scaleFactor;
    const fullH = height / scaleFactor;

    let buffer = createGraphics(fullW, fullH);
    buffer.clear();

    buffer.push();
    buffer.scale(scaleFactor);                       // 1. Scaling
    buffer.translate(gridOffsetX, gridOffsetY);     // 2. Offset
    waveOffset1 += 5;
    waveHeight = map(soundAnalyzer.getLevel(), 0, 1, -50, 50);
    drawVisualGrid(video, img, icon, tintedIcons, { value: waveOffset1 }, { value: waveHeight }, soundAnalyzer, 0, 0, buffer);
    drawVisualGrid(video2, img2, icon2, tintedIcons2, { value: waveOffset2 }, { value: waveHeight }, soundAnalyzer2, 0, 3000, buffer);
    drawVisualGrid(video3, img3, icon3, tintedIcons3, { value: waveOffset3 }, { value: waveHeight }, soundAnalyzer3, 1750,    0, buffer);
    drawVisualGrid(video4, img4, icon4, tintedIcons4, { value: waveOffset4 }, { value: waveHeight }, soundAnalyzer4, 1750, 3000, buffer);
    drawVisualGrid(video5, img5, icon5, tintedIcons5, { value: waveOffset5 }, { value: waveHeight }, soundAnalyzer5, 3500,    0, buffer);
    drawVisualGrid(video6, img6, icon6, tintedIcons6, { value: waveOffset6 }, { value: waveHeight }, soundAnalyzer6, 3500, 3000, buffer);

    buffer.pop();

    // No cropping
    screenshots.push(buffer.get());
    screenshotCountText.html("SCREENSHOTS TAKEN: " + screenshots.length);
  
    finalizeWarningText.hide(); 
    finalizeWarningText2.hide();
  }
}










function finalizeScreenshots() {
  if (screenshots.length === 0) {
    finalizeWarningText.show();  // Show warning
    finalizeWarningText2.show();
    return;  // Do not finalize
  }
  
  finalized = true;
  noLoop();

  video.pause(); 
  video2.pause(); 
  video3.pause(); 
  video4.pause(); 
  video5.pause(); 
  video6.pause(); 


  screenshotButton.hide();
  screenshotCountText.hide();
  finalizeButton.hide();
  downloadButton.show();
  downloadButton2.show();

  finalizeWarningText.hide(); // Just in case

  buildFinalImage();      // Combined fade image


 



  if (screenshots.length === 1) {
    downloadButton2.hide();             // hide download sequence
    sequenceWarningText.show();         // show tip message
    waitForQR.show();
    downloadButton.position(4480, 2000);
    
    generateAndUploadImage(finalCombinedImage, (url) => {
      showQRCode(url, 4505, 2260); // QR 1 (final image)
    });
    

    if (qrImgElement2) qrImgElement2.remove(); // hide QR 2 if it exists
  } else {
    downloadButton2.show();            // show download sequence
    sequenceWarningText.hide();   


  buildSequenceImage();   // Full vertical image

 
  generateAndUploadImage(sequenceImage, (url) => {
    showQRCode(url, 5100, 1520, true); // QR 2 (sequence)
  }); 


  generateAndUploadImage(finalCombinedImage, (url) => {
    showQRCode(url, 3095, 1520); // QR 1 (final image)
  });
}
  
  
}





function buildFinalImage() {
  if (screenshots.length === 0) {
    console.log("No screenshots to combine.");
    return;
  }

  // 🔧 Crop settings — adjust until it matches your icon grid
  const cropX = 1400;
  const cropY = 1100;
  const cropW = 2960;
  const cropH = 2600;

  // Reset cropped screenshots array
  croppedScreenshots = [];

  // Create the final composite image (same size as one cropped layer)
  finalCombinedImage = createGraphics(cropW, cropH);
  finalCombinedImage.clear(); // transparent

  for (let i = 0; i < screenshots.length; i++) {
    // Crop the screenshot
    const cropped = screenshots[i].get(cropX, cropY, cropW, cropH);
    croppedScreenshots.push(cropped); // Store for sequence

    // Fade-combine into the final image
    finalCombinedImage.tint(255, 255 / (i + 1));
    finalCombinedImage.image(cropped, 0, 0);
  }

  finalCombinedImage.noTint();
}






function buildSequenceImage() {
  if (croppedScreenshots.length === 0) {
    console.warn("No cropped screenshots available.");
    return;
  }

  const w = croppedScreenshots[0].width;
  const h = croppedScreenshots[0].height;
  const totalHeight = h * croppedScreenshots.length;

  sequenceImage = createGraphics(w, totalHeight);
  sequenceImage.clear(); // keep background transparent

  let y = 0;
  for (let i = 0; i < croppedScreenshots.length; i++) {
    sequenceImage.image(croppedScreenshots[i], 0, y);
    y += h;
  }

  console.log("Sequence image built:", w, totalHeight);
}









function downloadScreenshot() {
  if (!finalCombinedImage) {
    console.warn("No finalized image to download.");
    return;
  }

  // Convert canvas to image and download
  const dataURL = finalCombinedImage.elt.toDataURL("image/png");
  const link = document.createElement('a');
  link.download = 'LayeredImage.png';
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}













function downloadSequence() {
  if (!sequenceImage) {
    console.warn("Sequence image not built yet.");
    return;
  }

  // Convert canvas to image and download
  const dataURL = sequenceImage.elt.toDataURL("image/png");
  const link = document.createElement('a');
  link.download = 'SequenceImage.png';
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}










function generateAndUploadImage(graphicsObj, callback) {
  if (!graphicsObj) {
    console.error("Image object missing.");
    return;
  }

  graphicsObj.canvas.toBlob((blob) => {
    const formData = new FormData();
    formData.append("image", blob);

    fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
      method: "POST",
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Uploaded URL:", data.data.url);
        if (data && data.data && data.data.url) {
          callback(data.data.url);
        } else {
          console.error("Invalid upload response:", data);
        }
      })
      
      .catch((err) => console.error("Image upload failed:", err));
  }, 'image/png');
}








function showQRCode(url, x, y, isSequence = false) {
  const qrURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}&size=350x350`;

  // Remove old first
  if (isSequence) {
    if (qrImgElement2) qrImgElement2.remove();
  } else {
    if (qrImgElement) qrImgElement.remove();
  }

  // Create and position the new QR code
  const imgEl = createImg(qrURL, isSequence ? "Sequence QR Code" : "Final Image QR Code");
  imgEl.size(450, 450);
  imgEl.position(x, y);

  // Assign to proper global
  if (isSequence) {
    qrImgElement2 = imgEl;
  } else {
    qrImgElement = imgEl;
  }
}

 
