import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { rainbow } from 'react-syntax-highlighter/styles/hljs';
//import ImageUploader from 'react-images-upload';
import ImageUploader from '../src/index';

const stepTwoPre =
`import React from 'react';
import ImageUploader from 'react-images-upload';

class App extends React.Component {
    state = {
        pictures: [
    };

    onDrop = (pictures, pictureDataURLs) => {
        // pictureDataURLs not used in this example, but still available on onDrop method
        this.setState({ pictures });
    }

    render = () => (
        <ImageUploader
            withIcon={true}
            buttonText='Choose images'
            onChange={this.onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
        />
    );
}`;


class App extends React.Component {
    render() {
        return (
            <div className="page">
                <h1>react-images-upload</h1>
                <p>Simple component for upload and validate (client side) images with preview built with React.js.</p>

                <section>
                    <h2 className="head">Demo</h2>
                    <ImageUploader
                        style={{ maxWidth: '500px', margin: "20px auto" }}
                        withPreview={true}
                        singleImage={true}
                    />
                </section>

                <section>
                    <h2 className="head">Installation</h2>
                    <SyntaxHighlighter language='javascript' showLineNumbers={true} style={rainbow}>
                        {`npm install --save react-images-upload`}
                    </SyntaxHighlighter>
                </section>

                <section>
                    <h2 className="head">Usage</h2>
                    <SyntaxHighlighter language='javascript' showLineNumbers={true} style={rainbow}>
                        {stepTwoPre}
                    </SyntaxHighlighter>
                </section>

                <section>
                    <h2 className="head">Props</h2>

                    <table className="table-fill">
                        <thead>
                            <tr>
                                <th className="text-left">parameter</th>
                                <th className="text-left">type</th>
                                <th className="text-left">default</th>
                                <th className="text-left">description</th>
                            </tr>
                        </thead>
                        <tbody className="table-hover">
                            <tr>
                                <td className="text-left">className</td>
                                <td className="text-left">String</td>
                                <td className="text-left">-</td>
                                <td className="text-left">Class name for the input.</td>
                            </tr>
                            <tr>
                                <td className="text-left">fileContainerStyle</td>
                                <td className="text-left">Object</td>
                                <td className="text-left">-</td>
                                <td className="text-left">Inline styles for file upload container.</td>
                            </tr>
                            <tr>
                                <td className="text-left">onChange</td>
                                <td className="text-left">Function</td>
                                <td className="text-left">-</td>
                                <td className="text-left">On change handler for the input.</td>
                            </tr>
                            <tr>
                                <td className="text-left">onDelete</td>
                                <td className="text-left">Function</td>
                                <td className="text-left">-</td>
                                <td className="text-left">On delete handler for the image.</td>
                            </tr>
                        <tr>
                                <td className="text-left">buttonClassName</td>
                                <td className="text-left">String</td>
                                <td className="text-left">-</td>
                                <td className="text-left">Class name for upload button.</td>
                            </tr>
                            <tr>
                                <td className="text-left">buttonStyles</td>
                                <td className="text-left">Object</td>
                                <td className="text-left">-</td>
                                <td className="text-left">Inline styles for upload button.</td>
                            </tr>
                            <tr>
                                <td className="text-left">withPreview</td>
                                <td className="text-left">Boolean</td>
                                <td className="text-left">true</td>
                                <td className="text-left">Show preview of selected images.</td>
                            </tr>
                            <tr>
                                <td className="text-left">buttonClassName</td>
                                <td className="text-left">String</td>
                                <td className="text-left">-</td>
                                <td className="text-left">Class name for upload button.</td>
                            </tr>
                            <tr>
                                <td className="text-left">accept</td>
                                <td className="text-left">String</td>
                                <td className="text-left">"accept=image"</td>
                                <td className="text-left">Accept attribute for file input.</td>
                            </tr>
                            <tr>
                                <td className="text-left">name</td>
                                <td className="text-left">String</td>
                                <td className="text-left">-</td>
                                <td className="text-left">Input name.</td>
                            </tr>
                            <tr>
                                <td className="text-left">withIcon</td>
                                <td className="text-left">Boolean</td>
                                <td className="text-left">true</td>
                                <td className="text-left">If true, show upload icon on top</td>
                            </tr>
                            <tr>
                                <td className="text-left">buttonText</td>
                                <td className="text-left">String</td>
                                <td className="text-left">'Choose images'	</td>
                                <td className="text-left">The text that display in the button.</td>
                            </tr>
                            <tr>
                                <td className="text-left">buttonType</td>
                                <td className="text-left">String</td>
                                <td className="text-left">'submit'	</td>
                                <td className="text-left">The value of the button's type attribute</td>
                            </tr>
                            <tr>
                                <td className="text-left">withLabel</td>
                                <td className="text-left">Boolean</td>
                                <td className="text-left">true</td>
                                <td className="text-left">Show instruction label</td>
                            </tr>
                            <tr>
                                <td className="text-left">labelStyles</td>
                                <td className="text-left">Object</td>
                                <td className="text-left">-</td>
                                <td className="text-left">Inline styles for the label.</td>
                            </tr>
                            <tr>
                                <td className="text-left">labelClass</td>
                                <td className="text-left">string</td>
                                <td className="text-left">-</td>
                                <td className="text-left">Class name for the label</td>
                            </tr>
                            <tr>
                                <td className="text-left">imgExtension</td>
                                <td className="text-left">Array</td>
                                <td className="text-left">['.jpg', '.gif', '.png', '.gif']</td>
                                <td className="text-left">
                                    Supported image extension (will use in the image validation).
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left">maxFileSize</td>
                                <td className="text-left">Number</td>
                                <td className="text-left">5mb </td>
                                <td className="text-left">Max image size.</td>
                            </tr>
                            <tr>
                                <td className="text-left">fileSizeError</td>
                                <td className="text-left">String</td>
                                <td className="text-left">" file size is too big"	</td>
                                <td className="text-left">Label for file size error message.</td>
                            </tr>
                            <tr>
                                <td className="text-left">fileTypeError</td>
                                <td className="text-left">String</td>
                                <td className="text-left">" is not supported file extension"</td>
                                <td className="text-left">Label for file extension error message.</td>
                            </tr>
                            <tr>
                                <td className="text-left">errorClass</td>
                                <td className="text-left">String</td>
                                <td className="text-left">-</td>
                                <td className="text-left">Class for error messages</td>
                            </tr>
                            <tr>
                                <td className="text-left">errorStyle</td>
                                <td className="text-left">Object</td>
                                <td className="text-left">['.jpg', '.gif', '.png', '.gif']</td>
                                <td className="text-left">Inline styles for errors .</td>
                            </tr>
                            <tr>
                                <td className="text-left">singleImage</td>
                                <td className="text-left">Boolean</td>
                                <td className="text-left">false</td>
                                <td className="text-left">Limits one image at a time.</td>
                            </tr>
                            <tr>
                                <td className="text-left">defaultImage</td>
                                <td className="text-left">String</td>
                                <td className="text-left">false</td>
                                <td className="text-left">Image url for the default preview (example an already uploaded image)</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        );
    };
};

export default App;
