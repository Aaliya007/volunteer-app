import { useState } from "react";
import { uploadFile } from "../services/extractor";

function NeedExtractor() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Select a file first");
      return;
    }

    try {
      const res = await uploadFile(file, "form");
      console.log("RESULT:", res);
    } catch (err) {
      console.error("ERROR:", err);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default NeedExtractor;