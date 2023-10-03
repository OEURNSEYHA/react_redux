const redux = require("redux");
const reduxLogger = require("redux-logger");

const logger = reduxLogger.createLogger();
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const createStore = redux.createStore;
const BUY_CAKE = `BUY_CAKE`;
const BUY_ICECREAM = "BUY_ICECREAM";

function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First rux action",
  };
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM,
  };
}

// (previousState, action)=> newState

const initialState = {
  numOfCakes: 10,
  numOfIceCreams: 20,
};

const initialCakeState = {
  numOfCakes: 10,
};

const initailIceCreamState = {
  numOfIceCreams: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes + 1,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initailIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + 1,
      };
    default:
      return state;
  }
};

// const reducer = ( state = initialState, action) => {
//     switch (action.type){
//         case BUY_CAKE: return{
//             ...state,
//             numOfCakes : state.numOfCakes - 1
//         }

//         case BUY_ICECREAM : return{
//             ...state,
//             numOfIceCreams: state.numOfIceCreams - 1
//         }
//         default: return state
//     }
// }

// const store = createStore(reducer);
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
const store = createStore(rootReducer, applyMiddleware(logger));

console.log("Initial State", store.getState());
const unSubscribe = store.subscribe(() => {});
// const unSubscribe = store.subscribe(() =>
//   console.log("update State", store.getState())
// );

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unSubscribe();
