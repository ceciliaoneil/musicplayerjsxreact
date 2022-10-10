import React, { useState, useEffect, useRef } from "react";

//create your first component
const Home = () => {
  const [lista, setLista] = useState([]);
  const [play, setPlay] = useState(null);
  const [pocisionMusica, setPocisionMusica] = useState(0)
  const etiquetaAudio = useRef(null);
  console.log(pocisionMusica);

	// fecth
  function getInfo() {
    fetch("https://assets.breatheco.de/apis/sound/songs") //ir a busca
      .then((response) => {
        console.log(response.status);
        return response.json();
      }) //promesa 1
      .then((data) => setLista(data)) //promesa 2
      .catch((err) => console.log(err));
	}
	console.log(lista);

	// Use effect
	useEffect(() => {
		getInfo();
	}, []);
	console.log(lista);

	const setSong = (linkName, i) => {
		etiquetaAudio.current.src = `https://assets.breatheco.de/apis/sound/${linkName}`
    etiquetaAudio.current.play();
		setPlay(i)
	}

	const playMusic = () => {
	if (etiquetaAudio !== null) {
		etiquetaAudio.current.play();
	}
}

	const pauseMusic = () => {
	if (etiquetaAudio !== play ) {
		etiquetaAudio.current.pause();
	}
}

const nextMusic = () => {
  if (pocisionMusica <= lista.length -1) {
    setPocisionMusica(pocisionMusica+1);
  } else { setPocisionMusica(0);}
  etiquetaAudio.current.src = `https://assets.breatheco.de/apis/sound/${lista[pocisionMusica].url}`
    etiquetaAudio.current.play();
    console.log(lista[pocisionMusica].url);
}

console.log(pocisionMusica);

const anteriorMusic = () => {
	if (pocisionMusica > 0) {
  setPocisionMusica(pocisionMusica-1);
} else { setPocisionMusica(lista.length -1);}
etiquetaAudio.current.src = `https://assets.breatheco.de/apis/sound/${lista[pocisionMusica].url}`
  etiquetaAudio.current.play();
  console.log(lista[pocisionMusica].url);
}

  return (
    <div className="text-center">
      <p></p>
      {/* <a href="#" className="btn btn-success" onClick={()=>setCount(+1)}>
				Follow                                       {play === index}
			</a> */}
      <ol>                                                        
		{/* {lista} */}
        {lista.map((item, index) => (<li key={index} className="btn btn-danger d-flex flex-column mb-3" onClick={()=>setSong(item.url,index)}>{item.name}</li>))}</ol>
      <div className="container">
	 	<audio controls ref={etiquetaAudio} src="https://assets.breatheco.de/apis/sound/songs" type="audio.mp3"/><hr />
        <button onClick={anteriorMusic}><i className="fa fa-backward"/></button>
        <button onClick={pauseMusic}><i className="fa fa-pause"/></button>
        <button onClick={playMusic}><i className="fa fa-play"/></button>
        <button onClick={nextMusic}><i className="fa fa-forward"/></button>
      </div>
    </div>
  );
};

export default Home;