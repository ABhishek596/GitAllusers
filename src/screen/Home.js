import React, {useState, useCallback, useEffect} from 'react';
import {View, TextInput, FlatList, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {debounce} from 'lodash';
import axios from 'axios';
import {styles} from './styles';
import LoadingIndicator from '../component/loading/LoadingIndicator';
import Header from '../component/header/Header';

      

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [repos, setRepos] = useState([]);
  const [reposlength, setReposlength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    debounce(async query => {
      if (!query) {
        setRepos([]);
        setError(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const userResponse = await axios.get(
          `${BASEURL}${query}`,
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
            },
          },
        );

        if (userResponse.data) {
          const repoResponse = await axios.get(
            `${BASEURL}${userResponse.data.login}/repos`,
            {
              headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
              },
            },
          );
          setRepos([repoResponse.data[0]]);
          setReposlength(repoResponse.data?.length);
          // console.log('repoResponse fetching data:', repoResponse.data);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setError('User not found');
          } else if (error.response.status === 403) {
            setError('API rate limit exceeded. Please try again later.');
          } else {
            setError('An unexpected error occurred');
          }
        } else {
          setError('Network error');
        }
      } finally {
        setLoading(false);
      }
    }, 500),
    [],
  );

  useEffect(() => {
    fetchData(searchText);
    return () => {
      fetchData.cancel();
    };
  }, [searchText, fetchData]);

  const renderRepoItem = ({item}) => (
    <View style={styles.repoItem}>
      <Image
        style={styles.image}
        source={{
          uri: item?.owner?.avatar_url,
        }}
      />
      <View style={styles.repoDetails}>
        <Text style={styles.repoName}>{item?.owner?.login}</Text>
        <Text style={styles.repoCount}>{reposlength}  repositories</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#000" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by username"
          value={searchText}
          onChangeText={text => {
            setSearchText(text);
          }}
        />
      </View>

      {searchText === '' ? (
        <View style={styles.notdata}>
          <Text>No Results</Text>
        </View>
      ) : (
        <>
          {loading ? (
            <LoadingIndicator />
          ) : error ? (
            <View style={styles.notdata}>
              <Text>{error}</Text>
            </View>
          ) : reposlength === 0 ? (
            <View style={styles.notdata}>
              <Text>No User found</Text>
            </View>
          ) : (
            <FlatList
              data={repos}
              renderItem={renderRepoItem}
              keyExtractor={(item, index) => index.toString()}
              style={styles.list}
            />
          )}
        </>
      )}
    </View>
  );
};

export default Home;
