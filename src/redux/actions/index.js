//convert action.type to upper case
function convertActionName(actionName) {
  return actionName.replace(/([A-Z])/g, "_$1").toUpperCase();
}

//check if the action exsist and return action object if it's not
const actions = new Proxy(
  {},
  {
    get: function (target, prop) {
      if (target[prop] === undefined) {
        return function (args) {
          return { type: convertActionName(prop), payload: args };
        };
      } else return target[prop];
    },
  }
);

export default actions;
