function convertActionNameToLowerCase(actionName) {
  return actionName.toLowerCase().replace(/_(\w)/g, (v) => v[1].toUpperCase());
}

//return the handler matching to action.type after converting it to lower case
export default function reducersHandlers(state, action, handlers){
    let key = convertActionNameToLowerCase(action.type);
    let handler = handlers[key];
    if(handler) handler(state, action);
}