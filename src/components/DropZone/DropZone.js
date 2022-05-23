import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import niceBytes from '../../Utils/UtilFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

const DropZone = (props) => {
  const maxSize = 524288000;
  const [fileTooLarge, setFileToolLarge] = useState(false);
  const onDrop = useCallback((acceptedFiles) => !isDragReject && (setFileToolLarge(false) || props.onFileAccepted(acceptedFiles)), []);
  const onDropRejected = useCallback((rejected) => setFileToolLarge(true) || (props.onFileRejected && props.onFileRejected()), []);
  const {acceptedFiles, getRootProps, getInputProps, isDragReject} = useDropzone({onDrop, onDropRejected, multiple: false, maxSize});
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {niceBytes(file.size)}
    </li>
  ));
  return (
    <section className='dropzone-secton'>
      <div {...getRootProps({className: props.className})}>
        <input {...getInputProps()} />
        <p>Przeciągnij i upuść lub klinij w pole by dodać plik
        </p>
        <FontAwesomeIcon size={"4x"} icon={faFile}></FontAwesomeIcon>
      </div>
      <aside>
        <h4>Plik:</h4>
        <ul>{files}</ul>
        {fileTooLarge && (
          <i style={{color: "red"}}className="mt-2">
            Zbyt duży rozmiar pliku! Max 500MB
          </i>
        )}
        <p style={{color: "grey"}}>* Jeżeli chcesz wysłać kilka plików spakuj je w archiwum rar/zip, lub zapisz do nich link w pliku txt.</p>
      </aside>
    </section>
  );
}
export default DropZone;