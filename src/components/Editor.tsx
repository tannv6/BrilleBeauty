import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function Editors() {
  const editorRef = useRef<any>(null); // Sử dụng any hoặc kiểu dữ liệu cụ thể của TinyMCE editor
  function onClickHandler () {
      if (editorRef.current !== null) {
          const editor = editorRef.current;
          console.log(editor.getContent());
      }
  }
  return (
    <>
    <Editor
          apiKey='w8cboae9gofgfudent8xo9ncf93k4v4iop57ccnudd5zosyh'
          init={{
            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
            // content_style: '.tox-tinymce { border-radius: 0 } body { background-color: lightblue; }',
            ai_request: (request :any, respondWith :any) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
          }}
          initialValue=""
        />
      {/* <button onClick={onClickHandler}>Log editor content</button> */}
    </>
  );
}