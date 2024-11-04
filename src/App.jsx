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

    const images = [];
    let imagesLoaded = 0;

    const loadImage = (index) => {
      const img = images[index];
      if (!img) return;

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
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

      frames.currentIndex = index;
    };

    const preLoadImages = () => {
      for (let i = 1; i <= frames.maxIndex; i++) {
        const imageUrl = `frames/frame_${i.toString().padStart(4, "0")}.jpg`;
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          imagesLoaded++;
          if (imagesLoaded === frames.maxIndex) {
            loadImage(frames.currentIndex);
            startAnimation(); // Start animation after preloading
          }
        };
        images.push(img);
      }
    };

    const startAnimation = () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".canv",
            start: "top top",
            end: "bottom bottom", // Adjust this value for the animation duration
            scrub: 2,
            pin: true, // This keeps the section fixed during the scroll
            markers: true, // Optional: visualize start and end points for debugging
          },
        })
        .to(frames, {
          currentIndex: frames.maxIndex,
          onUpdate: function () {
            loadImage(Math.floor(frames.currentIndex));
          },
        });
    };

    window.addEventListener("resize", () => {
      loadImage(frames.currentIndex);
    });

    preLoadImages();

    return () => {
      window.removeEventListener("resize", () =>
        loadImage(frames.currentIndex)
      );
    };
  }, []);

  return (
    <>
{/*       
      <canvas className=""></canvas> */}


      <div className="w-full     bg-zinc-900">
        <div className="parent  relative top-0   w-full h-[700vh]  ">
          <div className="w-full  sticky top-0 left-0  ">
            <canvas className=""></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
