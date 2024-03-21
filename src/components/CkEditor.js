// components/custom-editor.js

import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "imageUpload",
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "undo",
    "redo",
  ],
  ckfinder: {
    uploadUrl: "/api/upload/editor",
  },
};

function CustomEditor(props) {
  const [data, setData] = useState("");
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "outdent",
            "indent",
            "|",
            "imageUpload",
            "blockQuote",
            "insertTable",
            "mediaEmbed",
            "undo",
            "redo",
          ],
          ckfinder: {
            uploadUrl: "/api/upload/editor",
            options: {
                chooseFiles: false
            },
            openerMethod: 'modal'
          },
      }}
      data={data}
      onChange={(event, editor) => {
        const data = editor.getData();
        setData(data);
        console.log({ event, editor, data });
      }}
    />
  );
}

export default CustomEditor;
