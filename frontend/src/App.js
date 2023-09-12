import { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/hello").then((response) => {
      response.json().then((json) => {
        setMsg(json.message);
      });
    });
  }, [])

  return (
    <div>
      {msg === null ? 'loading...' : msg}
    </div>
  );
}

export default App;
