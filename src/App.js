import React, { useState } from "react";
import "./App.css";

/*
  To Do:
    1)Move UI into its own component outside of App
    2)Add loading screen component
*/

function App() {
  const [url, setURL] = useState("");
  const PostData = () => {
    console.log(url);
    fetch("/download", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("success");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      className="mycard"
      style={{
        backgroundColor: "white",
        borderRadius: "20%",
        height: "100%",
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <img
        style={{ maxWidth: "200px", paddingTop: "100px" }}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/1200px-Logo_of_YouTube_%282015-2017%29.svg.png"
      />
      <h6>Video Downloader</h6>
      <input
        type="url"
        spellCheck="false"
        placeholder="url"
        value={url}
        onChange={(e) => setURL(e.target.value)}
      />
      <button
        className="btn waves-effect waves-light #FF0000 red lighten-0"
        onClick={() => PostData()}
      >
        Download
      </button>
      <h6>Simple, Easy, Free</h6>
    </div>
  );
}

export default App;
