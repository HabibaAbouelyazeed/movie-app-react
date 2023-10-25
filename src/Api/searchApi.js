import axios from "axios";

const searchApi = async(query) => {
    try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=14bdd69ce887376edfafb09f23f78fe9&query=${query} `
        );
        return res;
      } catch (error) {
        console.log(error);
      }
}

export default searchApi