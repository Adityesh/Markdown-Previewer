import React, {useState} from 'react';
import './App.css';
import marked from 'marked'
import ReactHtmlParser from 'react-html-parser';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import loader from './images/91.svg'
import tick from './images/tick.png'


const App = () => {

  const placeholder = `# Welcome to my Markdown Previewer!

  ## This is a sub-heading...
  ### And here's some other cool stuff:
    
  Heres some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\`
  // this is multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`
    
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There's also [links](https://github.com/Adityesh), and
  > Block Quotes!
  
  And if you want to get really crazy, even tables:
  
  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | ------------- 
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbererd lists too.
  1. Use just 1s if you want! 
  1. But the list goes on...
  - Even if you use dashes or asterisks.
  * And last but not least, let's not forget embedded images:
  
  ![React Logo w/ Text](https://goo.gl/Umyytc)
  `
  const [markedValue, setValue] = useState(placeholder)
  const [parsedValue, setParsedValue] = useState(ReactHtmlParser(marked(placeholder)));
  const [html, setHTML] = useState(marked(placeholder));
  const [status, setStatus] = useState('COPY HTML');

  const handleChange = (value) => {
    setValue(value);
  }

  const handleKeyUp = () => {
    setHTML(marked(markedValue));
    const values = ReactHtmlParser(marked(markedValue));
    setParsedValue(values)
  }

  const handleCopy = () => {
    setStatus(<img src={loader} alt={'Loader'} height={30} width={30}/>)
    setTimeout(() => {
      setStatus('COPY HTML')
    }, 1200)

    setTimeout(() => {
      setStatus(<img src={tick} alt={'done'} height={30} width={30}/>)
    }, 500)
  }


  return (
    
    
    
    <div id="container">
      <h1 className="heading">Markdown-Previewer</h1>
      <div className="content">
        <div className="input-container item">
          <span>Markdown</span>
          <div>
            <textarea rows={15} placeholder="Enter markdown" onChange={(event) => handleChange(event.target.value)} value={markedValue} onKeyUp={handleKeyUp}/>
          </div>
        </div>
        <div className="preview-container item">
          <span>Preview</span>
          <div className="button-container">
            <div className="parsed-container">{parsedValue}</div>
            <CopyToClipboard text={html}>
              <button className="copy" onClick={handleCopy}>{status}</button>
            </CopyToClipboard>
          </div>
        </div>

        
        
      </div>
      

    </div>
  )
}

export default App;
