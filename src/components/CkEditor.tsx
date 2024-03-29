// components/custom-editor.js

import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "@/lib/ckeditor5/ckeditor";
import "@/lib/ckeditor5/ckEditor.css"

type Props = {
  name: string;
  value: string;
  onChange: any;
};

function CustomEditor({ name, value, onChange }: Props) {
  return (
    <CKEditor
      editor={Editor as any}
      data={value}
      config={
        {
          simpleUpload: {
            uploadUrl: "/api/upload/editor",
          },
        } as any
      }
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange &&
          onChange({
            target: {
              name,
              value: data,
            },
          });
      }}
    />
  );
}

export default CustomEditor;
