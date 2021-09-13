import Dropzone from "react-dropzone";
import uploadIcon from "../../../assets/images/upload.svg";
import { Wrapper } from "../../../assets/styles/wrappers.enum";


interface FileDropZone {
  handleFile: (file: File) => void;
  file: File | null;
  handleBlur: (e?: any) => void;
}

const FileDropzone = ({ handleFile, file }: FileDropZone) => {
  if (!file) {
    return (
      <Dropzone onDrop={(files) => handleFile(files[0])}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className={Wrapper.DropZone}
            style={{ height: "10.625rem" }}
          >
            <input {...getInputProps()} multiple={false} />
            <img src={uploadIcon} alt="" className="mb-2" />
            <span>Drag and drop</span>
            <span>or</span>
            <span className="border-b">browse files</span>
          </div>
        )}
      </Dropzone>
    );
  }
  return (
    <Dropzone onDrop={(files) => handleFile(files[0])}>
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className={Wrapper.DropZone}
          style={{ height: "10.625rem" }}
        >
          <input {...getInputProps()} multiple={false} />
          <div className="flex flex-col justify-around items-center text-white overflow-hidden gap-4">
            <span>{file.name} uploaded successfully!</span>
            <div className="underline">Upload a different file</div>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export default FileDropzone;
