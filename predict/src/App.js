import { useCallback, useEffect, useState } from "react";

import InputList from "./InputList";
import channel from "./utils/channel.json";
import PredictButton from "./PredictButton";
import Modal from "./Modal";

function App() {
  const [paramsTable, setParamsTable] = useState();
  const [temParams, setTemParams] = useState({});
  const [label, setLabel] = useState();

  useEffect(() => {
    window.ipcRenderer.send(channel.PASSING_INIT_PROPS);
    window.ipcRenderer.on(channel.PASSING_INIT_PROPS, (event, arg) => {
      setParamsTable(arg);
    });
    window.ipcRenderer.on(channel.SENDING_OUTPUT_PARAMS, (event, arg) => {
      if (!arg) setLabel("Predict Done !!!");
      else setLabel(arg);
    });
  }, [setParamsTable]);

  const handlePredict = useCallback(() => {
    let outputTable = {};

    for (let i in paramsTable) {
      if (!temParams[paramsTable[i]]) {
        setLabel("You should fill in all of the blank !!! ");
        return;
      }
      outputTable[i] = temParams[paramsTable[i]];
    }

    setLabel("predicting .... Please wait");
    window.ipcRenderer.send(
      channel.SENDING_OUTPUT_PARAMS,
      JSON.stringify(outputTable)
    );
  }, [temParams, paramsTable, setLabel]);

  return (
    <div className="App">
      <Modal
        open={label}
        handleModalClose={() => {
          if (label !== "predicting .... Please wait") setLabel(null);
        }}
        va
      />
      <InputList
        paramsTable={paramsTable}
        setTemParams={setTemParams}
        temParams={temParams}
      />
      <PredictButton onClick={handlePredict} />
    </div>
  );
}

export default App;
