import React, {Component} from "react";
import {Button, Col, Container, Form} from "react-bootstrap";
import GameComponent from "../component/GameComponent";
import {auth, database} from "../../firebase/firebase";
import firebase from "firebase/app";
import 'firebase/firestore';

enum Step {
    HOME,
    AUTH,
    MATCHMAKING,
    LOBBY,
    GAME
}

type HomeViewProperties = {}

type Match = {
    name: string,
    game_start_at: Date,
    current_nb_player: number,
    max_nb_player: number,
    owner_player_id: string,
    player_ids: Array<String>
}

type HomeViewState = {
    step: Step,
    playerPseudo: string,
    matches: Array<Match>
}

export default class HomeView extends Component<HomeViewProperties, HomeViewState> {
    public readonly state = {step: Step.HOME, playerPseudo: "", matches: Array<Match>()}

    constructor(props: HomeViewProperties) {
        super(props);

        this.startGame = this.startGame.bind(this);
        this.quitGame = this.quitGame.bind(this);
        this.onPseudoChange = this.onPseudoChange.bind(this);
        this.initMatchmakingList = this.initMatchmakingList.bind(this)
        this.createLobby = this.createLobby.bind(this)
    }

    async startGame() {
        console.log("start game with pseudo", this.state.playerPseudo)
        if (this.state.playerPseudo == "")
            return
        auth.signInAnonymously()
            .then((response) => {
                console.log(response)
                if (response.user != null) {
                    response.user.updateProfile({displayName: this.state.playerPseudo})

                    this.initMatchmakingList(() => {
                        this.setState({step: Step.MATCHMAKING})
                    })
                } else {
                    console.error("no user:", response);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    quitGame() {
        this.setState({step: Step.AUTH})
    }

    createLobby() {
        console.log("create game")
        database.collection("matchmaking").add(
            {
                name: "game_01",
                game_start_at: Date.now(),
                current_nb_player: 1,
                max_nb_player: 5,
                owner_player_id: auth.currentUser!.uid,
                player_ids: Array<String>()
            }
        ).then(() => {
            this.initMatchmakingList()
        })
    }

    onPseudoChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event, event.currentTarget.value)
        this.setState({playerPseudo: event.currentTarget.value})
    }

    componentDidMount() {
        console.log("hi")
        if (auth.currentUser != null) {
            this.initMatchmakingList(() => {
                this.setState({step: Step.MATCHMAKING})
            })
        } else {
            this.setState({step: Step.AUTH})
        }
    }

    matchmakingConverter = {
        toFirestore: (data: Match) => data,
        fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
            snap.data() as Match
    }

    initMatchmakingList(cb: (() => void) | null = null) {
        console.log("initMatchmakingList")
        database.collection("matchmaking").withConverter(this.matchmakingConverter).get().then((query) => {
            let matches = Array<Match>()
            query.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                matches.push(doc.data())
            });
            this.setState({matches: matches})
            if (cb) {
                cb()
            }
        }).catch((error) => console.log(error))
    }

    render() {

        let home = <div/>

        let auth = <div>
            <div>
                <Container style={{maxWidth: "500px"}} fluid>
                    <Form className="mt-4">
                        <Form.Group controlId="formPseudo">
                            <Form.Label>Pseudo</Form.Label>
                            <Form.Control type="text" placeholder="pseudo" onChange={this.onPseudoChange}/>
                        </Form.Group>
                        <Form.Row>
                            <Col xs={6}>
                                <Button type="button" block onClick={this.startGame}>
                                    Let's go!
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Container>
            </div>
        </div>

        let matchmaking = <div>
            <Button type="button" onClick={this.createLobby}>create game</Button>
            {this.state.matches.map((child, key) => {
                return (
                    <div key={key}>
                        <h1>{child.name}</h1>
                    </div>
                )
            })}
        </div>

        let game = <div>
            <GameComponent numberOfPlayers={2} gameWidth={800} gameHeight={500}/>
            <button type="button" onClick={this.quitGame}>
                Go back
            </button>
        </div>

        let currentStep
        if (this.state.step == Step.HOME) {
            currentStep = home
        } else if (this.state.step == Step.AUTH) {
            currentStep = auth
        } else if (this.state.step == Step.MATCHMAKING) {
            currentStep = matchmaking
        } else {
            currentStep = game
        }

        console.log("step: ", this.state.step)

        return <div>
            <header className="header">
                <div className="col-md-12">
                    <p className="title text-center">Welcome</p>
                </div>
            </header>

            {currentStep}

            <footer>
            </footer>
        </div>
    }
}