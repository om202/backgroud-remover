import React from "react";
import BeforeAfter from "./BeforeAfter";

const Jumbo = React.memo(function Jumbo() {
  const [show, setShow] = React.useState(false);
  const [image, setImage] = React.useState(null);

  const uploadImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = function() {
        const base64String = reader.result.replace("data:", "")
          .replace(/^.+,/, "");
        setImage(base64String);
        setShow(true);
      }
      reader.readAsDataURL(file);
    };
    input.click();
  };

  return (
    <section class="bg-white pb-16">
      {!show && (
        <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <img
            src="bg.png"
            alt="removed background"
            className="block mx-auto"
            width={340}
          />
          <h1 class="mb-4 mt-6 text-4xl tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl text-slate-600">
            Remove Background from Image
          </h1>
          <p class="mb-2 text-xl font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 text-slate-600">
            Remove background from image in just a few seconds with our AI
          </p>
          <p class="mb-12 text-xl font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 text-yellow-500">
            Its 100% free.
          </p>
          <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <div className="block mx-auto max-w-sm p-10 bg-white shadow rounded-lg bg-gray-100 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
              <button
                type="button"
                onClick={() => uploadImage()}
                class="mb-4 text-xl font-bold tracking-tight text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2.5 me-2 mb-2 focus:outline-none"
              >
                Upload Image
              </button>
              <p class="font-normal text-gray-500 mb-2 mt-2">OR</p>
              <p class="font-normal text-gray-500">Drop Image Here</p>
            </div>
          </div>
        </div>
      )}
      {show && <BeforeAfter image={image}/>}
    </section>
  );
});

export default Jumbo;
