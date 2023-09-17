import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [result, setResult] = useState({});

  const result_disease_target_num = 1;

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/result/${result_disease_target_num}`).then(
      (response) => {
        response.json().then((json) => {
          console.log(json);
          setResult(json);
        });
      }
    );
  }, []);

  return <div>{result === {} ? "loading..." : result.title}</div>;
};

export default HomePage;
