function Experiences(){
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/country/:location/xtreme`
    const [gastro, setGastro] = useState(null);


useEffect(() => {

    fetch(apiUrl)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            return setGastro(data)
        })
        .catch((err) => console.log(err))



}, []);


}
