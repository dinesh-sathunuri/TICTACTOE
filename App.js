import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';

export default function App() {
  let elements= ['','','','','','','','',''];
  const [ind,setind] = useState(elements);
  const [user1,setUser1] =useState(true);
  const [winner,setWinner] = useState("");
  buttonHandler=index=>{
    if (winner.length>0){
      ResetHandler();
      return;
    }
    if (ind[index]!==""){
      Alert.alert("You cannot change");
      return
    }
    if(user1){
      ind[index]='O';
      setUser1(false);
    }
    else{
      ind[index]='X';
      setUser1(true);
    }
    setind(ind);

  };

  const ResetHandler = () =>{
    setind(elements);
    setWinner("");
    setUser1(true);

  }

  useEffect(() => {
  
    // Checks for the win condition in rows
    const checkRow = () => {
        let ans = false;
        for (let i = 0; i < 9; i += 3) {
            ans |= (ind[i] === ind[i + 1] && 
            ind[i] === ind[i + 2] && 
            ind[i] !== '')
        }
        return ans;
    }

    // Checks for the win condition in cols
    const checkCol = () => {
        let ans = false;
        for (let i = 0; i < 3; i++) {
            ans |= (ind[i] === ind[i + 3] && 
            ind[i] === ind[i + 6] && 
            ind[i] !== '')
        }
        return ans;
    }

    // Checks for the win condition in diagonals
    const checkDiagonal = () => {
        return ((ind[0] === ind[4] && 
        ind[0] === ind[8] && ind[0] !== '') || 
        (ind[2] === ind[4] && ind[2] === ind[6] && 
        ind[2] !== ''));
    }

    // Checks if at all a win condition is present
    const checkWin = () => {
        return (checkRow() || checkCol() || checkDiagonal());
    }

    // Checks for a tie
    const checkTie = () => {
        let count = 0;
        ind.forEach((cell) => {
            if (cell !== '') {
                count++;
            }
        })
        return count === 9;
    }
    if (checkWin()) {
        setWinner(user1 === true ? "Player 2 Wins!" : 
        "Player 1 Wins!");
    } else if (checkTie()) {
        setWinner("It's a Tie!");
    }
})


  let last = (winner.length>0)?<Button title='Restart' onPress={ResetHandler}></Button>:"";
  return (
    <View style={styles.container}>

      <View style={styles.userContainer}>
      <View style={styles.player1}><Text style={(user1)?{color:"green"}:{color:"blue"}}>Player1</Text></View>
      <View style={styles.player2}><Text style={(!user1)?{color:"green"}:{color:"red"}}>Player2</Text></View>
      </View>
      <View style={styles.buttonContainer}>
        {ind.map((element,index) => (
        <TouchableOpacity key={index} style={styles.button} onPress={buttonHandler.bind(this,index)}>
          <Text style={[styles.inputText,(element=='O')?{color:"blue"}:{color:"red"}]}>{element}</Text>
        </TouchableOpacity>
        ))}
      </View>
      <View style={styles.lastContainer}>
      <Text>{winner}</Text>
        {last}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  userContainer:{
    flex:2,
    alignItems:"flex-end",
    flexDirection:"row"
  },
  player1:{
    marginLeft:100,
    marginRight:150
  },
  button:{
    width:100,
    height:100,
    borderWidth:1
  },
  buttonContainer:{
    flex:1,
    flexDirection:"row",
    flexWrap:"wrap",
    margin:"10%",
    justifyContent:'center',
  },
  inputText:{
    fontSize:90,
    textAlign:"center"
  },
  lastContainer:{
    flex:2,
    top:90,
    position:'relative',
    flexWrap:'wrap',
    alignContent:"center"
  }
});
