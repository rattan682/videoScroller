import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    const frames = {
      currentIndex: 0,
      maxIndex: 382,
    };

    let img = new Image();
    img.src = `frames/frame_${frames.currentIndex.toString().padStart(4, "0")}.jpg`;

    const loadImage = (index) => {
      img.src = `frames/frame_${index.toString().padStart(4, "0")}.jpg`;
      img.onload = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);
        
        const newWidth = img.width * scale;
        const newHeight = img.height * scale;
        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
      };
    };

    const startAnimation = () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".canv",
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
            pin: true,
          },
        })
        .to(frames, {
          currentIndex: frames.maxIndex,
          onUpdate: function () {
            loadImage(Math.floor(frames.currentIndex));
          },
        });
    };

    window.addEventListener("resize", () => loadImage(Math.floor(frames.currentIndex)));

    startAnimation();
    loadImage(frames.currentIndex);

    return () => {
      window.removeEventListener("resize", () => loadImage(Math.floor(frames.currentIndex)));
    };
  }, []);

  return (
    <>
      <div className="w-full bg-zinc-900">
        <div className="parent relative top-0 w-full h-[700vh]">
          <div className="w-full sticky top-0 left-0">
            <canvas className=""></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
