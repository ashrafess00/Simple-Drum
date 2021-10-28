import React from "react";
import "./App.css";
import { bank1, bank2 } from "./bank";
import { useState } from "react";

function App() {
  const sound = {
    volume: 1,
    name: "",
  };
  const [soundName, setSoundName] = useState(sound);
  const [isBankSwitched, setIsBankSwitched] = useState(false);
  const [BankName, ki] = useState(bank1);
  const [showSt, setShowSt] = useState("");
  function changeVolume(e) {
    setShowSt(`volume : ${e.value}`);
    setSoundName({ ...sound, volume: parseInt(e.value) * 0.01 });
  }
  function changeBank() {
    setShowSt(isBankSwitched ? "bank1" : "bank2");
    setIsBankSwitched(!isBankSwitched);
    ki(isBankSwitched ? bank1 : bank2);
  }

  document.onkeydown = (e) => {
    for (let i = 0; i < BankName.length; i++) {
      if (e.keyCode == BankName[i].keyCode) {
        document.getElementById(BankName[i].name).click();
        break;
      }
    }
  };

  return (
    <>
      <div className="desc">
        this{" "}
        <a href="https://www.freecodecamp.org/learn" target="blank">
          freecodecamp
        </a>{" "}
        made by{" "}
        <a
          href="https://github.com/ashrafess00?tab=repositories"
          target="_blank"
        >
          Ashraf Essaoudi
        </a>
        , check the project on{" "}
        <a href="https://github.com/ashrafess00/Simple-Drum" target="_blank">
          github
        </a>
      </div>
      <div className="drum">
        {BankName.map((e) => {
          const { press, url } = e;
          return <Audios name={e.name} press={press} url={url} key={e.name} />;
        })}
        <div className="grid drumButtons">
          {BankName.map((e) => {
            return (
              <Buttons
                press={e.press}
                name={e.name}
                fun={setSoundName}
                sound={soundName}
                key={e.press}
                setShowSt={setShowSt}
                id={e.name}
              />
            );
          })}
        </div>

        <div className="control flex">
          <div className="switchBank">
            <label htmlFor="switch">bank</label>
            <label className="switch">
              <input type="checkbox" onClick={() => changeBank()} id="switch" />
              <span className="slider"></span>
            </label>
          </div>

          <div className="showState">
            <p>{showSt}</p>
          </div>

          <div className="slidecontainer">
            <input
              type="range"
              id="customRange1"
              min="0"
              max="100"
              onInput={(e) => changeVolume(e.target)}
              className="slider2"
            ></input>
          </div>
        </div>
      </div>
    </>
  );
}

const Audios = (props) => {
  return (
    <audio id={props.press}>
      <source src={props.url} type="audio/ogg" />
    </audio>
  );
};

const Buttons = (props) => {
  const playMe = (p, n) => {
    props.fun({ ...props.sound, name: n });
    document.getElementById(p).play();
    document.getElementById(p).volume = props.sound.volume;
    props.setShowSt(props.name);

    //trigger button
    document.getElementById(n).style.backgroundColor = "orange";
    setTimeout(() => {
      document.getElementById(n).style.backgroundColor = "#EFEFEF";
    }, 100);
  };
  return (
    <button
      className="button"
      onClick={() => playMe(props.press, props.name)}
      id={props.id}
    >
      {props.press}
    </button>
  );
};

export default App;
