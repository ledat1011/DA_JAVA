import React, { Component } from "react";
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

export default class UploadImage extends Component {

  render() {
    return (
      <div className="container text-center mt_12 dropzone-custom">
        <ImagesUploader
                url="http://localhost:3000/multiple"
                optimisticPreviews
                onLoadEnd={(err) => {
                    if (err) {
                        console.error(err);
                    }
                }}
                label="Upload multiple images"
                />
      </div>
    );
  }
}
