//first steps
// npm i to install dependencies
// npm i ollama to install ollama lib
// npm run dev to run the dev server (copy url and paste in chrome)

import p5 from "p5";
import ollama from 'ollama/browser'



async function generate() {
  const response = await ollama.chat({
    model: 'gemma2:2b',
    messages: [{ role: 'user', content: 'Why is the sky blue?' }],
  })
   console.log(response.message.content)
  return response;
}


let mytext = ""
/** @param {p5} p */
const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    setupuBitSerial(p);  // Pass p to your serial setup
  };

  p.draw = () => {
    p.background(50);
    p.ellipse(p.width / 2, p.height / 2, 200, 200);
    p.text(mytext,10,10)
  };

  p.keyPressed = async() => {
    if(p.key === "g"){
      p.fill('red');
      let temptext = await generate();
      mytext = temptext.message.content
      p.fill('green');
    }
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

new p5(sketch);