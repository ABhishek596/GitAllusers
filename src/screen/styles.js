import { StyleSheet, Dimensions } from 'react-native';
const {width,height}= Dimensions.get('screen');

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f4f4f4',
    },
    header: {
      fontSize: width * 0.06 ,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: width * 0.03,
      marginTop: height * 0.01,
      marginHorizontal: width * 0.06,
      borderBottomColor:'#000000',
      borderBottomWidth:2
    },
    searchInput: {
      flex: 1,
      paddingLeft: width * 0.04,
    },
    list: {
      marginTop: height * 0.04,
      paddingHorizontal: 20,
    },
    repoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: '#fff',
      marginBottom: height * 0.02,
      borderRadius: 10,
      elevation: 1,
    },
    repoDetails: {
      marginLeft: width * 0.04,
    },
    repoName: {
      fontSize: width * 0.045,
      fontWeight: 'bold',
    },
    repoCount: {
      fontSize: width * 0.035,
      color: '#888',
    },
    image:{
      width: width * 0.12,
      height: width * 0.12,
      borderRadius:180/2
    },
    notdata:{
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    }
  });