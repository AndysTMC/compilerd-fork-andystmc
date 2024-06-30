import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dropdown from 'react-dropdown';

function App() {
  const languages = ['C', 'CPP', 'Python', 'Java', 'NodeJS', 'Ruby', 'PromptV1', 'PromptV2', 'MultiFile', 'SQLite3', 'Rust', 'Go', 'PHP'];
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const [code, setCode] = useState()
  const [input, setInput] = useState()
  const [output, setOutput] = useState()
  async function submitCode() {
    await fetch('http://localhost:3000/api/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        language: selectedLanguage.toLowerCase(),
        [["PromptV1","PromptV2"].includes(selectedLanguage) ? "prompt" : "script"]: code,
        stdin: input == "" ? " ": input,
      })
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      setOutput(data.output)
    })
  }
  return (
    <div className='app'>
      <div className='code-container'>
        
        <textarea 
          className='editor' 
          placeholder='Enter your code here' 
          value={code}
          onChange={(e) => setCode(e.target.value)}/>
        <div className='buttons'>
          <Dropdown 
            options={languages} 
            onChange={(option) => setSelectedLanguage(option.value)} 
            value={selectedLanguage} 
            className='dropdown' 
            menuClassName='dropdownmenu'
            controlClassName='dropdowncontrol'
          />
          <button className='submit-button' onClick={submitCode}>Run</button>
        </div>
       
      </div>
      <div className='io-container'>
        <div className='input-container'>
          <p className='input-title'>Input</p>
          <textarea className='io' placeholder='Enter your input here' value={input} onChange={(e) => setInput(e.target.value)}/>
        </div>
        <div className='output-container'>
          <p className='output-title'>Output</p>
          <textarea className='io' placeholder='Output will be displayed here' value={output} readOnly style={{outline: 'none'}}/>
        </div>
      </div>
      
    </div>
  )
}

export default App
