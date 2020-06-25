import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inputText: ""
    }
    this.updateText = this.updateText.bind(this)
    this.formatCommands = this.formatCommands.bind(this)
  };

  componentDidMount() {
      this.setState({inputText: onLoadMessage})
  }
  updateText(event) {
    this.setState({inputText: event.target.value})
    }
  formatCommands(commandText) {
    //secret = #(f3Z4a#
    let buildObj = commandText.trim().replace(/\n/g, '#(f3Z4a#').split('#(f3Z4a##(f3Z4a##(f3Z4a#').map(i => {
      let temp = i.split('#(f3Z4a##(f3Z4a#')
      return {
        command: temp[0].replace('!',''),
        res: temp[1],
        globalCD: temp[2],
        userCD: temp[3],
        cost: temp[4],
        level: temp[5]
      };
    });
    let buildCSV = buildObj.map(i=> {
      return (
        <React.Fragment key={i.command}>
        <br />
        "{i.command}","{i.level}","","","{i.res}","{i.globalCD}","{i.userCD}","SC","TRUE"
        </React.Fragment>
      )
    })
    return buildCSV;
  }
  render(){
    return(
    <div id="main_container" className="main_container">
    <span id="input_container" className="input_container">
      <div className="form-group border-focus">
  <textarea className="form-control" id="editor" value={this.state.inputText} onChange={this.updateText}></textarea>
</div>
      </span>
          <span id="output_container" className="output_container">
        <div id='preview' className="form-control">
          <div id='previewContent'>
          <>Command,Permission,PermInfo,Count,Response,Cooldown,UserCooldown,Usage,Enabled</>
          {this.formatCommands(this.state.inputText)}
          </div>
        </div>
        </span>
    </div>
    )}
}

const onLoadMessage = "Paste the Custom Commands From Here: https://streamelements.com/dashboard/bot-commands/custom-commands"

export default App;
