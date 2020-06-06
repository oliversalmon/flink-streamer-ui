import React, { Component } from 'react';

interface Tweet {
    id_str : string;
    text : string;
}



interface TweetListProps {
}

interface TweetListState {
  tweets: Array<Tweet>;
  isLoading: boolean;
}

class TweetList extends Component<TweetListProps, TweetListState> {

  constructor(props: TweetListProps) {
    super(props);

    this.state = {
      tweets: [],
      isLoading: false
    };
  }

  async componentDidMount() {
      this.setState({isLoading: true});

//       const response = await fetch('http://localhost:3000/tweets');
//       const data = await response.json();
//       this.setState({tweets: data, isLoading: false});

      const eventSource = new EventSource('http://flink-streamer-spring:8082/sse/tweets');
      eventSource.onopen = (event: any) => console.log('open', event);
      eventSource.onmessage = (event: any) => {
        //console.log(event.data)
        //console.log(JSON.parse(event.data))
        const tweet = JSON.parse(event.data).body;
        //const body = JSON.parse(raw.body);
        console.log(tweet)

        //reset the array after 10 tweets
        if(this.state.tweets.length > 10){
            this.setState({tweets: []})
        }

        this.state.tweets.push(tweet);

        this.setState({tweets: this.state.tweets, isLoading:false});
       };
      eventSource.onerror = (event: any) => console.log('error', event);


    }

  render() {
    const {tweets, isLoading} = this.state;



    return (

      <div>
              <h2>raw tweets List</h2>
              {tweets.map((tweets: Tweet) =>
                 <div key={tweets.id_str}>
                  {tweets.text}<br/>
                </div>
              )}
       </div>
    );
  }
}

export default TweetList;