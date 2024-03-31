import React, { useEffect } from "react";
import Loading from "./Loading";
import { SAMPLE_IMAGE } from "../sample";

const BeforeAfter = React.memo(function BeforeAfter({ image }) {
  const [choice, setChoice] = React.useState("before");
  const [processing, setProcessing] = React.useState(true);
  const [output, setOutput] = React.useState(null);

  useEffect(() => {
    if (image) {
      setChoice("before");
      setProcessing(true);
      console.log('fetching')
      fetch(
        'https://dezjjd1640.execute-api.us-east-1.amazonaws.com/Remove_Background/remove',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: image }),
        },
      )
        .then((response) => {
          return response.text();
        })
        .then((text) => {
          setOutput(text);
          setProcessing(false);
          setChoice("after");
        })
        .catch((error) => {
          console.error("Error:", error);
          setProcessing(false);
        }
      );
    }
  }, [image]);

  return (
    <div className="border bg-slate-100 mx-auto max-w-screen-lg w-full  mt-8">
      <div className="flex">
        <button
          className={`w-1/2 hover:bg-slate-200 text-slate-600 p-2 border-gray-400 ${
            choice === "before" ? "bg-gray-200" : ""
          }`}
          onClick={() => setChoice("before")}
        >
          Before
        </button>
        <button
          disabled={processing}
          className={`w-1/2 hover:bg-slate-200 text-slate-600 p-2 border-gray-400 ${
            choice === "after" ? "bg-gray-200" : ""
          }`}
          onClick={() => setChoice("after")}
        >
          After
        </button>
      </div>
      <div>
        {choice === "before" ? (
          <Before image={image} processing={processing} />
        ) : (
          <After output={output}/>
        )}
      </div>
    </div>
  );
});

function Before({ image, processing }) {
  return (
    <div className="relative">
      {processing && (
        <div className="inset-0 flex items-center justify-center absolute z-10 bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-lg">
            <Loading />
          </div>
        </div>
      )}
      <img src={'data:image/jpeg;base64,' + image} alt="before" className="w-full" />
    </div>
  );
}

function After({ output }) {
  return (
    <div>
      <img src={output} alt="bg" className="w-full" />
      <div className="p-4">
        <p className="text-slate-600 mt-2">Download Result</p>
        <button
          type="button"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-2"
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default BeforeAfter;
