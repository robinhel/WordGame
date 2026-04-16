// import { io } from 'socket.io-client'
import { useLocation } from "react-router-dom";
// const socket = io('http//localhost:5001')


const GameTime = () => {
  const location = useLocation()

  const { player1, player2 } = location.state || {player1: 'okänd', player2: 'okänd' }

return (
  <div className="Container">
    <h1>G A M E - T I M E </h1>
    <div className="Display">
      <p>Välkommer: <strong>{player1}</strong> </p>
      <p>Du möter: <strong>{player2}</strong> </p>
    </div>

    <div className=" GameTime ">
      <h4>Väntar på första ordet .. </h4>
    </div>
   </div>
)
}
// const [incomingWord, setIncomingWord] = useState('');
//    useEffect(() => {
//      socket.on('receive_word', (data) => {
//        console.log('Ordet har landat', data);
//        setIncomingWord(data.word);
//      });
//      return () => { 
//        socket.off("receive_word")
//      }
  //  }, [])

GameTime.route = {
  path: '/Game-Time',
  index: 3
};
export default GameTime;