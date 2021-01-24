import React from 'react';
import SearchBox from './SearchBox';
import RenderDefinition from './RenderDefinition';
const http = require("https");


class  App extends React.Component
{
    
    constructor(props)
    {
        super();
        this.state = {
            fetchSuccessful  : false,
            category : ""
        }
    }

    getData()
    {
                const app_id = "df2c60a7"; // insert your APP Id
                const app_key = "ab4a43b467877209cf01db0975e057f7"; // insert your APP Key
                const wordId = "sail";
                const fields = "definitions";
                const strictMatch = "false";
        
                const options = {
                    host: 'cors-anywhere.herokuapp.com/od-api.oxforddictionaries.com',
                    port: '443',
                    path: '/api/v2/entries/en-gb/' + wordId + '?fields=' + fields + '&strictMatch=' + strictMatch,
                    method: "GET",
                    headers: {
                        'app_id': app_id,
                        'app_key': app_key
                    }
                };
        
                http.get(options, (resp) => {
                    let body = '';
                    resp.on('data', (d) => {
                        body += d;
                    });
                    resp.on('end', () => {
                        if(body)
                        {
                            let parsed = JSON.parse(body);
            
                          var output = parsed.results[0].lexicalEntries  // axact address 
            
                          var attribute = output.map((innerObject)=>{
                            return innerObject.lexicalCategory.id;
                          })
                          console.log(output)
                            this.setState({
                                fetchSuccessful : true,
                                category : attribute
                            })   
                        }
                    });
                });
    }

    // componentDidMount() {
    //     this.getData();
    // }
    render(){
        return (
            <div className="App">
                <SearchBox />
                {this.fetchSuccessful ? <RenderDefinition category={this.state.fetchSuccess} /> : ""}
            </div>
        );
}
}

export default App;
