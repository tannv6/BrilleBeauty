/* eslint-disable @next/next/no-img-element */
import React, { useState, ChangeEvent } from "react";
 
function Upload() {
    const [file, setFile] = useState<string | undefined>();
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            setFile(URL.createObjectURL(e.target.files[0]));
        }
    }
 
    return (
        <div className="App">
            <input type="file" onChange={handleChange} />
            {file && <img src={file} alt="Uploaded image" />}
        </div>
    );
}
 
export default Upload;