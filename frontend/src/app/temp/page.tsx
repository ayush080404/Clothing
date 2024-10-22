"use client";
import useSiteUpload from "@/hooks/uploadProducts";
import { useState } from "react";

const page = () => {
  const [inputs, setInputs] = useState({ category: "", files: null });
  const { handleUpload } = useSiteUpload();
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Category"
          className="input input-bordered w-full max-w-xs"
          defaultValue={inputs.category}
          onChange={(e) => {
            setInputs({ ...inputs, category: e.target.value });
          }}
        />
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          multiple
          onChange={(e) => {
            // @ts-expect-error
            setInputs({ ...inputs, files: Array.from(e.target.files) });
          }}
        />
        <button
          className="btn"
          onClick={() => {
            handleUpload(inputs.category, inputs.files);
          }}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default page;
