"use client";

import dynamic from "next/dynamic";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
const ReactQ = dynamic(() => import("react-quill-new"), { ssr: false });

const RichTextEditor = ({
  fieldValue,
  onChange,
  placeholder,
  className,
}: {
  fieldValue: ReactQuill.Value | undefined;
  onChange: () => void;
  placeholder?: string;
  className?: string;
}) => {
  return (
    <ReactQ
      theme="snow"
      value={fieldValue}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default RichTextEditor;
