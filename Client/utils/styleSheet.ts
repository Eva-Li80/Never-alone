import { StyleSheet } from "react-native";
import shadow from "react-native-paper/lib/typescript/styles/shadow";

export const styles = StyleSheet.create({
  //contaiers
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3EEF6",
  },

  containertwo: {
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "space-between",
          padding: 50
    
        },
   // texts     
  textRegular: {
    fontSize: 20,
    color: "#404040",
  },

  title: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    padding: 5,
    color: "#404040",
  },

  titletwo: {
    textAlign: "center",
    fontSize: 18,
    padding: 5,
    color: "#40040",
  },

  citat: {
    fontSize: 15,
    textAlign: "center",
    color: "#404040",
  },

  // buttons
  buttonStandard: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#B18DC1",
    widht: "50%",
  },
  
  buttontwo: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fFeECC",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    paddingBottom: 10,
    elevation: 10,
  },
 
  //card
  card: {
    backgroundColor: "#FBF1FB",
    borderRadius: 10,
    marginTop: 15,
    padding: 40
    
  },

  //images
  image: {
    width: "100%",
    height: 300,
    marginBottom: 40,
  },
  imagetwo: {
        width: "100%",
        height: 180,
        marginBottom: 10,
        borderRadius: 20,
      },

  //appbar      
  appbarHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#404040",
    backgroundColor: "#B69EC3",
  },
  appbarBottom: {
    backgroundColor: "#B69EC3",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
  },
});
