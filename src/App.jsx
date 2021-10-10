import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./App.sass";

import React from "react";

import * as views from "./views";

import { Auth, Export, InfoBar, Loading, Return, TableTypeSwitch } from "./components";

import receiveData from "./ntl";

import Context from "./Context";

class App extends React.Component {
  views = new Map([
    [
      "reds",
      {
        id: "reds",
        getView: () => (
          <views.Reds
            infoBar={
              <InfoBar>
                <Auth auth={this.state.auth} reds={[...this.state.data.reds.keys()]} />
                <Export />
                <TableTypeSwitch
                  currentID={this.state.currentView.id}
                  go={this.setView}
                />
              </InfoBar>
            }
            data={this.state.data.reds}
            go={this.setView}
          />
        ),
      },
    ],
    [
      "projects",
      {
        id: "projects",
        getView: () => (
          <views.Projects
            infoBar={
              <InfoBar>
                <Auth auth={this.state.auth} reds={[...this.state.data.reds.keys()]} />
                <Export />
                <TableTypeSwitch
                  currentID={this.state.currentView.id}
                  go={this.setView}
                />
              </InfoBar>
            }
            data={this.state.data.projects}
            go={this.setView}
          />
        ),
      },
    ],
    [
      "person",
      {
        id: "person",
        getView: ({ nickname }) => {
          const person = this.state.data.reds.get(nickname);

          return (
            <views.Person
              infoBar={
                <InfoBar>
                  <Auth auth={this.state.auth} reds={[...this.state.data.reds.keys()]} />
                  <Export />
                  <Return
                    go={() => {
                      const { id, data } = this.state.currentView.prevViews.pop();

                      this.setView(id, data);
                    }}
                  />
                </InfoBar>
              }
              person={nickname}
              data={person}
              go={this.setView}
            />
          );
        },
      },
    ],
  ]);

  ctx = {
    filters: {
      date: {
        _option: 5,
        get option() {
          return this._option;
        },
        set option(o) {
          this._option = parseInt(o);
        },
      },
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      auth: {
        isLoggedIn: false,
        nickname: undefined,
        setAuth: (nickname) => {
          this.setState(({ auth }) => {
            const newAuth = auth;

            if (nickname) Object.assign(newAuth, { nickname, isLoggedIn: true });

            return { auth: newAuth };
          });
        },
      },
      data: {
        reds: undefined,
        projects: undefined,
      },
      currentView: {
        id: "loading",
        prevViews: [],
        data: undefined,
        getView: () => <Loading />,
      },
    };

    this.setView = this.setView.bind(this);
    this.setAPIData = this.setAPIData.bind(this);
  }

  componentDidMount() {
    receiveData().then(this.setAPIData).catch(console.log);
  }

  setView(viewId, data) {
    const view = this.views.get(viewId);
    this.setState((prevState) => {
      const { currentView: prevView } = prevState;
      return {
        currentView: {
          id: view.id,
          prevViews: prevView.prevViews.concat(prevView),
          data,
          getView: () => view.getView(data),
        },
      };
    });
  }

  setAPIData({ reds, projects }) {
    this.setState(Object.assign({}, this.state, { data: { reds, projects } }));
    this.setView("reds");
  }

  render() {
    return (
      <Context.Provider value={this.ctx}>
        {this.state.currentView.getView()}
      </Context.Provider>
    );
  }
}

export default App;
