import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import FlipMove from 'react-flip-move';
import UploadIcon from './UploadIcon.svg';

const flipMoveStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  width: "100%"
};

class ReactImageUploadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [...props.defaultImages],
      files: [],
      notAcceptedFileType: [],
      notAcceptedFileSize: [],
    };
    this.inputElement = React.createRef();
    this.onDropFiles = this.onDropFiles.bind(this);
  }

  /*
	 Check file extension (onDropFiles)
	 */
  hasExtension(fileName) {
    const pattern = '(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$';
    return new RegExp(pattern, 'i').test(fileName);
  };

  /*
   Handle file validation
   */
  onDropFiles(e) {
    const files = e.target.files;
    const allFilePromises = [];

    // Iterate over all uploaded files
    for (let i = 0; i < files.length; i++) {
      let f = files[i];
      // Check for file extension
      if (!this.hasExtension(f.name)) {
        const newArray = this.state.notAcceptedFileType.slice();
        newArray.push(f.name);
        this.setState({notAcceptedFileType: newArray});
        continue;
      }
      // Check for file size
      if(f.size > this.props.maxFileSize) {
        const newArray = this.state.notAcceptedFileSize.slice();
        newArray.push(f.name);
        this.setState({notAcceptedFileSize: newArray});
        continue;
      }

      allFilePromises.push(this.readFile(f));
    }

    Promise.all(allFilePromises).then(newFilesData => {
      let dataURLs = [];
      let files = [];

      if (this.props.singleImage) {
        dataURLs = [newFilesData[0].dataURL];
        files = [newFilesData[0].files];
      } else {
        dataURLs = this.state.pictures.slice();
        files = this.state.files.slice();
        newFilesData.forEach(newFileData => {
          dataURLs.push(newFileData.dataURL);
          files.push(newFileData.file);
        });
      }

      this.setState({
        pictures: dataURLs,
        files: files
      }, () => {
        this.props.onChange(this.state.files, this.state.pictures)
      });
    });
  }

  /*
     Read a file and return a promise that when resolved gives the file itself and the data URL
   */
  readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Read the image via FileReader API and save image result in state.
      reader.onload = function (e) {
        // Add the file name to the data URL
        let dataURL = e.target.result;
        dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
        resolve({file, dataURL});
      };

      reader.readAsDataURL(file);
    });
  }

  /*
   Remove the image from state
   */
  removeImage(picture) {
    const removeIndex = this.state.pictures.findIndex(e => e === picture);
    const filteredPictures = this.state.pictures.filter((e, index) => index !== removeIndex);
    const filteredFiles = this.state.files.filter((e, index) => index !== removeIndex);

    this.setState({
      pictures: filteredPictures,
      files: filteredFiles,
    }, () => {
      this.props.onChange(this.state.files, this.state.pictures);
    });
  }

  /*
   Check if any errors && render
   */
  renderErrors() {
    let notAccepted = '';
    if (this.state.notAcceptedFileType.length > 0) {
      notAccepted = this.state.notAcceptedFileType.map((error, index) => {
        return (
          <div className={'errorMessage ' + this.props.errorClass} key={index} style={this.props.errorStyle}>
            * {error} {this.props.fileTypeError}
          </div>
        )
      });
    }
    if (this.state.notAcceptedFileSize.length > 0) {
      notAccepted = this.state.notAcceptedFileSize.map((error, index) => {
        return (
          <div className={'errorMessage ' + this.props.errorClass} key={index} style={this.props.errorStyle}>
            * {error} {this.props.fileSizeError}
          </div>
        )
      });
    }
    return notAccepted;
  }

  render() {
    return (
      <div className={"fileUploader " + this.props.className} style={this.props.style}>
        <div className="fileContainer" style={this.props.fileContainerStyle}>
          {this.props.withIcon && (<img src={UploadIcon} className="uploadIcon"	alt="Upload Icon" />)}

          {this.props.withLabel && (
            <p className={this.props.labelClass} style={this.props.labelStyles}>{this.props.label}</p>
          )}

          <div className="errorsContainer">
            {this.renderErrors()}
          </div>

          <button
            type={this.props.buttonType}
            className={"chooseFileButton " + this.props.buttonClassName}
            style={this.props.buttonStyles}
            onClick={() => this.inputElement.current.click()}
          >
            {this.props.buttonText}
          </button>

          <input
            type="file"
            ref={this.inputElement}
            name={this.props.name}
            multiple={!this.props.singleImage}
            onChange={this.onDropFiles}
            onClick={e => e.target.value = null} // Fixes issues #55
            accept={this.props.accept}
          />
          {this.props.withPreview && (
            <div id="uploadPicturesWrapper" style={{height: 'auto'}}>
              <FlipMove enterAnimation="fade" leaveAnimation="fade" style={flipMoveStyle}>
                {this.state.pictures.map((picture, index) => (
                  <div key={index} className="uploadPictureContainer">
                    <div className="deleteImage" onClick={() => this.removeImage(picture)}>X</div>
                    <img src={picture} className="uploadPicture" alt="preview"/>
                  </div>
                ))}
              </FlipMove>
            </div>
          )}
        </div>
      </div>
    );
  }
}

ReactImageUploadComponent.defaultProps = {
  className: '',
  fileContainerStyle: {},
  buttonClassName: "",
  buttonStyles: {},
  withPreview: false,
  accept: "image/*",
  name: "",
  withIcon: true,
  buttonText: "Choose images",
  buttonType: "button",
  withLabel: true,
  label: "Max file size: 5mb, accepted: jpg|gif|png",
  labelStyles: {},
  labelClass: "",
  imgExtension: ['.jpg', '.jpeg', '.gif', '.png'],
  maxFileSize: 5242880,
  fileSizeError: " file size is too big",
  fileTypeError: " is not a supported file extension",
  errorClass: "",
  style: {},
  errorStyle: {},
  singleImage: false,
  onChange: () => {},
  defaultImages: []
};

ReactImageUploadComponent.propTypes = {
  style: PropTypes.object,
  fileContainerStyle: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  buttonClassName: PropTypes.string,
  buttonStyles: PropTypes.object,
  buttonType: PropTypes.string,
  withPreview: PropTypes.bool,
  accept: PropTypes.string,
  name: PropTypes.string,
  withIcon: PropTypes.bool,
  buttonText: PropTypes.string,
  withLabel: PropTypes.bool,
  label: PropTypes.string,
  labelStyles: PropTypes.object,
  labelClass: PropTypes.string,
  imgExtension: PropTypes.array,
  maxFileSize: PropTypes.number,
  fileSizeError: PropTypes.string,
  fileTypeError: PropTypes.string,
  errorClass: PropTypes.string,
  errorStyle: PropTypes.object,
  singleImage: PropTypes.bool,
  defaultImages: PropTypes.array
};

export default ReactImageUploadComponent;
