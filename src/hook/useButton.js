export default function useButton(inputs, setInputs) {
  const addInput = () => setInputs([...inputs, ""]);
  const removeInput = () => {
    if (inputs.length > 1) setInputs(inputs.slice(0, -1));
  };

  const buttons = [
    { symbol: "+", onClick: addInput },
    { symbol: "-", onClick: removeInput },
  ];

  return { buttons };
}
