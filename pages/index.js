import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');

  /*Hooking up the generate button*/  
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);                                //Setting the loading state.
  
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {       //fetch is used to create a route
      method: 'POST',
      headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({ userInput }),
   });

    const data = await response.json();                   //converting response to JSON 
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);                       //setting the api output
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    /*console.log(event.target.value);  */    
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Generate solutions for DSA problems in Java</h1>
          </div> 
          <div className="header-subtitle">
            <h2>Just paste the DSA question that you're having a problem with ;)</h2>
            {/* <h4>You might have to scroll down for the solutions. </h4>  */}
          </div>
        </div>
         
         <div className="prompt-container">    
          <textarea placeholder="Write here!" 
            className="prompt-box" 
            value={userInput} 
            onChange={onUserChangedText} />
          <div className="prompt-buttons">
            {/* changing the className based on the value of isGenerating */}
            <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>          
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}     
              </div>
            </a>
          </div>

           {/* api ouptput */}
           <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                   <h3>Solution</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          
         </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://www.linkedin.com/in/aakritiroshan2002/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            {/* <Image src={buildspaceLogo} alt="buildspace logo" /> */}
            <p>Made by: Aakriti Roshan</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
