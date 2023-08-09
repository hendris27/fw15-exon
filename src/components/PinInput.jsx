import React from 'react';

function PinInput({ onChangePin }) {
  const pinInput = {
    input1: React.useRef(),
    input2: React.useRef(),
    input3: React.useRef(),
    input4: React.useRef(),
    input5: React.useRef(),
    input6: React.useRef(),
  };

  const changeValue = (e) => {
    if (e.target.value.length > 0) {
      e.target.value = e.target.value.slice(e.target.value.length - 1);
      if (parseInt(e.target.name) < 6) {
        pinInput[`input${parseInt(e.target.name) + 1}`].current.focus();
      }
    } else {
      if (parseInt(e.target.name) > 1) {
        pinInput[`input${parseInt(e.target.name) - 1}`].current.focus();
      }
    }

    const pin = [];
    for (const key in pinInput) {
      pin.push(pinInput[key].current.value);
    }
    onChangePin(pin.join(''));
  };
  return (
    <div className="flex gap-2 justify-between">
      <div>
        <input
          onChange={changeValue}
          name="1"
          ref={pinInput.input1}
          type="number"
          className="input input-bordered w-12 h-16"
        />
      </div>
      <div>
        <input
          onChange={changeValue}
          ref={pinInput.input2}
          type="number"
          name="2"
          className="input input-bordered w-12  h-16"
        />
      </div>
      <div>
        <input
          onChange={changeValue}
          ref={pinInput.input3}
          type="number"
          name="3"
          className="input input-bordered w-12  h-16"
        />
      </div>
      <div>
        <input
          onChange={changeValue}
          ref={pinInput.input4}
          type="number"
          name="4"
          className="input input-bordered w-12  h-16"
        />
      </div>
      <div>
        <input
          onChange={changeValue}
          ref={pinInput.input5}
          type="number"
          name="5"
          className="input input-bordered w-12  h-16"
        />
      </div>
      <div>
        <input
          onChange={changeValue}
          ref={pinInput.input6}
          type="number"
          name="6"
          className="input input-bordered w-12  h-16"
        />
      </div>
    </div>
  );
}

export default PinInput;
