import React, { useEffect, useState } from "react";

export const Eyes = () => {
  const [rotate, setRotate] = useState(90);

  const handleEyes = (e) => {
    let eyeX = e.clientX;
    let eyeY = e.clientY;
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;
    let deltaX = eyeX - centerX;
    let deltaY = eyeY - centerY;
    const deg = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    setRotate(deg-290);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleEyes);
    return () => {
      window.removeEventListener("mousemove", handleEyes);
    };
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex bg-black w-[35vw] h-[250px] justify-between px-9 py-9">
        <div className="rounded-full w-[40%] bg-white p-8">
          <div className="bg-black w-full h-full rounded-full flex justify-center">
            <div
              className="w-[20px] h-full"
              style={{ transform: `rotate(${rotate}deg)` }}
            >
              <div className="bg-white h-[20px] rounded-full w-full"></div>
            </div>
          </div>
        </div>
        <div className="rounded-full w-[40%] bg-white p-8">
          <div className="bg-black w-full h-full rounded-full flex justify-center">
            <div
              className="w-[20px] h-full"
              style={{ transform: `rotate(${rotate}deg)` }}
            >
              <div className="bg-white h-[20px] rounded-full w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
